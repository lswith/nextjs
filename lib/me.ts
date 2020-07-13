import SpotifyAPI from 'spotify-web-api-node';

export async function GetMe(token): Promise<SpotifyApi.CurrentUsersProfileResponse> {
  const spotifyApi = new SpotifyAPI();
  spotifyApi.setAccessToken(token);

  const res = await spotifyApi.getMe();
  return res.body;
}


