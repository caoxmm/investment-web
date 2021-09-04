import cn from 'classnames';
import { Button, Input } from 'antd';

import styles from './Script.less';
import { Friend } from './Friend/Friend';
import { My } from './My/My';
import React, { useCallback, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
const { TextArea } = Input;

export enum ROLE {
  FRIEND,
  ME,
}

export interface IScript {
  key: string;
  role: ROLE;
  message: string;
}

interface ScriptProps {
  className?: string;
  value?: IScript[];
  onChange?: (value: IScript[]) => void;
  friendHead: string;
  myHead: string;
}

export function Script(props: ScriptProps) {
  const { className, value = [], friendHead, myHead, onChange } = props;

  const [message, setMessage] = useState('');
  const _onMessageChange: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(e.target.value);
    },
    []
  );

  const _onSend = useCallback(
    (role: ROLE) => {
      if (onChange) {
        onChange([...value, { key: uuidV4(), role, message }]);
      }
      setMessage('');
    },
    [message, value, onChange]
  );

  const _onRemove = useCallback(
    (removeKey: string) => {
      if (onChange) {
        onChange(value.filter(({ key }) => key !== removeKey));
      }
    },
    [value, onChange]
  );

  const _onImport = useCallback(() => {
    if (onChange) {
      const line = message.split('\n');
      const lines = line.map((l) => {
        if (l.startsWith('朋友消息')) {
          const msg = l.substring(5);

          return {
            key: uuidV4(),
            role: ROLE.FRIEND,
            message: msg.substr(0, msg.length - 2),
          };
        } else {
          const msg = l.substring(5);
          return {
            key: uuidV4(),
            role: ROLE.ME,
            message: msg.substr(0, msg.length - 2),
          };
        }
      });
      onChange(lines);
    }
  }, [message, value, onChange]);

  return (
    <div className={cn(styles.Script, className)}>
      {value.map((v) => {
        if (v.role === ROLE.FRIEND) {
          return <Friend key={v.key} id={v.key} head={friendHead} message={v.message} onRemove={_onRemove} />;
        } else {
          return <My key={v.key} id={v.key} head={myHead} message={v.message} onRemove={_onRemove} />;
        }
      })}
      <div className={styles.footer}>
        <TextArea rows={4} value={message} onChange={_onMessageChange} />
        <div className={styles.dialog}>
          <Button
            type="primary"
            className={styles.send}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              _onSend(ROLE.FRIEND);
            }}
          >
            对方消息
          </Button>
          <Button
            type="primary"
            className={styles.send}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              _onSend(ROLE.ME);
            }}
          >
            我的消息
          </Button>
          <Button
            type="primary"
            className={styles.send}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              _onImport();
            }}
          >
            剧本导入
          </Button>
        </div>
      </div>
      {/* <Button type="primary">开始录制</Button> */}
    </div>
  );
}
