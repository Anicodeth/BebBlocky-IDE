/**
 * @remix-run/dev v1.16.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var path = require('node:path');
var stream = require('node:stream');
var fse = require('fs-extra');
var prettyMs = require('pretty-ms');
var execa = require('execa');
var express = require('express');
var channel = require('../channel.js');
require('path');
require('module');
require('esbuild');
require('esbuild-plugin-polyfill-node');
require('fs');
require('url');
require('postcss-load-config');
require('postcss');
var config = require('../config.js');
require('remark-mdx-frontmatter');
require('tsconfig-paths');
require('postcss-modules');
require('../compiler/plugins/cssSideEffectImports.js');
require('../compiler/plugins/vanillaExtract.js');
require('postcss-discard-duplicates');
require('cacache');
require('crypto');
require('node:fs');
require('@babel/generator');
require('minimatch');
require('@babel/core');
require('assert');
require('@babel/plugin-syntax-jsx');
require('@babel/plugin-syntax-typescript');
require('recast');
var detectPackageManager = require('../cli/detectPackageManager.js');
require('jsesc');
var watch = require('../compiler/watch.js');
var env = require('./env.js');
var socket = require('./socket.js');
var hmr = require('./hmr.js');
var warnOnce = require('../warnOnce.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var path__namespace = /*#__PURE__*/_interopNamespace(path);
var stream__namespace = /*#__PURE__*/_interopNamespace(stream);
var fse__default = /*#__PURE__*/_interopDefaultLegacy(fse);
var prettyMs__default = /*#__PURE__*/_interopDefaultLegacy(prettyMs);
var execa__default = /*#__PURE__*/_interopDefaultLegacy(execa);
var express__default = /*#__PURE__*/_interopDefaultLegacy(express);

