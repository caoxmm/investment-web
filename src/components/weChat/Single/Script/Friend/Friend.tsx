import cn from 'classnames';

import styles from './Friend.less';

interface FriendProps {
  className?: string;
  id: string;
  head: string;
  message: string;
  onRemove: (removeKey: string) => void;
}

export function Friend(props: FriendProps) {
  const { className, message, id, onRemove } = props;

  return (
    <div className={cn(styles.Friend, className)}>
      <span> 朋友消息：{message}</span>
      <a
        onClick={(e) => {
          e.preventDefault();
          onRemove(id);
        }}
      >
        删除
      </a>
    </div>
  );
}
