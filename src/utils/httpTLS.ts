import { connect } from "node:tls";
import { USER_AGENT } from "./constants";

/**
 * A simple HTTP client that uses TLS, only
 * when the Node.js HTTP client fails on the VPN.
 * 
 * Should only be used for the Signatures website
 * because VPN values are small enough to be retrieved
 * through the error data.
 */
export const httpTLS = async (init: {
  href: string,
  method: string
  contentType?: string
  cookie?: string
  body?: string
}) => new Promise<string>(resolve => {
  const url = new URL(init.href);

  const net = connect({ host: url.host, port: 443 }, () => {
    const req = [
      `POST ${url.pathname} HTTP/1.1`,
      'User-Agent: ' + USER_AGENT,
    ];

    if (init.contentType)
      req.push(
        'Content-Length: ' + init.body?.length ?? '0',
        'Content-Type: ' + init.contentType,
      )
    if (init.cookie)
      req.push(
        'Cookie: ' + init.cookie,
      )

    req.push('Host: ' + url.host, "");
    if (init.body && init.method !== "GET") {
      req.push(init.body)
    }
    req.push("");
    
    net.write(req.join('\r\n'));
  });

  let data = "";
  net.on('data', chunk => data += chunk);
  net.on('end', () => resolve(data));
});
