const express = require("express");
const eventRouter = require("./api/event/eventRouter");

const PORT = 8080;
const app = express();

app.use(express.json());
app.use("/event", eventRouter);

app.listen(8080, () => {
  console.log(`Server listening at port: ${PORT}`);
});
