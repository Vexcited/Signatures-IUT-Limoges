import { SIGNATURES_URL, USER_AGENT } from "../utils/constants";
import { httpTLS } from "../utils/httpTLS";

export const fetchSignaturesPage = async (username: string, password: string, options = {
  /**
   * Prefer this URL instead of the default one.
   * @default "https://iut-signatures.unilim.fr/index.php"
   */
  url: SIGNATURES_URL,

  /**
   * Value passed to the `Cookie` header.
   * @default ""
   */
  cookie: ""
}): Promise<string> => {
  let data: string | undefined;
  const body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
  const contentType = "application/x-www-form-urlencoded";

  try {
    const response = await fetch(options.url, {
      method: "POST",
      body,
      headers: {
        Cookie: options.cookie,
        "User-Agent": USER_AGENT,
        "Content-Type": contentType
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
        let response = await httpTLS({
          method: "POST",
          contentType,
          body,
          cookie: options.cookie,
          href: options.url
        });

        // Cut everything before <html
        response = response.slice(response.indexOf("<html"));
        // Cut everything after </html>
        response = response.slice(0, response.indexOf("</html>") + 7);

        data = response;
      }
    }

    if (!data) throw e;
  }

  return data;
};
