import React, { useImperativeHandle, forwardRef } from 'react';
import { Input, InputNumber, Select, DatePicker, Button, message } from 'antd';
import { getOperations, getRightTypes } from './util';
import moment from 'moment';
import MainCombine from './mainCombine';
import { PlusOutlined } from '@ant-design/icons';
import styles from '../index.scss';

export default forwardRef(
  (
    {
      dataSource,
      rewardList,
      valList,
      getFieldValue,
      onEdit,
      onAdd,
      onDelete,
      genesCoding
    }: {
      dataSource: any[];
      rewardList: any[];
      valList: any[];
      getFieldValue: Function;
      onEdit: Function;
      onAdd: Function;
      onDelete: Function;
      genesCoding: string;
    },
    ref,
  ) => {
    useImperativeHandle(ref, () => ({
      submit() {},
      editSubmit() {},
    }));

    return (
      <div>
        <ul style={{ display: 'flex', paddingLeft: '60px' }}>
          <li style={{ width: '264px', paddingLeft: '4px' }}>指标名称</li>
          <li style={{ width: '140px' }}>操作符</li>
          <li>条件数值</li>
        </ul>
        <ul className={styles.domtree}>
          {dataSource.map((item, index) => {
            return (
              <MainCombine
                item={item}
                getFieldValue={getFieldValue}
                onEdit={onEdit}
                rewardList={rewardList}
                genesCoding={genesCoding}
              />
            );
          })}
          {dataSource.length < 3 && (
            <li key="button" style={{ display: 'block' }}>
              <Button
                icon={<PlusOutlined />}
                onClick={() => {
                  if (getFieldValue(dataSource[0], 'leftValue')) {
                    onAdd({ responsibilities: 'MAIN' });
                  } else {
                    message.error('请先选择指标');
                  }
                }}
              >
                新增日期条件
              </Button>
            </li>
          )}
        </ul>
      </div>
    );
  },
);
