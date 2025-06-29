"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var buffer_exports = {};
__export(buffer_exports, {
  makeBufferFromTypedArray: () => makeBufferFromTypedArray
});
module.exports = __toCommonJS(buffer_exports);
function makeBufferFromTypedArray(arr) {
  return ArrayBuffer.isView(arr) ? (
    // To avoid a copy, use the typed array's underlying ArrayBuffer to back
    // new Buffer, respecting the "view", i.e. byteOffset and byteLength
    Buffer.from(arr.buffer, arr.byteOffset, arr.byteLength)
  ) : (
    // Pass through all other types to `Buffer.from`
    Buffer.from(arr)
  );
}
//# sourceMappingURL=buffer.js.map
