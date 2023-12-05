import React, { Fragment, forwardRef, useImperativeHandle } from 'react';
import { StepsForm, Input, InputNumber, Radio } from '@szzj/antd-form';

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

const BasicInfo = forwardRef((_, ref) => {
  useImperativeHandle(
    ref,
    () => {
      return {
        // 当前步骤内容下一步、保存、提交的回调
        submit: (vals: any) => {
          return Promise.resolve({
            name: 'szzj',
          });
        },
      };
    },
    [],
  );

  return (
    <div>
      <Input label="姓名" name="name" required style={{ width: 200 }} />
      <InputNumber label="年龄" name="age" required style={{ width: 200 }} />
      <Radio name="sex" label="性别" options={options} />
    </div>
  );
});

const AddressInfo = () => {
  return (
    <div>
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
        >
          <AddressInfo />
        </StepsForm.StepForm>
      </StepsForm>
    </Fragment>
  );
};
