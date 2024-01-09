{  _id: '658e4c608b285f18867a8dd9',
  guestName: 'Sasikala',
  mobileNumber: 6383119384,
  guestEmail: 'sasi01@gmail.com',
  noOfPerson: 2,
  selectedTable: '7',
  createdAt: '2023-12-29T04:34:40.513Z',
  updatedAt: '2023-12-29T06:54:19.225Z',
  selectedDishes: [
    {
      name: 'Chicken Pepper Dry',
      price: 279,
      count: 2,
      _id: '658e6d1b2fde8400daf7e23a'
    },
    {
      name: 'Chicken Pakoda Bonless',
      price: 248,
      count: 1,
      _id: '658e6d1b2fde8400daf7e23b'
    },
    {
      name: '7 Up',
      price: 30,
      count: 1,
      _id: '658e6d1b2fde8400daf7e23c'
    },
    {
      name: 'Pepsi',
      price: 20,
      count: 5,
      _id: '658e6d1b2fde8400daf7e23d'
    }
  ]
}

// orders details page old ui
<>
<div className="">
  <div class="card-body-roder">
    {mergedArray.map((items, index) => (
      <div className="mb-4" key={index}>
        <div class="order-menu">
          {/* <h6 class="font-w600">Order Menu</h6> */}
          <div class="row mb-2">
            <div
              className="d-flex col-md-2"
              style={{ justifyContent: "end" }}
            >
              <img
                class="me-2"
                src={`https://api.ramsnesthomestay.com/api/food/${items.foodimage}`}
                alt=""
              />
            </div>
            <div class="order-items mt-2 col-md-4">
              <h6 class="font-w500 text-nowrap mb-0">
                <div style={{ fontSize: "18px" }}>{items.name} </div>
              </h6>
              <p class="mb-0" style={{ fontSize: "13px" }}>
                x{items.count}
              </p>
            </div>
            {/* <div class="col-md-6 mt-2 text-center">
              <button
                style={{
                  fontSize: "14px",
                  border: "1px solid #fc8019",
                  backgroundColor: "transparent",
                  // border: 0,
                  color: "#fc8019",
                  borderRadius: "6px",
                  padding: "7px 7px",
                }}
                onClick={() => startCooking(items)}
              >
                Start Cooking
             {items.totalPrice.toFixed(2)} 
                {items.price} 
              </button>
            </div> */}
          </div>
        </div>
      </div>
    ))}
    <hr />

    <div class="row mb-4">
      <div className="col-md-6">
        {/* <h4 class="mb-0">Total</h4> */}
      </div>
      <div class="col-md-6 text-center">
        {/* <h4 class="mb-0 text-center">
          <span>Total: </span> {totalAmount.toFixed(2)}{" "}
        </h4> */}
        <button
          style={{
            fontSize: "14px",
            border: "1px solid #fc8019",
            backgroundColor: "transparent",
            // border: 0,
            color: "#fc8019",
            borderRadius: "6px",
            padding: "7px 7px",
          }}
          onClick={startCooking}
        >
          Start Cooking
        </button>
      </div>
    </div>
  </div>
</div>
</>