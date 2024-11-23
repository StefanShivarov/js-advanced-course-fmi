const fs = require("fs");
const path = require("path");
const { Transform } = require("stream");

const censorDictionary = {
  bad: "***",
  worse: "****",
  horrible: "*****",
  [Symbol.iterator]: function* () {
    for (prop in censorDictionary) {
      yield { word: prop, replacement: censorDictionary[prop] };
    }
  },
};

const uncensoredFilePath = path.join(__dirname, "./bad-text.txt");
const censoredFilePath = path.join(__dirname, "./censored-text.txt");

// Solution With readFile/writeFile

fs.readFile(uncensoredFilePath, { encoding: "utf-8" }, function (err, data) {
  if (err) {
    console.error(err);
    return;
  }

  for (const pair of censorDictionary) {
    searchRegex = new RegExp(`${pair.word}`, "gi");
    data = data.replace(searchRegex, pair.replacement);
  }

  fs.writeFile(censoredFilePath, data, { encoding: "utf-8" }, function (err) {
    if (err) {
      console.error(err);
      return;
    }
  });
});

// Solution With transform / streams

replaceBadWordsTransform = new Transform({
  encoding: "utf-8",
  transform: function (chunk, enc, cb) {
    let data = chunk.toString();
    for (const pair of censorDictionary) {
      const searchRegex = new RegExp(`${pair.word}`, "gi");
      data = data.replace(searchRegex, pair.replacement);
    }
    cb(null, data);
  },
});

const readStream = fs.createReadStream(uncensoredFilePath, { encoding: "utf-8" });
const writeStream = fs.createWriteStream(censoredFilePath, { encoding: "utf-8" });

readStream
  .pipe(replaceBadWordsTransform)
  .pipe(writeStream)
  .on("error", function (err) {
    console.error(err);
  });
