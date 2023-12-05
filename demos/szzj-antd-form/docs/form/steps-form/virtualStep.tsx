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
    </div>
  );
});

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

export default function virtualStep() {
  return (
    <Fragment>
      <StepsForm
        onNext={() => {}}
        onPrev={() => {}}
        onSave={() => {}}
        onCancel={() => {}}
        onSubmit={(res) => {
          /* 此处去处理下一步跳转 */
          console.log('res', res);
        }}
        onChange={(step, val) => {
          console.log(step, val);
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
          virtual={true}
        >
          <AddressInfo />
        </StepsForm.StepForm>
      </StepsForm>
    </Fragment>
  );
}
