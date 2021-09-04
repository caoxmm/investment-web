import cn from 'classnames';
import { Menu } from 'antd';
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';
import styles from './Menus.less';
import { Link, useLocation } from 'react-router-dom';
import { useMemo } from 'react';

interface MenusProps {
  className?: string;
}

export function Menus(props: MenusProps) {
  const { className } = props;

  const location = useLocation();

  const secondMenu = useMemo(() => {
    const { pathname } = location;
    if (pathname) {
      const paths = pathname.split('/');
      if (paths[1]) return `/${paths[1]}`;
    }
    return '';
  }, [location]);

  return (
    <div className={cn(styles.Menus, className)}>
      <Menu mode="inline" selectedKeys={[secondMenu || '']}>
        <Menu.Item key="/dashboard" icon={<UserOutlined />}>
          <Link to="/dashboard">仪表盘</Link>
        </Menu.Item>
        <Menu.Item key="/advice" icon={<UserOutlined />}>
          <Link to="/advice">LOF套利建议</Link>
        </Menu.Item>
        <Menu.Item key="/buy-lof-advice" icon={<VideoCameraOutlined />}>
          <Link to="/buy-lof-advice">LOF建仓建议</Link>
        </Menu.Item>
        <Menu.Item key="/my-fund-manage" icon={<UploadOutlined />}>
          <Link to="/my-fund-manage">LOF底仓管理</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}
