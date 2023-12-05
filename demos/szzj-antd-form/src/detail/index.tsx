import Text from './Text';
import TextForOptionsValue from './TextForOptionsValue';
import Image from './Image';
import Tag from './Tag';
import List from './List';
import './index.less';

export const DetailComponents: {
  [key: string]: React.ComponentType<any>;
} = {
  text: Text,
  'text-for-options-value': TextForOptionsValue,
  image: Image,
  tag: Tag,
  list: List,
};

export const setDetailComponent = (type: string, DetailComponent: React.ComponentType<any>) => {
  DetailComponents[type] = DetailComponent;
};
