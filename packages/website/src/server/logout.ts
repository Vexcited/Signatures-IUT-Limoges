import { type EventHandlerRequest, type H3Event, setCookie } from "vinxi/http";

/**
 * Removes the "credentials" cookie from the client
 * and returns a 403 status code.
 */
export const createLogoutResponse = (nativeEvent: H3Event<EventHandlerRequest>): Response => {
  setCookie(nativeEvent, "credentials", "", {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    expires: new Date(0)
  });

  return new Response("Les identifiants sont incorrects.", { status: 403 });
};
