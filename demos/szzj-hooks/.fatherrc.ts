import { IBundleOptions } from 'father';

const options: IBundleOptions = {
  entry: 'src/index.tsx',
  esm: {
    type: 'babel',
    importLibToEs: true,
  },
  cjs: 'babel',
  file: 'index',
  runtimeHelpers: true,
};

export default options;
