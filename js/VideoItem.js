const easyDownload = require("easy-downloader");
const axios = require("axios");

let hostPoprsName = Symbol();

class VideoItem {
  constructor(ytbPlaylistItem, host) {
    this.id = ytbPlaylistItem.contentDetails.videoId;
    this.server = "";
    this.category = "";
    this.thumbnail = {
      hqDefault: ytbPlaylistItem.snippet.thumbnails.high.url,
      sqDefault: ""
    };
    this.title = ytbPlaylistItem.snippet.title;
    this[hostPoprsName] = host;
  }
  async build() {
    let status;
    try {
      await this.loadImage();
      let url = await this.getVideoUrl();
      await this.loadVideo(url);
      status = true;
    } catch (e) {
      status = false;
    }
    return status;
  }
  async loadImage() {
    let url = this.thumbnail.hqDefault;
    try {
      await easyDownload(url, `./public/images/${this.id}.jpg`);
      this.thumbnail.hqDefault = `${this[hostPoprsName]}/images/${this.id}.jpg`;
    } catch (e) {
      this.thumbnail.hqDefault = url;
    }
  }
  async getVideoUrl() {
    let { id } = this;
    let result = await axios.get(
      "http://212.77.128.203/apps/youtube/links.php",
      { params: { id } }
    );
    let videoObj = result.data.pop();
    return videoObj.url;
  }
  async loadVideo(url) {
    try {
      let info = await easyDownload(url, `./public/video/${this.id}`);
      console.log(info);
      this.server = `ffmpeg ${this[hostPoprsName]}/video/${this.id}`;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = VideoItem;
