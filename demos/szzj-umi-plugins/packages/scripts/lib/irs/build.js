var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/irs/build.ts
var import_utils = require("@umijs/utils");
var import_compressing = __toESM(require("compressing"));
var import_path = __toESM(require("path"));
var generateHtml = async () => {
  const { title, publicPath, env } = await (0, import_utils.prompts)([
    {
      type: "text",
      name: "title",
      message: "请输入系统名称"
    },
    {
      type: "text",
      name: "publicPath",
      message: "请输入前端资源部署路径，不包含 dev、prod 环境标识。基于约定，前端资源路径通过 /dev、/prod 区分开发及生产环境"
    },
    {
      type: "select",
      name: "env",
      message: "请选择部署环境",
      choices: [
        {
          title: "浙里办",
          description: "zlb"
        },
        { title: "浙政钉", value: "zzd" }
      ],
      initial: "zlb"
    }
  ]);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-touch-fullscreen" content="yes">
  <meta name="format-detection" content="telephone=no,address=no">
  <meta name="apple-mobile-web-app-status-bar-style" content="white">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="google" content="notranslate">
  <meta name="SiteName" content="${title}">
  <title>${title}</title>
  ${// 浙政钉环境加载逐木鸟监控
  env === "zzd" ? '<script src="//wpk-gate.zjzwfw.gov.cn/static/wpk-jssdk.1.0.2/wpkReporter.js"></script>' : ""}
  <script>
    window.routerBase = "/";
    // runtimePublicPath 开启的条件下，根据部署环境设置不同的 window.publicPath
    window.publicPath = window.location.href.indexOf('/reserved/') === -1 ? "${publicPath}/dev/" : "${publicPath}/prod/";
  </script>
</head>
<body>
<div id="root"></div>
<script>
</script>
<script>
  function loadScript(src, callback) {
    var script = document.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.onload = function () {
      if (callback) callback();
    };
    document.body.appendChild(script);
  };

  function loadStyle(href) {
    var link = document.createElement('link');
    link.href = href;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    document.head.appendChild(link);
  };

  // 测试环境
  if (window.location.href.indexOf('/reserved/') === -1){
    loadStyle('${publicPath}/dev/umi.css?t=' + Date.now().toString());
    loadScript('${publicPath}/dev/umi.js?t=' + Date.now().toString());
  // 生产环境
  } else {
    loadStyle('${publicPath}/prod/umi.css?t=' + Date.now().toString());
    loadScript('${publicPath}/prod/umi.js?t=' + Date.now().toString());
  }

  // 调试
  if (location.search.indexOf('vconsole=true') !== -1) {
    loadScript("//unpkg.com/vconsole@3.15.1/dist/vconsole.min.js", () => new window.VConsole());
  };
  
  if (location.search.indexOf('eruda=true') !== -1) {
    loadScript("//unpkg.com/eruda@3.0.1/eruda.js", () => window.eruda.init());
  };
</script>
</body>
</html>`;
};
var build = async () => {
  import_utils.fsExtra.emptyDirSync(import_path.default.resolve(__dirname, "../../irs-dist"));
  import_utils.fsExtra.writeFileSync(
    import_path.default.resolve(__dirname, "../../irs-dist/package.json"),
    `{
  "private": true,
  "scripts": {
    "build": "echo 'build'"
  },
  "dependencies": {},
  "devDependencies": {},
  "engines": {
    "node": ">=8.0.0"
  }
}`
  );
  import_utils.fsExtra.emptyDirSync(import_path.default.resolve(__dirname, "../../irs-dist/src"));
  import_utils.fsExtra.writeFileSync(
    import_path.default.resolve(__dirname, "../../irs-dist/src/index.js"),
    'console.log("irs")'
  );
  import_utils.fsExtra.emptyDirSync(import_path.default.resolve(__dirname, "../../irs-dist/build"));
  const html = await generateHtml();
  import_utils.fsExtra.writeFileSync(
    import_path.default.resolve(__dirname, "../../irs-dist//build/index.html"),
    html
  );
  await import_compressing.default.zip.compressDir(
    import_path.default.resolve(import_path.default.resolve(__dirname, "../../irs-dist/")),
    import_path.default.resolve(process.cwd(), "./irs-dist.zip")
  );
  console.log(import_utils.chalk.green("IRS 发布打包已完成，目标文件为 /irs-dist.zip"));
  process.exit(0);
};
build();
