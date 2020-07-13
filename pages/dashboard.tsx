import Head from 'next/head'
import cookie from 'cookie';

import Page from '../components/Page';
import Button from '../components/Button';
import FormattedContent from '../components/FormattedContent';
import { GetFollowedArtistsCount, GetPlaylists, GetLibraryAlbums, GetLibraryTracks, GetMe, UnFollowArtists} from '../lib/spotify-functions';
import styles from './dashboard.module.css';

const pluralize = (count, word) => {
  return `${count} ${word}${count === 1 ? '' : 's'}`;
}

export default function Dashboard(props) {
  const removeArtists = () => {
    console.log('test');
    UnFollowArtists(props.token);
  }
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
              <Button onClick={removeArtists}>Unfollow all artists</Button>
              <span className={styles.meta}>You are currently following {pluralize(props.artistCount, 'artist')}</span>
            </li>
            <li className={styles.listItem}>
              <Button>Unfollow all playlists</Button>
              <span className={styles.meta}>You are currently following {pluralize(props.playlistCount, 'playlist')}</span>
            </li>
            <li className={styles.listItem}>
              <Button>Unlike all songs</Button>
              <span className={styles.meta}>You are currently liking {pluralize(props.songCount, 'song')}</span>
            </li>
            <li className={styles.listItem}>
              <Button>Unlike all albums</Button>
              <span className={styles.meta}>You are currently liking {pluralize(props.albumCount, 'album')}</span>
            </li>
          </ul>
        </FormattedContent>
      </Page>
    </>
  )
}

Dashboard.getInitialProps = async (ctx) => {
  const cookies = cookie.parse(ctx.req.headers.cookie);
  const token = cookies.access_token;
  const artistCount = await GetFollowedArtistsCount(token);
  const playlists = await GetPlaylists(token);
  const songs = await GetLibraryTracks(token);
  const albums = await GetLibraryAlbums(token);
  const me = await GetMe(token);

  return {
    profilePhoto: me.images?.length > 0 ? me.images[0].url : './default-profile.png',
    name: me.display_name,
    artistCount: artistCount,
    playlistCount: playlists.length,
    songCount: songs.length,
    albumCount: albums.length,
    token,
  }
}
