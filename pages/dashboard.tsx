import Head from 'next/head'
import cookie from 'cookie';

import Page from '../components/Page';
import Button from '../components/Button';
import FormattedContent from '../components/FormattedContent';
import { GetArtists, GetPlaylists, GetLibraryAlbums, GetLibraryTracks, GetMe } from '../lib/spotify-functions';
import styles from './dashboard.module.css';

const pluralize = (count, word) => {
  return `${count} ${word}${count === 1 ? '' : 's'}`;
}

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
  const artists = await GetArtists(cookies.access_token);
  const playlists = await GetPlaylists(cookies.access_token);
  const songs = await GetLibraryTracks(cookies.access_token);
  const albums = await GetLibraryAlbums(cookies.access_token);
  const me = await GetMe(cookies.access_token);

  return {
    profilePhoto: me.images[0].url,
    name: me.display_name,
    artistCount: artists.length,
    playlistCount: playlists.length,
    songCount: songs.length,
    albumCount: albums.length,
  }
}
