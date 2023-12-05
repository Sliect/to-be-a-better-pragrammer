import Sass2less from 'less-plugin-sass2less/lib';
import { glob, fsExtra } from '@umijs/utils';
import chalk from 'chalk';
import path from 'path';

const converter = new Sass2less();

// .sass, .scss 文件匹配正则
const PATTERN = '**/*.{scss,sass}';

/**
 * 将 .sass, .scss 文件转换成 .less 文件
 * @returns
 */
const convertSass2less = () => {
  const cwd = process.cwd();

  const files = glob.sync(PATTERN, { cwd });

  if (!files.length) {
    console.log(chalk.red('未找到 .scss 及 .sass 文件，程序终端！'));
    return;
  }

  files.forEach((file) => {
    const stats = fsExtra.statSync(file);

    if (stats.isFile()) {
      const content = fsExtra.readFileSync(file, 'utf8');
      const result = converter.process(content, {
        fileInfo: { filename: 'anything.scss' },
      });

      const resultFileName = file.replace(/\.s[c|a]ss/, '.less');
      fsExtra.renameSync(file, resultFileName);
      fsExtra.writeFileSync(file, result);

      console.log(chalk.green(`${file}文件已转换成${resultFileName}`));

      fsExtra.removeSync(file);
      console.log(chalk.green(`${file}文件已移除`));
    }
  });
};

/**
 * 暂时使用正则替换导入语句
 * gogocode 疑似只能查到第一个匹配节点，且不能对字符串作分割
 * @returns
 */
const SASS_FILE_IN_LESS_PATTERN = /@import \s*['"][^'"]*\.s[c|a]ss['"]/g;
const convertSassImportInLess = () => {
  const cwd = process.cwd();
  const files = glob.sync('**/*.less', { cwd });

  files.forEach((file) => {
    const stats = fsExtra.statSync(file);

    if (stats.isFile()) {
      const content = fsExtra.readFileSync(file, 'utf8');
      if (content.match(SASS_FILE_IN_LESS_PATTERN)) {
        const result = content.replace(SASS_FILE_IN_LESS_PATTERN, ($0) => {
          return `${$0.slice(0, $0.length - 5)}less${$0[$0.length - 1]}`;
        });

        fsExtra.writeFileSync(file, result);
        console.log(chalk.green(`${file}文件已将 .sass, .scss 文件导入语句替换成 .less`));
      }
    }
  });
};

const SASS_FILE_PATTERN = /import\s*[^\s]*\s*from[\s]*['"][^'"]*\.s[c|a]ss['"]/g;

/**
 * 暂时使用正则替换导入语句
 * gogocode 疑似只能查到第一个匹配节点，且不能对字符串作分割
 * @returns
 */
const convertSassImport = () => {
  const cwd = process.cwd();
  const files = glob.sync('**/*.{ts,tsx,js,jsx}', { cwd });

  files.forEach((file) => {
    const stats = fsExtra.statSync(file);

    if (stats.isFile()) {
      const content = fsExtra.readFileSync(file, 'utf8');
      if (content.match(SASS_FILE_PATTERN)) {
        const result = content.replace(SASS_FILE_PATTERN, ($0) => {
          return `${$0.slice(0, $0.length - 5)}less${$0[$0.length - 1]}`;
        });

        fsExtra.writeFileSync(file, result);
        console.log(chalk.green(`${file}文件已将 .sass, .scss 文件导入语句替换成 .less`));
      }
    }
  });
};

/**
 * 移除 package.json 中的 @umijs/plugin-sass, node-sass, sass-loader
 * @returns
 */
const convertPackageJson = () => {
  const cwd = process.cwd();
  const packagePath = path.resolve(cwd, 'package.json');
  const stats = fsExtra.statSync(packagePath);

  if (stats.isFile()) {
    const content = fsExtra.readFileSync(packagePath, 'utf8');
    const packageJson = JSON.parse(content);

    if (packageJson.dependencies['@umijs/plugin-sass']) {
      delete packageJson.dependencies['@umijs/plugin-sass'];
    }
    if (packageJson.dependencies['node-sass']) {
      delete packageJson.dependencies['node-sass'];
    }
    if (packageJson.dependencies['sass-loader']) {
      delete packageJson.dependencies['sass-loader'];
    }

    if (packageJson.devDependencies['@umijs/plugin-sass']) {
      delete packageJson.devDependencies['@umijs/plugin-sass'];
    }
    if (packageJson.devDependencies['node-sass']) {
      delete packageJson.devDependencies['node-sass'];
    }
    if (packageJson.devDependencies['sass-loader']) {
      delete packageJson.devDependencies['sass-loader'];
    }

    const result = JSON.stringify(packageJson, undefined, 2);
    fsExtra.writeFileSync(packagePath, result);
    console.log(
      chalk.green(`${packagePath}文件已移除 @umijs/plugin-sass, node-sass, sass-loader`),
    );
  }
};

convertSass2less();
convertSassImportInLess();
convertSassImport();
convertPackageJson();

console.log(chalk.yellow(`请手动移除 .umirc 文件的 sass 配置`));
