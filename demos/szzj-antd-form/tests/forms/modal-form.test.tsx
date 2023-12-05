import React from 'react';
import { mount } from 'enzyme';
import { Button } from 'antd';

import { Input, ModalForm } from '../../src';
import { sleep } from '../helpers/utils';
import { getFormApi } from '../helpers/form';

describe('ModalForm', () => {
  // 基本测试
  test('basic', async () => {
    const wrapper = mount(
      <ModalForm visible dataSource={{ name: '史泰龙' }}>
        <Input name="name" label="姓名" />
      </ModalForm>,
    );
    const formApi = getFormApi(wrapper);

    expect(wrapper).toMatchSnapshot();

    expect(wrapper.find(ModalForm).props().visible).toEqual(true);
    expect(wrapper.find(Input).props().name).toEqual('name');
    expect(wrapper.find(Input).props().label).toEqual('姓名');

    expect(formApi.getFieldValue('name')).toEqual('史泰龙');

    wrapper.unmount();
  });

  // 数据转换
  test('format dataSource', async () => {
    const wrapper = mount(
      <ModalForm
        visible
        dataSource={{ name: '史泰龙' }}
        format={(dataSource) => ({ name: 'test' })}
      >
        <Input name="name" label="姓名" />
      </ModalForm>,
    );
    const formApi = getFormApi(wrapper);

    expect(formApi.getFieldValue('name')).toEqual('test');

    wrapper.unmount();
  });

  test('onOk', async () => {
    const onOk = jest.fn();
    const wrapper = mount(
      <ModalForm visible dataSource={{ name: '史泰龙' }} onOk={onOk}>
        <Input name="name" label="姓名" />
      </ModalForm>,
    );

    wrapper.find('button.ant-btn-primary').at(0).simulate('click');
    await sleep(200);
    expect(onOk).toBeCalled();
    expect(onOk).toBeCalledWith({ name: '史泰龙' });

    wrapper.unmount();
  });

  test('onOk transform', async () => {
    const onOk = jest.fn();
    const wrapper = mount(
      <ModalForm
        visible
        dataSource={{ name: '史泰龙' }}
        onOk={onOk}
        transform={(vals) => ({ name: 'test' })}
      >
        <Input name="name" label="姓名" />
      </ModalForm>,
    );

    wrapper.find('button.ant-btn-primary').at(0).simulate('click');
    await sleep(200);
    expect(onOk).toBeCalled();
    expect(onOk).toBeCalledWith({ name: 'test' });

    wrapper.unmount();
  });

  test('multiple click', async () => {
    const onOk = jest.fn();
    const wrapper = mount(
      <ModalForm visible dataSource={{ name: '史泰龙' }} onOk={onOk}>
        <Input name="name" label="姓名" />
      </ModalForm>,
    );

    wrapper.find('button.ant-btn-primary').at(0).simulate('click');
    await sleep(200);
    wrapper.find('button.ant-btn-primary').at(0).simulate('click');
    await sleep(200);
    expect(onOk).toBeCalledTimes(2);

    wrapper.unmount();
  });

  test('throttled click', async () => {
    const onOk = jest.fn();
    const wrapper = mount(
      <ModalForm visible dataSource={{ name: '史泰龙' }} onOk={onOk} throttleWait={3000}>
        <Input name="name" label="姓名" />
      </ModalForm>,
    );

    wrapper.find('button.ant-btn-primary').at(0).simulate('click');
    await sleep(200);
    wrapper.find('button.ant-btn-primary').at(0).simulate('click');
    await sleep(200);
    expect(onOk).toBeCalledTimes(1);

    wrapper.unmount();
  });
});
