import styles from './styles.module.css';
import cx from 'classnames';

export default (props) => (
  props.href ?
    <a className={cx(styles.button, props.className)} href={props.href}>
      {props.children}
    </a>
    :
    <button className={cx(styles.button, props.className)} onClick={props.onClick}>
      {props.children}
    </button>
);
