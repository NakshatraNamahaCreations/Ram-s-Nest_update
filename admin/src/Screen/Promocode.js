import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";

import DatePicker from "react-multi-date-picker";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";

function Promocode() {
  const [data, setdata] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [promocode, setpromocode] = useState("");
  const [validity, setvalidity] = useState(0);
  const [description, setdescription] = useState("");
  const [startingdate, setstartingdate] = useState(new Date());
  const [discountpercentage, setdiscountpercentage] = useState(0);
  const [category, setcategory] = useState("");
  const { SearchBar, ClearSearchButton } = Search;
  const { ExportCSVButton } = CSVExport;
  const apiURL = "https://api.ramsnesthomestay.com/api";
  const imageURL = "https://api.ramsnesthomestay.com";

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    getdisease();
  }, []);

  const getdisease = () => {
    try {
      axios
        .get(`${apiURL}/getallpromocode`)
        .then(function (response) {
          if (response.status === 200) {
            console.log(response.data);
            setdata(response.data.promocode);
            return;
          } else {
            alert("Can't able to fetch ");
            return;
          }
        })
        .catch(function (error) {
          // setdatacondition(true);
          console.log(error.message.data);
          alert("Can't able to fetch ");
          return;
        });
    } catch (error) {
      console.warn(error);
      alert("Can't able  to fetch ");
      // setdatacondition(true);
      return error;
    }
  };

  const postdisease = async (e) => {
    e.preventDefault();

    if (
      !promocode |
      !validity |
      !description |
      !startingdate |
      !discountpercentage
    ) {
      alert("Please fill all fields");
    } else {
      try {
        const config = {
          url: "/addpromocode",
          method: "post",
          baseURL: apiURL,
          headers: { "content-type": "application/json" },
          data: {
            promocode: promocode,
            validity: validity,
            description: description,
            startingdate: startingdate,
            discountpercentage: discountpercentage,
            category: category,
          },
          //responseType:"application/json"
        };
        let res = await axios(config);
        if (res.status === 200) {
          console.log(res.data);
          window.location.assign("/promocode");
          return res;
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const remove = async (data) => {
    try {
      axios
        .post(`${apiURL}/deletepromocode/` + data._id)
        .then(function (response) {
          if (response.status === 200) {
            console.log(response.data);
            window.location.reload();
          }
        })
        .catch(function (error) {
          // setdatacondition(true);
          console.log(error.message.data);
          alert("Not able to complete");
        });
    } catch (error) {
      console.warn(error);
      alert("Not able to complete");
      // setdatacondition(true);
      return error;
    }
  };

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
        value: data.length,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };

  function imageFormatter(cell, row) {
    return (
      <img
        src={`${imageURL}/patients/profile/${cell}`}
        height="50px"
        width="50px"
        style={{ borderRadius: "100%" }}
      />
    );
  }

  const columns = [
    {
      dataField: "promocode",
      text: "Promo Code",
      sort: true,
    },
    {
      dataField: "validity",
      text: "Validity",
      sort: true,
    },
    {
      dataField: "description",
      text: "Description",
    },
    {
      dataField: "startingdate",
      text: "Starting Date",
    },
    {
      dataField: "discountpercentage",
      text: "Discount Percentage",
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

  return (
    <div className="row me-0">
      <Header />
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-10">
        <div className="magin">
          <Button
            onClick={showModal}
            className="mt-4 ml-5"
            style={{ background: "black" }}
          >
            Add Promocode
          </Button>
          <Modal show={isOpen} onHide={hideModal}>
            <Modal.Header>
              <Modal.Title>Promocode</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <form>
                  <div className="form-group">
                    <label>Promo Code</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter the Promo Code"
                      onChange={(e) => setpromocode(e.target.value)}
                    />
                    <label>Validity In Days</label>
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Enter the Validity"
                      onChange={(e) => setvalidity(e.target.value)}
                    />
                    <label>Description</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter the Description"
                      onChange={(e) => setdescription(e.target.value)}
                    />
                    <label>Starting Date</label>
                    <DatePicker
                      style={{ width: "325px", height: "38px" }}
                      format="DD/MM/YYYY"
                      type="input-icon"
                      minDate={new Date()}
                      onChange={(date) =>
                        setstartingdate(date.format("DD/MM/YYYY"))
                      }
                    />
                    <label>Discount Percentage</label>
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Enter the Discount Percentage"
                      onChange={(e) => setdiscountpercentage(e.target.value)}
                    />
                    <label>Category</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter the Category"
                      onChange={(e) => setcategory(e.target.value)}
                    />
                  </div>{" "}
                  <br></br>
                </form>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="info" onClick={hideModal}>
                Cancel
              </Button>
              <Button variant="danger" onClick={postdisease}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
          <div className="container pb-5">
            <h1 className="pt-4 pb-3" style={{ color: "#28328c" }}>
              Promo Code
            </h1>
            <div className="container">
              <div className="">
                <ToolkitProvider
                  keyField="id"
                  data={data}
                  columns={columns}
                  search
                  exportCSV={{
                    fileName: "subadmin.csv",
                    blobType: "text/csv;charset=ansi",
                  }}
                >
                  {(props) => (
                    <div>
                      <span className="pr-5 mr-auto"></span>
                      <span className="pl-5 ml-5 mr-5 mt-5">
                        <SearchBar
                          className="form-control "
                          {...props.searchProps}
                        />
                      </span>
                      <ClearSearchButton
                        className="btn-outline-info"
                        {...props.searchProps}
                      />

                      <hr />
                      <div className="table-responsive">
                        <BootstrapTable
                          keyField="subadmin"
                          responsive
                          hover
                          columns={columns}
                          data={data}
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
      </div>
    </div>
  );
}

export default Promocode;
