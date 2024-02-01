import { readCredentials } from "./_credentials";
import { readSignaturesPage, dumpSignatureResponse } from "../src";

const credentials = readCredentials();

(async () => {
  // Sadly, since self-signed certificates are used, we need to disable the TLS check.
  // This is not recommended, but it is the only way to make it work easily on Node.js.
  // Otherwise, you'd need to do some certificate management.
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  // Useful when you are connected to the university's network / VPN.
  const html = await readSignaturesPage(credentials.username, credentials.password);
  const dump = dumpSignatureResponse(html);

  console.log(dump);
})();
