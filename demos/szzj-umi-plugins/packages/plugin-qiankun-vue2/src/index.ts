import type { IApi } from 'umi';

export default (api: IApi) => {
  api.describe({
    key: 'qiankun',
    config: {
      schema(Joi) {
        return Joi.alternatives().try(
          Joi.object().keys({
            slave: Joi.object(),
            master: Joi.object(),
            externalQiankun: Joi.boolean(),
          }),
          Joi.boolean().invalid(true),
        );
      },
    },
  });

  api.addRuntimePluginKey(() => ['qiankun']);

  api.registerPlugins([require.resolve('./qiankun/master')]);
};
