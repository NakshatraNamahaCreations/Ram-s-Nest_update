import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Enwuiryprint() {
  const [customerdata, setcustomerdata] = useState([]);
  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const rowDataString = urlParams.get("rowData");
  //   const rowData = JSON.parse(rowDataString);
  //   setcustomerdata(rowData);
  //   // Use rowData in your component
  // }, []);

  // console.log("customerdata======", customerdata);
  const location = useLocation();
  const { data } = location.state || {};

  console.log("sumanraj---data", data);

  useEffect(() => {
    getcategory();
  }, []);

  const getcategory = async () => {
    let res = await axios.get(
      "https://api.ramsnesthomestay.com/api/getroomscustomer"
    );
    if (res.status === 200) {
      console.log("user data:", res.data);
      setcustomerdata(res.data?.customer);
    }
  };
  const userId = data._id;
  const findingCustomerNumber = customerdata.findIndex(
    (item) => item._id === userId
  );

  const generatingOrder = () => {
    if (findingCustomerNumber != -1) {
      return findingCustomerNumber + 1;
    } else {
      return 0;
    }
  };
  const orderID = generatingOrder();
  console.log("orderID", orderID);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5 mb-3">
        <button
          style={{
            border: "none",
            borderColor: "gray",
            backgroundColor: "orange",
            width: 100,
            borderRadius: 5,
            color: "black",
            fontSize: 14,
            padding: 5,
          }}
          onClick={() => window.print()}
        >
          Print
        </button>
      </div>

      <div
        className="print-section"
        style={{ border: "5px solid black", padding: "20px" }}
      >
        <div className="row justify-content-center">
          <img
            src="/logo.png"
            alt="loading..."
            style={{ width: "170px", height: "100px", resize: "initial" }}
          />
        </div>

        <div className="head">
          #46, Gaushala Road, behind Art of Living, Kaggalipura, Bengaluru,
          Karnataka 560082
        </div>

        <div className="row pt-3">
          <div className="col-md-4"></div>
          <div className="col-md-4 cbutton">
            <div className="card_button">Guest Registration Card</div>
          </div>
          <div className="col-md-4"></div>
        </div>

        <div className="row pt-4">
          <div className="col-md-2 col-sm-2"></div>
          <div className="col-md-4 rms-label col-sm-4">Confirmation No :</div>
          <div className="col-md-4 rms-value col-sm-4">1</div>
          <div className="col-md-2 col-sm-2"></div>
        </div>

        <div className="row pt-3">
          <div className="col-md-2 col-sm-2"></div>
          <div className="col-md-4 rms-label col-sm-4">Arrival Date :</div>
          <div className="col-md-4 rms-value col-sm-4">
            {data.Enquirydetails[0]?.arrivaldate}
          </div>
          <div className="col-md-2 col-sm-2"></div>
        </div>

        <div className="row pt-3 colrow">
          <div className="col-md-2 col-sm-2"></div>
          <div className="col-md-4 col-sm-4 rms-label">Room :</div>
          <div className="col-md-4 col-sm-4 rms-value">
            {data.Enquirydetails[0]?.room}
          </div>
          <div className="col-md-2 col-sm-2"></div>
        </div>

        <div className="row pt-3">
          <div className="col-md-2 col-sm-2"></div>
          <div className="col-md-4 rms-label col-sm-4">Departure Date :</div>
          <div className="col-md-4 rms-value col-sm-4">
            {data.Enquirydetails[0]?.departuredate}
          </div>
          <div className="col-md-2 col-sm-2"></div>
        </div>

        <div className="row pt-3">
          <div className="col-md-2 col-sm-2"></div>
          <div className="col-md-4 rms-label col-sm-4">No of Guests :</div>
          <div className="col-md-4 rms-value col-sm-4">
            {data.Enquirydetails[0]?.noofguest}
          </div>
          <div className="col-md-2 col-sm-2"></div>
        </div>

        <div className="row pt-3">
          <div className="col-md-2 col-sm-2"></div>
          <div className="col-md-4 rms-label col-sm-4">Stay :</div>
          <div className="col-md-4 rms-value col-sm-4">
            {data.Enquirydetails[0]?.stay}
          </div>
          <div className="col-md-2 col-sm-2"></div>
        </div>

        <div className="row pt-3">
          <div className="col-md-2 col-sm-2"></div>
          <div className="col-md-4 rms-label col-sm-4">Rate Code :</div>
          <div className="col-md-4 rms-value col-sm-4">
            {data.Enquirydetails[0]?.ratecode}
          </div>
          <div className="col-md-2 col-sm-2"></div>
        </div>

        <div className="row pt-3">
          <div className="col-md-2 col-sm-2"></div>
          <div className="col-md-4 rms-label col-sm-4">Advance Deposit :</div>
          <div className="col-md-4 rms-value col-sm-4">
            {data.Enquirydetails[0]?.adeposit}
          </div>
          <div className="col-md-2 col-sm-2"></div>
        </div>

        <div className="row pt-3">
          <div className="col-md-2 col-sm-2"></div>
          <div className="col-md-4 rms-label col-sm-4">First Name :</div>
          <div className="col-md-4 rms-value col-sm-4">
            {data.Enquirydetails[0]?.firstname}
          </div>
          <div className="col-md-2 col-sm-2"></div>
        </div>

        <div className="row pt-3">
          <div className="col-md-2 col-sm-2"></div>
          <div className="col-md-4 rms-label col-sm-4">Last Name :</div>
          <div className="col-md-4 rms-value col-sm-4">
            {data.Enquirydetails[0]?.lastname}
          </div>
          <div className="col-md-2 col-sm-2"></div>
        </div>

        <div className="row pt-3">
          <div className="col-md-2 col-sm-2"></div>
          <div className="col-md-4 rms-label col-sm-4">Initial :</div>
          <div className="col-md-4 rms-value col-sm-4">
            {data.Enquirydetails[0]?.initial}
          </div>
          <div className="col-md-2 col-sm-2"></div>
        </div>

        <div className="row pt-3">
          <div className="col-md-2 col-sm-2"></div>
          <div className="col-md-4 rms-label col-sm-4">Address :</div>
          <div className="col-md-4 rms-value col-sm-4">
            {data.Enquirydetails[0]?.address}
          </div>
          <div className="col-md-2 col-sm-2"></div>
        </div>

        <div className="row pt-3">
          <div className="col-md-2 col-sm-2"></div>
          <div className="col-md-4 rms-label col-sm-4">City :</div>
          <div className="col-md-4 rms-value col-sm-4">
            {data.Enquirydetails[0]?.city}
          </div>
          <div className="col-md-2 col-sm-2"></div>
        </div>
        <div className="row pt-3">
          <div className="col-md-2 col-sm-2"></div>
          <div className="col-md-4 rms-label col-sm-4">State :</div>
          <div className="col-md-4 rms-value col-sm-4">
            {data.Enquirydetails[0]?.state}
          </div>
          <div className="col-md-2 col-sm-2"></div>
        </div>
        <div className="row pt-3">
          <div className="col-md-2 col-sm-2"></div>
          <div className="col-md-4 rms-label col-sm-4">Zipcode :</div>
          <div className="col-md-4 rms-value col-sm-4">
            {data.Enquirydetails[0]?.zipcode}
          </div>
          <div className="col-md-2 col-sm-2"></div>
        </div>
        <div className="row pt-3">
          <div className="col-md-2 col-sm-2"></div>
          <div className="col-md-4 rms-label col-sm-4">Driving License :</div>
          <div className="col-md-4 rms-value col-sm-4">
            {data.Enquirydetails[0]?.dlicense}
          </div>
          <div className="col-md-2 col-sm-2"></div>
        </div>
        <div className="row pt-3">
          <div className="col-md-2 col-sm-2"></div>
          <div className="col-md-4 rms-label col-sm-4">No of Keys :</div>
          <div className="col-md-4 rms-value col-sm-4">
            {data.Enquirydetails[0]?.nkeys}
          </div>
          <div className="col-md-2 col-sm-2"></div>
        </div>
        <div className="row pt-3">
          <div className="col-md-2 col-sm-2"></div>
          <div className="col-md-4 rms-label col-sm-4">
            Type of Accommodation Reserved :
          </div>
          <div className="col-md-4 rms-value col-sm-4">
            {data.Enquirydetails[0]?.reserved}
          </div>
          <div className="col-md-2 col-sm-2"></div>
        </div>
        <div className="row pt-3">
          <div className="col-md-2 col-sm-2"></div>
          <div className="col-md-4 rms-label col-sm-4">Comments :</div>
          <div className="col-md-4 rms-value col-sm-4">
            {data.Enquirydetails[0]?.comment}
          </div>
          <div className="col-md-2 col-sm-2"></div>
        </div>
        <div className="row pt-3">
          <div className="col-md-2 col-sm-2"></div>
          <div className="col-md-4 rms-label col-sm-4">
            Credit Card & Number :
          </div>
          <div className="col-md-4 rms-value col-sm-4">
            {data.Enquirydetails[0]?.ccnumber}
          </div>
          <div className="col-md-2 col-sm-2"></div>
        </div>
        <div className="heading mt-3">Terms And Conditions :</div>
        <p className="desc">
          We at Ram’s nest Farm stay wish to make your outing / stay as relaxing
          and enjoyable as possible. We request you to please follow our rules
          and regulations mentioned below. We will do our best to remedy
          problems or concerns you may have. If at any time you feel that
          something is not right, please feel free to contact the Manager.
        </p>

        <p className="desc ">
          Below are the terms and conditions , Please read them carefully and
          sign the disclaimer after accepting 
        </p>

        <p className="heading ">1.Registration :</p>
        <p className="desc ">
          All registered Guests should produce Valid government ID mandatory
          during Check-In. The person booking and staying should be above 21
          years of age, children to be accompanied by an adult at all times in
          the property. All facilities to be used only between check in and
          check out timings as per reservations.
        </p>

        <p className="heading ">2. Occupancy :</p>
        <p className="desc ">
          Occupancy of site is restricted to the registered guests only
          therefore we do not allow any visitors / drivers .
        </p>
        <p className="heading ">3. Children :</p>
        <p className="desc ">
          All children need to be supervised by a parent or guardian, as our
          resort is not responsible for any damages , losses , injuries and
          accidents at all areas of the resort. Children aged 12 years and above
          will be charged at adult rates .
        </p>

        <p className="desc ">
          4. Our Resort is not responsible for any loss of valuables, accidents,
          or injuries. :
        </p>

        <p className="desc ">
          5. We try to keep our environment as clean as possible. Kindly do your
          part by throwing all trash in the designated trash bins, including
          cigarette butts. Smoking is allowed in designated areas only.
        </p>

        <p className="heading ">6. CANCELLATIONS :</p>
        <p className="desc ">
          An advance once paid will NOT be refunded under any circumstances
          after 48 hours before check in time . There are no adjustments for
          late arrivals or early departures. In the event of “No Shows” the
          customer will be charged the full amount of the reserved time.
        </p>

        <p className="desc ">
          7. Quiet hours will be maintained between 9 p.m. and 9 a.m. Because of
          the open design of the Resort , sound can travel a distance. Please
          minimise sound since it might disturb other guests and surrounding
          areas.
        </p>

        <p className="desc ">8. Outside food and beverages are not allowed.</p>

        <p className="heading ">9. RIGHT CONDUCT:</p>
        <p className="desc ">
          We reserve the right to evict/eject any guest or group of guests
          should we find them engaging in fights, under the influence of illegal
          drugs, or generally disrupting the peace at the Resort.
        </p>

        <p className="heading ">10. BREAKAGES / LOST Items: </p>
        <p className="desc ">
          Any breakages / lost items related to the resort caused by guest
          occupants during their stay will be charged to their personal
          accountability and will be settled in full upon check-out. The amount
          to be charged is based on the price acquisition of such item(s) or the
          actual quote.
        </p>

        <p className="heading ">11. LIABILITY: </p>
        <p className="desc ">
          The management assumes no responsibility for accidents, injuries, or
          loss of property including theft, fire, flood, wind, or any act of God
          that may occur within the Resort.
        </p>

        <p className="desc ">
          12. Swimming costume compulsory. Nylon / polyester materials
          acceptable.
        </p>

        <p className="desc ">
          13. Storing of Hazardous goods in the room or resort property is
          strictly prohibited.
        </p>

        <p className="desc ">
          14. Outdoors are monitored/recorded by CCTV cameras for security
          reasons.
        </p>

        <p className="heading ">15. ILLEGAL ACTIVITY: </p>
        <p className="desc ">
          Ram’s Nest Farm Stay will not permit illegal activity anywhere on the
          property, management and staff will assist the police in every
          possible way (including testifying) to convict anyone performing
          illegal acts or engaging in illegal activity within the premises.
        </p>

        <p className="heading ">16. ADVENTURE ACTIVIT: </p>
        <p className="desc ">
          Declaration form to be signed before taking part in the adventure
          activities at the adventure registration counter. We would like to
          inform you there may be a factor of risk involved therefore ride at
          your own risk , Please note in case of any accidents Rams nest will
          not be liable as you are taking part in the activities at your own
          will. If you posses any psychological or physical or medical
          limitation , or not willing to assume risk, or not confidant, or not
          accepting the difficulty of adventure activities , or under the
          influence of alcohol , please do NOT take part in the adventure
          activities.
        </p>

        <p className="desc ">
          17. Photographs shot by our in-house photographer in the public areas
          , customers reviews may be shared on social media or website.
        </p>

        <p className="desc ">
          18. Since the resort is designed considering minimal modification of
          the natural landscape and nature by keeping it rustic and original we
          request you to be careful on the uneven areas .
        </p>
        <p className="desc ">
          19. If allergic to any kind of food or drink , Please check with the
          managers before consumption if doubtful.
        </p>
        <p className="desc ">
          20. Bar : Liquor is served to age 21 and above only we may ask for an
          ID proof if needed, the bar timings is as per the Karnataka excise
          rules , please drink responsibly , do not drink and drive , If we find
          guest(s) acting irresponsibly drunk within the property we may stop
          the sale of liquor to that guests(s) and may request them to leave the
          property .
        </p>

        <div className="heading mt-3">CHECK OUT 24 HOURS :</div>
        <p className="desc pt-2">
          &#x2022; Please Avail Locker Facility To Keep Your Valuables.
        </p>
        <p className="desc">
          &#x2022; Please Hand Over The Key Card At The Reception When You Are
          Leaveing The Hotel.
        </p>

        <p className="desc">
          &#x2022; Read The House Rules & Regulations Card.
        </p>

        <p className="desc">
          &#x2022; I Agree To Pay The Total Bill Incurred In The Resort And I Am
          Wholly Responsible For ThE Payment.
        </p>

        <p className="desc">
          &#x2022; We Are Not Responsible For The Loss Of Cash Or Valuables
        </p>

        <div className="sub">
          CHECK IN 12am <sub>AM</sub> CHECK OUT 12<sub>PM</sub>
        </div>
        <div className="sub1">Please Vacate Your Chalet At or Before 12pm</div>
        <div className="sub1">To Avoid Additional Charges</div>
        <p className="desc1">
          This property if privately owned and the management reserves the right
          to refuse service to anyone, and will not be responsible for accidents
          or injury to guests or for loss of money, jewelry, or other valuables
          or items of any kind
        </p>

        <div className="heading1">GUESTS ARE RESPONSIBLE</div>
        <div className="heading1">
          FOR ALL DAMAGES DONT TO RAM'S NEST & HOMES STAY
        </div>

        <p className="desc1">
          *By signing my initials next to the departure data, I have verified
          the date is correct
        </p>

        <p
          style={{
            color: "black",
            fontSize: "12px",
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          Signature :
          ..................................................................................................
        </p>
      </div>
    </div>
  );
}

export default Enwuiryprint;
