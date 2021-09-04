import cn from 'classnames';

import back from './back.svg';
import more from './more.svg';

import styles from './ChatLog.less';
import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { IScript, ROLE } from '../Single/Script';
import { FriendLog } from './FriendLog';
import { MyLog } from './MyLog/MyLog';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
export interface IControlData {
  name: string;
  headImg: string;
  myHeadImg: string;
  scriptList: IScript[];
}
interface ChatLogProps extends IControlData {
  className?: string;
}

function sleep(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

export function ChatLog(props: ChatLogProps) {
  const { className, name, headImg, myHeadImg, scriptList } = props;

  const [megList, setMsgList] = useState(scriptList);

  const _replay = useCallback(async () => {
    setMsgList([]);

    await sleep(10000);
    const l = [];
    for (const s of scriptList) {
      await sleep(1500);
      l.push(s);
      setMsgList([...l]);
    }
  }, [scriptList]);
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (contentRef.current) {
      const ele = contentRef.current;
      ele.scrollTop = ele.scrollHeight;
    }
  }, [megList]);

  return (
    <>
      <div className={cn(styles.ChatLog, className)}>
        <div className={styles.header}>
          <div className={styles.mobileHeader}>
            <Header />
          </div>

          <div className={styles.headerContent}>
            <div className={styles.back}>
              <img src={back} />
            </div>
            <div className={styles.title}>{name}</div>
            <div className={styles.more}>
              <img src={more} />
            </div>
          </div>
        </div>

        <div className={styles.content} ref={contentRef}>
          {megList.map((s) => {
            if (s.role === ROLE.FRIEND) {
              return <FriendLog key={s.key} head={headImg} message={s.message} />;
            } else {
              return <MyLog key={s.key} head={myHeadImg} message={s.message} />;
            }
          })}
        </div>

        <Footer />
      </div>
      <div className={styles.logControl}>
        <Button onClick={_replay}>replay</Button>
      </div>
    </>
  );
}
