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
var map_view_node_exports = {};
__export(map_view_node_exports, {
  MapView: () => import_map_view2.MapView
});
module.exports = __toCommonJS(map_view_node_exports);
var import_node_util = __toESM(require("node:util"));
var import_pojo = require("../pojo.js");
var import_map_view = require("./map-view.js");
var import_map_view2 = require("./map-view.js");
import_map_view.MapView.prototype[import_node_util.default.inspect.custom] = function inspect(depth, options) {
  const newOptions = Object.assign((0, import_pojo.pojo)(), options, {
    depth: options.depth == null ? null : options.depth - 1
  });
  return import_node_util.default.inspect(this.toMutableMap(), newOptions).replace(/^Map/, "MapView");
};
//# sourceMappingURL=map-view.node.js.map
