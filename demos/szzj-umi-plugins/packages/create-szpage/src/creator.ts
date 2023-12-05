import { fsExtra, prompts, chalk } from '@umijs/utils';
import path from 'path';
import Client from 'cnpm-api';
import axios, { AxiosRequestConfig } from 'axios';
import download from 'download-package-tarball';

interface IRegister {
  title: string;
  value: string;
  templates: {
    title: string;
    value: string;
  }[];
}

export default class Creator {
  template_path = path.join(__dirname, '../.template');
  REGISTRY = `http://10.145.11.76:30090`;
  cnpmClient;

  constructor() {
    this.cnpmClient = new Client({ registry: this.REGISTRY });
  }

  /**
   * 创建模板存放文件夹
   */
  createDir() {
    if (!fsExtra.existsSync(this.template_path)) {
      fsExtra.mkdir(this.template_path);
    }
  }

  /**
   * cnpm api
   *
   * https://github.com/cnpm/cnpmjs.org/blob/master/docs/registry-api.md#package
   */
  request(path: string, options?: AxiosRequestConfig) {
    return axios(path, {
      baseURL: this.REGISTRY,
      ...options,
    });
  }

  /**
   * 创建/更新本地的模板仓库
   */
  async updateTemplate() {
    //@TODO:
    // const packageList = Object.keys(res.data).filter(item=>item.includes('@szzj/page'));
    const packageList = ['@szzj/page-pdp','@szzj/page-sjzz'];
    fsExtra.ensureDirSync(this.template_path);
    for (let packageName of packageList) {
      const data = await this.cnpmClient.getPackage(packageName);
      const version = data?.['dist-tags']?.latest;
      const packagePath = path.join(this.template_path, packageName);
      let version_local;
      if (fsExtra.existsSync(packagePath)) {
        version_local = require(path.join(packagePath, 'package.json')).version;
      }
      if (version !== version_local) {
        await download({
          url: `${this.REGISTRY}/${packageName}/download/${packageName}-${version}.tgz`,
          dir: this.template_path,
        }).catch((err: any) => {
          console.log(chalk.red(`download ${packageName}@${version} is failed.`));
          throw err;
        });
      }
    }
  }

  /**
   * 获取本地模板版本号
   * @param packageName
   */
  getLocalPackageVersion(packageName: string) {
    const packagePath = path.join(this.template_path, packageName);
    const registerPath = path.join(packagePath, 'register.json');
    if (fsExtra.existsSync(packagePath) && !fsExtra.existsSync(registerPath)) {
      throw new Error(`${packageName} 不存在register.json文件，请按模板规范添加`);
    }
  }

  /**
   * 获取模板信息
   */
  async getTemplateRegister() {
    const templateDir = path.join(this.template_path, '@szzj');
    if (fsExtra.existsSync(templateDir)) {
      const registers: IRegister[] = [];
      const dirs = fsExtra.readdirSync(templateDir);
      for (let dir of dirs) {
        const register = require(path.join(templateDir, dir, 'register.json'));
        registers.push(register);
      }
      return registers;
    }
    return [];
  }

  /**
   * 选择模板
   */
  async chooseTemplate(register: IRegister[]) {
    const { template: value_r } = await prompts(
      [
        {
          type: 'select',
          name: 'template',
          message: '请选择项目类型',
          choices: register,
        },
      ],
      {
        onCancel() {
          process.exit(1);
        },
      },
    );
    const templateList = register.find((item) => item.value === value_r);
    const { template: value_t } = await prompts(
      [
        {
          type: 'select',
          name: 'template',
          message: '请选择模板',
          choices: templateList?.templates,
        },
      ],
      {
        onCancel() {
          process.exit(1);
        },
      },
    );
    return {
      store: value_r,
      templateDir: value_t,
    };
  }

  /**
   * 复制模板
   * @param store 模板类别
   * @param templateDir 模板路径
   * @param cwd 执行命令路径
   * @param targetPath 复制到指定子目录下
   */
  async createTemplate(
    store: string,
    templateDir: string,
    cwd: string,
    targetPath?: string,
  ) {
    const templatePath = path.join(this.template_path, '@szzj', store, templateDir);
    await fsExtra.copy(templatePath, targetPath ? path.join(cwd, targetPath) : cwd);
  }
}
