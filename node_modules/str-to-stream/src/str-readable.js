const { Readable } = require("stream");

class StrReadable extends Readable {
  /**
   * Create a new StrReadable instance.
   *
   * @param {String} data
   * @param {Number} options.highWaterMark
   * @param {Boolean} options.objectMode
   */
  constructor(data, { highWaterMark = 16384, objectMode = false }) {
    super({ highWaterMark, objectMode });

    this.data = data;
    this.objectMode = objectMode;
  }

  /**
   * Read the data.
   *
   * @param {Number} size
   * @return {Void}
   */
  _read(size) {
    if (this.objectMode) {
      this.push(this.data);
    } else {
      this.pushPerBytesSize(size);
    }

    this.push(null);
  }

  /**
   * Push data as a chunk.
   *
   * @param {Number} size
   * @return {Void}
   */
  pushPerBytesSize(size) {
    const buff = Buffer.from(this.data);

    let pushedBytes = 0;

    while (pushedBytes < buff.length) {
      this.push(buff.slice(pushedBytes, pushedBytes + size));

      pushedBytes += size;
    }
  }
}

module.exports = StrReadable;
