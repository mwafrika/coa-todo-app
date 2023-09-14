"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _controller = _interopRequireDefault(require("./src/controller.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = (0, _express.default)();
app.use("/", _controller.default);
const PORT = 5000;
app.listen(PORT, (req, res) => {
  console.log(`listening on ${PORT}`);
});
var _default = app;
exports.default = _default;