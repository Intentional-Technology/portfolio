import { parse } from "url";
import next from "next";
import { createServer } from "http";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const PERMANENT_REDIRECT_STATUS = 301;

function handleRequestFn(req, res) {
  if (process.env.ON_HEROKU && req.headers["x-forwarded-proto"] !== "https") {
    res.writeHead(PERMANENT_REDIRECT_STATUS, {
      Location: "https://" + req.headers.host + req.url,
    });
    res.end();
  } else {
    const parsedUrl = parse(req.url, true /* parse query portion of URL */);
    handle(req, res, parsedUrl);
  }
}

app.prepare().then(() => {
  let server = createServer(handleRequestFn);
  let port = process.env.PORT || 3001;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log("Running on port " + port);
  });
});
