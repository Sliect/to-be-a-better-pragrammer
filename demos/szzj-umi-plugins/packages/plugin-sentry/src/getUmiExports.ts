export default ({ client = "pc" }: { client?: string }) => {
  return `import * as Sentry from '@sentry/react';

export const captureException = (err: any) => {
  Sentry.withScope(scope => {
    scope.setTags({
      client: '${client}',
    });

    if (err instanceof Error){
      Sentry.captureException(err);
    } else if (typeof err === 'object'){
      Sentry.captureEvent(err);
    } else {
      Sentry.captureMessage(err);
    };
  });
}`;
};
