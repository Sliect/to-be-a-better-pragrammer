import type { IApi } from 'umi';
import path from 'path';

export default (api: IApi) => {
  api.addLayouts((args) => {
    console.log('args', args);
    return [
      {
        id: 'custom',
        file: path.resolve(__dirname, '../src/wrappers/LayoutWrapper.tsx'),
      },
    ];
  });
};
