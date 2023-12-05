import { chalk, yParser } from '@umijs/utils';

const args = yParser(process.argv.slice(2), {
  alias: {
    version: ['v','version'],
    help: ['h','help'],
    update: ['u','update'],
    path: ['p','path'],
  },
});

require('./')
  .default({
    cwd: process.cwd(),
    args,
  })
  .catch((err: Error) => {
    console.log(chalk.red(err));
  });
