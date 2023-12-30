/* This all of are helper function */
// const patientModel = require("../models/patientmodels/patients");
const customermodel=require("../model/customer/auth");

exports.toTitleCase = function (str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

exports.validateEmail = function (mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  } else {
    return false;
  }
};

exports.validatePhoneNumber = function (number) {
  if (/^[6-9]\d{9}$/.test(number)) {
    return true;
  } else {
    return false;
  }
};

// exports.emailCheckInDatabase = async function (email) {
//   let user = await patientModel.findOne({ email: email });
//   user.exec((err, data) => {
//     if (!data) {
//       return false;
//     } else {
//       return true;
//     }
//   });
// };

exports.phoneNumberCheckInDatabase = async function (phonenumber) {
  let user = await customermodel.findOne({ phonenumber: phonenumber });
  user.exec((err, data) => {
    if (data) {
      return true;
    } else {
      return false;
    }
  });
};
