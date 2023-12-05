import React, { useState } from 'react';
import { Radio } from 'antd';
import { SchemaForm } from '@szzj/antd-form';

export default () => {
  const [detail, setDetail] = useState(false);
  const [layout, setLayout] = useState<'horizontal' | 'vertical' | 'inline'>('horizontal');

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        模式：
        <Radio.Group
          defaultValue="edit"
          onChange={(event) => setDetail(event.target.value === 'detail')}
        >
          <Radio.Button value="edit">编辑</Radio.Button>
          <Radio.Button value="detail">详情</Radio.Button>
        </Radio.Group>
      </div>

      <div>
        布局：
        <Radio.Group value={layout} onChange={(event) => setLayout(event.target.value)}>
          <Radio.Button value="horizontal">horizontal</Radio.Button>
          <Radio.Button value="vertical">vertical</Radio.Button>
          <Radio.Button value="inline">inline</Radio.Button>
        </Radio.Group>
      </div>

      <SchemaForm
        fields={[
          {
            fieldType: 'list',
            name: 'users',
            label: '联系人',
            description: '我是一个描述',
            fields: [
              {
                fieldType: 'input',
                name: 'name',
                label: '姓名',
              },
              {
                fieldType: 'select',
                name: 'select',
                label: '下拉框',
                options: [
                  {
                    label: '下拉选项1',
                    value: '1',
                  },
                  {
                    label: '下拉选项2',
                    value: '2',
                  },
                ],
              },
            ],
            initialValue: [{}],
            min: 1,
            max: 3,
          },
        ]}
        initialValues={{
          users: [
            { name: 'test1', select: '1' },
            { name: 'test2', select: '2' },
            { name: 'test3' },
          ],
        }}
        detail={detail}
        layout={layout}
        onSubmit={(vals) => console.log(vals)}
      />
    </>
  );
};
