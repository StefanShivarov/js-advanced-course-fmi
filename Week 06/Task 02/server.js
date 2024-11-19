const http = require("http");
const path = require("path");
const fs = require("fs");
const url = require("url");
const { Transform } = require("stream");

const handleGetRequest = (req, res) => {
  const requestUrl = url.parse(req.url, true);
  const matchedFetchTemplate = requestUrl.pathname.match(/^\/fetchTemplate\/(.+)$/);

  if (matchedFetchTemplate) {
    fetchTemplate(matchedFetchTemplate[1], requestUrl.query, res);
  } else {
    handleError(res, 404, "Invalid request! Resource not found!");
  }
};

const handleError = (res, errorCode, message) => {
  res.writeHead(errorCode, { "Content-Type": "text/plain" });
  res.write(message);
  res.end();
};

const fetchTemplate = (templateName, replacementsMap, res) => {
  const filePath = path.join(__dirname, "templates", `${templateName}.txt`);
  const readStream = fs.createReadStream(filePath, { encoding: "utf-8", highWaterMark: 10 });
  readStream.on("error", () => handleError(res, 404, "Template not found!"));
  let partialInterpolationFromLastChunk = "";

  const transformStream = new Transform({
    encoding: "utf-8",
    transform(chunk, encoding, callback) {
      const chunkString = chunk.toString();
      if (!chunkString) {
        return callback(null, null);
      }
      let finalChunkString = "";

      if (partialInterpolationFromLastChunk) {
        finalChunkString = partialInterpolationFromLastChunk;
        partialInterpolationFromLastChunk = "";
      }

      finalChunkString += chunkString;

      Object.keys(replacementsMap).forEach((key) => {
        const toReplaceRegex = new RegExp(`{{${key}}}`, "g");
        finalChunkString = finalChunkString.replace(toReplaceRegex, replacementsMap[key] || "");
      });

      const partialInterpolationMatch = (chunkString.match(/{{?[a-zA-Z]*}?$/) || [])[0];
      if (partialInterpolationMatch) {
        partialInterpolationFromLastChunk = partialInterpolationMatch;
        finalChunkString = finalChunkString.slice(0, -partialInterpolationMatch.length);
      }

      callback(null, finalChunkString || null);
    },
  });

  transformStream.buffer = "";
  readStream.pipe(transformStream).pipe(res);
};

const requestHandlers = {
  GET: handleGetRequest,
};

const server = http.createServer((req, res) => {
  requestHandlers[req.method](req, res);
});

server.listen(8080, () => {
  console.log("Server listening on port: 8080");
});
