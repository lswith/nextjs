import querystring from 'querystring';
import cookie from 'cookie';

const client_id = process.env.CLIENT_ID;
const redirect_uri = process.env.REDIRECT_URL;
const stateKey = 'spotify_auth_state';

export function generateRandomString(length: number) {
    let text = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

export const serializeCookie = (state) => {
    const cookieSerialized = cookie.serialize(stateKey, state, {
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 72576000,
      httpOnly: true,
      path: '/',
    });

    return cookieSerialized
}
export default async (req, res) => {
    const state = generateRandomString(16);
    const cookieSerialized = serializeCookie(state);
    res.setHeader('Set-Cookie', cookieSerialized);
  
    // your application requests authorization
    const scope =
      'user-read-private user-read-email user-library-read user-library-modify user-follow-modify user-follow-read playlist-read-private playlist-modify-public playlist-modify-private';
    res.writeHead(302, { Location: 'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
          response_type: 'code',
          client_id: client_id,
          scope: scope,
          redirect_uri: redirect_uri,
          state: state,
        }) 
    });
    res.end();
}