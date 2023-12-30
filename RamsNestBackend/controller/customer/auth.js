const customermodel = require("../../model/customer/auth");
const {toTitleCase,validateEmail}=require("../../config/function");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/key");

class customerauth {
  async postSignup(req, res) {
    let { name, email, password, cpassword, phonenumber, profileimage ,dob,gender} =
      req.body;

    if (!name || !email || !password || !cpassword || !phonenumber) {
      return res.status(500).json({ error: "Filed must not be empty" });
    }
    if (name.length < 3 || name.length > 25) {
      //   error = { ...error, name: "Name must be 3-25 charecter" };
      return res.status(500).json({ error: "Name must be 3-25 charecter" });
    }
    if (phonenumber.length != 10) {
      //   error = { ...error, name: "Name must be 3-25 charecter" };
      return res.status(500).json({ error: "Enter 10 Digit number" });
    } else {
      if (validateEmail(email)) {
        name = toTitleCase(name);
        if ((password.length > 255) | (password.length < 8)) {
          return res
            .status(403)
            .json({ error: "Password must be 8 charecter" });
        } else {
          // If Email & Number exists in Database then:
          try {
            password = bcrypt.hashSync(password, 10);
            const data = await customermodel.findOne({ email: email });
            if (data) {
              return res.status(403).json({ error: "Email already exists" });
            } else {
              const data = await customermodel.findOne({
                phonenumber: phonenumber,
              });
              if (data) {
                return res
                  .status(403)
                  .json({ error: "Phone number is already exists" });
              } else {
                let newUser = new customermodel({
                  name,
                  email,
                  password,
                  phonenumber,
                  profileimage,
                  role: 1,
                  dob:"",
                  gender:"",
                  usertype: "email",
                });
                newUser
                  .save()
                  .then((data) => {
                    return res.json({
                      success: "Account create successfully. Please login",
                      user: {
                        id: data._id,
                        name: data.name,
                        email: data.email,
                        phonenumber: data.phonenumber,
                        status: data.status,
                        usertype: data.usertype,
                        profileimage: "",
                        dob:"",
                        gender:"",
                      },
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            }
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        return res.status(403).json({ error: "Email is not valid" });
      }
    }
  }

  async postSignin(req, res) {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).json({
        error: "Fields must not be empty",
      });
    }
    try {
      const data = await customermodel.findOneAndUpdate(
        { email: email },
        { status: "online" }
      );
      if (!data) {
        return res.status(403).json({
          error: "Invalid email",
        });
      } else {
        const login = await bcrypt.compare(password, data.password);
        console.log(login);
        if (login) {
          const token = jwt.sign(
            {
              id: data._id,
              name: data.name,
              email: data.email,
              phonenumber: data.phonenumber,
              profileimage:data.profileimage,
            
            },
            JWT_SECRET
          );
          const encode = jwt.verify(token, JWT_SECRET);

          return res.json({
            token: token,
            user: encode,
          });
        } else {
          return res.status(403).json({
            error: "Invalid password",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getallcustomer(req, res) {
    const customers = await customermodel.find({});
    if (customers) {
      return res.json({ customers: customers });
    } else {
      return res.status(500).json({ error: "something went to wrong" });
    }
  }
  async getsignout (req,res){
    let user = req.params.id;
    try {
    const data = await  customermodel.findOneAndUpdate({ _id: user },{status:"offline"});
    if(!data){
      return res.status(403).json({
        error: "Cannot able to find the user",
      });
    }
    else{
      return res.json({success:"Sign Out Successful"});
    }
  } catch (err) {
    console.log(err);
  }
  }


  async postupdaterofile(req, res) {
    let id = req.params.id;
    let file = req.file.filename;
    let data = await customermodel.findOneAndUpdate(
      { _id: id },
      {
        profileimage: file,
      }
    );
    let {dob}=req.body;
    if (data) {
      console.log(data);
      return res.json({
        success: "Updated",
        user: {
          id: data._id,
          name: data.name,
          email: data.email,
          phonenumber: data.phonenumber,
          profileimage: file,
          dob:dob,
          usertype: data.usertype,
        },
      });
    } else {
      return res.status(500).json({ error: "failed" });
    }
  }
  async updatecustomer(req, res) {
    let id = req.params.id;
    let { name, email, phonenumber,dob,gender } = req.body;

    let data = await customermodel.findOneAndUpdate(
      { _id: id },
      {
        name,
        phonenumber,
        email,
        dob,
        gender
      }
    );
    if (data) {
      return res.json({
        success: "updated successfuly",
        user: {
          id: data._id,
          name: name,
          email: email,
          phonenumber: phonenumber,
          status: data.status,
          usertype: data.usertype,
          profileimage: data.profileimage,
          dob:data.dob,
          gender:data.gender
        },
      });
    }
  }
  async postfacebook(req, res) {
    let { facebookid, name, email, profileimage } = req.body;
    try {
      const data = await customermodel.findOne({ facebookid: facebookid });

      if (data) {
        return res.json({
          user: {
            id: data._id,
            role: data.userRole,
            name: data.name,
            email: data.email,
            profileimage: data.profileimage,
            profilestatus: data.profilestatus,
            usertype: data.usertype,
            gender:data.gender,
            dob:data.dob
          },
        });
      } else {
        let newUser = new customermodel({
          facebookid,
          name,
          email,
          profileimage,
          usertype: "facebook",
          dob:"",
          gender:"",
          // ========= Here role 1 for admin signup role 0 for customer signup =========
          role: 1,
        });
        newUser
          .save()
          .then((data) => {
            return res.json({
              success: "Account create successfully. Please login",
              user: {
                id: data._id,
                role: data.userRole,
                name: data.name,
                email: data.email,
                profileimage: data.profileimage,
                profilestatus: data.profilestatus,
                usertype: data.usertype,
                gender:data.gender,
                dob:data.dob
              },
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async postgoogle(req, res) {
    let { googleId, name, email, profileimage } = req.body;
    try {
      const data = await customermodel.findOne({ googleId: googleId });
      if (data) {
        return res.json({
          user: {
            id: data._id,
            role: data.userRole,
            name: data.name,
            email: data.email,
            profileimage: data.profileimage,
            usertype: data.usertype,
            gender:data.gender,
            dob:data.dob
          },
        });
      } else {
        let newUser = new customermodel({
          googleId,
          usertype: "google",
          name,
          profileimage,
          email,
          dob:"",
          gender:"",
          // ========= Here role 1 for admin signup role 0 for customer signup =========
          role: 1,
        });
        newUser
          .save()
          .then((data) => {
            return res.json({
              success: "Account create successfully. Please login",
              user: {
                id: data._id,
                role: data.userRole,
                name: data.name,
                email: data.email,
                profileimage: data.profileimage,
                usertype: data.usertype,
                gender:data.gender,
                dob:data.dob
              },
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      console.log(error);
    }
  }

}

const customercontroller=new customerauth();
module.exports=customercontroller;