export class WrongCredentials extends Error {
  constructor() {
    super("Wrong credentials");
  }
}
