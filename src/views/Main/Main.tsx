import cn from 'classnames';
import { Layout } from 'antd';

import {
  BrowserRouter as Router, Switch, Route, Link, Redirect, useLocation,
} from 'react-router-dom';
import React, { useCallback, useState } from 'react';
import { Advice } from '../Advice';
import { MyFundManage } from '../MyLofFundManage';
import { Dashboard } from '../Dashboard';
import { MyFundHistory } from '../MyFundHistory';

import styles from './Main.less';
import { Menus } from './Menus';
import { MyFundDetail } from '../MyLofFundManage/MyFundDetail';
import { BuyLofAdvice } from '../BuyLofAdvice';

const { Header, Sider, Content } = Layout;

interface MainProps {
  className?: string;
}
const longHeader = '基金套利工具';
const shortHeader = '套利';
export function Main(props: MainProps) {
  const { className } = props;

  const [headerText, setHeaderText] = useState(longHeader);
  const _collapse = useCallback((collapsed) => {
    if (collapsed) {
      setHeaderText(shortHeader);
    } else {
      setHeaderText(longHeader);
    }
  }, []);

  return (
    <div className={cn(styles.Main, className)}>
      <Router>
        <Layout className={styles.layout}>
          <Sider collapsible theme="light" onCollapse={_collapse}>
            <div className={styles.logo}>{headerText}</div>
            <Menus />
          </Sider>
          <Layout className="site-layout">
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
              }}
            >
              <div>
                <Switch>
                  <Route path="/dashboard">
                    <Dashboard />
                  </Route>
                  <Route path="/advice">
                    <Advice />
                  </Route>
                  <Route path="/my-fund-manage">
                    <MyFundManage />
                  </Route>
                  <Route path="/buy-lof-advice">
                    <BuyLofAdvice />
                  </Route>
                  <Route path="/">
                    <Redirect to="/dashboard" />
                  </Route>
                </Switch>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </div>
  );
}
