const Health = require("../models/healthModel");
const Contact = require("../models/contactModel");
const Appointment = require("../models/appointmentModel");
const nodemailer = require("nodemailer");
const session = require("express-session");

const loadRegister = async (req, res) => {
  try {
    res.render("register");
  } catch (error) {
    console.log(error.message);
  }
};

const insertHealth = async (req, res) => {
  try {
    const health = Health({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      mobileNumber: req.body.mobileNumber,
      password: req.body.password,
    });

    const healthData = await health.save();

    if (healthData) {
      res.render("register", {
        message:
          "Your Registration has been Completed. Please Login Your Account.",
      });
    } else {
      res.render("register", { message: "Your Registration has been Failed." });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const loadLogin = async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.log(error.message);
  }
};

const verifyLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    const healthData = await Health.findOne({ email: email });
    const id = healthData._id;

    if (healthData) {
      // Compare the provided password with the hashed password in the database
      const passwordMatch = password === healthData.password;

      if (passwordMatch) {
        req.session.userId = healthData._id;
        req.session.health_id = healthData._id;
      

        res.redirect("/home"); // Redirect to home or dashboard
      } else {
        // Password does not match
        res.render("login", { message: "Email and password are incorrect." });
      }
    } else {
      // User not found
      res.render("login", { message: "Email and password are incorrect." });
    }
  } catch (error) {
    console.log(error.message);
    res.render("login", {
      message: "An error occurred during login. Please try again.",
    });
  }
};

const loadHoming = async (req, res) => {
  try {
    res.render("dummyhome");
  } catch (error) {
    console.log(error.message);
  }
};

const loadHome = async (req, res) => {
  try {
    res.render("home");
  } catch (error) {
    console.log(error.message);
  }
};

const loadLogout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/login");
  } catch (error) {
    console.log(error.message);
  }
};

const loadAbout = async (req, res) => {
  try {
    res.render("about");
  } catch (error) {
    console.log(error.message);
  }
};

const loadAppointment = async (req, res) => {
  try {
    res.render("appointment");
  } catch (error) {
    console.log(error.message);
  }
};

const insertContact = async (req, res) => {
  try {
    const contact = Contact({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      mobileNumber: req.body.mobileNumber,
      message: req.body.message,
    });

    const contactData = await contact.save();
    if (contactData) {
      sendContactMail(req.body.firstName, req.body.lastName, req.body.email);

      res.render("home", { message: "Thank You For Contacting Us." });
    } else {
      res.render("home");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const insertAppointment = async (req, res) => {
  try {
    const email = req.params.email;
    const health = await Health.findOne(email);

    const appointment = Appointment({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      mobileNumber: req.body.mobileNumber,
      address: req.body.address,
      gender: req.body.gender,
      date: req.body.date,
      timeSlot: req.body.timeSlot,
      service: req.body.service,
      doctor: req.body.doctor,
      payment: req.body.payment,
      userId: health._id,
    });

    const appointmentData = await appointment.save();
    if (appointmentData) {
      sendAppointmentMail(
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        appointmentData._id,
        req.body.mobileNumber,
        req.body.date,
        req.body.timeSlot,
        req.body.service,
        req.body.doctor,
        req.body.payment
      );
      res.render("appointment");
    } else {
      res.render("appointment");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const sendContactMail = async (firstName, lastName, email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dummy78207@gmail.com",
        pass: "dgsgftcebcenucuy",
      },
    });

    let mailDetails = {
      from: "dummy78207@gmail.com",
      to: email,
      subject: "Thanks for Contact Us.",
      text:
        "HI " +
        firstName +
        "" +
        lastName +
        " Thanking you for contacting us. your request has been resolved in 24 to 48 hours.",
    };

    transporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log("Error Occurs");
      } else {
        console.log("Email sent successfully");
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

const sendAppointmentMail = async (
  firstName,
  lastName,
  email,
  appointment_id,
  mobileNumber,
  date,
  timeSlot,
  service,
  doctor,
  payment
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dummy78207@gmail.com",
        pass: "dgsgftcebcenucuy",
      },
    });

    let mailDetails = {
      from: "dummy78207@gmail.com",
      to: email,
      subject: "Thanks for Booking Appointent.",
      html:
        " <p> Hi  " +
        firstName +
        ", " +
        lastName +
        " Thank you for booking appointment. Your details are as follow.<br>Name: " +
        firstName +
        "" +
        lastName +
        "<br>ID:" +
        appointment_id +
        "<br>Email:" +
        email +
        "<br>MobileNo:" +
        mobileNumber +
        "<br>Date:" +
        date +
        "<br>TimeSlot:" +
        timeSlot +
        "<br>Service:" +
        service +
        "<br>Doctor:" +
        doctor +
        "<br>Payment:" +
        payment +
        " </p>",
    };

    transporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log("Error Occurs");
      } else {
        console.log("Email sent successfully");
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

const loadOrtho = async (req, res) => {
  try {
    res.render("ortho");
  } catch (error) {
    console.log(error.message);
  }
};
const loadCardio = async (req, res) => {
  try {
    res.render("cardio");
  } catch (error) {
    console.log(error.message);
  }
};
const loadEnt = async (req, res) => {
  try {
    res.render("ent");
  } catch (error) {
    console.log(error.message);
  }
};
const loadNeuro = async (req, res) => {
  try {
    res.render("neuro");
  } catch (error) {
    console.log(error.message);
  }
};
const loadOnco = async (req, res) => {
  try {
    res.render("onco");
  } catch (error) {
    console.log(error.message);
  }
};
const loadPeda = async (req, res) => {
  try {
    res.render("peda");
  } catch (error) {
    console.log(error.message);
  }
};
const loadTherapy = async (req, res) => {
  try {
    res.render("ptherapy");
  } catch (error) {
    console.log(error.message);
  }
};
const loadRadio = async (req, res) => {
  try {
    res.render("radio");
  } catch (error) {
    console.log(error.message);
  }
};

const loadProfile = async (req, res) => {
  try {
    const userData = await Health.findById({ _id: req.session.health_id });
    res.render("profile", { health: userData });
  } catch (error) {
    console.log(error.message);
  }
};


module.exports = {
  loadRegister,
  insertHealth,
  loadLogin,
  verifyLogin,
  loadHome,
  loadLogout,
  loadAbout,
  loadAppointment,
  insertContact,
  insertAppointment,
  loadHoming,
  loadOrtho,
  loadCardio,
  loadEnt,
  loadNeuro,
  loadOnco,
  loadPeda,
  loadTherapy,
  loadRadio,
  loadProfile
};
