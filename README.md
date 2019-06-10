Minimal repro for html-webpack-plugin issue causing `TypeError: __webpack_require__(...) is not a function`.

## How to reproduce

```sh
git clone git@github.com:mogelbrod/webpack-issue.git
cd webpack-issue
npm i
npx webpack
```

## Expected outcome
Webpack successfully bundles the project, creating a `dist/index.html` and `dist/index.js`.

## Actual outcome
Error thrown by webpack while it attempts to parse webpack itself?

```sh
$ npx webpack
[BABEL] Note: The code generator has deoptimised the styling of .../webpack-issue/node_modules/react-dom/cjs/react-dom.development.js as it exceeds the max of 500KB.
Hash: a424c7c3c68dbcbb39ec
Version: webpack 4.32.2
Time: 6363ms
Built at: 06/10/2019 12:48:55 PM
     Asset      Size  Chunks             Chunk Names
index.html  1.23 KiB          [emitted]
  index.js  1.22 MiB     app  [emitted]  app
Entrypoint app = index.js
[./index.js] 166 bytes {app} [built]
[./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 1.17 KiB {app} [built]
[./node_modules/webpack/buildin/harmony-module.js] (webpack)/buildin/harmony-module.js 727 bytes {app} [built]
    + 210 hidden modules

ERROR in   Error: webpack:///(webpack)/buildin/harmony-module.js?:34
  /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))
                                                                                                                                            ^
  TypeError: __webpack_require__(...) is not a function


  - index.html:1718 Module../node_modules/webpack/buildin/harmony-module.js
    .../webpack-issue/index.html:1718:1

  - index.html:21 __webpack_require__
    .../webpack-issue/index.html:21:30


  - index.html:1706 Module../node_modules/webpack/buildin/global.js
    .../webpack-issue/index.html:1706:1

  - index.html:21 __webpack_require__
    .../webpack-issue/index.html:21:30

  - lodash.js?:17101 eval
    [.]/[lodash]/lodash.js?:17101:41

  - index.html:1694 Object../node_modules/lodash/lodash.js
    .../webpack-issue/index.html:1694:1

  - index.html:21 __webpack_require__
    .../webpack-issue/index.html:21:30

  - loader.js:1 eval
    [index.html?.]/[html-webpack-plugin]/lib/loader.js:1:9


Child html-webpack-plugin for "index.html":
     1 asset
    Entrypoint undefined = index.html
    [./node_modules/html-webpack-plugin/lib/loader.js!./index.html] 478 bytes {0} [built]
    [./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 1.17 KiB {0} [built]
    [./node_modules/webpack/buildin/harmony-module.js] (webpack)/buildin/harmony-module.js 727 bytes {0} [built]
    [./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 605 bytes {0} [built]
        + 138 hidden modules
```

## Workaround

Exclude `node_modules/webpack` and `node_modules/html-webpack-plugin` from being parsed by babel:
```diff
diff --git a/webpack.config.js b/webpack.config.js
index 34e17ce..8bf6b03 100644
--- a/webpack.config.js
+++ b/webpack.config.js
@@ -20,6 +20,9 @@ module.exports = function(env) {
       rules: [
         {
           test: /\.js$/,
+          exclude: [
+            /node_modules\/(webpack|html-webpack-plugin)\//,
+          ],
           loader: 'babel-loader',
         },
       ],
```
