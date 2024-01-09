import React, { useEffect, useState, useRef } from "react";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import { Link } from "react-router-dom";
// import { lable, MenuItem, Select, TextField } from "@material-ui/core";

function Rooms() {
  const [isOpen, setIsOpen] = useState(false);
  const { SearchBar, ClearSearchButton } = Search;
  const [selected, setselected] = useState([]);
  const [stock, setstock] = useState("");
  const [free, setfree] = useState("");
  const [date, setdate] = useState(new Date());
  const [basicprice, setbasicprice] = useState("");
  const [tax, settax] = useState("");
  const [food, setfood] = useState([]);
  const [excel, setexcel] = useState();
  const [foodImage, setFoodImage] = useState("");
  const [data1, setdata1] = useState([]);
  const formdata = new FormData();
  const { ExportCSVButton } = CSVExport;
  const tableRef = useRef(null);
  const [categoryObjects, setCategoryObjects] = useState({});
  const [categorydata, setcategorydata] = useState([]);
  const [category, setcategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [dishType, setDishType] = useState("");
  const [foodprice, setfoodprice] = useState("");
  const [foodname, setfoodname] = useState("");
  const [showEdit, setShowEdit] = useState(false);

  const imageURL = "https://api.ramsnesthomestay.com/api";
  const apiURL = "https://api.ramsnesthomestay.com/api";

  const showModal = (row) => {
    setShowEdit(true);
    setCategoryObjects(row);
  };

  console.log("categoryObjects", categoryObjects);

  const hideModal = () => {
    setIsOpen(false);
  };

  const remove = async (data) => {
    axios({
      method: "post",
      url: "https://api.ramsnesthomestay.com/api/deletefood/" + data._id,
    })
      .then(function (response) {
        //handle success
        console.log(response);
        window.location.reload();
      })
      .catch(function (error) {
        //handle error
        console.log(error.response.data);
      });
  };

  function imageFormatter(cell, row) {
    return (
      <img
        src={`${imageURL}/food/${row.foodimage}`}
        height="60px"
        width="60px"
        style={{ borderRadius: "100%" }}
      />
    );
  }

  const columns = [
    {
      dataField: "",
      text: "Sl.No",
      formatter: (cell, row, rowIndex) => {
        return rowIndex + 1;
      },
    },
    {
      dataField: "category",
      text: "Category",
      sort: true,
    },
    {
      dataField: "foodname",
      text: "Food Name",
    },
    {
      dataField: "foodprice",
      text: "Food Price",
      formatter: (cell, row) => {
        // Assuming cell is a number representing the price
        if (typeof cell === "number") {
          return cell.toFixed(2);
        }
        // If the cell is not a number, you may want to handle it accordingly
        return cell;
      },
    },
    {
      dataField: "",
      text: "Image",
      formatter: (cell, row) => {
        return (
          <div>
            <img
              src={`https://api.ramsnesthomestay.com/api/food/${row.foodimage}`}
              alt={`Food Image`}
              style={{ width: "60px", height: "60px", borderRadius: "100%" }}
            />
          </div>
        );
      },
    },
    {
      dataField: "",
      text: "Action",
      formatter: (cell, row) => {
        console.log(row);
        return (
          <div className="d-flex">
            <i
              title="Delete"
              class="fa-solid fa-trash-can"
              onClick={() => remove(row)}
              style={{ color: "red", cursor: "pointer" }}
            ></i>{" "}
            <i
              title="Edit"
              class="fa-regular fa-pen-to-square ms-2"
              style={{ cursor: "pointer" }}
              onClick={() => showModal(row)}
            ></i>
          </div>
        );
      },
    },
  ];

  // const columns = [
  //   {
  //     dataField: "category",
  //     text: "Category",
  //     sort: true,
  //   },
  //   {
  //     dataField: "subcategory",
  //     text: "Subcategory",
  //     sort: true,
  //   },
  //   {
  //     dataField: "foodname",
  //     text: "food Name",
  //   },
  //   {
  //     dataField: "",
  //     text: "food Images",
  //     formatter: (cell, row) => {
  //       return (
  //         <div>
  //           {row.foodimage?.map((i) => (
  //             <img
  //               src={"https://api.ramsnesthomestay.com/api/food/" + i}
  //               width="45px"
  //               height="45px"
  //             />
  //           ))}
  //         </div>
  //       );
  //     },
  //   },
  //   {
  //     dataField: "fooddesc",
  //     text: "food Description",
  //   },
  //   {
  //     dataField: "foodprice",
  //     text: "food Price",
  //   },

  //   {
  //     dataField: "",
  //     text: "Action",
  //     formatter: (cell, row) => {
  //       console.log(row);
  //       return (
  //         <div>
  //           <i
  //             class="fa-solid fa-trash-can"
  //             onClick={() => remove(row)}
  //             style={{ color: "red" }}
  //           ></i>

  //           <Link
  //             to="/editfood"
  //             state={{ data: row }}
  //             style={{ marginLeft: "10px" }}
  //           >
  //             <i class="fa-regular fa-pen-to-square"></i>
  //           </Link>
  //         </div>
  //       );
  //     },
  //   },
  // ];

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total ms-2">
      Showing {from} to {to} of {size} Results
    </span>
  );

  const options = {
    paginationSize: 4,
    pageStartIndex: 0,
    firstPageText: "First",
    prePageText: "Back",
    nextPageText: "Next",
    lastPageText: "Last",
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [
      {
        text: "5",
        value: 5,
      },
      {
        text: "10",
        value: 10,
      },
      {
        text: "All",
        value: food.length,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };
  useEffect(() => {
    getallfoods();
    getcategory();
  }, []);

  const getallfoods = async () => {
    let res = await axios.get(
      "https://api.ramsnesthomestay.com/api/getallfood"
    );
    if ((res.status = 200)) {
      console.log("food response", res);
      setfood(res.data?.foods);
    }
  };

  const getcategory = async () => {
    let res = await axios.get(
      "https://api.ramsnesthomestay.com/api/getcategory"
    );
    if (res.status === 200) {
      console.log(res);
      setcategorydata(res.data?.category);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = categorydata.find(
      (item) => item._id === e.target.value
    );
    setCategoryId(e.target.value);
    setcategory(selectedCategory ? selectedCategory.categoryname : "");
    setDishType(selectedCategory ? selectedCategory.categoryType : "");
  };

  const addfood = async (e) => {
    e.preventDefault();

    if (!foodname || !foodprice || !category || !foodImage) {
      alert("please enter all fields");
    }
    formdata.append("foodname", foodname);
    formdata.append("foodprice", foodprice);
    formdata.append("category", category);
    formdata.append("foodimage", foodImage);
    formdata.append("dishType", dishType);
    formdata.append("categoryId", categoryId);
    try {
      const config = {
        url: "/addfood",
        method: "post",
        baseURL: apiURL,
        data: formdata,
        // {
        //   foodname: foodname,
        //   foodprice: foodprice,
        //   category: category,
        //   dishType: dishType,
        //   categoryId: categoryId,
        // },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          console.log("success");
          console.log(response.data.foods);
          // alert("Successfully added");
          // getallfoods();
          // resetFormData();
          window.location.assign("/food");
        }
      });
    } catch (error) {
      console.log(error);
      alert("Image size is too large");
    }
  };
  console.log("foodImage", foodImage);
  const editFood = async (e) => {
    e.preventDefault();
    formdata.append("foodname", foodname);
    formdata.append("foodprice", foodprice);
    formdata.append("category", category);
    formdata.append("foodimage", foodImage);
    formdata.append("dishType", dishType);
    formdata.append("categoryId", categoryId);
    try {
      const config = {
        url: `/editfood/${categoryObjects._id}`,
        method: "put",
        baseURL: apiURL,
        data: formdata,
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          // console.log("success");
          console.log(response.data);
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const resetFormData = () => {
    setfoodname("");
    setfoodprice("");
    setcategory("");
  };

  return (
    <div className="row me-0">
      <Header />
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-10 v1">
        <div className="row me-0">
          <div className="col-md-4">
            {showEdit ? (
              <div
                style={{
                  padding: "20px",
                  // boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                }}
              >
                <h5 className="pt-5"> Edit</h5>

                <div>
                  <lable className="mt-3">Select Category</lable>
                  <select
                    className="form-control mt-2 mb-2"
                    onChange={handleCategoryChange}
                    defaultValue={categoryObjects.categoryId || ""}
                  >
                    <option value="">Select...</option>
                    {categorydata.map((allcategory) => (
                      <option key={allcategory._id} value={allcategory._id}>
                        {allcategory.categoryname}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <lable className="mt-3">Enter Dish Name</lable>
                  <input
                    className="form-control mt-2 mb-2"
                    onChange={(e) => setfoodname(e.target.value)}
                    defaultValue={categoryObjects.foodname || ""}
                  />
                </div>
                <div>
                  <lable className="">Price</lable>
                  <input
                    className="form-control mt-2 mb-2"
                    type="number"
                    min={0}
                    onChange={(e) => setfoodprice(e.target.value)}
                    defaultValue={categoryObjects.foodprice || ""}
                  />
                </div>
                <div>
                  <lable className="">Food Image</lable>
                  <br />
                  <input
                    className="form-control mt-2 mb-2"
                    type="file"
                    name="foodimage"
                    onChange={(e) => setFoodImage(e.target.files[0])}
                  />
                  <br />
                  {foodImage ? (
                    <img
                      src={URL.createObjectURL(foodImage)}
                      width="100"
                      height="100"
                      alt=""
                    />
                  ) : (
                    <img
                      src={`https://api.ramsnesthomestay.com/api/food/${categoryObjects.foodimage}`}
                      alt=""
                      width="100"
                      height="100"
                    />
                  )}
                </div>
                <button
                  className="btn btn-outline-primary mt-4"
                  onClick={editFood}
                >
                  Edit Foods
                </button>
              </div>
            ) : (
              <div
                style={{
                  padding: "20px",
                  // boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                }}
              >
                <h5 className="pt-5"> Add Dish</h5>

                <div>
                  <lable className="mt-3">Select Category</lable>
                  <select
                    className="form-control mt-2 mb-2"
                    onChange={handleCategoryChange}
                  >
                    <option value="">Select...</option>
                    {categorydata.map((allcategory) => (
                      <option key={allcategory._id} value={allcategory._id}>
                        {allcategory.categoryname}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <lable className="mt-3">Enter Dish Name</lable>
                  <input
                    className="form-control mt-2 mb-2"
                    onChange={(e) => setfoodname(e.target.value)}
                  />
                </div>
                <div>
                  <lable className="">Price</lable>
                  <input
                    className="form-control mt-2 mb-2"
                    type="number"
                    min={0}
                    onChange={(e) => setfoodprice(e.target.value)}
                  />
                </div>
                <div>
                  <lable className="">Food Image</lable>
                  <input
                    className="form-control mt-2 mb-2"
                    type="file"
                    name="foodimage"
                    onChange={(e) => setFoodImage(e.target.files[0])}
                  />
                  <br />
                  {foodImage && (
                    <img
                      src={URL.createObjectURL(foodImage)}
                      width="100"
                      height="100"
                      alt=""
                    />
                  )}
                </div>
                <button
                  className="btn btn-outline-primary mt-4"
                  onClick={addfood}
                >
                  Add food
                </button>
              </div>
            )}
          </div>
          <div className="col-md-8">
            <ToolkitProvider
              keyField="id"
              data={food}
              columns={columns}
              search
              exportCSV={{
                fileName: "foods.csv",
                blobType: "text/csv;charset=ansi",
              }}
            >
              {(props) => (
                <div className="mt-5">
                  {/* <span className="pr-5 mr-auto">
                    <ExportCSVButton
                      className="btn-outline-success"
                      {...props.csvProps}
                    >
                      Export to CSV
                    </ExportCSVButton>
                  </span> */}
                  <span className="pl-5 me-5 mt-5">
                    <SearchBar
                      className="form-control "
                      {...props.searchProps}
                    />
                  </span>
                  <ClearSearchButton
                    className="btn-outline-info"
                    {...props.searchProps}
                  />
                  <br />
                  <br />
                  <div>
                    <BootstrapTable
                      keyField="foods"
                      responsive
                      hover
                      columns={columns}
                      data={food}
                      pagination={paginationFactory(options)}
                      {...props.baseProps}
                    />
                  </div>
                </div>
              )}
            </ToolkitProvider>
          </div>
        </div>

        {/* <div className="magin">
          <div className="d-flex">
            <a
              href="/addfood"
              className="btn btn-primary mt-2 me-2"
              style={{ background: "black" }}
            >
              Add food
            </a>
          </div>

          <Modal show={isOpen} onHide={hideModal}>
            <Modal.Header>
              <Modal.Title>Add Stock</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <div className="form-group">
                  <label className="mt-2">Date</label>
                  <DatePicker
                    style={{ width: "466px", height: "38px" }}
                    format="DD/MM/YYYY"
                    type="input-icon"
                    minDate={new Date()}
                    onChange={(date) => setdate(date.format("DD/MM/YYYY"))}
                  />
                  <label className="mt-2">Price</label>
                  <input
                    type="text"
                    placeholder="Enter Amount"
                    className="form-control"
                    onChange={(e) => setbasicprice(e.target.value)}
                  ></input>
                  <label className="mt-2">Stock</label>
                  <input
                    type="text"
                    placeholder="Enter Quantity"
                    className="form-control"
                    onChange={(e) => setstock(e.target.value)}
                  ></input>
                  <label className="mt-2">Free</label>
                  <input
                    type="text"
                    placeholder="Enter Free"
                    className="form-control"
                    onChange={(e) => setfree(e.target.value)}
                  ></input>
                  <label className="mt-2">Tax</label>
                  <input
                    type="text"
                    placeholder="Enter Free"
                    className="form-control"
                    onChange={(e) => settax(e.target.value)}
                  ></input>
                </div>
                <br></br>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="info" onClick={hideModal}>
                Cancel
              </Button>
              <Button variant="danger">Save</Button>
            </Modal.Footer>
          </Modal>
         
        </div> */}
      </div>
    </div>
  );
}

export default Rooms;
