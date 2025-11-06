import type { Handler } from "../types";

const fetchCmd: Handler = async (args) => {
  const url = args[0];
  if (!url) {
    console.error(
      "❌ Please provide a URL. Example: ai-cli fetch https://jsonplaceholder.typicode.com/users"
    );
    return;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`❌ HTTP ${res.status} ${res.statusText}`);
      return;
    }

    // try JSON first; fall back to text
    const text = await res.text();
    try {
      const data = JSON.parse(text);

      if (Array.isArray(data)) {
        console.table(data.slice(0, 5));
        console.log(
          `📊 Displaying ${Math.min(data.length, 5)} of ${data.length} items`
        );
      } else if (data && typeof data === "object") {
        console.table([data]);
      } else {
        console.log(text.slice(0, 200), text.length > 200 ? "..." : "");
      }
    } catch {
      // not JSON — just preview text
      const preview = text.slice(0, 200).replace(/\s+/g, " ");
      console.log(preview, text.length > 200 ? "..." : "");
    }
  } catch (err) {
    console.error(`❌ Fetch failed: ${(err as Error).message}`);
  }
};

export default fetchCmd;
