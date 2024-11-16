const http = require("http");
const https = require("https");
const path = require("path");
const fs = require("fs");
const url = require("url");

const handleGetRequest = (req, res) => {
  const requestUrl = url.parse(req.url, true);
  const matchedFetchTemplate = requestUrl.pathname.match(/^\/fetchTemplate\/(.+)$/);
  const matchedFetchWebsite = requestUrl.pathname.match(/^\/fetchWebsite\/(.+)$/);
  const matchedLoadProp = requestUrl.pathname.match(/^\/loadProp\/(.+)$/);
  const matchedStoreUserPosts = requestUrl.pathname.match(/^\/storeUserPosts\/(.+)$/);

  if (matchedFetchTemplate) {
    fetchTemplate(matchedFetchTemplate[1], requestUrl.query, res);
  } else if (matchedFetchWebsite) {
    const fullUrl = matchedFetchWebsite[1].includes("www")
      ? `https://${matchedFetchWebsite[1]}`
      : matchedFetchWebsite[1].endsWith(".com")
      ? `https://www.${matchedFetchWebsite[1]}`
      : `https://www.${matchedFetchWebsite[1]}.com`;

    fetchWebsite(fullUrl, res);
  } else if (matchedLoadProp) {
    fetchProperty(matchedLoadProp[1], res);
  } else if (matchedStoreUserPosts) {
    fetchUserPosts(matchedStoreUserPosts[1], res, saveUserPostsToFile);
  } else {
    handleError(res, 404, "Invalid request! Resource not found!");
  }
};

const handlePostRequest = (req, res) => {
  const requestUrl = url.parse(req.url, true);
  const matchedFetchTemplate = requestUrl.pathname.match(/^\/fetchTemplate\/(.+)$/);

  if (matchedFetchTemplate) {
    let buff = "";
    let requestBody = {};

    req.on("error", (err) => console.error(err));

    req.on("data", (chunk) => {
      buff += chunk.toString();
    });

    req.on("end", () => {
      requestBody = JSON.parse(buff);
      fetchTemplate(matchedFetchTemplate[1], requestBody, res);
    });
  } else {
    handleError(res, 404, "Invalid request! Resource not found!");
  }
};

const handleError = (res, errorCode, message) => {
  res.writeHead(errorCode, { "Content-Type": "text/plain" });
  res.write(message);
  res.end();
};

const replacePlaceholders = (template, replacementsMap) => {
  return template.replace(/\{\{(.*?)\}\}/g, (match, key) => {
    return replacementsMap[key] || match;
  });
};

const fetchTemplate = (templateName, replacementsMap, res) => {
  const filePath = path.join(__dirname, "templates", `${templateName}.txt`);

  fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
    if (err) {
      handleError(res, 404, "Template not found!");
    }

    const editedTemplate = replacePlaceholders(data, replacementsMap);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(editedTemplate);
    res.end();
  });
};

const fetchWebsite = (websiteUrl, res) => {
  https.get(websiteUrl, (response) => {
    let body = "";
    response.on("error", (err) => console.error(err));

    response.on("data", (chunk) => {
      body += chunk.toString();
    });

    response.on("end", () => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(body);
      res.end();
    });
  });
};

const props = {
  name: "Stefan Shivarov",
  age: 21,
  country: "Bulgaria",
};

const fetchProperty = (propertyName, res) => {
  console.log(propertyName);
  if (props.hasOwnProperty(propertyName)) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write(props[propertyName].toString());
  } else {
    handleError(res, 404, "Property not found!");
  }
  res.end();
};

const fetchUserPosts = (userId, res, callbackFn) => {
  console.log(userId);
  https
    .get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        try {
          const postsData = JSON.parse(data);
          if (postsData.length === 0) {
            handleError(res, 404, `There are no posts for user with userId ${userId}!`);
            return;
          }
          callbackFn(res, null, userId, postsData);
        } catch (err) {
          callbackFn(res, err);
        }
      });
    })
    .on("error", (err) => {
      callbackFn(null, err);
    });
};

const saveUserPostsToFile = (res, err, userId, posts) => {
  if (err) {
    handleError(res, 500, "Error fetching user posts!");
    return;
  }

  const directory = path.join(__dirname, "data");
  const absoluteFilePath = path.join(directory, `${userId}.txt`);

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }

  const content = posts.map((post) => `${post.title}\n----\n${post.body}`).join("\n\n");
  fs.writeFileSync(absoluteFilePath, content, { encoding: "utf-8" });
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(`Posts for user with userId ${userId} have been saved to /data/${userId}.txt`);
};

const requestHandlers = {
  GET: handleGetRequest,
  POST: handlePostRequest,
};

const server = http.createServer((req, res) => {
  requestHandlers[req.method](req, res);
});

server.listen(8080, () => {
  console.log("Server listening on port: 8080");
});
