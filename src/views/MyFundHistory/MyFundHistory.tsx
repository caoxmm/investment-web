import cn from 'classnames';

import styles from './MyFundHistory.less';

interface MyFundHistoryProps {
  className?: string;
}

export function MyFundHistory(props: MyFundHistoryProps) {
  const { className } = props;

  return <div className={cn(styles.MyFundHistory, className)}>MyFundHistory</div>;
}
