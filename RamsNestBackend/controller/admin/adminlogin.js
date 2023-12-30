const adminloginmodel = require("../../model/admin/adminlogin");

class adminlogin {
  async signup(req, res) {
    let { email, password, cpassword } = req.body;
    try {
      if (!email || !password || !cpassword) {
        return res.status(500).json({ error: "fill all the fields" });
      } else if (password !== cpassword) {
        return res.status(500).json({ error: " password mismatch" });
      } else {
        let admin = new adminloginmodel({
          email,
          password,
          cpassword,
        });
        let save = admin.save();
        if (save) {
          return res.json({ success: "Account created" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async postSignin(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: "Fields must not be empty",
        });
      }

      const data = await adminloginmodel.findOne({ email: email });

      if (!data) {
        return res.status(401).json({
          error: "Invalid Email",
        });
      }

      if (data.password !== password) {
        return res.status(401).json({
          error: "Invalid Password",
        });
      }

      // Update the status to "online"
      await adminloginmodel.updateOne({ email: email }, { status: "online" });

      return res.status(200).json({
        success: "Login Success",
        admin: {
          email: data.email,
          id: data._id,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
}

const adminlogincontroller = new adminlogin();
module.exports = adminlogincontroller;
