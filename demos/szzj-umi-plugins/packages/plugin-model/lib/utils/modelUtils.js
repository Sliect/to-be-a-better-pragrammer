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

// src/utils/modelUtils.ts
var modelUtils_exports = {};
__export(modelUtils_exports, {
  Model: () => Model,
  ModelUtils: () => ModelUtils,
  getNamespace: () => getNamespace
});
module.exports = __toCommonJS(modelUtils_exports);
var import_path = require("path");
var parser = __toESM(require("@umijs/bundler-utils/compiled/babel/parser"));
var import_traverse = __toESM(require("@umijs/bundler-utils/compiled/babel/traverse"));
var t = __toESM(require("@umijs/bundler-utils/compiled/babel/types"));
var import_esbuild = require("@umijs/bundler-utils/compiled/esbuild");
var import_utils = require("@umijs/utils");
var import_astUtils = require("./astUtils");
function getNamespace(absFilePath, absSrcPath) {
  const relPath = (0, import_utils.winPath)((0, import_path.relative)((0, import_utils.winPath)(absSrcPath), (0, import_utils.winPath)(absFilePath)));
  const parts = relPath.split("/");
  const dirs = parts.slice(0, -1);
  const file = parts[parts.length - 1];
  const validDirs = dirs.filter((dir) => !["src", "pages", "models"].includes(dir));
  let normalizedFile = file;
  normalizedFile = (0, import_path.basename)(file, (0, import_path.extname)(file));
  if (normalizedFile.endsWith(".model")) {
    normalizedFile = normalizedFile.split(".").slice(0, -1).join(".");
  }
  return [...validDirs, normalizedFile].join(".");
}
var Model = class {
  constructor(file, absSrcPath, sort, id) {
    let namespace;
    let exportName;
    const [_file, meta] = file.split("#");
    if (meta) {
      const metaObj = JSON.parse(meta);
      namespace = metaObj.namespace;
      exportName = metaObj.exportName;
    }
    this.file = _file;
    this.id = `model_${id}`;
    this.namespace = namespace || getNamespace(_file, absSrcPath);
    this.exportName = exportName || "default";
    this.deps = sort ? this.findDeps(sort) : [];
  }
  findDeps(sort) {
    const content = import_utils.fsExtra.readFileSync(this.file, "utf-8");
    const loader = (0, import_path.extname)(this.file).slice(1);
    const result = (0, import_esbuild.transformSync)(content, {
      loader,
      sourcemap: false,
      minify: false
    });
    const deps = /* @__PURE__ */ new Set();
    const ast = parser.parse(result.code, {
      sourceType: "module",
      sourceFilename: this.file,
      plugins: []
    });
    sort;
    (0, import_traverse.default)(ast, {
      CallExpression: (path) => {
        if (t.isIdentifier(path.node.callee, { name: "useModel" }) && t.isStringLiteral(path.node.arguments[0])) {
          deps.add(path.node.arguments[0].value);
        }
      }
    });
    return [...deps];
  }
};
var ModelUtils = class {
  constructor(api, opts) {
    this.opts = {};
    this.count = 1;
    this.api = api;
    this.opts = opts;
  }
  getAllModels(opts) {
    this.count = 1;
    const models = [
      ...this.getModels({
        base: (0, import_path.join)(this.api.paths.absSrcPath, "models"),
        pattern: "**/*.{ts,tsx,js,jsx}"
      }),
      ...this.getModels({
        base: (0, import_path.join)(this.api.paths.absPagesPath),
        pattern: "**/models/**/*.{ts,tsx,js,jsx}"
      }),
      ...this.getModels({
        base: (0, import_path.join)(this.api.paths.absPagesPath),
        pattern: "**/model.{ts,tsx,js,jsx}"
      }),
      ...opts.extraModels
    ].filter((file) => {
      var _a;
      if ((_a = opts == null ? void 0 : opts.excludeModels) == null ? void 0 : _a.length) {
        const exclude = opts == null ? void 0 : opts.excludeModels.map((path) => {
          return (0, import_utils.winPath)((0, import_path.join)(this.api.paths.absSrcPath), path);
        });
        return (exclude == null ? void 0 : exclude.includes(file)) ? false : true;
      }
      return true;
    }).map((file) => {
      return new Model(file, this.api.paths.absSrcPath, opts.sort, this.count++);
    });
    const namespaces = models.map((model) => model.namespace);
    if (new Set(namespaces).size !== namespaces.length) {
      throw new Error(`Duplicate namespace in models: ${namespaces.sort().join(", ")}`);
    }
    if (opts.sort) {
      const namespaces2 = this.getSortedNamespaces(models);
      models.sort(
        (a, b) => namespaces2.indexOf(a.namespace) - namespaces2.indexOf(b.namespace)
      );
    }
    return models;
  }
  getSortedNamespaces(models) {
    let final = [];
    models.forEach((model, index) => {
      const { deps, namespace } = model;
      if (deps && deps.length) {
        const itemGroup = [...deps, namespace];
        const cannotUse = [namespace];
        for (let i = 0; i <= index; i += 1) {
          if (models[i].deps.filter((v) => cannotUse.includes(v)).length) {
            if (!cannotUse.includes(models[i].namespace)) {
              cannotUse.push(models[i].namespace);
              i = -1;
            }
          }
        }
        const errorList = deps.filter((v) => cannotUse.includes(v));
        if (errorList.length) {
          throw Error(
            `Circular dependencies: ${namespace} can't use ${errorList.join(", ")}`
          );
        }
        const intersection = final.filter((v) => itemGroup.includes(v));
        if (intersection.length) {
          const finalIndex = final.indexOf(intersection[0]);
          final = final.slice(0, finalIndex).concat(itemGroup).concat(final.slice(finalIndex + 1));
        } else {
          final.push(...itemGroup);
        }
      }
      if (!final.includes(namespace)) {
        final.push(namespace);
      }
    });
    return [...new Set(final)];
  }
  getModels(opts) {
    return import_utils.glob.sync(opts.pattern || "**/*.{ts,js}", {
      cwd: opts.base,
      absolute: true
    }).map(import_utils.winPath).filter((file) => {
      if (/\.d.ts$/.test(file))
        return false;
      if (/\.(test|e2e|spec).([jt])sx?$/.test(file))
        return false;
      const content = import_utils.fsExtra.readFileSync(file, "utf-8");
      return this.isModelValid({ content, file });
    });
  }
  isModelValid(opts) {
    const { file, content } = opts;
    if (this.opts.contentTest && this.opts.contentTest(content)) {
      return true;
    }
    const loader = (0, import_path.extname)(file).slice(1);
    const result = (0, import_esbuild.transformSync)(content, {
      loader,
      sourcemap: false,
      minify: false
    });
    let ret = false;
    const ast = parser.parse(result.code, {
      sourceType: "module",
      sourceFilename: file,
      plugins: []
    });
    (0, import_traverse.default)(ast, {
      ExportDefaultDeclaration: (path) => {
        let node = path.node.declaration;
        node = (0, import_astUtils.getIdentifierDeclaration)(node, path);
        if (this.opts.astTest && this.opts.astTest({ node, content })) {
          ret = true;
        }
      }
    });
    return ret;
  }
  static getModelsContent(models) {
    const imports = [];
    const modelProps = [];
    models.forEach((model) => {
      const fileWithoutExt = (0, import_utils.winPath)(
        (0, import_path.format)({
          dir: (0, import_path.dirname)(model.file),
          base: (0, import_path.basename)(model.file, (0, import_path.extname)(model.file))
        })
      );
      if (model.exportName !== "default") {
        imports.push(
          `import { ${model.exportName} as ${model.id} } from '${fileWithoutExt}';`
        );
      } else {
        imports.push(`import ${model.id} from '${fileWithoutExt}';`);
      }
      modelProps.push(
        `${model.id}: { namespace: '${model.namespace}', model: ${model.id} },`
      );
    });
    return `
${imports.join("\n")}

export const models = {
${modelProps.join("\n")}
} as const`;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Model,
  ModelUtils,
  getNamespace
});
