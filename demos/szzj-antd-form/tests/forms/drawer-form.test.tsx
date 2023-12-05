import React from 'react';
import { mount } from 'enzyme';
import { Button } from 'antd';

import { Input, DrawerForm } from '../../src';
import { sleep } from '../helpers/utils';
import { getFormApi } from '../helpers/form';

describe('DrawerForm', () => {
  // 基本测试
  test('basic', async () => {
    const wrapper = mount(
      <DrawerForm visible dataSource={{ name: '史泰龙' }}>
        <Input name="name" label="姓名" />
      </DrawerForm>,
    );
    const formApi = getFormApi(wrapper);

    expect(wrapper).toMatchSnapshot();

    expect(wrapper.find(DrawerForm).props().visible).toEqual(true);
    expect(wrapper.find(Input).props().name).toEqual('name');
    expect(wrapper.find(Input).props().label).toEqual('姓名');

    expect(formApi.getFieldValue('name')).toEqual('史泰龙');

    wrapper.unmount();
  });

  // 数据转换
  test('format dataSource', async () => {
    const wrapper = mount(
      <DrawerForm
        visible
        dataSource={{ name: '史泰龙' }}
        format={(dataSource) => ({ name: 'test' })}
      >
        <Input name="name" label="姓名" />
      </DrawerForm>,
    );
    const formApi = getFormApi(wrapper);

    expect(formApi.getFieldValue('name')).toEqual('test');

    wrapper.unmount();
  });

  test('onOk', async () => {
    const onOk = jest.fn();
    const wrapper = mount(
      <DrawerForm visible dataSource={{ name: '史泰龙' }} onOk={onOk}>
        <Input name="name" label="姓名" />
      </DrawerForm>,
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
      <DrawerForm
        visible
        dataSource={{ name: '史泰龙' }}
        onOk={onOk}
        transform={(vals) => ({ name: 'test' })}
      >
        <Input name="name" label="姓名" />
      </DrawerForm>,
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
      <DrawerForm visible dataSource={{ name: '史泰龙' }} onOk={onOk}>
        <Input name="name" label="姓名" />
      </DrawerForm>,
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
      <DrawerForm visible dataSource={{ name: '史泰龙' }} onOk={onOk} throttleWait={3000}>
        <Input name="name" label="姓名" />
      </DrawerForm>,
    );

    wrapper.find('button.ant-btn-primary').at(0).simulate('click');
    await sleep(200);
    wrapper.find('button.ant-btn-primary').at(0).simulate('click');
    await sleep(200);
    expect(onOk).toBeCalledTimes(1);

    wrapper.unmount();
  });
});
