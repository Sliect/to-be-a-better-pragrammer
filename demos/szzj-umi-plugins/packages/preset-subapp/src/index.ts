import { IApi } from 'umi';

export default (api: IApi) => {
  process.env.INITIAL_QIANKUN_SLAVE_OPTIONS = '{}';

  return {
    plugins: [
      require.resolve('@szzj/umi-plugin-region'),
      require.resolve('@szzj/umi-plugin-moment2dayjs'),
      require.resolve('@szzj/umi-plugin-antd'),
      require.resolve('@szzj/umi-plugin-app'),
      require.resolve('@szzj/umi-plugin-request'),
      require.resolve('@szzj/umi-plugin-initialstate'),
      require.resolve('@szzj/umi-plugin-layout'),
      require.resolve('@szzj/umi-plugin-model'),
      require.resolve('@szzj/umi-plugin-qiankun'),
      require.resolve('./plugin'),
    ],
  };
};
