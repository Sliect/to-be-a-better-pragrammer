import { winPath } from '@umijs/utils';
import { join } from 'path';
import getDebugContainer from './getDebugContainer';
import getRootContainer from './getRootContainer';
import getTraceRequest from './getTraceRequest';
import getUmiExports from './getUmiExports';
import type { IApi } from 'umi';

const ACCESS_DIR = 'plugin-szsentry';

export default (api: IApi) => {
  const { NODE_ENV, DEPLOY_ENV } = process.env;
  const umiTmpDir = api.paths.absTmpPath;

  api.describe({
    key: 'szsentry',
    config: {
      default: {
        importUmiRequest: "import { umiRequest } from 'umi';",
        client: 'pc',
      },
      schema: (joi) => {
        return joi.object({
          dsn: joi.string().required(),
          debug: joi.bool(),
          importUmiRequest: joi.string(),
          captureConsole: joi.bool(),
          sessionReplay: joi.bool(),
          client: joi.string(),
        });
      },
    },
    enableBy: api.EnableBy.config,
  });

  api.onGenerateFiles(() => {
    const env = DEPLOY_ENV ? DEPLOY_ENV : NODE_ENV === 'production' ? 'prod' : 'local';
    const { name, version } = api.pkg;
    const {
      dsn,
      importUmiRequest = "import { umiRequest } from 'umi';",
      captureConsole,
      sessionReplay,
      client,
    } = api.userConfig.sentry;

    api.writeTmpFile({
      path: 'rootContainer.tsx',
      content: getRootContainer({
        dsn,
        env,
        release: `${name}@${version}`,
        captureConsole,
        sessionReplay,
      }),
    });

    api.writeTmpFile({
      path: 'debugContainer.tsx',
      content: getDebugContainer(),
    });

    api.writeTmpFile({
      path: 'traceRequest.ts',
      content: getTraceRequest({
        importUmiRequest,
      }),
    });

    api.writeTmpFile({
      path: 'index.ts',
      content: getUmiExports({
        client,
      }),
    });
  });

  api.addRuntimePlugin(() => winPath(join(umiTmpDir!, ACCESS_DIR, 'rootContainer.tsx')));

  const { debug } = api.userConfig.sentry;
  if (debug || (debug !== false && ['dev', 'pre'].includes(DEPLOY_ENV as string))) {
    api.addRuntimePlugin(() =>
      winPath(join(umiTmpDir!, ACCESS_DIR, 'debugContainer.tsx')),
    );
  }

  api.addRuntimePlugin(() => winPath(join(umiTmpDir!, ACCESS_DIR, 'traceRequest.ts')));
};
