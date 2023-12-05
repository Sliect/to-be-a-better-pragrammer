import type { IApi } from 'umi';
import { withTmpPath } from './utils/withTmpPath';

export default (api: IApi) => {
  api.describe({
    key: 'szkeepalive',
    config: {
      default: {
        keepAliveLayout: true,
      },
      schema(Joi) {
        return Joi.alternatives().try(
          Joi.object({
            /** 兼容既往 */
            keepAliveWrapper: Joi.string(),
            keepAliveLayout: Joi.boolean(),
          }),
          Joi.boolean().invalid(true),
        );
      },
    },
    enableBy: (opts: { userConfig: any }) => {
      return opts.userConfig.szkeepalive?.enable !== false;
    },
  });

  api.onGenerateFiles(async () => {
    api.writeTmpFile({
      path: 'KeepAliveWrapper.tsx',
      content: `import React, { useEffect, useState } from 'react';
import { Offscreen, useLocation, useOutlet, useRouteProps } from 'umi';

export default function KeepAliveWrapper() {
  const [outlets, setOutlets] = useState<
    Array<{
      outlet: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
      pathname: string;
    }>
  >([]);
  const { pathname } = useLocation();
  const outlet = useOutlet();
  const routeProps = useRouteProps();

  useEffect(() => {
    if (routeProps.keepAlive && outlet) {
      const found = outlets.find((o) => o.pathname === routeProps.pathname);

      if (!found) {
        setOutlets((outlets) => [
          ...outlets.filter((o) => o.path !== (routeProps.originPath ?? routeProps.path)),
          {
            pathname,
            outlet,
            // 路由规则，key 值会变
            path: routeProps.originPath ?? routeProps.path,
          },
        ]);
      }
    }
  }, [pathname]);

  return (
    <>
      {outlets.map((o) => {
        return (
          <Offscreen key={o.pathname} visible={pathname === o.pathname}>
            {o.outlet}
          </Offscreen>
        );
      })}

      {!routeProps.keepAlive && outlet}
    </>
  );
}
`,
    });

    api.writeTmpFile({
      path: 'runtime.tsx',
      content: `import React from 'react';
import { StillnessProvider } from 'react-stillness-component';

export function innerProvider(container, props) {
  return <StillnessProvider>{container}</StillnessProvider >;
}
`,
    });

    api.writeTmpFile({
      path: 'index.ts',
      content: `import { Offscreen, useStillnessManager, useStillness } from 'react-stillness-component';
import KeepAliveWrapper from './KeepAliveWrapper';

export { Offscreen, useStillnessManager, useStillness, KeepAliveWrapper }`,
    });
  });

  api.addRuntimePlugin({
    fn: () => '@@/plugin-szkeepalive/runtime',
    stage: -1 * Number.MAX_SAFE_INTEGER,
  });

  const { keepAliveLayout } = api.config.szkeepalive ?? {};
  if (keepAliveLayout) {
    api.addLayouts(() => {
      return [
        {
          id: 'keepalive-layout',
          file: withTmpPath({
            api,
            path: 'KeepAliveWrapper.tsx',
          }),
        },
      ];
    });
  }
};
