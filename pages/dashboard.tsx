import Head from 'next/head'
import cookie from 'cookie';
import { Component } from 'react';

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

interface DashboardProps {
  profilePhoto: string
  name: string
  artistCount: number
  playlistCount: number
  songCount: number
  albumsCount: number
  token: string
}

interface DashboardState {
  artistCount: number
  playlistCount: number
  songCount: number
  albumsCount: number
}

export default class Dashboard extends Component<DashboardProps, DashboardState> {
  constructor(props) {
    super(props);
    this.state = {
      artistCount: this.props.artistCount,
      songCount: this.props.songCount,
      playlistCount: this.props.playlistCount,
      albumsCount: this.props.albumsCount
    };
  }

  static async getInitialProps(ctx) {
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

  removeArtists = () => {
    UnFollowArtists(this.props.token);
    this.setState({ artistCount: 0 })
  }

  removePlaylists = () => {
    UnfollowPlaylists(this.props.token);
    this.setState({ playlistCount: 0 })
  }

  removeSongs = () => {
    RemoveTracksFromLibrary(this.props.token);
    this.setState({ songCount: 0 })
  }

  removeAlbums = () => {
    RemoveAlbumsFromLibrary(this.props.token);
    this.setState({ albumsCount: 0 })
  }

  render() {
    return (
      <>
        <Head>
          <title>Spotify r4set</title>
        </Head>
        <Page>
          <div className={styles.avatarContainer}>
            <img className={styles.img} src={this.props.profilePhoto} />
            <h1>{this.props.name}</h1>
          </div>

          <Button className={styles.resetButton}>Reset all my spotify!!!</Button>

          <FormattedContent>
            <p className={styles.resetText}>Resetting all your spotify will:</p>

            <ul>
              <li className={styles.listItem}>
                <Button onClick={this.removeArtists}>Unfollow all artists</Button>
                <span className={styles.meta}>You are currently following {pluralize(this.state.artistCount, 'artist')}</span>
              </li>
              <li className={styles.listItem}>
                <Button onClick={this.removePlaylists}>Unfollow all playlists</Button>
                <span className={styles.meta}>You are currently following {pluralize(this.state.playlistCount, 'playlist')}</span>
              </li>
              <li className={styles.listItem}>
                <Button onClick={this.removeSongs}>Unlike all songs</Button>
                <span className={styles.meta}>You are currently liking {pluralize(this.state.songCount, 'song')}</span>
              </li>
              <li className={styles.listItem}>
                <Button onClick={this.removeAlbums}>Unlike all albums</Button>
                <span className={styles.meta}>You are currently liking {pluralize(this.state.albumsCount, 'album')}</span>
              </li>
            </ul>
          </FormattedContent>
        </Page>
      </>
    )
  }
}