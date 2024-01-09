import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import Modal from "react-bootstrap/Modal";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import axios from "axios";
import { useEffect } from "react";

function Customerbanner() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [image, setImage] = useState("");
  const [bannerdata, setbannerdata] = useState([]);
  const { SearchBar, ClearSearchButton } = Search;
  const { ExportCSVButton } = CSVExport;
  const imageURL = "https://api.ramsnesthomestay.com/api/banner";
  const formdata = new FormData();
  const [data, setdata] = useState([]);

  useEffect(() => {
    getimage();
  }, []);

  const postbanner = async (e) => {
    e.preventDefault();
    // formdata.append("type", "customer");
    formdata.append("banner", image);
    try {
      const config = {
        url: "https://api.ramsnesthomestay.com/api/addbanner",
        method: "post",
        data: formdata,
        headers: { "Content-Typr": "multipart/form-data" },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          console.log("success");
          alert("image added succesfully");

          window.location.assign("/customerbanner");
        }
      });
    } catch (error) {
      console.error(error);
      alert("image not added");
    }
  };

  const getimage = () => {
    axios
      .get("https://api.ramsnesthomestay.com/api/getallbanner")
      .then(function (response) {
        // handle success

        setdata(response.data.banner);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
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
        value: bannerdata.length,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };

  function imageFormatter(cell, row) {
    return (
      <img
        src={`${imageURL}/banner/${cell}`}
        height="50px"
        width="50px"
        style={{ borderRadius: "100%" }}
      />
    );
  }

  const columns = [
    {
      dataField: "banner",
      text: "Banner Image",
      formatter: imageFormatter,
    },
    {
      dataField: "",
      text: "Action",
      formatter: (cell, row) => {
        console.log(row);
        return (
          <div>
            <button className="btn btn-danger">Delete</button>
          </div>
        );
      },
    },
  ];
  const deleteimage = async (id) => {
    axios({
      method: "post",
      url: "https://api.ramsnesthomestay.com/api/deletebanner/" + id,
    })
      .then(function (response) {
        //handle success
        console.log(response);
        alert("Deleted successfully");
        window.location.reload();
      })
      .catch(function (error) {
        //handle error
        console.log(error.response.data);
      });
  };

  let i = 0;
  return (
    <div className="row me-0">
      <Header />
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-10 v1">
        <div className="magin">
          <Button
            onClick={handleShow}
            className="mt-3"
            style={{ background: "black" }}
          >
            {" "}
            Add banner image
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Banner image</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <form>
                  <div className="grid1">
                    <label>Select banner image</label>
                    <input
                      type="file"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div>
                </form>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={postbanner}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        <div style={{ marginTop: "25px" }}>
          <Table bordered hover size="">
            <thead>
              <tr>
                <th>Sl.No</th>

                <th>Images</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item) => (
                <tr>
                  <td>{i++}</td>
                  <td>
                    <img
                      src={
                        "https://api.ramsnesthomestay.com/api/banner/" +
                        item.banner
                      }
                      style={{ width: "80px", height: "70px" }}
                    />
                  </td>
                  <td>
                    <Button
                      onClick={() => deleteimage(item._id)}
                      style={{ background: "#dc3545", border: "none" }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Customerbanner;
