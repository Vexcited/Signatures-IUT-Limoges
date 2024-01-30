export const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36";

export const SIGNATURES_URL = "https://iut-signatures.unilim.fr/index.php";
export const SIGNATURES_HEADERS = {
  "Content-Type": "application/x-www-form-urlencoded",
  Referer: SIGNATURES_URL,
  "User-Agent": USER_AGENT
};

export const U_VPN_HOST = "https://u-vpn.unilim.fr";
export const U_VPN_LOGIN_URL = U_VPN_HOST + "/remote/logincheck"
export const U_VPN_PORTAL_URL = U_VPN_HOST + "/remote/portal";
export const U_VPN_TMP_TOKEN_COOKIE = "SVPNTMPCOOKIE";
export const U_VPN_TOKEN_COOKIE = "SVPNCOOKIE";