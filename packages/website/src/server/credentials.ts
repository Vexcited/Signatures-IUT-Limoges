import Cryptr from "cryptr";
if (!process.env.SESSION_SECRET) throw new Error("(.env): 'SESSION_SECRET' is not set.");

const cryptr = new Cryptr(process.env.SESSION_SECRET, { encoding: "base64", saltLength: 10 });

export const encryptCredentials = (username: string, password: string): string => {
  return cryptr.encrypt(`${username}:${password}`);
};

export const decryptCredentials = (encrypted: string): { username: string, password: string } => {
  const [username, password] = cryptr.decrypt(encrypted).split(":");
  return { username, password };
};
