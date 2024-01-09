import React from "react";
import { Button, Modal } from "react-bootstrap";
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
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useEffect } from "react";

function Category() {
  const imageURL = "https://api.ramsnesthomestay.com/api";
  const apiURL = "https://api.ramsnesthomestay.com/api";
  const [subcategoryname, setsubcategoryname] = useState("");
  const [categoryname, setcategoryname] = useState("");
  const [subcategoryimage, setsubcategoryimage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [categorydata, setcategorydata] = useState([]);
  const [subcategorydata, setsubcategorydata] = useState([]);
  const formdata = new FormData();
  const { SearchBar, ClearSearchButton } = Search;
  const { ExportCSVButton } = CSVExport;
  const [data, setData] = useState([]);

  useEffect(() => {
    getsubcategory();
    getcategory();
  }, []);
  const postsubcategory = async (e) => {
    e.preventDefault();
    formdata.append("categoryname", categoryname);
    formdata.append("subcategoryname", subcategoryname);
    formdata.append("subcategoryimage", subcategoryimage);
    try {
      const config = {
        url: "addsubcategory",
        method: "post",
        baseURL: apiURL,
        data: formdata,
        // headers: { "content-type": "application/json" },
        // data: { categoryName: category },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          console.log("success");
          console.log(response.data.category);
          alert("Successfully Added");
          window.location.assign("/subcategory");
        }
      });
    } catch (error) {
      console.error(error);
      alert("category  Not Added");
    }
  };
  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };
  const getcategory = async () => {
    let res = await axios.get(apiURL + "/getcategory");
    if ((res.status = 200)) {
      console.log(res);
      setcategorydata(res.data?.category);
    }
  };
  const getsubcategory = async () => {
    let res = await axios.get(apiURL + "/getsubcategory");
    if ((res.status = 200)) {
      console.log(res);
      setsubcategorydata(res.data?.subcategory);
    }
  };

  // const handleChange = (event) => {
  //   setCountryName(event.target.value);
  // };

  function imageFormatter(cell, row) {
    return (
      <img
        src={`${imageURL}/subcategory/${cell}`}
        height="50px"
        width="50px"
        style={{ borderRadius: "100%" }}
      />
    );
  }
  const remove = async (data) => {
    axios({
      method: "post",
      url: "https://api.ramsnesthomestay.com/api/deletesubcategory/" + data._id,
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

  const columns = [
    {
      dataField: "categoryname",
      text: "Category Name",
      sort: true,
    },
    {
      dataField: "subcategoryname",
      text: "Subcategory Name",
      sort: true,
    },
    {
      dataField: "subcategoryimage",
      text: "Subcategory Image",
      formatter: imageFormatter,
    },
    {
      dataField: "",
      text: "Action",
      formatter: (cell, row) => {
        console.log(row);
        return (
          <div>
            <button className="btn btn-danger" onClick={() => remove(row)}>
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
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

  return (
    <div className="row me-0">
      <Header />
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-10 v1">
        <div className="magin">
          <Button
            onClick={showModal}
            className="mt-2"
            style={{ background: "black" }}
          >
            Add Subcategory
          </Button>
          <Modal show={isOpen} onHide={hideModal}>
            <Modal.Header>
              <Modal.Title>Subcategory</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <form>
                  <div className="form-group">
                    <p style={{ marginBottom: "0px" }}>Select categoryname</p>
                    <select
                      onChange={(e) => setcategoryname(e.target.value)}
                      style={{
                        height: "40px",
                        width: "465px",
                        borderRadius: "5px",
                        border: "1px solid lightgray",
                      }}
                    >
                      {categorydata.map((allcategory) => (
                        <option value={allcategory.categoryname}>
                          {allcategory.categoryname}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="mt-2"> Subcategory Name</label>
                    <input
                      type="text"
                      placeholder="Enter Category Name"
                      className="form-control"
                      onChange={(e) => setsubcategoryname(e.target.value)}
                    ></input>
                    <label> Subcategory Image</label>
                    <input
                      type="file"
                      placeholder="Enter Category Name"
                      className="form-control"
                      onChange={(e) => setsubcategoryimage(e.target.files[0])}
                    ></input>
                  </div>{" "}
                  <br></br>
                </form>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="info" onClick={hideModal}>
                Cancel
              </Button>
              <Button variant="danger" onClick={postsubcategory}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
          <div></div>
          <ToolkitProvider
            keyField="id"
            data={subcategorydata}
            columns={columns}
            search
            exportCSV={{
              fileName: "subcategory.csv",
              blobType: "text/csv;charset=ansi",
            }}
          >
            {(props) => (
              <div className="mt-5">
                <span className="pl-5 ms-5 me-5 mt-5">
                  <SearchBar className="form-control " {...props.searchProps} />
                </span>
                <ClearSearchButton
                  className="btn-outline-info"
                  {...props.searchProps}
                />

                <hr />
                <div className="table-responsive">
                  <BootstrapTable
                    keyField="patient"
                    responsive
                    hover
                    columns={columns}
                    data={subcategorydata}
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
  );
}

export default Category;
