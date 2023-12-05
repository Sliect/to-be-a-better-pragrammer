import React, { Fragment, useState } from 'react';

import { Input } from '@szzj/template-lib-react';

export default function InputDemo() {
  const [value, setValue] = useState<string | undefined>('value');

  return (
    <Fragment>
      <Input value={value} onChange={(val: string) => setValue(val)} />
    </Fragment>
  );
}
