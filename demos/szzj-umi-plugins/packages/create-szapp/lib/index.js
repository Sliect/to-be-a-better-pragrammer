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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);
var import_path = require("path");
var import_utils = require("@umijs/utils");
var import_cnpm_api = __toESM(require("cnpm-api"));
var import_download_package_tarball = __toESM(require("download-package-tarball"));
var import_cache = __toESM(require("../.cache.json"));
var debug = (0, import_utils.debug)("create-szapp");
var REGISTRY = `http://10.145.11.76:30090`;
var TEMPLATES = [
  {
    title: "pc 前端应用",
    value: "pc",
    libName: "template-pc"
  },
  {
    title: "h5 前端应用",
    value: "h5",
    libName: "template-h5"
  },
  {
    title: "pc 前端微应用",
    value: "pc-microapp",
    libName: "template-subapp"
  },
  {
    title: "DRS 主应用",
    value: "drs-master",
    libName: "drs-template-master"
  },
  {
    title: "DRS 微应用",
    value: "drs-slave",
    libName: "drs-template-slave"
  },
  {
    title: "react 组件库模板",
    value: "libReact",
    libName: "template-lib-react"
  }
];
var src_default = async () => {
  var _a;
  const existedFilePaths = import_utils.fsExtra.readdirSync(process.cwd());
  if (existedFilePaths == null ? void 0 : existedFilePaths.length) {
    const { isContinue } = await (0, import_utils.prompts)(
      [
        {
          type: "confirm",
          name: "isContinue",
          message: "该目录非空，继续将删除已存在的文件，请确认是否继续？",
          initial: false,
          choices: [
            {
              title: "继续",
              value: true
            },
            {
              title: "取消",
              value: false
            }
          ]
        }
      ],
      {
        onCancel() {
          process.exit(1);
        }
      }
    );
    if (!isContinue) {
      return;
    } else {
      existedFilePaths.forEach((filePath) => {
        import_utils.fsExtra.rmSync((0, import_path.join)(process.cwd(), filePath), {
          recursive: true
        });
      });
    }
  }
  const { template } = await (0, import_utils.prompts)(
    [
      {
        type: "select",
        name: "template",
        message: "请选择应用模板",
        choices: TEMPLATES
      }
    ],
    {
      onCancel() {
        process.exit(1);
      }
    }
  );
  const templateChoice = TEMPLATES.find((tpl) => tpl.value === template);
  debug("template %o", templateChoice == null ? void 0 : templateChoice.title);
  const cnpm = new import_cnpm_api.default({ registry: REGISTRY });
  const libName = templateChoice == null ? void 0 : templateChoice.libName;
  const data = await cnpm.getPackage(`@szzj/${libName}`);
  const version = (_a = data == null ? void 0 : data["dist-tags"]) == null ? void 0 : _a.latest;
  debug("library %o", `@szzj/${libName}@${version}`);
  if (import_cache.default[`@szzj/${libName}`] !== version) {
    await (0, import_download_package_tarball.default)({
      url: `${REGISTRY}/@szzj/${libName}/download/@szzj/${libName}-${version}.tgz`,
      dir: (0, import_path.join)(__dirname, `../.cache`)
    }).catch((err) => {
      console.log(import_utils.chalk.red(`download ${templateChoice == null ? void 0 : templateChoice.title}@${version} is failed.`));
      throw err;
    });
    import_cache.default[`@szzj/${libName}`] = version;
    import_utils.fsExtra.writeFileSync(
      (0, import_path.join)(__dirname, `../.cache.json`),
      JSON.stringify(import_cache.default, null, 2)
    );
    console.log(import_utils.chalk.blue(`${(templateChoice == null ? void 0 : templateChoice.title) + "@" + version} has downloaded.`));
  }
  const templateDirPath = (0, import_path.join)(__dirname, `../.cache/@szzj/${libName}`);
  const copyPackageFiles = () => {
    const files = import_utils.glob.sync("**/*", {
      cwd: templateDirPath,
      // 包含 . 起始的文件
      dot: true
    });
    files.forEach((file) => {
      if (["package.json", ".npmignore"].includes(file))
        return;
      const source = (0, import_path.join)(templateDirPath, file);
      const target = (0, import_path.join)(process.cwd(), file);
      if (import_utils.fsExtra.statSync(source).isDirectory()) {
        import_utils.fsExtra.mkdirpSync(target);
      } else {
        import_utils.fsExtra.copyFileSync(source, target);
        console.log(`${import_utils.chalk.green(target)} has created.`);
      }
    });
  };
  const createPackageJson = () => {
    const libPackage = require((0, import_path.join)(templateDirPath, `package.json`));
    const { name, version: version2, files, maintainers, ...rest } = libPackage;
    const target = (0, import_path.join)(process.cwd(), `package.json`);
    import_utils.fsExtra.writeFileSync(
      target,
      JSON.stringify(
        {
          private: true,
          ...rest
        },
        null,
        2
      )
    );
    console.log(`${import_utils.chalk.green(target)} has created.`);
  };
  copyPackageFiles();
  createPackageJson();
  const gitignoreTplPath = (0, import_path.join)(__dirname, `../tpls/.gitignore.tpl`);
  const gitignorePath = (0, import_path.join)(process.cwd(), `.gitignore`);
  import_utils.fsExtra.copyFileSync(gitignoreTplPath, gitignorePath);
  console.log(`${import_utils.chalk.green(gitignorePath)} has created.`);
  console.log(import_utils.chalk.blue("请自行选择包管理器 cnpm, lerna 或者 pnpm 安装依赖！"));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
