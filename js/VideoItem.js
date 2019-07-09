const easyDownload = require("easy-downloader");
const axios = require("axios");
const fs = require("fs");

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
      let url = await this.getVideoUrl();
      await this.loadVideo(url);
      await this.loadImage();
      status = true;
    } catch (e) {
      status = false;
      console.log(e);
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
    let path = `./public/video/${this.id}`;
    await easyDownload(url, path);
    let size = getFilesizeInBytes(path);
    if (size < 50) {
      throw new Error("video download error");
    }
    this.server = `ffmpeg ${this[hostPoprsName]}/video/${this.id}`;
  }
}

function getFilesizeInBytes(filename) {
  const stats = fs.statSync(filename);
  const fileSizeInBytes = stats.size;
  return fileSizeInBytes;
}

module.exports = VideoItem;
