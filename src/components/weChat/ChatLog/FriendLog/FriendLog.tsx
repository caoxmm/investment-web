import cn from 'classnames';

import styles from './FriendLog.less';

interface FriendLogProps {
  className?: string;
  head: string;
  message: string;
}

export function FriendLog(props: FriendLogProps) {
  const { className, head, message } = props;

  return (
    <div className={cn(styles.FriendLog, className)}>
      <img src={head} />
      <pre className={styles.message}>{message}</pre>
    </div>
  );
}
