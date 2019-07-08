const axios = require("axios");
const VideoItem = require("./VideoItem.js");

class LoaderYtbPlayList {
  constructor(host) {
    this.host = host;
    this.apiHost = "https://www.googleapis.com/youtube/v3/";
    this.key = "AIzaSyDKNaSr0YBGdkJE5g7AmdMnKNRmRV5toLc";
    this.playListId = "PLz8Uedn1OvlI1wqkTHQd-h_tOZ5YoU9Ht";
    this.items = new PlayListItemsArr();
    try {
      this.load();
    } catch (e) {
      console.log(e);
    }
  }
  async load() {
    let videoItems = [];
    let url = `${
      this.apiHost
    }playlistItems?maxResults=50&part=snippet,contentDetails&key=${
      this.key
    }&playlistId=${this.playListId}`;
    let result = await axios.get(url);
    for (let item of result.data.items) {
      if (this.items.inculdesPlayListItem(item)) {
        continue;
      }
      let videoItem = new VideoItem(item, this.host);
      videoItems.push(videoItem);
      await videoItem.build();
    }
    this.items = videoItems;
  }
}

class PlayListItemsArr extends Array {
  inculdesPlayListItem(item) {
    return this.reduce((p, c, i, a) => {
      if (p || item.id === c.id) {
        return (p = true);
      }
      return p;
    }, false);
  }
}

module.exports = LoaderYtbPlayList;
