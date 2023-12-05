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

// src/creator.ts
var creator_exports = {};
__export(creator_exports, {
  default: () => Creator
});
module.exports = __toCommonJS(creator_exports);
var import_utils = require("@umijs/utils");
var import_path = __toESM(require("path"));
var import_cnpm_api = __toESM(require("cnpm-api"));
var import_axios = __toESM(require("axios"));
var import_download_package_tarball = __toESM(require("download-package-tarball"));
var Creator = class {
  constructor() {
    this.template_path = import_path.default.join(__dirname, "../.template");
    this.REGISTRY = `http://10.145.11.76:30090`;
    this.cnpmClient = new import_cnpm_api.default({ registry: this.REGISTRY });
  }
  /**
   * 创建模板存放文件夹
   */
  createDir() {
    if (!import_utils.fsExtra.existsSync(this.template_path)) {
      import_utils.fsExtra.mkdir(this.template_path);
    }
  }
  /**
   * cnpm api
   *
   * https://github.com/cnpm/cnpmjs.org/blob/master/docs/registry-api.md#package
   */
  request(path2, options) {
    return (0, import_axios.default)(path2, {
      baseURL: this.REGISTRY,
      ...options
    });
  }
  /**
   * 创建/更新本地的模板仓库
   */
  async updateTemplate() {
    var _a;
    const packageList = ["@szzj/page-pdp", "@szzj/page-sjzz"];
    import_utils.fsExtra.ensureDirSync(this.template_path);
    for (let packageName of packageList) {
      const data = await this.cnpmClient.getPackage(packageName);
      const version = (_a = data == null ? void 0 : data["dist-tags"]) == null ? void 0 : _a.latest;
      const packagePath = import_path.default.join(this.template_path, packageName);
      let version_local;
      if (import_utils.fsExtra.existsSync(packagePath)) {
        version_local = require(import_path.default.join(packagePath, "package.json")).version;
      }
      if (version !== version_local) {
        await (0, import_download_package_tarball.default)({
          url: `${this.REGISTRY}/${packageName}/download/${packageName}-${version}.tgz`,
          dir: this.template_path
        }).catch((err) => {
          console.log(import_utils.chalk.red(`download ${packageName}@${version} is failed.`));
          throw err;
        });
      }
    }
  }
  /**
   * 获取本地模板版本号
   * @param packageName
   */
  getLocalPackageVersion(packageName) {
    const packagePath = import_path.default.join(this.template_path, packageName);
    const registerPath = import_path.default.join(packagePath, "register.json");
    if (import_utils.fsExtra.existsSync(packagePath) && !import_utils.fsExtra.existsSync(registerPath)) {
      throw new Error(`${packageName} 不存在register.json文件，请按模板规范添加`);
    }
  }
  /**
   * 获取模板信息
   */
  async getTemplateRegister() {
    const templateDir = import_path.default.join(this.template_path, "@szzj");
    if (import_utils.fsExtra.existsSync(templateDir)) {
      const registers = [];
      const dirs = import_utils.fsExtra.readdirSync(templateDir);
      for (let dir of dirs) {
        const register = require(import_path.default.join(templateDir, dir, "register.json"));
        registers.push(register);
      }
      return registers;
    }
    return [];
  }
  /**
   * 选择模板
   */
  async chooseTemplate(register) {
    const { template: value_r } = await (0, import_utils.prompts)(
      [
        {
          type: "select",
          name: "template",
          message: "请选择项目类型",
          choices: register
        }
      ],
      {
        onCancel() {
          process.exit(1);
        }
      }
    );
    const templateList = register.find((item) => item.value === value_r);
    const { template: value_t } = await (0, import_utils.prompts)(
      [
        {
          type: "select",
          name: "template",
          message: "请选择模板",
          choices: templateList == null ? void 0 : templateList.templates
        }
      ],
      {
        onCancel() {
          process.exit(1);
        }
      }
    );
    return {
      store: value_r,
      templateDir: value_t
    };
  }
  /**
   * 复制模板
   * @param store 模板类别
   * @param templateDir 模板路径
   * @param cwd 执行命令路径
   * @param targetPath 复制到指定子目录下
   */
  async createTemplate(store, templateDir, cwd, targetPath) {
    const templatePath = import_path.default.join(this.template_path, "@szzj", store, templateDir);
    await import_utils.fsExtra.copy(templatePath, targetPath ? import_path.default.join(cwd, targetPath) : cwd);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
