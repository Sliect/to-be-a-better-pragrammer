import path from 'path';

export default {
  hash: true,
  title: 'szzj-antd-form',
  // mode: 'site',
  includes: [path.resolve(__dirname, '../mds')],
  resolve: {
    alias: {
      'szzj-antd-form': path.resolve(__dirname, '../src'),
    },
  }
};
