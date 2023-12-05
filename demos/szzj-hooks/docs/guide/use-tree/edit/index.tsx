import React, { useState, useRef } from 'react';
import { DownOutlined, EditOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { Tree, Modal, Form, Input, Radio } from 'antd';
import { useTree, useModal } from '@szzj/hooks';

import type { RadioChangeEvent } from 'antd';
import type { DataNode } from 'antd/es/tree';

const initialNodes: DataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
          {
            title: 'leaf',
            key: '0-0-0-2',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: 'leaf',
            key: '0-0-1-0',
          },
        ],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        children: [
          {
            title: 'leaf',
            key: '0-0-2-0',
          },
          {
            title: 'leaf',
            key: '0-0-2-1',
          },
        ],
      },
    ],
  },
];

export default () => {
  const [addMode, setAddMode] = useState('prepend');
  const tree = useTree(initialNodes, {
    uniqueKey: 'key',
  });
  const { treeNodes, replace, prepend, append, insertAfter, remove } = tree;
  const modeRef = useRef<'edit' | 'add'>();
  const [form] = Form.useForm();
  const modal = useModal<DataNode>();

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <span style={{ marginRight: 10 }}>子节点添加模式：</span>
        <Radio.Group
          value={addMode}
          onChange={({ target: { value } }: RadioChangeEvent) => {
            setAddMode(value);
          }}
        >
          <Radio.Button value="prepend">prepend</Radio.Button>
          <Radio.Button value="append">append</Radio.Button>
          <Radio.Button value="insertAfter">insertAfter</Radio.Button>
        </Radio.Group>
      </div>

      <Tree
        showLine
        switcherIcon={<DownOutlined />}
        defaultExpandAll
        treeData={treeNodes}
        titleRender={(node) => {
          return (
            <span key={node.key}>
              {node.title}
              <EditOutlined
                style={{ marginLeft: 5, color: '#1890ff' }}
                onClick={() => {
                  modeRef.current = 'edit';
                  form.setFieldsValue({
                    title: node.title,
                  });
                  modal.show(node);
                }}
              />
              <PlusCircleOutlined
                style={{ marginLeft: 5, color: '#1890ff' }}
                onClick={() => {
                  modeRef.current = 'add';
                  modal.show(node);
                }}
              />
              <DeleteOutlined
                style={{ marginLeft: 5, color: '#1890ff' }}
                onClick={() => {
                  remove(node.key);
                }}
              />
            </span>
          );
        }}
      />

      <Modal
        open={modal.visible}
        title={modeRef.current === 'edit' ? '编辑节点' : '新增节点'}
        onCancel={modal.hide}
        onOk={() => {
          const vals = form.getFieldsValue();
          const parent = modal.dataSource;
          switch (modeRef.current) {
            case 'edit':
              replace({
                ...modal.dataSource,
                ...vals,
              });
              break;
            case 'add':
              tree[addMode](
                {
                  ...vals,
                  key: `${parent?.key}-${parent?.children?.length}`,
                },
                parent?.key,
              );
              break;
          }
          modeRef.current = undefined;
          form.resetFields();
          modal.hide();
        }}
      >
        <Form form={form}>
          <Form.Item name="title" label="节点名称">
            <Input placeholder="请输入节点名称" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
