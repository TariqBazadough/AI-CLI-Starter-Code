export type Command = "hello" | "sum" | "fetch" | "help" | "exit";

export type Handler = (args: string[]) => Promise<void>;
