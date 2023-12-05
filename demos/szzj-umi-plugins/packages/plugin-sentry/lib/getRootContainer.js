var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/getRootContainer.tsx
var getRootContainer_exports = {};
__export(getRootContainer_exports, {
  default: () => getRootContainer_default
});
module.exports = __toCommonJS(getRootContainer_exports);
var getRootContainer_default = ({ dsn, env, release, captureConsole, sessionReplay }) => {
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
} from "@sentry/integrations";` : ""}
${sessionReplay ? `import SentryRRWeb from "@sentry/rrweb";` : ""}

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
        ${captureConsole ? `new CaptureConsoleIntegration({ levels: ['error', 'warn']}),` : ""}
        ${sessionReplay ? `new SentryRRWeb(),` : ""}
      ],
    });

    ${sessionReplay ? `Sentry.setTag("rrweb.active", "yes");` : ""}
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
      showDialog={${env === "prod"}}
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
