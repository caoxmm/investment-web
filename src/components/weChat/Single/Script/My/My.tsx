import cn from 'classnames';

import styles from './My.less';

interface MyProps {
  className?: string;
  id: string;
  head: string;
  message: string;
  onRemove: (removeKey: string) => void;
}

export function My(props: MyProps) {
  const { className, message, id, onRemove } = props;

  return (
    <div className={cn(styles.My, className)}>
      <span> 我的消息：{message}</span>
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
