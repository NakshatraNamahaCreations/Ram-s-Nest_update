import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import axios from "axios";

function Addfood() {
  const [category, setcategory] = useState("");
  const [subcategory, setsubcategory] = useState("");
  const [categorydata, setcategorydata] = useState([]);
  const [subcategorydata, setsubcategorydata] = useState([]);
  const apiURL = "https://api.ramsnesthomestay.com/api";
  const [image1, setimage1] = useState("");
  const [image2, setimage2] = useState("");
  const [image3, setimage3] = useState("");
  const [foodname, setfoodname] = useState("");
  const [fooddesc, setfooddesc] = useState("");
  const [foodprice, setfoodprice] = useState("");
  const [foodvolume, setfoodvolume] = useState("");
  const [foodvolumetype, setfoodvolumetype] = useState("");

  const [foodfeatures, setfoodfeatures] = useState("");
  const [customerofferprice, setcustomerofferprice] = useState("");
  const [foodsize, setfoodsize] = useState("");
  const formdata = new FormData();

  useEffect(() => {
    getcategory();
  }, []);

  const addfood = async (e) => {
    e.preventDefault();
    if (!image1 || !image2 || !image3) {
      alert("Please select images");
    }
    if (
      !foodname ||
      !fooddesc ||
      !foodprice ||
      !foodvolume ||
      !foodvolumetype ||
      !category
    ) {
      alert("please enter all fields");
    }
    formdata.append("foodimage", image1);
    formdata.append("foodimage", image2);
    formdata.append("foodimage", image3);
    formdata.append("foodname", foodname);
    formdata.append("fooddesc", fooddesc);
    formdata.append("foodprice", foodprice);
    formdata.append("foodvolume", foodvolume);
    formdata.append("foodvolumetype", foodvolumetype);
    formdata.append("customerofferprice", customerofferprice);
    formdata.append("foodfeatures", foodfeatures);
    formdata.append("category", category);
    formdata.append("subcategory", subcategory);
    try {
      const config = {
        url: "/addfood",
        method: "post",
        baseURL: apiURL,
        data: formdata,
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          console.log("success");
          console.log(response.data.foods);
          alert("Successfully added");
          window.location.assign("/food");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getcategory = async () => {
    let res = await axios.get(apiURL + "/getcategory");
    if ((res.status = 200)) {
      console.log(res);
      setcategorydata(res.data?.category);
    }
  };

  useEffect(() => {
    postallsubcategory();
  }, [category]);

  const postallsubcategory = async () => {
    let res = await axios.post(apiURL + "/postsubcategory", {
      categoryname: category,
    });
    if ((res.status = 200)) {
      console.log(res);
      setsubcategorydata(res.data?.subcategory);
    }
  };
  return (
    <div>
      <div className="row me-0">
        <Header />
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10">
          <div className="magin">
            <Card
              className="text-center mt-5"
              style={{
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
            >
              <h5 className="pt-5"> Add food</h5>
              <Card.Body>
                {/* <div className="row me-0">
                  <div className="col-1"></div>
                  <div className="col-3">
                    <div>
                      <h5 style={{ marginRight: "100px" }}>food icon</h5>
                    </div>
                    <div className="mt-4">
                      <input
                        type="file"
                        style={{ border: "none" }}
                        onChange={(e) => setimage1(e.target.files[0])}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-3">
                    <div>
                      <h5 style={{ marginRight: "100px" }}>food image</h5>
                    </div>
                    <div className="mt-4">
                      <input
                        type="file"
                        style={{ border: "none" }}
                        onChange={(e) => setimage2(e.target.files[0])}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-3">
                    <div>
                      <h5 style={{ marginRight: "100px" }}>food image</h5>
                    </div>
                    <div className="mt-4">
                      <input
                        type="file"
                        style={{ border: "none" }}
                        onChange={(e) => setimage3(e.target.files[0])}
                        required
                      />
                    </div>
                  </div>
                </div> */}
                <form autoComplete="off">
                  <div className="row pt-3">
                    <div className="col-4">
                      <FormControl>
                        <InputLabel id="demo-simple-select-label">
                          Category
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          style={{ width: "275px" }}
                          onChange={(e) => setcategory(e.target.value)}
                        >
                          {categorydata.map((allcategory) => (
                            <MenuItem value={allcategory.categoryname}>
                              {allcategory.categoryname}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    {/* <div className="col-4">
                      <FormControl>
                        <InputLabel id="demo-simple-select-label">
                          Sub Category
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          style={{ width: "275px" }}
                          onChange={(e) => setsubcategory(e.target.value)}
                        >
                          {subcategorydata.map((allsubcategory) => (
                            <MenuItem value={allsubcategory.subcategoryname}>
                              {allsubcategory.subcategoryname}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div> */}
                    <div className="mt col-4">
                      <TextField
                        id="standard-secondary"
                        label="food Name *"
                        style={{ width: "275px" }}
                        onChange={(e) => setfoodname(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row pt-3">
                    <div className="mt col-4">
                      <TextField
                        id="standard-secondary"
                        label="food price"
                        style={{ width: "275px" }}
                        onChange={(e) => setfoodprice(e.target.value)}
                      />
                    </div>
                    {/* <div className="mt col-4">
                      <TextField
                        id="standard-secondary"
                        label="food Description"
                        style={{ width: "275px" }}
                        onChange={(e) => setfooddesc(e.target.value)}
                      />
                    </div> */}

                    {/* <div className="mt col-4">
                      <TextField
                        id="standard-secondary"
                        label="food Features"
                        style={{ width: "275px" }}
                        onChange={(e) => setfoodfeatures(e.target.value)}
                      />
                    </div> */}
                  </div>
                  {/* 
                  <div className="row pt-3">
                    <div className="mt col-4">
                      <TextField
                        id="standard-secondary"
                        label="Customer Offer Price"
                        style={{ width: "275px" }}
                        onChange={(e) => setcustomerofferprice(e.target.value)}
                      />
                    </div>
                    <div className="mt col-4">
                      <TextField
                        id="standard-secondary"
                        label="food Volume"
                        style={{ width: "275px" }}
                        onChange={(e) => setfoodvolume(e.target.value)}
                      />
                    </div>
                    <div className="mt col-4">
                      <TextField
                        id="standard-secondary"
                        label="food Volume Type"
                        style={{ width: "275px" }}
                        onChange={(e) => setfoodvolumetype(e.target.value)}
                      />
                    </div>
                   
                  </div> */}
                  <div className="row pt-3"></div>
                </form>
                <button
                  className="btn btn-outline-primary mt-4"
                  onClick={addfood}
                >
                  Add food
                </button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addfood;
