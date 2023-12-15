const express = require("express");
const app = express();
const session = require("express-session");

app.use(
  session({
    secret: "a secret string",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  })
);
app.listen(8080);


app.get("/countUp", (req, res, next) => {
  req.session.count = (req.session.count ?? 0) + 1;
  res.redirect("/");
});

app.get("/regenerate", (req, res, next) => {
  req.session.regenerate(() => {
    res.redirect("/");
  });
});

app.get("/destroy", (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

app.get("/", async (req, res, next) => {
  res.setHeader("Content-Type", "text/html");
	res.write("<p><a href='/countUp'>countUp</a></p>");
  res.write("<p><a href='/regenerate'>regenerate</a></p>");
  res.write("<p><a href='/destroy'>destroy</a></p>");
  res.write("<p>id: " + req.session.id + "</p>");
  res.write(
    "<div style='white-space: pre;'>" +
      JSON.stringify(req.session, null, 2) +
      "</div>"
  );
  res.end();
});
