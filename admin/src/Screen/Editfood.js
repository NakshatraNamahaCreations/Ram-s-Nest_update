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
import { useLocation } from "react-router-dom";

function Editfood() {
  const location = useLocation();
  const { data } = location.state;
  const [category, setcategory] = useState(data.category);
  const [subcategory, setsubcategory] = useState(data.subcategory);
  const [categorydata, setcategorydata] = useState([]);
  const [subcategorydata, setsubcategorydata] = useState([]);
  const apiURL = "https://api.ramsnesthomestay.com/api";
  const [productname, setproductname] = useState(data.productname);
  const [productdesc, setproductdesc] = useState(data.productdesc);
  const [productprice, setproductprice] = useState(data.productprice);
  const [productgst, setproductgst] = useState(data.productgst);
  const [productvolume, setproductvolume] = useState(data.productvolume);
  const [productvolumetype, setproductvolumetype] = useState(
    data.productvolumetype
  );
  const [totalstock, settotalstock] = useState(data.totalstock);
  const [productfeatures, setproductfeatures] = useState(data.productfeatures);
  const [customerofferprice, setcustomerofferprice] = useState(
    data.customerofferprice
  );
  const [productsize, setproductsize] = useState("");
  const formdata = new FormData();

  useEffect(() => {
    getcategory();
  }, []);

  const editproduct = async (e) => {
    formdata.append("productname", productname);
    formdata.append("productdesc", productdesc);
    formdata.append("productprice", productprice);
    formdata.append("productgst", productgst);
    formdata.append("productvolume", productvolume);
    formdata.append("productvolumetype", productvolumetype);
    formdata.append("customerofferprice", customerofferprice);
    formdata.append("productfeatures", productfeatures);
    formdata.append("totalstock", totalstock);
    formdata.append("category", category);
    formdata.append("subcategory", subcategory);
    axios({
      method: "post",
      url: `https://api.ramsnesthomestay.com/api/product/editproduct/${data._id}`,
      data: formdata,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success

        window.location.assign("/admin/products");
        alert("Updated successfully");
      })
      .catch(function (error) {
        //handle error
        console.log(error);
      });
  };

  const getcategory = async () => {
    let res = await axios.get(apiURL + "/admin/category/getcategory");
    if ((res.status = 200)) {
      setcategorydata(res.data?.category);
    }
  };

  useEffect(() => {
    postallsubcategory();
  }, [category]);

  const postallsubcategory = async () => {
    let res = await axios.post(apiURL + "/admin/subcategory/postsubcategory", {
      categoryname: category,
    });
    if ((res.status = 200)) {
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
              <h5 className="pt-5"> Edit Food</h5>
              <Card.Body>
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
                          placeholder={data.category}
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
                    <div className="col-4">
                      <FormControl>
                        <InputLabel id="demo-simple-select-label">
                          Sub Category
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          style={{ width: "275px" }}
                          placeholder={data.subcategory}
                          onChange={(e) => setsubcategory(e.target.value)}
                        >
                          {subcategorydata.map((allsubcategory) => (
                            <MenuItem value={allsubcategory.subcategoryname}>
                              {allsubcategory.subcategoryname}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="mt col-4">
                      <TextField
                        id="standard-secondary"
                        label="Product Name *"
                        style={{ width: "275px" }}
                        placeholder={data.productname}
                        onChange={(e) => setproductname(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row pt-3">
                    <div className="mt col-4">
                      <TextField
                        id="standard-secondary"
                        label="Product price"
                        style={{ width: "275px" }}
                        placeholder={data.productprice}
                        onChange={(e) => setproductprice(e.target.value)}
                      />
                    </div>
                    <div className="mt col-4">
                      <TextField
                        id="standard-secondary"
                        label="Product Description"
                        style={{ width: "275px" }}
                        placeholder={data.productdesc}
                        onChange={(e) => setproductdesc(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row pt-3">
                    <div className="mt col-4">
                      <TextField
                        id="standard-secondary"
                        label="Product Volume"
                        style={{ width: "275px" }}
                        placeholder={data.productvolume}
                        onChange={(e) => setproductvolume(e.target.value)}
                      />
                    </div>
                    <div className="mt col-4">
                      <TextField
                        id="standard-secondary"
                        label="Product Volume Type"
                        style={{ width: "275px" }}
                        placeholder={data.productvolumetype}
                        onChange={(e) => setproductvolumetype(e.target.value)}
                      />
                    </div>
                    <div className="mt col-4">
                      <TextField
                        id="standard-secondary"
                        label="Product Size"
                        style={{ width: "275px" }}
                        placeholder={data.productsize}
                        onChange={(e) => setproductsize(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row pt-3">
                    <div className="mt col-4">
                      <TextField
                        id="standard-secondary"
                        label="Customer Offer Price"
                        style={{ width: "275px" }}
                        placeholder={data.customerofferprice}
                        onChange={(e) => setcustomerofferprice(e.target.value)}
                      />
                    </div>
                    <div className="mt col-4">
                      <TextField
                        id="standard-secondary"
                        label="Product Features"
                        style={{ width: "275px" }}
                        placeholder={data.productfeatures}
                        onChange={(e) => setproductfeatures(e.target.value)}
                      />
                    </div>

                    <div className="mt col-4">
                      <TextField
                        id="standard-secondary"
                        label="Total Stock"
                        style={{ width: "275px" }}
                        placeholder={data.totalstock}
                        onChange={(e) => settotalstock(e.target.value)}
                      />
                    </div>
                  </div>
                </form>
                <button
                  className="btn btn-outline-primary mt-4"
                  onClick={editproduct}
                >
                  Update Product
                </button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editfood;
