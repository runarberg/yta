/** @type {Partial<import("typedoc").TypeDocOptions>} */
export default {
  entryPoints: [
    "./src/index.js",
    "./src/async/index.js",
    "./src/sync/index.js",
  ],
  out: "docs",
};
