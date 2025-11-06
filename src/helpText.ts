const HELP_TEXT = `
ai-cli (basic)

Usage:
  ai-cli <command> [args]

Commands:
  hello <name>        Prints a friendly greeting
  sum <a> <b>         Adds two numbers
  fetch <url>         GETs a URL and prints JSON as a table when possible
  help                Show this help
  exit                Quit (only in interactive mode)

Examples:
  ai-cli hello Aya
  ai-cli sum 3 7
  ai-cli fetch https://jsonplaceholder.typicode.com/users
`;

export default HELP_TEXT;
