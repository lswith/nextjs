import SpotifyAPI from 'spotify-web-api-node';

export async function GetFollowedArtistsCount(token): Promise<number> {
  const spotifyApi = new SpotifyAPI();
  spotifyApi.setAccessToken(token);

  let artists: Array<SpotifyApi.ArtistObjectFull> = [];
  let res = await spotifyApi.getFollowedArtists({limit: 1});
  if (!res.body.artists.total) {
    return 0;
  }
  return res.body.artists.total;
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