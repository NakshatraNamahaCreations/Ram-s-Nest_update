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

function Rooms() {
  const { SearchBar, ClearSearchButton } = Search;
  const imageURL = "https://api.ramsnesthomestay.com";
  const [packages, setpackages] = useState([]);
  const formdata = new FormData();
  const { ExportCSVButton } = CSVExport;
  const tableRef = useRef(null);

  const remove = async (data) => {
    axios({
      method: "post",
      url: "https://api.ramsnesthomestay.com/api/deletepackage/" + data._id,
    })
      .then(function (response) {
        //handle success
        alert("item deleted");
        window.location.reload();
      })
      .catch(function (error) {
        //handle error
        console.log(error.response.data);
      });
  };
  const columns = [
    {
      dataField: "packagename",
      text: "Package Name",
      sort: true,
    },
    {
      dataField: "",
      text: "Package Image",
      formatter: (cell, row) => {
        return (
          <div>
            <img
              src={
                "https://api.ramsnesthomestay.com/package/" + row.packageimage
              }
              width="45px"
              height="45px"
            />
          </div>
        );
      },
    },
    {
      dataField: "packageprice",
      text: "Package Price",
      sort: true,
    },
    {
      dataField: "discount",
      text: "Discount",
    },

    {
      dataField: "indoorgames",
      text: "Indoor games",
    },
    {
      dataField: "outdoorgames",
      text: "Outdoor games",
    },
    {
      dataField: "starttime",
      text: "Start Time",
    },
    {
      dataField: "endtime",
      text: "End Time",
    },
    {
      dataField: "packagefeature",
      text: "packagefeature",
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

            <Link
              to="/editfood"
              state={{ data: row }}
              style={{ marginLeft: "10px" }}
            >
              <i class="fa-regular fa-pen-to-square"></i>
            </Link>
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
        value: packages.length,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };
  useEffect(() => {
    getallpackages();
  }, []);

  const getallpackages = async () => {
    let res = await axios.get(
      "https://api.ramsnesthomestay.com/api/getallpackages"
    );
    if ((res.status = 200)) {
      console.log(res);
      setpackages(res.data?.packages);
    }
  };
  console.log(JSON.stringify(packages));
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
              href="/addpackage"
              className="btn btn-primary mt-2 me-2"
              style={{ background: "black" }}
            >
              Add Package
            </a>
          </div>
          <ToolkitProvider
            keyField="id"
            data={packages}
            columns={columns}
            search
            exportCSV={{
              fileName: "packages.csv",
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
                    data={packages}
                    columns={columns}
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
