import type { Handler } from "../types";

const sum: Handler = async (args) => {
  const a = Number(args[0]);
  const b = Number(args[1]);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error("❌ Please provide two numbers. Example: ai-cli sum 3 7");
    return;
  }
  console.log(`➕ ${a} + ${b} = ${a + b}`);
};

export default sum;
