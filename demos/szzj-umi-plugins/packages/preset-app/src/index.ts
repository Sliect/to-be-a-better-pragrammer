import { IApi } from 'umi';

export default (api: IApi) => {
  api.modifyDefaultConfig((memo) => {
    return {
      ...memo,
      model: {},
      initialState: {},
    };
  });

  return {
    plugins: [
      require.resolve('@szzj/umi-plugin-region'),
      require.resolve('@szzj/umi-plugin-antd'),
      require.resolve('@szzj/umi-plugin-moment2dayjs'),
      require.resolve('@szzj/umi-plugin-app'),
      require.resolve('@szzj/umi-plugin-request'),
      require.resolve('@szzj/umi-plugin-hooks'),
      // initial-state 插件若不加在，plugin-layout 将会包 umi.withRouter 错误
      require.resolve('@szzj/umi-plugin-initialstate'),
      require.resolve('@szzj/umi-plugin-layout'),
      require.resolve('@szzj/umi-plugin-model'),
    ],
  };
};
