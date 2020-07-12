import SpotifyAPI from 'spotify-web-api-node';

export async function GetMe(token): Promise<SpotifyApi.CurrentUsersProfileResponse> {
  const spotifyApi = new SpotifyAPI();
  spotifyApi.setAccessToken(token);

  const res = await spotifyApi.getMe();
  return res.body;
}

export async function GetArtists(token): Promise<Array<SpotifyApi.ArtistObjectFull>> {
  const spotifyApi = new SpotifyAPI();
  spotifyApi.setAccessToken(token);

  let artists: Array<SpotifyApi.ArtistObjectFull> = [];
  let res = await spotifyApi.getFollowedArtists({limit: 20});

  if (!res.body.artists) {
    return artists;
  }

  artists = res.body.artists.items;
  while (res.body.artists.next) {
    res = await spotifyApi.getFollowedArtists({
      limit: 20,
      // @ts-ignore
      after: res.body.artists.cursors.after,
    });
    artists = [...artists, ...res.body.artists.items];
  }
  return artists;
}

export async function UnFollowArtists(token): Promise<void> {
  const artists = await GetArtists(token);
  const spotifyApi = new SpotifyAPI();
  spotifyApi.setAccessToken(token);

  for (let i = 0; i < artists.length; i++) {
    await spotifyApi.unfollowArtists([artists[i].id]);
    console.log('unfollowed: ' + artists[i].name);
  }
  return;
}

export async function GetLibraryAlbums(token): Promise<SpotifyApi.SavedAlbumObject[]> {
  const spotifyApi = new SpotifyAPI();
  spotifyApi.setAccessToken(token);

  let albums: SpotifyApi.SavedAlbumObject[] = [];
  const res = await spotifyApi.getMySavedAlbums({limit: 20});
  albums = res.body.items;
  if (res.body.total > 20) {
    for (let i = 1; i < Math.ceil(res.body.total / 20); i++) {
      const add = await spotifyApi.getMySavedAlbums({
        limit: 20,
        offset: i * 20,
      });
      albums = [...albums, ...add.body.items];
    }
  }
  return albums;
}

export async function GetPlaylists(token): Promise<SpotifyApi.PlaylistObjectSimplified[]> {
  const spotifyApi = new SpotifyAPI();
  spotifyApi.setAccessToken(token);

  let playlists: SpotifyApi.PlaylistObjectSimplified[] = [];
  const res = await spotifyApi.getUserPlaylists({limit: 20});
  playlists = res.body.items;
  if (res.body.total > 20) {
    for (let i = 1; i < Math.ceil(res.body.total / 20); i++) {
      const add = await spotifyApi.getUserPlaylists({
        limit: 20,
        offset: i * 20,
      });
      playlists = [...playlists, ...add.body.items];
    }
  }
  return playlists;
}

export async function GetLibraryTracks(token): Promise<SpotifyApi.SavedTrackObject[]> {
  const spotifyApi = new SpotifyAPI();
  spotifyApi.setAccessToken(token);

  let tracks: SpotifyApi.SavedTrackObject[] = [];
  const res = await spotifyApi.getMySavedTracks({limit: 20});
  tracks = res.body.items;
  if (res.body.total > 20) {
    for (let i = 1; i < Math.ceil(res.body.total / 20); i++) {
      const add = await spotifyApi.getMySavedTracks({
        limit: 20,
        offset: i * 20,
      });
      tracks = [...tracks, ...add.body.items];
    }
  }
  return tracks;
}

// async function RemoveAlbumsFromLibrary(
  // albums: SpotifyApi.SavedAlbumObject[]
// ): Promise<void> {
  // const albumLength = albums.length;
  // for (let i = 0; i < Math.ceil(albumLength / 50); i++) {
    // const items = albums.splice(0, 50);
    // const ids = items.map(val => {
      // return val.album.id;
    // });
    // const names = items.map(val => {
      // return val.album.name;
    // });
    // await spotifyApi.removeFromMySavedAlbums(ids);
    // console.log(`unfollowed: ${names}`);
  // }
  // return;
// }

// async function RemoveTracksFromLibrary(
  // tracks: SpotifyApi.SavedTrackObject[]
// ): Promise<void> {
  // const trackLength = tracks.length;
  // for (let i = 0; i < Math.ceil(trackLength / 50); i++) {
    // const items = tracks.splice(0, 50);
    // const ids = items.map(val => {
      // return val.track.id;
    // });
    // const names = items.map(val => {
      // return val.track.name;
    // });
    // await spotifyApi.removeFromMySavedTracks(ids);
    // console.log(`unfollowed: ${names}`);
  // }
  // return;
// }

// async function UnfollowPlaylists(
  // playlists: SpotifyApi.PlaylistObjectSimplified[]
// ): Promise<void> {
  // for (let i = 0; i < playlists.length; i++) {
    // await spotifyApi.unfollowPlaylist(playlists[i].id);
    // console.log(`unfollowed: ${playlists[i].name}`);
  // }
  // return;
// }
