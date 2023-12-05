import React, { Children, cloneElement } from 'react';
import { useFieldContext } from '../../contexts/FieldContext';
import './index.less';

const List = ({
  value,
  renderItemDetail,
  children,
}: {
  value?: any[];
  renderItemDetail: (item: any, index: number) => React.ReactNode;
  children: React.ReactElement;
}) => {
  const { name } = useFieldContext()!;

  return (
    <div className="szzj-form-detail-list">
      {(value || []).map((item: any, index: number) => {
        return (
          <div className="szzj-form-detail-item" key={index}>
            {renderItemDetail ? (
              renderItemDetail(item, index)
            ) : (
              <div className="szzj-form-detail-row" key={index}>
                {Children.map<React.ReactElement, React.ReactElement>(children, (child) => {
                  const props = child.props;
                  return cloneElement(child, {
                    ...props,
                    name: [name, index, props.name],
                    key: `${index}${props.name}`,
                  });
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default List;
