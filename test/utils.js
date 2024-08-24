const fs = require("fs").promises;
const path = require("path");

class MimicFile {
  constructor(buffer, name, options = {}) {
    this.buffer = buffer;
    this.name = name;
    this.size = buffer.length;
    this.type = options.type || "";
    this.lastModified =
      options.lastModified || Date.now();
  }

  slice(start = 0, end = this.size, contentType = "") {
    const slicedBuffer = this.buffer.slice(start, end);
    return new MimicFile(slicedBuffer, this.name, {
      type: contentType,
      lastModified: this.lastModified,
    });
  }

  // Mimicking other properties and methods from the File API
  text() {
    return this.buffer.toString();
  }

  arrayBuffer() {
    return this.buffer.buffer.slice(
      this.buffer.byteOffset,
      this.buffer.byteOffset + this.buffer.byteLength
    );
  }

  stream() {
    const { Readable } = require("stream");
    const stream = new Readable();
    stream.push(this.buffer);
    stream.push(null); // End the stream
    return stream;
  }
}

// Example usage
async function readFileAsMimicFile(filePath) {
  const buffer = await fs.readFile(filePath);
  const fileName = path.basename(filePath);

  // You can add options like type and lastModified as per your requirements
  const mimicFile = new MimicFile(buffer, fileName, {
    type: "application/octet-stream",
  });

  return mimicFile;
}

module.exports = {
  readFileAsMimicFile,
};
