import { join } from 'path';
import { fsExtra, glob, prompts, chalk, debug as createDebug } from '@umijs/utils';
import Client from 'cnpm-api';
import download from 'download-package-tarball';
import cacheJson from '../.cache.json';

const debug = createDebug('create-szapp');

const REGISTRY = `http://10.145.11.76:30090`;
const TEMPLATES = [
  {
    title: 'pc 前端应用',
    value: 'pc',
    libName: 'template-pc',
  },
  {
    title: 'h5 前端应用',
    value: 'h5',
    libName: 'template-h5',
  },
  {
    title: 'pc 前端微应用',
    value: 'pc-microapp',
    libName: 'template-subapp',
  },
  {
    title: 'DRS 主应用',
    value: 'drs-master',
    libName: 'drs-template-master',
  },
  {
    title: 'DRS 微应用',
    value: 'drs-slave',
    libName: 'drs-template-slave',
  },
  {
    title: 'react 组件库模板',
    value: 'libReact',
    libName: 'template-lib-react',
  },
];

export default async () => {
  const existedFilePaths = fsExtra.readdirSync(process.cwd());
  if (existedFilePaths?.length) {
    const { isContinue } = await prompts(
      [
        {
          type: 'confirm',
          name: 'isContinue',
          message: '该目录非空，继续将删除已存在的文件，请确认是否继续？',
          initial: false,
          choices: [
            {
              title: '继续',
              value: true,
            },
            {
              title: '取消',
              value: false,
            },
          ],
        },
      ],
      {
        onCancel() {
          process.exit(1);
        },
      },
    );

    if (!isContinue) {
      return;
    } else {
      existedFilePaths.forEach((filePath) => {
        fsExtra.rmSync(join(process.cwd(), filePath), {
          recursive: true,
        });
      });
    }
  }

  const { template } = await prompts(
    [
      {
        type: 'select',
        name: 'template',
        message: '请选择应用模板',
        choices: TEMPLATES,
      },
    ],
    {
      onCancel() {
        process.exit(1);
      },
    },
  );

  const templateChoice = TEMPLATES.find((tpl) => tpl.value === template);
  debug('template %o', templateChoice?.title);

  // 获知最新版本号
  const cnpm = new Client({ registry: REGISTRY });
  const libName = templateChoice?.libName;
  const data = await cnpm.getPackage(`@szzj/${libName}`);
  const version = data?.['dist-tags']?.latest;
  debug('library %o', `@szzj/${libName}@${version}`);

  // 本地有最新版缓存，直接取缓存
  if (cacheJson[`@szzj/${libName}`] !== version) {
    // 下载并缓存模板
    await download({
      url: `${REGISTRY}/@szzj/${libName}/download/@szzj/${libName}-${version}.tgz`,
      dir: join(__dirname, `../.cache`),
    }).catch((err: any) => {
      console.log(chalk.red(`download ${templateChoice?.title}@${version} is failed.`));
      throw err;
    });

    cacheJson[`@szzj/${libName}`] = version;

    fsExtra.writeFileSync(
      join(__dirname, `../.cache.json`),
      JSON.stringify(cacheJson, null, 2),
    );

    console.log(chalk.blue(`${templateChoice?.title + '@' + version} has downloaded.`));
  }

  const templateDirPath = join(__dirname, `../.cache/@szzj/${libName}`);

  /**
   * 拷贝模板工程
   */
  const copyPackageFiles = () => {
    const files = glob.sync('**/*', {
      cwd: templateDirPath,
      // 包含 . 起始的文件
      dot: true,
    });

    files.forEach((file) => {
      if (['package.json', '.npmignore'].includes(file)) return;

      const source = join(templateDirPath, file);
      const target = join(process.cwd(), file);
      if (fsExtra.statSync(source).isDirectory()) {
        fsExtra.mkdirpSync(target);
      } else {
        fsExtra.copyFileSync(source, target);
        console.log(`${chalk.green(target)} has created.`);
      }
    });
  };

  /**
   * 创建 package.json
   */
  const createPackageJson = () => {
    const libPackage = require(join(templateDirPath, `package.json`));
    const { name, version, files, maintainers, ...rest } = libPackage;

    const target = join(process.cwd(), `package.json`);
    fsExtra.writeFileSync(
      target,
      JSON.stringify(
        {
          private: true,
          ...rest,
        },
        null,
        2,
      ),
    );

    console.log(`${chalk.green(target)} has created.`);
  };

  // 1. 拷贝模板工程
  copyPackageFiles();

  // 2. 创建 package.json
  createPackageJson();

  // 3. 生成 .gitignore 文件
  const gitignoreTplPath = join(__dirname, `../tpls/.gitignore.tpl`);
  const gitignorePath = join(process.cwd(), `.gitignore`);
  fsExtra.copyFileSync(gitignoreTplPath, gitignorePath);
  console.log(`${chalk.green(gitignorePath)} has created.`);

  console.log(chalk.blue('请自行选择包管理器 cnpm, lerna 或者 pnpm 安装依赖！'));
};
