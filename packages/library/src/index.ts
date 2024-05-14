export { readSignaturesPageFromWebVPN, readSignaturesPage } from "./fetcher";
export { dumpSignatureResponse } from "./parser";

export type {
  SignaturesDump,
  SignaturesModuleDump,
  SignaturesSemesterDump,
  SignaturesSkillDump
} from "./parser/types";

export { WrongCredentials } from "./utils/error";

// Re-export error classes when using the web VPN.
export { WrongCredentials as WebVPNWrongCredentials, RateLimited as WebVPNRateLimited } from "fortigate-web-sslvpn";
