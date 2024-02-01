import { readCredentials } from "./_credentials";
import { readSignaturesPageFromWebVPN, dumpSignatureResponse } from "../src";

const credentials = readCredentials();

(async () => {
  // Useful when you are NOT connected to the university's network / VPN.
  const html = await readSignaturesPageFromWebVPN(credentials.username, credentials.password);
  const dump = dumpSignatureResponse(html);

  console.log(dump);
})();
