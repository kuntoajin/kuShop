const path = require("path");
const { merge } = require("webpack-merge");
const webpackCommon = require("./webpack.common");

module.exports = merge(webpackCommon, {
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "..", "build"),
    },
    compress: true,
    port: 3501,
  },
});
