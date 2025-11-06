import HELP_TEXT from "../helpText";
import type { Handler } from "../types";

const help: Handler = async () => {
  console.log(HELP_TEXT.trim());
};

export default help;
