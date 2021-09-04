import {
  Route, Switch, useRouteMatch,
} from 'react-router-dom';
import { MyFundDetail } from './MyFundDetail';
import { MyFundList } from './MyFundList';

interface MyFundManageProps {
  className?: string;
}

export function MyFundManage(props: MyFundManageProps) {
  const { className } = props;
  const { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <MyFundList />
      </Route>
      <Route path={`${path}/:id`}>
        <MyFundDetail />
      </Route>
    </Switch>
  );
}
