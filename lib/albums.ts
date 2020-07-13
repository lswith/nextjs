import SpotifyAPI from 'spotify-web-api-node';

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

export async function GetLibraryAlbumsCount(token): Promise<number> {
  const spotifyApi = new SpotifyAPI();
  spotifyApi.setAccessToken(token);

  let albums: SpotifyApi.SavedAlbumObject[] = [];
  const res = await spotifyApi.getMySavedAlbums({limit: 1});
  return res.body.total;
}

export async function RemoveAlbumsFromLibrary(
    token
): Promise<void> {
  const albums = await GetLibraryAlbums(token);

  const spotifyApi = new SpotifyAPI();
  spotifyApi.setAccessToken(token);

  const albumLength = albums.length;
  for (let i = 0; i < Math.ceil(albumLength / 50); i++) {
    const items = albums.splice(0, 50);
    const ids = items.map(val => {
      return val.album.id;
    });
    const names = items.map(val => {
      return val.album.name;
    });
    await spotifyApi.removeFromMySavedAlbums(ids);
    console.log(`unfollowed: ${names}`);
  }
  return;
}