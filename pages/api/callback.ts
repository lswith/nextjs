import querystring from 'querystring';
import cookie from 'cookie';
import request from 'request';

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URL
const stateKey = 'spotify_auth_state';

const ResetCookieSerialized = cookie.serialize(stateKey, '', {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: -1,
    httpOnly: true,
    path: '/',
  })

function serializeCookie(name, value) {
   return cookie.serialize(name, value, {
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 72576000,
      httpOnly: true,
      path: '/',
  });
}

export default async (req, res) => {
    // your application requests refresh and access tokens
    // after checking the state parameter
  
    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;
  
    if (state === null || state !== storedState) {
      res.writeHead(302, { Location: '/error?' +
        +
          querystring.stringify({
            error: 'state_mismatch',
          })
      });
      res.end();
    } else {
      
      const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code',
        },
        headers: {
          Authorization:
            'Basic ' +
            Buffer.from(client_id + ':' + client_secret).toString('base64'),
        },
        json: true,
      };
  
      request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const access_token = body.access_token,
            refresh_token = body.refresh_token;
  
          const options = {
            url: 'https://api.spotify.com/v1/me',
            headers: {Authorization: 'Bearer ' + access_token},
            json: true,
          };
  
          // use the access token to access the Spotify Web API
          request.get(options, (error, response, body) => {
            console.log(body);
          });
  
          // we can also pass the token to the browser to make requests from there

          res.setHeader('Set-Cookie', [ResetCookieSerialized, serializeCookie('access_token', access_token), serializeCookie('refresh_token', refresh_token)]);
          res.writeHead(302, { Location: '/dashboard' });
          res.end();
        } else {
          res.writeHead(302, { Location: '/error?' +
              querystring.stringify({
                error: 'invalid_token',
              })
            });
          res.end();
        }
      });
    }
  }