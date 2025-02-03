const path = require("path");

const commonConfigs = {
  entry: "./index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: "tsconfig.json",
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [
      "",
      ".ts",
      ".js",
      ".cjs",
      ".mjs",
    ],
    alias: {
      "@/utils": path.resolve(
        __dirname,
        "utils"
      ),
    },
  },
};

const cjsOutputConfig = {
  filename: "index.js",
  path: path.resolve(__dirname, "cjs"),
  libraryTarget: "commonjs2",
};

const esmOutputConfig = {
  filename: "index.mjs",
  path: path.resolve(__dirname, "esm"),
  libraryTarget: "module",
};

module.exports = [
  {
    ...commonConfigs,
    name: "cjs",
    output: cjsOutputConfig,
  },
  {
    ...commonConfigs,
    name: "esm",
    output: esmOutputConfig,
    experiments: {
      outputModule: true,
    },
  },
];
