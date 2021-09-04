import cn from 'classnames';

import styles from './MyLog.less';

interface MyLogProps {
  className?: string;
  head: string;
  message: string;
}

export function MyLog(props: MyLogProps) {
  const { className, head, message } = props;

  return (
    <div className={cn(styles.MyLog, className)}>
      <pre className={styles.message}>{message}</pre>
      <img src={head} />
    </div>
  );
}
