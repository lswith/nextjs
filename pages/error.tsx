import Head from 'next/head'
import Page from '../components/Page';
import Button from '../components/Button';
import styles from './error.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>You broke spotify reset</title>
      </Head>
      <Page>
        <div className={styles.container}>
          <h2 className={styles.title}>Something went wrong</h2> 
          <p className={styles.subtitle}>and it was probably your fault too, but it's ok - I forgive you.</p>

          <div className={styles.buttonContainer}>
            <Button href="/">Reset and try again?</Button>
          </div>
        </div>
      </Page>
    </>
  )
}