let stringifyOrigin = o => `${o.scheme}://${o.host}:${o.port}`;
let patchPublicPath = (config, devHttpOrigin) => {
  // set public path to point to dev server
  // so that browser asks the dev server for assets
  return {
    ...config,
    // dev server has its own origin, to `/build/` path will not cause conflicts with app server routes
    publicPath: stringifyOrigin(devHttpOrigin) + "/build/"
  };
};
let detectBin = async () => {
  let pkgManager = detectPackageManager.detectPackageManager() ?? "npm";
  if (pkgManager === "npm") {
    // npm v9 removed the `bin` command, so have to use `prefix`
    let {
      stdout
    } = await execa__default["default"](pkgManager, ["prefix"]);
    return stdout.trim() + "/node_modules/.bin";
  }
  let {
    stdout
  } = await execa__default["default"](pkgManager, ["bin"]);
  return stdout.trim();
};
let serve = async (initialConfig, options) => {
  await env.loadEnv(initialConfig.rootDirectory);
  let websocket = socket.serve({
    port: options.websocketPort
  });
  let httpOrigin = {
    scheme: options.httpScheme,
    host: options.httpHost,
    port: options.httpPort
  };
  let state = {};
  let bin = await detectBin();
  let startAppServer = command => {
    console.log(`> ${command}`);
    let newAppServer = execa__default["default"].command(command, {
      stdio: "pipe",
      env: {
        NODE_ENV: "development",
        PATH: `${bin}:${process.env.PATH}`,
        REMIX_DEV_HTTP_ORIGIN: stringifyOrigin(httpOrigin)
      }
    });
    if (newAppServer.stdin) process.stdin.pipe(newAppServer.stdin, {
      end: true
    });
    if (newAppServer.stderr) newAppServer.stderr.pipe(process.stderr, {
      end: false
    });
    if (newAppServer.stdout) {
      newAppServer.stdout.pipe(new stream__namespace.PassThrough({
        transform(chunk, _, callback) {
          let str = chunk.toString();
          let matches = str && str.matchAll(/\[REMIX DEV\] ([A-f0-9]+) ready/g);
          if (matches) {
            for (let match of matches) {
              let buildHash = match[1];
              if (buildHash === state.latestBuildHash) {
                var _state$buildHashChann;
                (_state$buildHashChann = state.buildHashChannel) === null || _state$buildHashChann === void 0 ? void 0 : _state$buildHashChann.ok();
              }
            }
          }
          callback(null, chunk);
        }
      })).pipe(process.stdout, {
        end: false
      });
    }
    return newAppServer;
  };
  let dispose = await watch.watch({
    config: patchPublicPath(initialConfig, httpOrigin),
    options: {
      mode: "development",
      sourcemap: true,
      onWarning: warnOnce.warnOnce,
      devHttpOrigin: httpOrigin,
      devWebsocketPort: options.websocketPort
    }
  }, {
    reloadConfig: async root => {
      let config$1 = await config.readConfig(root);
      return patchPublicPath(config$1, httpOrigin);
    },
    onBuildStart: ctx => {
      var _state$buildHashChann2;
      (_state$buildHashChann2 = state.buildHashChannel) === null || _state$buildHashChann2 === void 0 ? void 0 : _state$buildHashChann2.err();
      clean(ctx.config);
      websocket.log(state.prevManifest ? "Rebuilding..." : "Building...");
    },
    onBuildFinish: async (ctx, durationMs, manifest) => {
      if (!manifest) return;
      websocket.log((state.prevManifest ? "Rebuilt" : "Built") + ` in ${prettyMs__default["default"](durationMs)}`);
      let prevManifest = state.prevManifest;
      state.prevManifest = manifest;
      state.latestBuildHash = manifest.version;
      state.buildHashChannel = channel.create();
      let start = Date.now();
      console.log(`Waiting for app server (${state.latestBuildHash})`);
      if (options.command && (state.appServer === undefined || options.restart)) {
        await kill(state.appServer);
        state.appServer = startAppServer(options.command);
      }
      let {
        ok
      } = await state.buildHashChannel.result;
      // result not ok -> new build started before this one finished. do not process outdated manifest
      if (!ok) return;
      console.log(`App server took ${prettyMs__default["default"](Date.now() - start)}`);
      if (manifest.hmr && prevManifest) {
        let updates = hmr.updates(ctx.config, manifest, prevManifest);
        websocket.hmr(manifest, updates);
        let hdr = updates.some(u => u.revalidate);
        console.log("> HMR" + (hdr ? " + HDR" : ""));
      } else if (prevManifest !== undefined) {
        websocket.reload();
        console.log("> Live reload");
      }
    },
    onFileCreated: file => websocket.log(`File created: ${relativePath(file)}`),
    onFileChanged: file => websocket.log(`File changed: ${relativePath(file)}`),
    onFileDeleted: file => websocket.log(`File deleted: ${relativePath(file)}`)
  });
  let httpServer = express__default["default"]()
  // statically serve built assets
  .use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  }).use("/build", express__default["default"].static(initialConfig.assetsBuildDirectory, {
    immutable: true,
    maxAge: "1y"
  }))

  // handle `broadcastDevReady` messages
  .use(express__default["default"].json()).post("/ping", (req, res) => {
    let {
      buildHash
    } = req.body;
    if (typeof buildHash !== "string") {
      console.warn(`Unrecognized payload: ${req.body}`);
      res.sendStatus(400);
    }
    if (buildHash === state.latestBuildHash) {
      var _state$buildHashChann3;
      (_state$buildHashChann3 = state.buildHashChannel) === null || _state$buildHashChann3 === void 0 ? void 0 : _state$buildHashChann3.ok();
    }
    res.sendStatus(200);
  }).listen(httpOrigin.port, () => {
    console.log("Remix dev server ready");
  });
  return new Promise(() => {}).finally(async () => {
    await kill(state.appServer);
    websocket.close();
    httpServer.close();
    await dispose();
  });
};
let clean = config => {
  try {
    fse__default["default"].emptyDirSync(config.relativeAssetsBuildDirectory);
  } catch {}
};
let relativePath = file => path__namespace.relative(process.cwd(), file);
let kill = async p => {
  if (p === undefined) return;
  // `execa`'s `kill` is not reliable on windows
  if (process.platform === "win32") {
    await execa__default["default"]("taskkill", ["/pid", String(p.pid), "/f", "/t"]);
    return;
  }

  // wait one tick of the event loop so that we guarantee app server gets killed before proceeding
  p.kill("SIGTERM", {
    forceKillAfterTimeout: 0
  });
  await new Promise(resolve => setTimeout(resolve, 0));
};

exports.serve = serve;
