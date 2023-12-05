import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const type = 'DraggableBodyRow';

const DraggableBodyRow = ({
  index,
  moveRow,
  className,
  style,
  ...restProps
}: {
  index: number;
  moveRow: (dragIndex: number, dropIndex: number) => {};
  className: string;
  style: React.CSSProperties;
}) => {
  const ref = useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      // @ts-ignore
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: (item) => {
      // @ts-ignore
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    type,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));

  return (
    <tr
      // @ts-ignore
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  );
};

export default DraggableBodyRow;
