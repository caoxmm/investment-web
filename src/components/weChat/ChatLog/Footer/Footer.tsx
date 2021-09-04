import cn from 'classnames';

import voice from './voice.svg';
import smile from './smile.svg';
import add from './add.svg';

import styles from './Footer.less';

interface FooterProps {
  className?: string;
}

export function Footer(props: FooterProps) {
  const { className } = props;

  return (
    <div className={cn(styles.Footer, className)}>
      <div className={styles.content}>
        <img src={voice} />
        <div className={styles.input} />
        <img src={smile} />
        <img src={add} />
      </div>
      <div className={styles.line} />
    </div>
  );
}
