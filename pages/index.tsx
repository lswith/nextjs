import Head from 'next/head'
import Page from '../components/Page';
import Button from '../components/Button';
import FormattedContent from '../components/FormattedContent';
import styles from './index.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Welcome to spotify reset</title>
      </Head>
      <Page>
        <div className={styles.buttonContainer}>
          <Button href="/dashboard">Take me to reset my spotify please</Button>
        </div>

        <img className={styles.img} src="/stock-photo.jpg" />
          
        <FormattedContent>
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
        </FormattedContent>

        <div className={styles.exampleImgCaption}>
          <img className={styles.arrowImg} src="/arrow-down-left.png"/>
          <p>This could be you!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</p>
        </div>
        <img className={styles.exampleImg} src="/example_image.png"/>

        <p className={styles.disclaimer}>Disclaimer: Spotify reset does not access or store your data in anyway. We use only the freshest spotify api's and do not cut it with any baking soda.</p>
      </Page>
    </>
  )
}
