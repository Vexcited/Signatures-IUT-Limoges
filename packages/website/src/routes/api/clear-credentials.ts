import type { APIHandler } from "@solidjs/start/server/types";
import { createLogoutResponse } from "../../server/logout";

export const GET: APIHandler = async ({ nativeEvent }) => createLogoutResponse(nativeEvent);
