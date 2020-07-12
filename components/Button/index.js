import styles from './styles.module.css';
import cx from 'classnames';

export default (props) => (
  <a className={cx(styles.button, props.className)} href={props.href}>
    {props.children}
  </a>
);
