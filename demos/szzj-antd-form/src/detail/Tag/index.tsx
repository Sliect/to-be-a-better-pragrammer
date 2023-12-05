import React, { Fragment } from 'react';

const defaultRenderItem = (val: string) => {
  return val !== undefined ? <span className="szzj-form-detail-tag">{val}</span> : null;
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
            return (
              <span key={index} className="szzj-form-detail-tag">
                {renderDetailItem(val)}
              </span>
            );
          })}
        </div>
      ) : (
        renderDetailItem(value as string)
      )}
    </Fragment>
  );
};

export default Tag;
