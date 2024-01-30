import { U_VPN_HOST, U_VPN_TOKEN_COOKIE } from "../utils/constants";
import { fetchSignaturesPage } from "./signatures";
import { authenticateVPN, readProxyID } from "./vpn"

export const readSignaturesPageFromWebVPN = async (username: string, password: string) => {
  const token = await authenticateVPN(username, password);
  const proxyID = await readProxyID(token);

  const url = `${U_VPN_HOST}/proxy/${proxyID}/https/iut-signatures.unilim.fr/index.php`;
  const cookie = `${U_VPN_TOKEN_COOKIE}=${token}`;

  return fetchSignaturesPage(username, password, { url, cookie });
};

export const readSignaturesPage = async (username: string, password: string) => {
  return fetchSignaturesPage(username, password);
};
