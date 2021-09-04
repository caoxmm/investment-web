import cn from 'classnames';

import styles from './Dashboard.less';

interface DashboardProps {
  className?: string;
}

export function Dashboard(props: DashboardProps) {
  const { className } = props;

  return <div className={cn(styles.Dashboard, className)}>Dashboard</div>;
}
