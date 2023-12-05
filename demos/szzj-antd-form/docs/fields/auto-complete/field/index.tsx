import React, { useState } from 'react';
import { Radio } from 'antd';
import { Form, AutoComplete } from '@szzj/antd-form';
import { RadioChangeEvent } from 'antd/es/radio';

const options = [
  {
    label: '杭州市西湖区大光明路1号',
    value: '杭州市西湖区大光明路1号',
  },
  {
    label: '杭州市西湖区紫金花路142号',
    value: '杭州市西湖区紫金花路142号',
  },
];

export default () => {
  const [mode, setMode] = useState<string>('input');
  const [opts, setOpts] = useState<{ label: string; value: string }[]>(options);
  const handleSearch = (val: string) => {
    const temp = options.filter((option) => {
      return option.label.indexOf(val) !== -1;
    });

    setOpts(temp);
  };

  return (
    <div>
      <Radio.Group
        onChange={(e: RadioChangeEvent) => setMode(e.target.value)}
        value={mode}
        style={{ marginBottom: 10 }}
      >
        <Radio.Button value="input">input</Radio.Button>
        <Radio.Button value="textarea">textarea</Radio.Button>
        <Radio.Button value="search">search</Radio.Button>
      </Radio.Group>
      <Form labelCol={{ span: 3 }} onValuesChange={(vals) => console.log(vals)}>
        <AutoComplete
          label="收货地址"
          name="address"
          mode={mode}
          options={opts}
          onSearch={handleSearch}
        />
      </Form>
    </div>
  );
};
