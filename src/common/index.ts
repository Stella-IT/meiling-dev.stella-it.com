import axios from 'axios';
import { MeilingV1ExtendedAuthMethods, MeilingV1SigninType } from './interface/auth';

const server = 'https://meiling.stella-api.dev';
const tokenItemName = 'meiling-v1-token';

export async function getMeilingSessionToken(): Promise<string> {
  let token = localStorage.getItem(tokenItemName);
  
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
    } else {
      localStorage.removeItem(tokenItemName);
      return await getMeilingSessionToken();
    }

  } else {
    localStorage.removeItem(tokenItemName);
    return await getMeilingSessionToken();
  }
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

export async function getLoggedInUser(user_id: string) {
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

export function parseQueryUrl(url?: string) {
  if (url === undefined) {
    return [];
  }

  const searchQueries = url.split('?',2)[1];
  const result: {name: string, value?: string}[] = [];

  if (typeof searchQueries !== "undefined") {
    const splitedQueries = searchQueries.split('&');

    for (const query of splitedQueries) {
      const parsed = query.split('=');
      const name = parsed[0];
      const value = parsed[1];

      result.push({
        name, value
      });
    }
  }

  return result;
}
