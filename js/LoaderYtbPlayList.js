const axios = require("axios");
const VideoItem = require("./VideoItem.js");

const sec = 1000;
const min = sec * 60;
const h = min * 60;

class LoaderYtbPlayList {
  constructor(host) {
    this.host = host;
    this.apiHost = "https://www.googleapis.com/youtube/v3/";
    this.key = "AIzaSyDKNaSr0YBGdkJE5g7AmdMnKNRmRV5toLc";
    this.playListId = "PLz8Uedn1OvlLC0WIPhS0xoM0fEpPtCHhr";
    this.items = new PlayListItemsArr();
    try {
      this.load();
      setInterval(() => {
        this.load();
      }, 12 * h);
    } catch (e) {
      console.log(e);
    }
  }
  async load() {
    let videoItems = [];
    let ytbItems = await this.getYtbItems();
    for (let item of ytbItems) {
      if (this.items.inculdesPlayListItem(item)) {
        continue;
      }
      let videoItem = new VideoItem(item, this.host);
      if (await videoItem.build()) {
        videoItems.push(videoItem);
      } else {
        videoItem = new VideoItem(item, this.host);
        if (await videoItem.build()) {
          videoItems.push(videoItem);
        }
      }
    }
    this.items = this.items.concat(videoItems);
  }
  async getYtbItems() {
    try {
      return await this.getYtbItemsRecurse([], false);
    } catch (e) {
      console.log(e);
      return [];
    }
  }
  async getYtbItemsRecurse(items = [], nextPageToken) {
    if (typeof nextPageToken === "undefined") {
      return items;
    }
    nextPageToken = nextPageToken ? `&pageToken=${nextPageToken}` : "";
    let url = `${
      this.apiHost
    }playlistItems?maxResults=50&part=snippet,contentDetails&key=${
      this.key
    }&playlistId=${this.playListId}${nextPageToken}`;
    let result = await axios.get(url);
    return await this.getYtbItemsRecurse(
      items.concat(result.data.items),
      result.data.nextPageToken
    );
  }
}

class PlayListItemsArr extends Array {
  inculdesPlayListItem(item) {
    try {
      var id = item.contentDetails.videoId;
    } catch (e) {
      id = null;
    }
    return this.reduce((p, c, i, a) => {
      if (p || id === c.id) {
        return true;
      }
      return p;
    }, false);
  }
}

module.exports = LoaderYtbPlayList;
