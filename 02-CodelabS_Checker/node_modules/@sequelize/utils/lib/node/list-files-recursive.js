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
var list_files_recursive_exports = {};
__export(list_files_recursive_exports, {
  listFilesRecursive: () => listFilesRecursive
});
module.exports = __toCommonJS(list_files_recursive_exports);
var import_promises = __toESM(require("node:fs/promises"));
var import_node_path = __toESM(require("node:path"));
async function* listFilesRecursive(dir) {
  const entries = await import_promises.default.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const entryPath = import_node_path.default.resolve(dir, entry.name);
    if (entry.isDirectory()) {
      yield* listFilesRecursive(entryPath);
    } else {
      yield entryPath;
    }
  }
}
//# sourceMappingURL=list-files-recursive.js.map
