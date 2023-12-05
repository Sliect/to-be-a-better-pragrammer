import { chalk, yParser } from '@umijs/utils';
import Creator from './creator';

function generatorArgs(args: yParser.Arguments) {
  if (args.version) return 'version';
  if (args.help) return 'help';
  if (args.update) return 'update';
  return undefined;
}

export default async ({ cwd, args }: { cwd: string; args: yParser.Arguments }) => {
  const command = generatorArgs(args);
  const creator = new Creator();
  switch (command) {
    case 'version':
      const { name, version } = require('../package.json');
      console.log(chalk.green(`${name}@${version}`));
      break;
    case 'help':
      console.log(`create-szpage             创建模板(当前目录)`);
      console.log(`create-szpage -p path     创建模板(path目录)`);
      console.log(`create-szpage -u          更新本地模板`);
      console.log(`create-szpage -v          查看版本`);
      console.log(`create-szpage -h          帮助`);
      break;
    case 'update':
      try {
        await creator.updateTemplate();
      } catch (error) {
        console.log(chalk.red(error));
      }
      break;
    default:
      const register = await creator.getTemplateRegister();
      if (register.length > 0) {
        const { store, templateDir } = await creator.chooseTemplate(register);
        try {
          await creator.createTemplate(
            store,
            templateDir,
            cwd,
            typeof args.path === 'string' ? args.path : undefined,
          );
        } catch (error) {
          console.log(chalk.red(error));
        }
      } else {
        console.log(
          chalk.yellow('本地暂无模板文件，请执行命令更新模板： create-szpage -u'),
        );
      }
  }
};
