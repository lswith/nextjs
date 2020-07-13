import SpotifyAPI from 'spotify-web-api-node';

export async function GetLibraryTrackCount(token): Promise<number> {
  const spotifyApi = new SpotifyAPI();
  spotifyApi.setAccessToken(token);

  const res = await spotifyApi.getMySavedTracks({limit: 1});
  return res.body.total;
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



export async function RemoveTracksFromLibrary(
  token
): Promise<void> {
  const tracks = await GetLibraryTracks(token);
  const spotifyApi = new SpotifyAPI();
  spotifyApi.setAccessToken(token);

  const trackLength = tracks.length;
  for (let i = 0; i < Math.ceil(trackLength / 50); i++) {
    const items = tracks.splice(0, 50);
    const ids = items.map(val => {
      return val.track.id;
    });
    const names = items.map(val => {
      return val.track.name;
    });
    await spotifyApi.removeFromMySavedTracks(ids);
    console.log(`unfollowed: ${names}`);
  }
  return;
}

