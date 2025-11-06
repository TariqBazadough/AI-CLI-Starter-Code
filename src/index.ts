import { main } from "./cli";

main().catch((e) => {
  console.error("❌ Unexpected error:", e);
  process.exit(1);
});
