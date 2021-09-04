import cn from 'classnames';

import styles from './Header.less';
import wifi from './wifi.svg';
import battery from './battery.svg';
import { useEffect, useState } from 'react';

interface HeaderProps {
  className?: string;
}

export function Header(props: HeaderProps) {
  const { className } = props;

  const [hm, setHm] = useState(currentHm());

  useEffect(() => {
    const tick = () => setHm(currentHm());

    const timerId = setTimeout(tick, 60000);

    return () => clearTimeout(timerId);
  }, []);

  return (
    <div className={cn(styles.Header, className)}>
      <div className={styles.time}>{hm}</div>
      <div className={styles.info}>
        <img className={styles.wifi} src={wifi} />
        <div className={cn(styles.type, styles.time)}>4G</div>
        <img className={styles.battery} src={battery} />
      </div>
    </div>
  );
}

function currentHm() {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}`;
}
