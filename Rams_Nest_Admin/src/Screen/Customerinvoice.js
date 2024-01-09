import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import moment from "moment";


function Customerinvoice() {
  const location = useLocation();
  const contentArea = useRef();
  const { data } = location.state;
  console.log(data);
  let i = 1;

 

  return (
    <div>
        {/* <div style={{float:"right",margin:"15px"}}> <Button >Save Pdf</Button></div> */}
      <div className="my-3" ref={contentArea}>
        <div className="container ">
          <table
            className="my-3 px-3 table table-bordered"
            cellspacing="0"
            cellpadding="4"
            style={{
              padding: "5px",
              borderSpacing: "15px",
            }}
          >
            <tbody>
              <tr>
                <td rowspan="7" colspan="2">
                  <img src="logo.png" width="80px" alt="logo" />
                  <br></br>
                  <b>
                    <i style={{fontSize:"25px"}}>Ram's Nest </i>
                  </b>

                  <p className="px-5">
                    
                    <b></b>Survey No 46, Gaushala Road, <br/>behind Art of Living, Kaggalipura Bangalore,<br/> Karnataka 560082 India
                    <span>
                      {" "}
                      <b>GST IN.</b>
                    </span>
                  </p>
                </td>
                <td colspan="2">
                  <b>GST INVOICE</b>
                </td>
                <td rowspan="7" colspan="2">
            
                    <b>CustomerId:</b>{" "}
                  
                <p> {data.customerId}</p> 
                  <br />
                  <label>
                    <b>Customer Name:</b>{" "}
                  </label>
                 <p>{data.customername}</p> 
                
                 
                </td>
              </tr>
              <tr>
                <td>Invoice No</td>
                <td>{data._id}</td>
              </tr>
              <tr>
                <td>Invoice Date:</td>
                <td>{moment().format("DD/MM/YYYY")}</td>
              </tr>

              <tr>
                <td>Order No:</td>

                <td>{data.customerId}</td>
              </tr>
              <tr>
                <td>Order Date</td>
                <td>{data.customerorderdatetime}</td>
              </tr>
              <tr>
                <td>Delivery Date</td>
                <td>{moment().add(1, "days").format("DD/MM/YYYY")}</td>
              </tr>
              {/* <tr>
								<td>LR No: </td>
								<td>'.$transport.' </td>
							</tr> */}
            </tbody>
          </table>
          <table
            cellspacing="0"
            cellpadding="4"
            border="1"
            className="my-3 px-3 table table-bordered"
          >
            <thead>
              <tr>
                <th rowspan="1">S No.</th>
                <th rowspan="1">Product</th>
                {/* <th rowspan="1">Base Price</th> */}
                <th rowspan="1">Price</th>
                <th rowspan="1">Offer Price</th>
                <th rowspan="1">Qty in Units</th>
                <th rowspan="1">Amount</th>
                <th rowspan="1">Net Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.food?.map((item) => (
                <tr style={{ fontSize: "12px" }}>
                  <td>{i++}</td>
                  <td>{item.product.foodname}</td>
                  <td>{item.product.foodprice}</td>
                  <td>{item.product.customerofferprice}</td>
                  <td>{item.quantity}</td>
                  <td>{item.product.customerofferprice * item.quantity}</td>
                  <td>{item.product.customerofferprice * item.quantity}</td>
                 
                </tr>
              ))}

              <tr>
                <th colspan="2"></th>
                <th colspan="1"></th>
                <th colspan="2"></th>

                <th colspan="2">Total: {data.total}</th>
              </tr>
             
              <tr>
                <td colspan="9">Ramsnest Home Stay</td>
              </tr>
            </tbody>
          </table>

          <table
            cellspacing="0"
            cellpadding="4"
            border="1"
            className="table table-bordered"
          >
            <tbody>
              <tr>
                <td colspan="2" style={{ fontSize: "14px" }}>
                  <b>Terms & Conditions</b>
                  <br />
                  <br />
                  <br />
                  for conditions refer www.Ram's Nest.com
                </td>
                <td colspan="2">
                  <b>For Ram's Nest</b>
                  <br />
                  <br />
                  <br />
                  <br />
                  Authorised Signatory
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
     
    </div>
  );
}

export default Customerinvoice;
