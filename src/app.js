const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const fs = require("fs");

// defining port
const port = process.env.PORT || 3000;

// defining the path for express congig
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templets/views");
const partialsPath = path.join(__dirname, "../templets/partials");

// setting the handlebar engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Das",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Das",
  });
});

app.get("/help", (req, res) => {
  const path = "/Users/suhrid/Desktop/Node Course/web-server/log-file/logs.log";
  let data ={};
  if (fs.existsSync(path)) {
    let protocol = req.protocol;
    // req.protocol = protocol === 'https' ? 'http': 'https'
    data = {
      data: new Date,
      protocol: req.protocol,
      qurey: JSON.stringify(req.query)
    }
    fs.appendFile(path, JSON.stringify(data), (err) => {
      if (err) {
        console.log("Unable to create file");
      }
    });
  } else {
    fs.writeFile(path, JSON.stringify(data), (err) => {
      if (err) {
        console.log("Unable to create file");
      }
    });
  }

  res.render("help", {
    title: req.query.error,
    name: "Das",
  });
});

app.get("/weather", (req, res) => {
  let address;
  if (!req.query.address) {
    // address = "fetch:ip";
    return res.send({
      error: "Please enter address to fetch weather.",
    });
  } else {
    if (req.query.address.indexOf(",") !== -1) {
      const addrArray = req.query.address.split(",");
      address = addrArray.join(",");
    } else {
      address = req.query.address;
    }
  }
  let msisdnObj = {
    msisdn: req.headers["x-msisdn"],
    imsi: req.headers["x-imsi"],
  };
  //   const addrArray = req.query.address.split(',');
  //   const address = addrArray.join(',');
  forecast(address, (err, data) => {
    if (err) {
      return res.send({ error: err });
    }
    res.send({
      data,
      msisdnObj,
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("help_data", {
    title: "Help - data",
    message: "No data found. Please visit later.",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "Error 404",
    message: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
