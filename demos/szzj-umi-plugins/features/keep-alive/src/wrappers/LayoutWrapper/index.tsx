import { Outlet, history } from 'umi';
import { Layout, Menu } from 'antd';
import { random } from '@szzj/utils';

const { Content, Sider } = Layout;

const menuItems = [
  { label: '首页', key: '1', onClick: () => history.push('/') },
  {
    label: '计数（随机路径，可能不缓存）',
    key: '2',
    onClick: () => history.push('/count/' + String(random(100))),
  },
  {
    label: '计数（固定路径，缓存）',
    key: '4',
    onClick: () => history.push('/count/1'),
  },
  { label: '列表11', key: '5', onClick: () => history.push('/count/list') },
  { label: '列表', key: '3', onClick: () => history.push('/table') },
];

function Wrapper() {
  return (
    <Layout>
      <Sider theme="light">
        <Menu>
          {menuItems.map((item) => (
            <Menu.Item key={item.key} onClick={item.onClick}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Content style={{ background: '#fff', padding: '16px' }}>
        <Outlet />
      </Content>
    </Layout>
  );
}

export default Wrapper;
