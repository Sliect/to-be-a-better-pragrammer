import React, { Fragment } from 'react';

const defaultRenderItem = (val: string) => {
  return val ? (
    <span className="szzj-form-detail-img" style={{ backgroundImage: val }}></span>
  ) : null;
};

const Tag = (props: {
  valuePropName?: string;
  value?: string | string[];
  renderDetailItem?: (item: any) => React.ReactNode;
  [key: string]: any;
}) => {
  const { valuePropName, renderDetailItem = defaultRenderItem } = props;
  const value = valuePropName ? props[valuePropName] : props.value;

  return (
    <Fragment>
      {Array.isArray(value) ? (
        <div className="szzj-form-detail-tags">
          {value.map((val, index) => {
            return <span key={index}>{renderDetailItem(val)}</span>;
          })}
        </div>
      ) : (
        renderDetailItem(value)
      )}
    </Fragment>
  );
};

export default Tag;
