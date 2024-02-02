import { initWebSSLVPNSession } from "fortigate-web-sslvpn";
import { SIGNATURES_HEADERS, SIGNATURES_URL, U_VPN_ORIGIN } from "../utils/constants";

const createLoginBody = (username: string, password: string) => `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

export const readSignaturesPageFromWebVPN = async (username: string, password: string) => {
  const vpn = await initWebSSLVPNSession(username, password, U_VPN_ORIGIN);

  const response = await vpn.request(SIGNATURES_URL, {
    method: "POST",
    headers: SIGNATURES_HEADERS,
    body: createLoginBody(username, password),
  });

  return response.data;
};

export const readSignaturesPage = async (username: string, password: string) => {
  const response = await fetch(SIGNATURES_URL, {
    method: "POST",
    headers: SIGNATURES_HEADERS,
    body: createLoginBody(username, password),
  });

  return response.text();
};
