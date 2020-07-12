import styles from './styles.module.css';

export default (props) => (
  <div className={styles.container}>
    {props.children}
  </div>
);
