import axios from 'axios';
import { MeilingV1ExtendedAuthMethods, MeilingV1SigninType } from './interface/auth';

const server = 'https://meiling.stella-api.dev';
const tokenItemName = 'meiling-v1-token';

export async function getMeilingSessionToken(forceUpdate?: boolean): Promise<string> {
  let token = undefined;
  
  if (!forceUpdate) {
    token = localStorage.getItem(tokenItemName);
  }

  const data = (await axios.get(`${server}/v1/meiling/session`, {
    headers: (token === null || token === undefined) ? undefined : {
      'Authorization': `Bearer ${token}`,
    }
  })).data;

  if (data.success) {
    if (data.token !== null && data.token !== undefined) {
      token = data.token as string;
    }

    if (token) {
      localStorage.setItem(tokenItemName, token);
      return token;
    }
  }

  localStorage.removeItem(tokenItemName);
  return await getMeilingSessionToken(true);
}

export async function getApplication(appId: string) {
  const token = await getMeilingSessionToken();

  const url = `${server}/v1/meiling/apps/${appId}`;
  const response = await axios.get(url, {
    headers: (token === null || token === undefined) ? undefined : {
      'Authorization': `Bearer ${token}`,
    }
  });

  const data = response.data;
  return data;
}

export async function getAuthentication(userUuid: string, searchStr: string, userAuth: boolean = false) {
  const token = await getMeilingSessionToken();

  const url = `${server}/v1/meiling/users/${userUuid}/auth${searchStr}`;
  const response = (userAuth) ? 
    await axios.post(url, undefined, {
      headers: (token === null || token === undefined) ? undefined : {
        'Authorization': `Bearer ${token}`,
      }
    }) :
    await axios.get(url, {
      headers: (token === null || token === undefined) ? undefined : {
        'Authorization': `Bearer ${token}`,
      }
    });

  const data = response.data;
  return data;
}

export async function isUsernameAvailable(username: string) {
  const token = await getMeilingSessionToken();

  const data = (await axios.post(`${server}/v1/meiling/signin`,
    {
      type: "username_check",
      data: {
        username,
      }
    }, 
    {
      headers: (token === null || token === undefined) ? undefined : {
        'Authorization': `Bearer ${token}`,
    },
  })).data;

  return data;
}

export async function signInWithUsernameAndPassword(username: string, password: string) {
  const token = await getMeilingSessionToken();

  const data = (await axios.post(`${server}/v1/meiling/signin`,
    {
      type: "username_and_password",
      data: {
        username,
        password,
      }
    }, 
    {
      headers: (token === null || token === undefined) ? undefined : {
        'Authorization': `Bearer ${token}`,
    },
  })).data;

  return data;
}

export async function getLoggedInUser(user_id?: string) {
  if (!user_id) throw new Error('Nope');

  const token = await getMeilingSessionToken();

  const data = (await axios.get(`${server}/v1/meiling/users/${user_id}`,
    {
      headers: (token === null || token === undefined) ? undefined : {
        'Authorization': `Bearer ${token}`,
    },
  })).data;

  return data;
}

export async function getLoggedInUsers() {
  const token = await getMeilingSessionToken();

  const data = (await axios.get(`${server}/v1/meiling/users`,
    {
      headers: (token === null || token === undefined) ? undefined : {
        'Authorization': `Bearer ${token}`,
    },
  })).data;

  return data;
}

export async function getExtendedAuthenticationMethods(
  type: MeilingV1SigninType,
  username?: string,
) {
  const token = await getMeilingSessionToken();

  const data = (await axios.post(`${server}/v1/meiling/signin`,
    {
      type,
      context: (username) ? {
        username,
      } : undefined,
    },
    {
      headers: (token === null || token === undefined) ? undefined : {
        'Authorization': `Bearer ${token}`,
    },
  })).data;

  return data.methods;
}

export async function getExtendedAuthenticationChallenge(
  type: MeilingV1SigninType,
  method: MeilingV1ExtendedAuthMethods,
  username?: string,
) {
  const token = await getMeilingSessionToken();

  const data = (await axios.post(`${server}/v1/meiling/signin`,
    {
      type,
      context: (username) ? {
        username,
      } : undefined,
      data: {
        method,
      }
    },
    {
      headers: (token === null || token === undefined) ? undefined : {
        'Authorization': `Bearer ${token}`,
    },
  })).data;

  return data.challenge;
}

export async function signout(uuid?: string) {
  const token = await getMeilingSessionToken();

  const data = (await axios.get(`${server}/v1/meiling/signout${uuid !== undefined ? `?uuid=${uuid}` : ""}`,
    {
      headers: (token === null || token === undefined) ? undefined : {
        'Authorization': `Bearer ${token}`,
    },
  })).data;

  return data;
}

type QueryConverted = {
  [name: string]: string
};

export function generateQueryUrl(data: QueryConverted) {
  let str = "";
  for (const name in data) {
    str += "&"+encodeURIComponent(name)+"="+encodeURIComponent(data[name]);
  }

  str = str.replace(/^&/, '?');
  return str;
}

export function parseQueryUrl(url?: string): QueryConverted {
  if (url === undefined) {
    return {};
  }

  const realUrl = decodeURIComponent(url);
  const searchQueries = realUrl.split('?').splice(1).join('?');

  const result: {
    [name: string]: string
  } = {};

  if (typeof searchQueries !== "undefined") {
    const splitedQueries = searchQueries.split('&');

    for (const query of splitedQueries) {
      const parsed = query.split('=');
      const name = parsed[0];
      const value = parsed[1];

      result[name] = value;
    }
  }

  return result;
}

export function deepCopyString(string: string) {
  return (' ' + string).slice(1)
}
