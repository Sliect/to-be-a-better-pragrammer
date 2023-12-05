import { prompts, fsExtra, chalk } from '@umijs/utils';
import compressing from 'compressing';
import path from 'path';

const generateHtml = async () => {
  const { title, publicPath, env } = await prompts([
    {
      type: 'text',
      name: 'title',
      message: '请输入系统名称',
    },
    {
      type: 'text',
      name: 'publicPath',
      message:
        '请输入前端资源部署路径，不包含 dev、prod 环境标识。基于约定，前端资源路径通过 /dev、/prod 区分开发及生产环境',
    },
    {
      type: 'select',
      name: 'env',
      message: '请选择部署环境',
      choices: [
        {
          title: '浙里办',
          description: 'zlb',
        },
        { title: '浙政钉', value: 'zzd' },
      ],
      initial: 'zlb',
    },
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
  ${
    // 浙政钉环境加载逐木鸟监控
    env === 'zzd'
      ? '<script src="//wpk-gate.zjzwfw.gov.cn/static/wpk-jssdk.1.0.2/wpkReporter.js"></script>'
      : ''
  }
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

const build = async () => {
  fsExtra.emptyDirSync(path.resolve(__dirname, '../../irs-dist'));
  fsExtra.writeFileSync(
    path.resolve(__dirname, '../../irs-dist/package.json'),
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
}`,
  );

  fsExtra.emptyDirSync(path.resolve(__dirname, '../../irs-dist/src'));
  fsExtra.writeFileSync(
    path.resolve(__dirname, '../../irs-dist/src/index.js'),
    'console.log("irs")',
  );

  fsExtra.emptyDirSync(path.resolve(__dirname, '../../irs-dist/build'));
  const html = await generateHtml();
  fsExtra.writeFileSync(
    path.resolve(__dirname, '../../irs-dist//build/index.html'),
    html,
  );

  await compressing.zip.compressDir(
    path.resolve(path.resolve(__dirname, '../../irs-dist/')),
    path.resolve(process.cwd(), './irs-dist.zip'),
  );

  console.log(chalk.green('IRS 发布打包已完成，目标文件为 /irs-dist.zip'));
  process.exit(0);
};

build();
