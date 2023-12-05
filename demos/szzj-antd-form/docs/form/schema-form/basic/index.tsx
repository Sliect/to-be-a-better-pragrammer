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
            fieldType: 'input',
            name: 'name',
            label: '姓名',
          },
          {
            fieldType: 'textarea',
            name: 'desc',
            label: '描述',
          },
          {
            fieldType: 'input-number',
            name: 'age',
            label: '年龄',
          },
          {
            fieldType: 'radio',
            name: 'sex',
            label: '性别',
            options: [
              {
                label: '男',
                value: 'male',
              },
              {
                label: '女',
                value: 'female',
              },
            ],
          },
          {
            fieldType: 'checkbox',
            name: 'fruit',
            label: '喜欢的水果',
            options: [
              {
                label: '苹果',
                value: 'apple',
              },
              {
                label: '橘子',
                value: 'orange',
              },
            ],
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
          {
            fieldType: 'cascader',
            name: 'cascader',
            label: '级联选择器',
            options: [
              {
                label: '级联选项1',
                value: '级联选项1',
                children: [
                  {
                    label: '级联选项1-1',
                    value: '级联选项1-1',
                  },
                  {
                    label: '级联选项1-2',
                    value: '级联选项1-2',
                  },
                ],
              },
              {
                label: '级联选项2',
                value: '级联选项2',
              },
            ],
          },
          {
            fieldType: 'date-picker',
            name: 'date',
            label: '时间',
          },
          {
            fieldType: 'range-picker',
            name: 'range',
            label: '时间范围',
          },
          {
            fieldType: 'switch',
            name: 'switch',
            label: '开关',
          },
          {
            fieldType: 'upload',
            name: 'upload',
            label: '附件',
          },
        ]}
        detail={detail}
        layout={layout}
        initialValues={{
          name: 'auser',
          desc: '我是一段描述',
          age: 11,
          sex: 'male',
          fruit: ['apple', 'orange'],
          select: '1',
          cascader: ['级联选项1', '级联选项1-1'],
        }}
      />
    </>
  );
};
