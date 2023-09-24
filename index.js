const http = require("http");
const fs = require("fs");

//Data
const htmlfile = fs.readFileSync("./index.html", "utf-8");
const jsondata = JSON.parse(fs.readFileSync("./data.json"));
const product = jsondata.products[0];

//Server
const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
      res.setHeader("Content-Type", "text/html");
      res.end("Hello!");
      break;

    case "/api":
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(jsondata));
      break;

    case "/html":
      res.setHeader("Content-Type", "text/html");
      const newhtmlfile = htmlfile
        .replace("**title**", product.title)
        .replace("**price**", product.price)
        .replace("**rating", product.rating)
        .replace("**url**", product.thumbnail);
      res.end(newhtmlfile);
      break;

    default:
      res.setHeader("Content-Type", "text/html");
      res.end("This is the default page :D");
      break;
  }
});

server.listen(8080);
