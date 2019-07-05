const express = require("express");
const LoaderYtbPlayList = require("./js/LoaderYtbPlayList.js");

const app = express();
app.use(express.json());

const host = "http://212.77.128.203:8005";

const loader = new LoaderYtbPlayList(host);

app.get("/instructions", (req, res) => {
  let { startIndex, itemsPerPage } = req.query;

  startIndex = Number(startIndex);
  itemsPerPage = Number(itemsPerPage);

  let items = loader.items.slice(startIndex, startIndex + itemsPerPage);
  let totalItems = loader.items.length;

  let result = {
    apiVersion: "2.0",
    data: {
      items
    },
    itemsPerPage,
    startIndex,
    totalItems
  };
  res.send(result);
});

app.use("/images", express.static("./public/images"));
app.use("/video", express.static("./public/video"));

app.listen(8005);
