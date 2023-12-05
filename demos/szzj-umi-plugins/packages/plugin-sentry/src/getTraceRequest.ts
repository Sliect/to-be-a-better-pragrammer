export default ({ importUmiRequest }: { importUmiRequest: string }) => {
  return `${importUmiRequest}
import { captureException } from 'umi';
import { startTransaction } from '@sentry/react';

umiRequest.use(async (ctx, next) => {
  const { req } = ctx;
  const { originUrl, url, options } = req;
  const { method } = options;

  const transaction = startTransaction({ name: "test-transaction" });
  const span = transaction.startChild({
    op: method,
    description: originUrl,
  });

  try {
    await next();

    const { res } = ctx;
    const { status } = res;
    switch (status) {
      case 200:
        try {
          data = await response.clone().json();
          if (!data.success){
            captureException(data);
          }
        } catch (err) {
          console.log(err);
        }
        break;
      default:
        span.setTag("http.status_code", status);
        span.finish();
        transaction.finish();
    };
  } catch(err){
    captureException(err);
  }
});`;
};
