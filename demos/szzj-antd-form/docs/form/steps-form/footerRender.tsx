import React, { Fragment } from 'react';
import { Button } from 'antd';
import { StepsForm, Input, InputNumber, Radio, Select } from '@szzj/antd-form';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 17 },
  },
};

const options = [
  {
    label: '男',
    value: 'male',
  },
  {
    label: '女',
    value: 'female',
  },
];

const BasicInfo = () => {
  return (
    <div>
      <Input label="姓名" name="name" required style={{ width: 200 }} />
      <InputNumber label="年龄" name="age" required style={{ width: 200 }} />
      <Radio label="性别" name="sex" options={options} />
    </div>
  );
};

// props 会自动注入 current, currentValues, values, form, ref
const AddressInfo = ({ values }: { values: any }) => {
  const { base } = values;

  return (
    <div>
      <Select
        label={base.sex === 'male' ? '仅男性可见' : '仅女性可见'}
        name="content"
        options={[]}
        required
        style={{ width: 200 }}
      />
      <Input.Textarea
        label="详细地址"
        name="detail"
        required
        rows={5}
        maxLength={300}
        placeholder="请输入"
      />
    </div>
  );
};

export default () => {
  return (
    <Fragment>
      <StepsForm
        onNext={() => {}}
        onPrev={() => {}}
        onSave={() => {}}
        onCancel={() => {}}
        onSubmit={() => {}}
        onChange={(step, val) => {
          console.log(step, val);
        }}
        buttonConfig={{
          cancel: {
            props: {
              disabled: true,
            },
          },
          save: {
            enable: false,
          },
        }}
        footerRender={({ current, buttons }) => {
          return [
            ...buttons,
            <Button type="primary" key="extra" style={{ marginLeft: 20 }}>
              extra
            </Button>,
          ];
        }}
      >
        <StepsForm.StepForm
          name="base"
          title="基本信息"
          layout="horizontal"
          {...formItemLayout}
          scrollToFirstError={true}
        >
          <BasicInfo />
        </StepsForm.StepForm>

        <StepsForm.StepForm
          name="address"
          title="居住地"
          layout="horizontal"
          {...formItemLayout}
          scrollToFirstError={true}
          disabled={true} //此处写死，应用场景可通过路由获取step进行判断
        >
          <AddressInfo />
        </StepsForm.StepForm>
      </StepsForm>
    </Fragment>
  );
};
