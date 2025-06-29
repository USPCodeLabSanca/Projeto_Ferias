"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var set_view_node_exports = {};
__export(set_view_node_exports, {
  SetView: () => import_set_view2.SetView
});
module.exports = __toCommonJS(set_view_node_exports);
var import_node_util = __toESM(require("node:util"));
var import_pojo = require("../pojo.js");
var import_set_view = require("./set-view.js");
var import_set_view2 = require("./set-view.js");
import_set_view.SetView.prototype[import_node_util.default.inspect.custom] = function inspect(depth, options) {
  const newOptions = Object.assign((0, import_pojo.pojo)(), options, {
    depth: options.depth == null ? null : options.depth - 1
  });
  return import_node_util.default.inspect(this.toMutableSet(), newOptions).replace(/^Set/, "SetView");
};
//# sourceMappingURL=set-view.node.js.map
