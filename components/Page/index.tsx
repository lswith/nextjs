import styles from './styles.module.css';

export default (props) => (
  <div className={styles.container}>
    <div className={styles.heading}>
      <h1 className={styles.title}>
        Spotify reset
        <span className={styles.subtitle}>Where all your spotify resetting dreams come true</span>
      </h1>
    </div>

    {props.children}
  </div>
);
