import type { Handler } from "../types";

const hello: Handler = async (args) => {
  const name = args[0] ?? "there";
  console.log(`👋 Hello, ${name}!`);
};

export default hello;
