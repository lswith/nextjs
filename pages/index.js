import Head from 'next/head'
import Page from '../components/Page';
import Button from '../components/Button';
import styles from './index.module.css';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <div className={styles.headingContainer}>
          <h1 className={styles.heading}>
            Spotify reset
            <span className={styles.subtitle}>Where all your spotify resetting dreams come true</span>
          </h1>
          <Button className={styles.button}>Take me to reset my spotify please</Button>
        </div>

        <img className={styles.img} src="https://www.apimages.com/Images/Ap_Creative_Stock_Header.jpg" />
          
        <p>
          Are you tired of getting suggested artists that your weird friend made you listen to once?
          <br/>
          Do you wish coldplay would stop showing up on your release radar?
          <br/>
          Well then spotify reset <strong>might</strong> be right for you!
        </p>

        <p>Once you've logged into spotify reset you'll be able to easily:</p>

        <ul>
          <li>Unfollow all playlists</li>
          <li>Unstar all saved tracks and albums</li>
          <li>Unfollow all artists</li>
          <li>Or do them all in one go</li>
        </ul>

        <img src=""/>

        <p className={styles.disclaimer}>Disclaimer: Spotify reset does not access or store your data in anyway. We use only the freshest spotify api's and do not cut it with any baking soda.</p>
      </Page>
    </div>
  )
}
