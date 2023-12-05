import fs from 'fs';
import path from 'path';

export default {
  '/api/download/test.xlsx': (req, res) => {
    const filePath = '../resources/数据表测试.xlsx';
    res.setHeader(
      'Content-Type',
      `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`,
    );
    res.setHeader('Content-Disposition', `attachment;filename="test.xlsx"`);

    const stream = fs.createReadStream(path.resolve(__dirname, filePath));

    stream.pipe(res);
  },
};
