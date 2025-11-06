import type { Command, Handler } from "../types";
import hello from "./hello";
import sum from "./sum";
import fetchCmd from "./fetch";
import help from "./help";

export const commands: Record<Command, Handler> = {
  hello,
  sum,
  fetch: fetchCmd,
  help,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  exit: async () => {
    // ⚠️ Don't remove — handled by interactive loop.
  },
};
