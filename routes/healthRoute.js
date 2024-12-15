const express = require("express");
const health_route = express();
const session = require("express-session");
const config = require("../config/config");
health_route.use(session({ secret: config.sessionSecret }));
const Verify = require("../middleware/auth");

health_route.set("view engine", "ejs");
health_route.set("views", "./views");

const bodyparser = require("body-parser");
health_route.use(bodyparser.json());
health_route.use(bodyparser.urlencoded({ extended: true }));
const healthController = require("../controllers/healthController");
health_route.get("/", healthController.loadHoming);

health_route.get("/register", Verify.isLogout, healthController.loadRegister);
health_route.post("/register", Verify.isLogout, healthController.insertHealth);
health_route.get("/login", Verify.isLogout, healthController.loadLogin);
health_route.post("/login", Verify.isLogout, healthController.verifyLogin);
health_route.get("/home", Verify.isLogin, healthController.loadHome);
health_route.get("/logout", Verify.isLogin, healthController.loadLogout);
health_route.get("/about", Verify.isLogin, healthController.loadAbout);
health_route.get(
  "/appointment",
  Verify.isLogin,
  healthController.loadAppointment
);
health_route.post(
  "/appointment",
  Verify.isLogin,
  healthController.insertAppointment
);
health_route.post("/contact", Verify.isLogin, healthController.insertContact);

health_route.get("/get-ortho", Verify.isLogin, healthController.loadOrtho);
health_route.get("/get-cardio", Verify.isLogin, healthController.loadCardio);
health_route.get("/get-ent", Verify.isLogin, healthController.loadEnt);
health_route.get("/get-neuro", Verify.isLogin, healthController.loadNeuro);
health_route.get("/get-onco", Verify.isLogin, healthController.loadOnco);
health_route.get("/get-peda", Verify.isLogin, healthController.loadPeda);
health_route.get("/get-therapy", Verify.isLogin, healthController.loadTherapy);
health_route.get("/get-radio", Verify.isLogin, healthController.loadRadio);

health_route.get("/profile", Verify.isLogin, healthController.loadProfile);

module.exports = health_route;
