import { fsExtra, glob } from '@umijs/utils';
import { join } from 'path';
import type { IApi } from 'umi';

const DIR_NAME = 'plugin-szhooks';

export default (api: IApi) => {
  api.describe({
    key: 'szhooks',
    config: {
      schema(Joi) {
        return Joi.alternatives().try(Joi.object({}), Joi.boolean().invalid(true));
      },
    },
    enableBy: () => api.userConfig.szhooks !== false,
  });

  let generatedOnce = false;
  api.onGenerateFiles(() => {
    if (generatedOnce) return;
    generatedOnce = true;
    const hooksDirPath = join(__dirname, '../src/hooks');
    const files = glob.sync('**/*', {
      cwd: hooksDirPath,
    });

    const base = join(api.paths.absTmpPath!, DIR_NAME);
    fsExtra.mkdirpSync(base);

    files.forEach((file) => {
      const source = join(hooksDirPath, file);
      const target = join(base, file);
      if (fsExtra.statSync(source).isDirectory()) {
        fsExtra.mkdirpSync(target);
      } else {
        fsExtra.copyFileSync(source, target);
      }
    });
  });
};
