import Head from 'next/head'
import cookie from 'cookie';
import { useState } from 'react';

import Page from '../components/Page';
import Button from '../components/Button';
import FormattedContent from '../components/FormattedContent';
import { GetMe } from '../lib/me';
import { GetFollowedArtistsCount, UnFollowArtists } from '../lib/artists';
import { GetPlaylistsCount, UnfollowPlaylists } from '../lib/playlists';
import { GetLibraryTrackCount, RemoveTracksFromLibrary } from '../lib/tracks';
import { GetLibraryAlbumsCount, RemoveAlbumsFromLibrary } from '../lib/albums';

import styles from './dashboard.module.css';

const pluralize = (count, word) => {
  return `${count} ${word}${count === 1 ? '' : 's'}`;
}

export default function Dashboard(props) {
  const [artistCount, setAristCount] = useState(props.artistCount);
  const [playlistCount, setPlaylistCount] = useState(props.playlistCount);
  const [songCount, setSongCount] = useState(props.songCount);
  const [albumsCount, setAlbumsCount] = useState(props.albumsCount);

  const removeArtists = () => {
    UnFollowArtists(props.token);
    setAristCount(0);
  }

  const removePlaylists = () => {
    UnfollowPlaylists(props.token);
    setPlaylistCount(0);
  }

  const removeSongs = () => {
    RemoveTracksFromLibrary(props.token);
    setSongCount(0);
  }

  const removeAlbums = () => {
    RemoveAlbumsFromLibrary(props.token);
    setAlbumsCount(0);
  }

  const removeAll = () => {
    removeArtists();
    removePlaylists();
    removeSongs();
    removeAlbums();
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

        <Button onClick={removeAll} className={styles.resetButton}>Reset all my spotify!!!</Button>

        <FormattedContent>
          <p className={styles.resetText}>Resetting all your spotify will:</p>

          <ul>
            <li className={styles.listItem}>
              <Button onClick={removeArtists}>Unfollow all artists</Button>
              <span className={styles.meta}>You are currently following {pluralize(artistCount, 'artist')}</span>
            </li>
            <li className={styles.listItem}>
              <Button onClick={removePlaylists}>Unfollow all playlists</Button>
              <span className={styles.meta}>You are currently following {pluralize(playlistCount, 'playlist')}</span>
            </li>
            <li className={styles.listItem}>
              <Button onClick={removeSongs}>Unlike all songs</Button>
              <span className={styles.meta}>You are currently liking {pluralize(songCount, 'song')}</span>
            </li>
            <li className={styles.listItem}>
              <Button onClick={removeAlbums}>Unlike all albums</Button>
              <span className={styles.meta}>You are currently liking {pluralize(albumsCount, 'album')}</span>
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
  const playlistsCount = await GetPlaylistsCount(token);
  const songsCount = await GetLibraryTrackCount(token);
  const albumsCount = await GetLibraryAlbumsCount(token);
  const me = await GetMe(token);

  return {
    profilePhoto: me.images?.length > 0 ? me.images[0].url : './default-profile.png',
    name: me.display_name,
    artistCount: artistCount,
    playlistCount: playlistsCount,
    songCount: songsCount,
    albumsCount: albumsCount,
    token,
  }
}
