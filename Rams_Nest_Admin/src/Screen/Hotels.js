import React, { useEffect, useState, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";

import BootstrapTable from "react-bootstrap-table-next";
import { Card } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import DatePicker from "react-multi-date-picker";
// import * as XLSX from "xlsx";

import { DownloadTableExcel } from "react-export-table-to-excel";

function Rooms() {
  const [isOpen, setIsOpen] = useState(false);
  const { SearchBar, ClearSearchButton } = Search;
  const imageURL = "https://api.ramsnesthomestay.com/api";
  const [rooms, setrooms] = useState([]);
  const formdata = new FormData();
  const { ExportCSVButton } = CSVExport;

  console.log("rooms=====", rooms);

  const remove = async (data) => {
    axios({
      method: "post",
      url: "https://api.ramsnesthomestay.com/api/deleteroom/" + data._id,
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
      dataField: "roomno",
      text: "Room Number",
      sort: true,
    },
    {
      dataField: "roomname",
      text: "Room Name",
      sort: true,
    },
    {
      dataField: "roomprice",
      text: "Room Price",
    },
    {
      dataField: "",
      text: "Rooms Images",
      formatter: (cell, row) => {
        return (
          <div>
            {row.roomimage?.map((i) => (
              <img
                src={"https://api.ramsnesthomestay.com/api/rooms/" + i}
                width="45px"
                height="45px"
              />
            ))}
          </div>
        );
      },
    },
    {
      dataField: "roomdesc",
      text: "Room Desc",
    },
    {
      dataField: "Address",
      text: "address",
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
              style={{ color: "red" }}
            ></i>
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
        value: rooms.length,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };
  useEffect(() => {
    getallrooms();
  }, []);

  const getallrooms = async () => {
    let res = await axios.get(
      "https://api.ramsnesthomestay.com/api/getallrooms"
    );
    if ((res.status = 200)) {
      console.log(res);
      setrooms(res.data?.rooms);
    }
  };

  return (
    <div className="row me-0">
      <Header />
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-10 v1">
        <div className="magin">
          <div className="d-flex">
            <a
              href="/addhotels"
              className="btn btn-primary mt-2 me-2"
              style={{ background: "black" }}
            >
              Add Room
            </a>
          </div>

          <ToolkitProvider
            keyField="id"
            data={rooms}
            columns={columns}
            search
            exportCSV={{
              fileName: "roomss.csv",
              blobType: "text/csv;charset=ansi",
            }}
          >
            {(props) => (
              <div className="mt-5">
                <span className="pr-5 mr-auto">
                  <ExportCSVButton
                    className="btn-outline-success"
                    {...props.csvProps}
                  >
                    Export to CSV
                  </ExportCSVButton>
                </span>
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
                    data={rooms}
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

export default Rooms;
