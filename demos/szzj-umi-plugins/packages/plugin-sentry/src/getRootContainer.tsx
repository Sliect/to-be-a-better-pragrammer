export default ({ dsn, env, release, captureConsole, sessionReplay }: {
  dsn: string;
  env: string;
  release: string;
  captureConsole: boolean;
  sessionReplay: boolean;
}) => {
  return `import React, { useEffect } from 'react';
import { history, matchPath } from 'umi';
import { 
  init,
  reactRouterV5Instrumentation, 
  ErrorBoundary, 
  withProfiler 
} from '@sentry/react';
import { Integrations } from '@sentry/tracing';
${captureConsole ? `import { 
  CaptureConsole as CaptureConsoleIntegration, 
} from "@sentry/integrations";` : ''}
${sessionReplay ? `import SentryRRWeb from "@sentry/rrweb";` : ''}

const SentryContainer = ({ 
  routes,
  children 
}: {
  routes: any;
  children: React.ReactNode;
}) => {
  useEffect(() => {
    init({
      dsn: '${dsn}',
      environment: '${env}',
      release: '${release}',
      tracesSampleRate: 1.0,
      integrations: [
        new Integrations.BrowserTracing({
          routingInstrumentation: reactRouterV5Instrumentation(history, routes, matchPath),
        }),
        ${captureConsole ? `new CaptureConsoleIntegration({ levels: ['error', 'warn']}),` : ''}
        ${sessionReplay ? `new SentryRRWeb(),` : ''}
      ],
    });

    ${sessionReplay ? `Sentry.setTag("rrweb.active", "yes");` : ''}
  }, []);

  return (
    <ErrorBoundary 
      fallback={({ error, componentStack, resetError }) => (
        <React.Fragment>
          <div>页面报错</div>
          <div>{error.toString()}</div>
          <div>{componentStack}</div>
          <button
            onClick={() => {
              history.push('/');
            }}
          >
            回到首页
          </button>
        </React.Fragment>
      )} 
      showDialog={${env === 'prod'}}
    >
      {children}
    </ErrorBoundary>
  )
};

const SentryContainerWithProfiler = withProfiler(SentryContainer);

export function rootContainer(container: React.ReactNode, { routes }) {

  return (
    <SentryContainerWithProfiler routes={routes}>
      {container}
    </SentryContainerWithProfiler>
  )
}`;
};
