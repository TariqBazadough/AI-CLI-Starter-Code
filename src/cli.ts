import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import type { Command } from "./types";
import { commands } from "./commands";

/**
 * parseArgv
 * ----------
 * Turns `process.argv` into `{ cmd, args }`.
 * - argv[0] = node binary
 * - argv[1] = script path
 * - argv[2] = command
 * - argv[3...] = args
 */
export function parseArgv(argv: string[]): { cmd: Command; args: string[] } {
  const [, , maybeCmd, ...rest] = argv;
  const raw = (maybeCmd ?? "help").toLowerCase();
  const valid: Command[] = ["hello", "sum", "fetch", "help", "exit"];
  const cmd = (valid.includes(raw as Command) ? raw : "help") as Command;
  return { cmd, args: rest };
}

/**
 * runCommand
 * ----------
 * Looks up a handler in the command registry and executes it.
 * Unknown commands fall back to help.
 */
export async function runCommand(cmd: Command, args: string[]): Promise<void> {
  const handler = commands[cmd] ?? commands.help;
  await handler(args);
}

/**
 * interactive
 * -----------
 * Starts a readline loop for multi-command sessions.
 * Type `help` to see options, `exit` to quit.
 */
export async function interactive(): Promise<void> {
  console.log("🧰 ai-cli interactive mode (type 'help' or 'exit')\n");
  const rl = createInterface({ input, output });
  try {
    while (true) {
      const line = (await rl.question("> ")).trim();
      if (!line) continue;
      const [rawCmd, ...args] = line.split(/\s+/);
      const cmd = (rawCmd.toLowerCase() as Command) || "help";
      if (cmd === "exit") break;
      await runCommand(cmd, args);
    }
  } finally {
    rl.close();
  }
}

/**
 * main
 * ----
 * Entry point:
 * - if user provided args → run once
 * - otherwise → open interactive mode
 */
export async function main(): Promise<void> {
  const { cmd, args } = parseArgv(process.argv);
  if (process.argv.length <= 2) {
    await interactive();
  } else {
    await runCommand(cmd, args);
  }
}
