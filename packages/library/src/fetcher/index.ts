import { initWebSSLVPNSession } from "fortigate-web-sslvpn";
import { SIGNATURES_HEADERS, SIGNATURES_URL, U_VPN_ORIGIN } from "../utils/constants";

const createLoginBody = (username: string, password: string) => `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

export const readSignaturesPageFromWebVPN = async (username: string, password: string) => {
  const vpn = await initWebSSLVPNSession(username, password, U_VPN_ORIGIN);

  const response = await vpn.request(SIGNATURES_URL, {
    method: "POST",
    headers: { ...SIGNATURES_HEADERS },
    body: createLoginBody(username, password),
    encoding: "latin1"
  });

  // Close the session since we don't need it anymore.
  await vpn.close();

  if (response.status !== 200) {
    throw new Error("An error occurred while fetching the signatures page.");
  }

  return response.data;
};

export const readSignaturesPage = async (username: string, password: string, url = SIGNATURES_URL) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { ...SIGNATURES_HEADERS },
    body: createLoginBody(username, password)
  });

  const buffer = await response.arrayBuffer();
  const decoder = new TextDecoder("latin1");
  return decoder.decode(buffer);
};
