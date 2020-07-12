import styles from './styles.module.css';
import cx from 'classnames';

export default ({ children, className }) => (
  <div className={cx(styles.formattedContent, className)}>
    {children}
  </div>
);
