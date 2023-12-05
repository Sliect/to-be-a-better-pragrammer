import { chalk, isLocalDev } from '@umijs/utils';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// const args = yParser(process.argv.slice(2), {
//   alias: {
//     version: ['v'],
//     help: ['h'],
//   },
//   boolean: ['version'],
// });

// if (args.version && !args._[0]) {
//   args._[0] = 'version';
//   const local = isLocalDev() ? chalk.cyan('@local') : '';
//   const { name, version } = require('../package.json');
//   console.log(`${name}@${version}${local}`);
// } else {
//   require('./irs/build');
// }
process.on('SIGINT', () => {
  process.kill(process.pid);
});

const argv = yargs(hideBin(process.argv))
  .strict()
  .command({
    command: 'version',
    aliases: ['v'],
    describe: '获取版本号',
    handler: () => {
      const local = isLocalDev() ? chalk.cyan('@local') : '';
      const { name, version } = require('../package.json');
      console.log(`${name}@${version}${local}`);
    },
  })
  .command({
    command: 'irs-build',
    aliases: ['b'],
    describe: 'irs打包',
    handler: () => {
      require('./irs/build');
    },
  })
  .command({
    command: 'sass2less',
    describe: '将 .scss, .sass 文件转换为 .less 文件',
    builder: (yargs) => {
      return yargs.option({}).usage('$0 sass2less');
    },
    handler: (argv) => {
      require('./transform/sass2less');
      // const traverseFolder = (folderPath) => {
      //   const files = fsExtra.readdirSync(folderPath);
      //   files.forEach(function (fileName) {
      //     const filePath = path.join(folderPath, fileName);
      //     const stats = fsExtra.statSync(filePath);
      //     if (stats.isDirectory()) {
      //       traverseFolder(filePath);
      //     } else {
      //       const { dir, name, ext } = path.parse(filePath);
      //       if (ext === '.scss') {
      //         console.log(`正在处理的文件是${name}${ext}`);
      //         shell.exec(`sass2less ${filePath} ${dir}/${name}.less`);
      //         shell.rm('-rf', filePath);
      //       }
      //     }
      //   });
      // };

      // //此处处理
      // if (argv.s) {
      //   console.log('__dirname', __dirname);
      //   traverseFolder(`${path.resolve(__dirname)}`);
      // }
    },
  })
  .fail(function (msg, err, yargs) {
    console.error(yargs.help());
    console.error('\n\n\n=====命令执行错误，信息如下=====\n\n', msg);
    process.exit(1);
  })
  .help('help', '查看命令行帮助').argv;

export default argv;
