import styles from './styles.module.css';
import cx from 'classnames';

export default (props) => (
  <button className={cx(styles.button, props.className)}>
    {props.children}
  </button>
);
