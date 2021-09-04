import cn from 'classnames';

import styles from './MyFund.less';

interface MyFundProps {
  className?: string;
}

export function MyFund(props: MyFundProps) {
  const { className } = props;

  return <div className={cn(styles.MyFund, className)}>MyFund</div>;
}
