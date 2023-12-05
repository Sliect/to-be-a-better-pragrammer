import path from 'path';

export default {
  hash: true,
  title: ' @szzj/hooks',
  // mode: 'site',
  includes: [path.resolve(__dirname, '../mds')],
  resolve: {
    alias: {
      ' @szzj/hooks': path.resolve(__dirname, '../src'),
    },
  }
};
