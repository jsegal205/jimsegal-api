import path from "path";
import * as url from "url";

const getAll = async (req, res) => {
  const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
  res.sendFile(path.join(__dirname, "../docs", "index.html"));
};

export { getAll };
