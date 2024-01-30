export class BadCredentialsVPNError extends Error {
  constructor() {
    super("VPN: Bad credentials.");
  }
}

export class NoSetCookieHeaderVPNError extends Error {
  constructor() {
    super("VPN: No 'Set-Cookie' header found after authenticating.");
  }
}

export class UnreadableVPNError extends Error {
  constructor() {
    super("VPN: Response from the VPN is unreadable.");
  }
}