import http from "node:http";
import fs from "node:fs";
const server = http.createServer(async (req, res) => {
  // set header type
  res.setHeader("Content-Type", "text/html");
  let path = "./views/";
  switch (req.url) {
    case "/":
      res.statusCode = 200;
      path += "index.html";
      break;
    case "/about":
      res.statusCode = 200;
      path += "about.html";
      break;
    case "/contact-me":
      res.statusCode = 200;
      path += "contact-me.html";
      break;
    case "/contact":
      res.statusCode = 301;
      res.setHeader("Location", "/contact-me");
      res.end()
      break;
    default:
      res.statusCode = 404;
      path += "404.html";
      break;
  }
  try {
    const HTML = await fs.promises.readFile(path);
    res.end(HTML);
  } catch (err) {
    console.log(err);
    res.end();
  }
});

server.listen(3000, "localhost", () => {
  console.log("listening on 3000 port");
});
