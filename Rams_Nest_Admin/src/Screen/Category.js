import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { TfiImport } from "react-icons/tfi";

function Category() {
  const imageURL = "https://api.ramsnesthomestay.com/api";
  const apiURL = "https://api.ramsnesthomestay.com/api";
  const [categoryname, setcategoryname] = useState("");
  const [categoryimage, setcategoryimage] = useState("");
  const [dishType, setDishType] = useState("");

  const [editcategoryname, seteditcategoryname] = useState();
  const [editcategoryimage, seteditcategoryimage] = useState("");
  const [editdishType, seteditDishType] = useState("");

  const [categorydata, setcategorydata] = useState([]);
  const [categoryObjects, setCategoryObjects] = useState({});
  const formdata = new FormData();
  const { SearchBar, ClearSearchButton } = Search;
  const { ExportCSVButton } = CSVExport;
  const [data, setData] = useState([]);
  const [showEdit, setShowEdit] = useState(false);

  const showModal = (row) => {
    setShowEdit(true);
    setCategoryObjects(row);
  };
  console.log("categoryObjects", categoryObjects);

  useEffect(() => {
    getcategory();
  }, []);
  const addCategory = async (e) => {
    e.preventDefault();
    if (!categoryname || !categoryimage || !dishType) {
      alert("Please fill all fields");
    } else {
      formdata.append("categoryname", categoryname);
      formdata.append("categoryimage", categoryimage);
      formdata.append("categoryType", dishType);
      try {
        const config = {
          url: "/addcategory",
          method: "post",
          baseURL: apiURL,
          data: formdata,
        };
        await axios(config).then(function (response) {
          if (response.status === 200) {
            // alert("Successfully Added");
            window.location.assign("/category");
          }
        });
      } catch (error) {
        console.error(error);
        alert("category  Not Added");
      }
    }
  };

  useEffect(() => {
    getcategory();
  }, []);

  const getcategory = async () => {
    let res = await axios.get(apiURL + "/getcategory");
    if ((res.status = 200)) {
      setcategorydata(res.data?.category);
    }
  };

  function imageFormatter(cell, row) {
    return (
      <img
        src={`${imageURL}/category/${cell}`}
        height="60px"
        width="60px"
        style={{ borderRadius: "100%" }}
      />
    );
  }
  const remove = async (data) => {
    axios({
      method: "post",
      url: "https://api.ramsnesthomestay.com/api/deletecategory/" + data._id,
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
  let i = 1;
  const columns = [
    {
      dataField: "",
      text: "Sl.No",
      formatter: (cell, row, rowIndex) => {
        return rowIndex + 1;
      },
    },
    {
      dataField: "",
      text: "Category Name",
      formatter: (cell, row) => {
        console.log(row);
        return (
          <div>
            <span>{row.categoryname} </span>
          </div>
        );
      },
      sort: true,
    },
    {
      dataField: "categoryimage",
      text: "Image",
      formatter: imageFormatter,
    },
    {
      dataField: "",
      text: "Action",
      formatter: (cell, row) => {
        console.log(row);
        return (
          <div>
            <i
              class="fa-solid fa-trash-can"
              onClick={() => remove(row)}
              style={{ color: "red", cursor: "pointer" }}
            ></i>
            {/* <i
              title="Edit"
              class="fa-regular fa-pen-to-square ms-2"
              style={{ cursor: "pointer" }}
              onClick={() => showModal(row)}
            ></i> */}
          </div>
        );
      },
    },
  ];

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
        value: categorydata.length,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };

  const editCategory = async (e) => {
    e.preventDefault();
    formdata.append("categoryname", editcategoryname);
    formdata.append("categoryimage", editcategoryimage);
    formdata.append("categoryType", editdishType);
    try {
      const config = {
        method: "put",
        url: `https://api.ramsnesthomestay.com/api/editcategory/${categoryObjects._id}`,
        headers: {
          "Content-Type": "multipart/form-data", // Make sure to set the content type
        },
        data: formdata,
      };
      await axios(config).then(function (response) {
        console.log(response.data); // Log the response for debugging
        if (response.status === 200) {
          console.log(response.data);
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
    }
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
                  <lable className="mt-3">Enter Dish Name</lable>
                  <input
                    className="form-control mt-2 mb-2"
                    onChange={(e) => seteditcategoryname(e.target.value)}
                    defaultValue={categoryObjects.categoryname}
                  />
                </div>
                <div>
                  <lable className="mt-3">Category Type</lable>
                  <select
                    className="form-control mt-2 mb-2"
                    onChange={(e) => seteditDishType(e.target.value)}
                    defaultValue={categoryObjects.categoryType}
                  >
                    <option value="">Select...</option>
                    <option value="Common">Common</option>
                    <option value="Veg">Veg</option>
                    <option value="Non Veg">Non Veg</option>
                  </select>
                </div>
                <div>
                  <lable className="">Category Image</lable>
                  <br />
                  <input
                    className="form-control mt-2 mb-2"
                    type="file"
                    name="foodimage"
                    onChange={(e) => seteditcategoryimage(e.target.files[0])}
                  />
                  <br />
                  {categoryimage ? (
                    <img
                      src={URL.createObjectURL(categoryimage)}
                      width="100"
                      height="100"
                      alt=""
                    />
                  ) : (
                    <img
                      src={`https://api.ramsnesthomestay.com/api/category/${categoryObjects.categoryimage}`}
                      alt=""
                      width="100"
                      height="100"
                    />
                  )}
                </div>
                <button
                  className="btn btn-outline-primary mt-4"
                  onClick={editCategory}
                >
                  Edit Category
                </button>
              </div>
            ) : (
              <div
                style={{
                  padding: "20px",
                  // boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                }}
              >
                <h5 className="pt-5"> Add Category</h5>
                <div className="form-group">
                  <label className="mt-2"> Category Name</label>
                  <input
                    type="text"
                    placeholder="Enter Category Name"
                    className="form-control mt-2 mb-2"
                    onChange={(e) => setcategoryname(e.target.value)}
                  ></input>
                </div>
                <div className="form-group">
                  <label className="mt-2"> Category Type</label>
                  <select
                    className="form-control mt-2 mb-2"
                    onChange={(e) => setDishType(e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="Common">Common</option>
                    <option value="Veg">Veg</option>
                    <option value="Non Veg">Non Veg</option>
                  </select>
                </div>{" "}
                <div className="form-group">
                  <label className="mt-2"> Category Image</label>
                  <input
                    type="file"
                    placeholder="Enter Category Name"
                    className="form-control mt-2 mb-2"
                    onChange={(e) => setcategoryimage(e.target.files[0])}
                  ></input>
                  <br />
                  {categoryimage && (
                    <img
                      src={URL.createObjectURL(categoryimage)}
                      width="100"
                      height="100"
                      alt=""
                    />
                  )}
                </div>
                <button
                  className="btn btn-outline-primary mt-4"
                  onClick={addCategory}
                >
                  Add Category
                </button>
              </div>
            )}
          </div>

          <div className="col-md-8">
            <ToolkitProvider
              keyField="id"
              data={categorydata}
              columns={columns}
              search
              exportCSV={{
                fileName: "patient.csv",
                blobType: "text/csv;charset=ansi",
              }}
            >
              {(props) => (
                <div className="mt-5">
                  {/* <span className="pl-5 me-1 mt-5">
                    <ExportCSVButton
                      // className="btn-outline-success"
                      {...props.csvProps}
                    >
                      <TfiImport />
                    </ExportCSVButton>
                  </span> */}
                  <span className="pl-5 me-1 mt-5">
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
                  {/* <div style={{ textAlign: "end" }}>
                  <div>
                    <span className="m-1">
                      <i
                        class="fa-solid fa-circle"
                        style={{ color: "green", fontSize: "10px" }}
                      ></i>{" "}
                      Veg
                    </span>{" "}
                    <span className="m-1">
                      <i
                        class="fa-solid fa-circle"
                        style={{ color: "red", fontSize: "10px" }}
                      ></i>{" "}
                      Non Veg
                    </span>{" "}
                    <span className="m-1">
                      <i
                        class="fa-solid fa-circle"
                        style={{ color: "blue", fontSize: "10px" }}
                      ></i>{" "}
                      Common
                    </span>
                  </div>
                </div> */}
                  {/* <hr /> */}
                  <div>
                    <BootstrapTable
                      keyField="category"
                      responsive
                      hover
                      columns={columns}
                      data={categorydata}
                      pagination={paginationFactory(options)}
                      {...props.baseProps}
                    />
                  </div>
                </div>
              )}
            </ToolkitProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
