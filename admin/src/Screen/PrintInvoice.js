import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";

function PrintInvoice() {
  const { id } = useParams();
  const [customerOrders, setCustomerOrders] = useState({});
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [allFood, setAllFoods] = useState([]);
  const [data, setdata] = useState([]);
  const apiURL = "https://api.ramsnesthomestay.com/api";

  // const [orderStatus, setOrderStatus] = useState("startCooking");
  // const customerOrders = {};

  useEffect(() => {
    getAllOrderDetails();
    getAllFoods();
    getcustomer();
  }, []);
  const getcustomer = async () => {
    try {
      const response = await axios.get(`${apiURL}/orders/getcustomerbooking`);

      if (response.status === 200) {
        console.log("all customers", response.data);
        setdata(response.data.customerDetails);
      }
    } catch (error) {
      console.warn(error);
      alert("Can't able  to fetch ");
      // setdatacondition(true);
      return error;
    }
  };

  const getAllOrderDetails = async () => {
    try {
      const res = await axios.get(
        `https://api.ramsnesthomestay.com/api/orders/getparticularcustomerbookingdetails/${id}`
      );
      if (res.status === 200 && res.data?.particulatUser) {
        setCustomerOrders(res.data.particulatUser);
        console.log("customerOrders", res.data.particulatUser);
        const dishes = res.data.particulatUser.selectedDishes || [];
        // console.log("dishes", dishes);
        const dishesWithTotalPrice = dishes.map((dish) => ({
          ...dish,
          totalPrice: dish.price * dish.count,
        }));
        // console.log("dishesWithTotalPrice", dishesWithTotalPrice);
        setSelectedDishes(dishesWithTotalPrice);
      } else {
        console.error("Invalid response structure:", res.data);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };
  const getAllFoods = async () => {
    let res = await axios.get(
      "https://api.ramsnesthomestay.com/api/getallfood"
    );
    if (res.status === 200) {
      // console.log("food response", res.data);
      setAllFoods(res.data?.foods);
    }
  };

  const mergedArray = selectedDishes.map((item) => {
    const matchedFood = allFood.find((food) => food.foodname === item.name);

    return {
      name: item.name,
      price: item.price,
      count: item.count,
      _id: item._id,
      totalPrice: item.totalPrice,
      foodimage: matchedFood ? matchedFood.foodimage : null,
    };
  });
  const totalAmount = mergedArray.reduce(
    (acc, items) => acc + parseInt(items.totalPrice) * parseInt(items.count),
    0
  );
  //   console.log("mergedArray", mergedArray);
  const findingTax = (18 / 100) * totalAmount;
  const grandTotal = totalAmount + findingTax;
  //   console.log("grandTotal", grandTotal, "findingTax", findingTax);

  const columns = [
    {
      name: "Item",
      selector: (row) => row.name,
    },
    {
      name: "Price",
      selector: (row) => row.price.toFixed(2),
    },
    {
      name: "Quantity",
      selector: (row) => row.count,
    },

    {
      name: "SubTotal",
      selector: (row) => row.totalPrice.toFixed(2),
    },
  ];

  const findingCustomer = customerOrders._id;
  const findingIndex = data.indexOf(findingCustomer);

  console.log("findingIndex", findingIndex, findingCustomer);

  //   function convertToWords(number) {
  //     if (number === 0) return "zero";

  //     let str = "";
  //     let thousands = Math.floor(number / 1000);
  //     let hundreds = Math.floor((number % 1000) / 100);
  //     let tensAndOnes = number % 100;

  //     if (thousands) {
  //       str += convertToWords(thousands) + " thousand";
  //     }

  //     if (hundreds) {
  //       str += " " + convertToWords(hundreds) + " hundred";
  //     }

  //     if (tensAndOnes) {
  //       if (str !== "") {
  //         str += " and";
  //       }
  //       str += " " + convertToWordsLessThanOneHundred(tensAndOnes);
  //     }

  //     return str.trim();
  //   }

  //   function convertToWordsLessThanOneHundred(number) {
  //     const onesWords = [
  //       "",
  //       "one",
  //       "two",
  //       "three",
  //       "four",
  //       "five",
  //       "six",
  //       "seven",
  //       "eight",
  //       "nine",
  //     ];

  //     const teensWords = [
  //       "ten",
  //       "eleven",
  //       "twelve",
  //       "thirteen",
  //       "fourteen",
  //       "fifteen",
  //       "sixteen",
  //       "seventeen",
  //       "eighteen",
  //       "nineteen",
  //     ];

  //     const tensWords = [
  //       "",
  //       "",
  //       "twenty",
  //       "thirty",
  //       "forty",
  //       "fifty",
  //       "sixty",
  //       "seventy",
  //       "eighty",
  //       "ninety",
  //     ];

  //     if (number < 10) {
  //       return onesWords[number];
  //     } else if (number < 20) {
  //       return teensWords[number - 10];
  //     } else {
  //       return tensWords[Math.floor(number / 10)] + " " + onesWords[number % 10];
  //     }
  //   }

  //   function grandTotalInWords(total) {
  //     return convertToWords(total);
  //   }

  //   console.log(grandTotalInWords(grandTotal));

  //   useEffect(() => {
  //     if (generateNewInvoice) {
  //       const newInvoiceData = generateNewInvoice();
  //       console.log("newInvoiceData", newInvoiceData);
  //       // Use newInvoiceData as needed (e.g., set state, display information, etc.)
  //     }
  //   }, [generateNewInvoice]);
  //   console.log("newInvoiceData", generateNewInvoice);
  //   generate invoice number ?
  //   let invoiceCount = 0;

  //   function generateInvoiceNumber() {
  //     return "INV-" + String(invoiceCount + 1).padStart(6, "0");
  //   }

  //   // usage
  //   let invoiceNumber = generateInvoiceNumber();
  //   console.log(invoiceNumber); // Output: INV-000001
  //   grandTotal in inwords?

  return (
    <div className="container m-5 ">
      <div className="mb-2">
        <button
          style={{
            border: "1px solid #8080802b",
            borderColor: "gray",
          }}
          onClick={() => window.print()}
        >
          <i class="fa-solid fa-print"></i> Print
        </button>
      </div>
      {/* Print Invoice */}
      <div className="invoice-format print-section">
        <div className="pt-4 pe-3 ps-3">
          <h4
            className="pb-4"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              color: "#3c8dbc",
              fontWeight: 700,
            }}
          >
            INVOICE
          </h4>
          <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <div className="">
              <img
                src="/logo.png"
                alt="company logo"
                style={{ width: "25%" }}
              />
            </div>
            <div className="" style={{ margin: "10px 0px 0px 0px" }}>
              <div className="d-flex invois-order">
                <div className=" invoice-col-det-left">INVOICE</div>

                <div className=" invoice-col-det-right">#94</div>
              </div>

              <div className="d-flex invois-order">
                <div className=" invoice-col-det-left">ORDER ID</div>

                <div className=" invoice-col-det-right"> #{id.slice(-5)} </div>
              </div>

              <div className="d-flex invois-order">
                <div className=" invoice-col-det-left">DATE</div>

                <div className=" invoice-col-det-right">
                  {" "}
                  {moment().format("DD/MM/YYYY")}{" "}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ border: "1px solid rgb(0 0 0 / 66%)" }} />
          <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <div className="">
              <h6 style={{ fontWeight: "600" }}>BILL FROM:</h6>
              <address style={{ fontSize: "14px" }}>
                <div>Rams Nest</div>
                <div>Survey No 46, Gaushala Road,</div>
                <div>behind Art of Living, Kaggalipura Bangalore,</div>
                <div>Karnataka 560082 India</div>
                <div>ramsnesthomestay.com</div>
              </address>
            </div>
            <div>
              <h6 style={{ fontWeight: "600" }}>BILL To:</h6>
              <address style={{ fontSize: "14px" }}>
                <div>{customerOrders.guestName} </div>
                <div>+91 {customerOrders.mobileNumber}</div>
                <div>{customerOrders.guestEmail}</div>
              </address>
            </div>
          </div>

          {/* <br /> */}

          {/* <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <div>
              <h6 style={{ fontWeight: "600" }}>BILL To:</h6>
              <address style={{ fontSize: "14px" }}>
                <div>{customerOrders.guestName} </div>
                <div>+91 {customerOrders.mobileNumber}</div>
                <div>{customerOrders.guestEmail}</div>
              </address>
            </div>
            <div className="" style={{ margin: "10px 0px 0px 0px" }}>
              <div className="row" style={{ fontSize: "1rem" }}>
                <div className="col-md-6 invoice-col-det-left">INVOICE</div>
                <div className="col-md-6 invoice-col-det-right">#94</div>
              </div>

              <div className="row" style={{ fontSize: "1rem" }}>
                <div className="col-md-6 invoice-col-det-left">ORDER ID</div>
                <div className="col-md-6 invoice-col-det-right">
                  {" "}
                  #{id.slice(-5)}{" "}
                </div>
              </div>

              <div className="row" style={{ fontSize: "1rem" }}>
                <div className="col-md-6 invoice-col-det-left">
                  INVOICE DATE
                </div>
                <div className="col-md-6 invoice-col-det-right">
                  {" "}
                  {moment().format("DD/MM/YYYY")}{" "}
                </div>
              </div>
            </div>
          </div> */}
          <div className="mt-3">
            <DataTable columns={columns} data={mergedArray} />
          </div>
          <div
            className="d-flex"
            style={{ margin: "17px 0px", justifyContent: "flex-end" }}
          >
            <div className="">
              <div className="d-flex" style={{ fontSize: "1rem" }}>
                <div className="col-md-6">
                  <div className="invoice-col-det-final-left m-1">SUBTOTAL</div>{" "}
                  <div className="invoice-col-det-final-left m-1">TAX(18%)</div>{" "}
                  <div
                    className="invoice-col-det-final-left m-1"
                    style={{ fontSize: "18px" }}
                  >
                    TOTAL
                  </div>{" "}
                </div>
                <div className="col-md-6">
                  <div className="invoice-col-det-final-right m-1">
                    Rs.{totalAmount.toFixed(2)}
                  </div>
                  <div className="invoice-col-det-final-right m-1">
                    Rs.{findingTax}{" "}
                  </div>
                  <div
                    className="invoice-col-det-final-right m-1"
                    style={{ fontWeight: "600", fontSize: "18px" }}
                  >
                    Rs.{grandTotal}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-5">
          <p style={{ fontSize: "13px" }}>ramsnesthomestay.com </p>
        </div>
      </div>
    </div>
  );
}

export default PrintInvoice;
