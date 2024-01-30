import { NoSetCookieHeaderVPNError, BadCredentialsVPNError, UnreadableVPNError } from "../errors/vpn";
import { U_VPN_HOST, U_VPN_LOGIN_URL, U_VPN_PORTAL_URL, U_VPN_TMP_TOKEN_COOKIE, U_VPN_TOKEN_COOKIE, USER_AGENT } from "../utils/constants";
import readOneSetCookie from "../utils/readOneSetCookie";

/**
 * @param username - Biome username
 * @param password - Biome password
 * @returns Authentication token for the VPN.
 */
export const authenticateVPN = async (username: string, password: string): Promise<string> => {
  let data: string | undefined;
  let SVPNTMP: string | undefined;

  try {
    const response = await fetch(U_VPN_LOGIN_URL, {
      method: "POST",
      body: `ajax=1&username=${encodeURIComponent(username)}&realm=&credential=${encodeURIComponent(password)}`,
      headers: {
        Accept: "*/*",
        "User-Agent": USER_AGENT,
        "Content-Type": "text/plain;charset=UTF-8"
      }
    });

    const setCookie = response.headers.get("set-cookie");
    if (!setCookie) throw new NoSetCookieHeaderVPNError();
    
    // Read the magical cookie value.
    SVPNTMP = readOneSetCookie(setCookie, U_VPN_TMP_TOKEN_COOKIE);
    if (!SVPNTMP) throw new BadCredentialsVPNError();

    // Read the redirection URL.
    data = await response.text();
  }
  // Sometimes, Node.js can throw an error because of the VPN's response
  // so we do a little trick to get the data from the error, if possible.
  catch (e) {
    if (e instanceof TypeError) {
      // @ts-expect-error
      if (e?.cause?.code === "HPE_INVALID_CHUNK_SIZE") {
        // @ts-expect-error
        data = e?.cause?.data;
      }
    }

    // We prevent ignoring the errors we want to throw.
    if (e instanceof NoSetCookieHeaderVPNError || e instanceof BadCredentialsVPNError) throw e;
  }

  if (!data || !SVPNTMP) throw new BadCredentialsVPNError();
  // Read the redirection URL that gives the token.
  data = data.replace(/[\r\n\s]/g, "");
  const hostCheckURL = U_VPN_HOST + data.slice(data.indexOf("redir=") + 6);
  
  // Go to the redirection URL.
  const response = await fetch(hostCheckURL, {
    method: "GET",
    headers: {
      "User-Agent": USER_AGENT,
      Cookie: `${U_VPN_TMP_TOKEN_COOKIE}=${SVPNTMP}`
    }
  });

  // Read the cookies.
  const setCookie = response.headers.get("set-cookie");
  if (!setCookie) throw new NoSetCookieHeaderVPNError();
  
  // Find the token in the cookies.
  const token = readOneSetCookie(setCookie, U_VPN_TOKEN_COOKIE);
  if (!token) throw new BadCredentialsVPNError();
  
  return token;
};

export const readProxyID = async (token: string): Promise<string> => {
  let data: string | undefined;

  try {
    const response = await fetch(U_VPN_PORTAL_URL, {
      method: "GET",
      headers: {
        "User-Agent": USER_AGENT,
        Cookie: `${U_VPN_TOKEN_COOKIE}=${token}`
      }
    });
  
    data = await response.text();
  }
  // Sometimes, Node.js can throw an error because of the VPN's response
  // so we do a little trick to get the data from the error, if possible.
  catch (e) {
    if (e instanceof TypeError) {
      // @ts-expect-error
      if (e?.cause?.code === "HPE_INVALID_CHUNK_SIZE") {
        // @ts-expect-error
        data = e?.cause?.data;
      }
    }
  }

  if (!data) throw new UnreadableVPNError();
  // Remove all the white spaces for easier parsing.
  data = data.replace(" ", "");
  
  // Since Node.js can't parse the JSON, we do it ourselves.
  const key = "fgt_sslvpn_sid";
  const startIndex = data.indexOf(key) + key.length + 4; // `+ 4` for the `":"`
  const endIndex = data.indexOf('"', startIndex);
  
  return data.slice(startIndex, endIndex);
};
