import SpotifyAPI from 'spotify-web-api-node';

export async function GetPlaylistsCount(token): Promise<number> {
  const spotifyApi = new SpotifyAPI();
  spotifyApi.setAccessToken(token);
  const res = await spotifyApi.getUserPlaylists({limit: 1});
  return res.body.total
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

export async function UnfollowPlaylists(
  token
): Promise<void> {
  const playlists = await GetPlaylists(token);
  const spotifyApi = new SpotifyAPI();
  spotifyApi.setAccessToken(token);

  for (let i = 0; i < playlists.length; i++) {
    await spotifyApi.unfollowPlaylist(playlists[i].id);
    console.log(`unfollowed: ${playlists[i].name}`);
  }
  return;
}