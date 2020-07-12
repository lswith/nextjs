import Page from '../components/Page';
import Button from '../components/Button';
import FormattedContent from '../components/FormattedContent';
import styles from './dashboard.module.css';

export default function Dashboard(props) {
  return (
    <>
      <Head>
        <title>Spotify r4set</title>
      </Head>
      <Page>
        <div className={styles.avatarContainer}>
          <img className={styles.img} src={props.profilePhoto} />
          <h1>{props.name}</h1>
        </div>

        <Button className={styles.resetButton}>Reset all my spotify!!!</Button>
          
        <FormattedContent>
          <p className={styles.resetText}>Resetting all your spotify will:</p>

          <ul>
            <li className={styles.listItem}>
              <Button>Unfollow all artists</Button>
              <span className={styles.meta}>You are currently following 1,290 artists</span>
            </li>
            <li className={styles.listItem}>
              <Button>Unfollow all playlists</Button>
              <span className={styles.meta}>You are currently following 1,290 artists</span>
            </li>
            <li className={styles.listItem}>
              <Button>Unlike all songs</Button>
              <span className={styles.meta}>You are currently following 1,290 artists</span>
            </li>
            <li className={styles.listItem}>
              <Button>Unlike all albums</Button>
              <span className={styles.meta}>You are currently following 1,290 artists</span>
            </li>
          </ul>
        </FormattedContent>
      </Page>
    </>
  )
}

Dashboard.getInitialProps = async (ctx) => {
  return {
    profilePhoto: 'https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-1/p320x320/74888272_10213809929877571_8672534916682661937_o.jpg?_nc_cat=108&_nc_sid=0c64ff&_nc_ohc=uMYJw9GcgsEAX-4Wnmm&_nc_ht=scontent-hkt1-1.xx&_nc_tp=6&oh=0d79f7b2bacc7e86f950a88e54b38efb&oe=5F2FA56E',
    name: 'Luke Swithenbank',
  }
}
