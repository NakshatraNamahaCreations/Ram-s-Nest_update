import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";

import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";

function Customers() {
  const [data, setdata] = useState([]);
  const { SearchBar, ClearSearchButton } = Search;
  const { ExportCSVButton } = CSVExport;
  const apiURL = "http:localhost:8080/api";
  useEffect(() => {
    getcustomer();
  }, []);

  // const getcustomer = () => {
  //   try {
  //     axios
  //       .get("https://api.ramsnesthomestay.com/api/allcustomer")
  //       .then(function (response) {
  //         if (response.status === 200) {
  //           setdata(response.data.customers);
  //           return;
  //         } else {
  //           alert("Can't able to fetch ");
  //           //setdatacondition(true);
  //           return;
  //         }
  //       })
  //       .catch(function (error) {
  //         // setdatacondition(true);

  //         alert("Can't able to fetch ");
  //         return;
  //       });
  //   } catch (error) {
  //     console.warn(error);
  //     alert("Can't able  to fetch ");
  //     // setdatacondition(true);
  //     return error;
  //   }
  // };

  const getcustomer = () => {
    try {
      axios
        .get("https://api.ramsnesthomestay.com/api/orders/getcustomerbooking")
        .then(function (response) {
          if (response.status === 200) {
            setdata(response.data.customerDetails.reverse());
            return;
          } else {
            alert("Can't able to fetch ");
            //setdatacondition(true);
            return;
          }
        })
        .catch(function (error) {
          // setdatacondition(true);

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
        value: data.length,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };

  const columns = [
    {
      dataField: "_id",
      text: "Customer Id",
      sort: true,
    },
    {
      dataField: "guestName",
      text: "Customer Name",
      sort: true,
    },
    {
      dataField: "guestEmail",
      text: "Email",
      sort: true,
    },
    {
      dataField: "mobileNumber",
      text: "Mobile Number",
      sort: true,
    },
  ];
  return (
    <div>
      <div className="row me-0">
        <Header />
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10">
          <div className="magin">
            <h4>Customers</h4>
            <br />
            <ToolkitProvider
              keyField="id"
              data={data}
              columns={columns}
              search
              exportCSV={{
                fileName: "customer.csv",
                blobType: "text/csv;charset=ansi",
              }}
            >
              {(props) => (
                <div>
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
                  {/* <hr /> */}
                  <div className="table-responsive">
                    <BootstrapTable
                      keyField="customer"
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
  );
}

export default Customers;
