import React, { Fragment } from 'react';
import { EditableFieldDetail } from '@szzj/antd-form';
import '../../../src/EditableFieldDetail/index.less';

export default () => {
  return (
    <Fragment>
      <EditableFieldDetail
        name="name"
        value="张三"
        onOk={(vals) => {
          console.log(vals);
          return Promise.resolve({});
        }}
      />
      <EditableFieldDetail
        fieldType="input-number"
        name="num"
        value="1"
        onOk={(vals) => {
          console.log(vals);
          return Promise.resolve({});
        }}
      />
      <EditableFieldDetail
        fieldType="select"
        name="fruit"
        value="橘子"
        options={[
          { label: '橘子', value: '橘子' },
          { label: '苹果', value: '苹果' },
        ]}
        onOk={(vals) => {
          console.log(vals);
          return Promise.resolve({});
        }}
      />
      <EditableFieldDetail
        fieldType="checkbox"
        name="fruit"
        value="橘子"
        options={[
          { label: '橘子', value: '橘子' },
          { label: '苹果', value: '苹果' },
        ]}
        onOk={(vals) => {
          console.log(vals);
          return Promise.resolve({});
        }}
      />
      <EditableFieldDetail
        fieldType="radio"
        name="fruit"
        value="橘子"
        options={[
          { label: '橘子', value: '橘子' },
          { label: '苹果', value: '苹果' },
        ]}
        onOk={(vals) => {
          console.log(vals);
          return Promise.resolve({});
        }}
      />
      <EditableFieldDetail
        name="phone"
        value="13600000000"
        isDesen={true}
        onOk={(vals) => {
          console.log(vals);
          return Promise.resolve({});
        }}
      />
      <EditableFieldDetail
        name="phone"
        value="13600000000"
        format={(value: string, { isDetail }: { isDetail: boolean }) => {
          return isDetail ? value.slice(0, 3) + '****' + value.slice(7) : value;
        }}
        onOk={(vals) => {
          console.log(vals);
          return Promise.resolve({});
        }}
      />
    </Fragment>
  );
};
