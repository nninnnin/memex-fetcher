const path = require("path");

module.exports = {
  entry: "./index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: { loader: "ts-loader" },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@utils": path.resolve(__dirname, "utils"),
    },
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "cjs"),
    libraryTarget: "commonjs2",
  },
};
