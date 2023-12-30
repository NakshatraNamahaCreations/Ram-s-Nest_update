import logo from "./logo.svg";
import "./App.css";
import "./Media_Query.css";
import Header from "./Components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Main_Dish from "./Components/Main_Dish";
import PaymentSuccessPage from "./Components/PaymentSuccessPage";
import QR_Reader from "./Components/QR_Reader";
import Footer from "./Components/Footer";
import GenerateQR from "./Components/GenerateQR";
import MyOrders from "./Components/MyOrders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* <Header /> */}
              <QR_Reader />
            </>
          }
        />
        <Route
          path="/generate-qr"
          element={
            <>
              <Header />
              <GenerateQR />
            </>
          }
        />

        <Route
          path="/home"
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/orders/menu/:name/:id"
          element={
            <>
              <Header />
              <Main_Dish />
              <Footer />
            </>
          }
        />
        <Route
          path="/paymentsuceess"
          element={
            <>
              <Header />
              <PaymentSuccessPage />
            </>
          }
        />
        <Route
          path="/my-orders"
          element={
            <>
              <Header />
              <MyOrders />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// first
// import React, { useState, useRef } from "react";
// import {
//   Container,
//   Card,
//   CardContent,
//   makeStyles,
//   Grid,
//   TextField,
//   Button,
// } from "@material-ui/core";
// import QRCode from "qrcode";
// import { QrReader } from "react-qr-reader";

// function App() {
//   const [text, setText] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [scanResultFile, setScanResultFile] = useState("");
//   const [scanResultWebCam, setScanResultWebCam] = useState("");
//   const classes = useStyles();
//   const qrRef = useRef(null);

//   const generateQrCode = async () => {
//     try {
//       const response = await QRCode.toDataURL(text);
//       setImageUrl(response);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const handleErrorFile = (error) => {
//     console.log(error);
//   };
//   const handleScanFile = (result) => {
//     if (result) {
//       setScanResultFile(result);
//     }
//   };
//   const onScanFile = () => {
//     qrRef.current.openImageDialog();
//   };
//   const handleErrorWebCam = (error) => {
//     console.log(error);
//   };
//   const handleScanWebCam = (result) => {
//     if (result) {
//       setScanResultWebCam(result);
//     }
//   };
//   return (
//     <Container className={classes.conatiner}>
//       <Card>
//         <h2 className={classes.title}>
//           Generate Download & Scan QR Code with React js
//         </h2>
//         <CardContent>
//           <Grid container spacing={2}>
//             <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
//               <TextField
//                 label="Enter Text Here"
//                 onChange={(e) => setText(e.target.value)}
//               />
//               <Button
//                 className={classes.btn}
//                 variant="contained"
//                 color="primary"
//                 onClick={() => generateQrCode()}
//               >
//                 Generate
//               </Button>
//               <br />
//               <br />
//               <br />
//               {imageUrl ? (
//                 <a href={imageUrl} download>
//                   <img src={imageUrl} alt="img" />
//                 </a>
//               ) : null}
//             </Grid>
//             <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
//               <Button
//                 className={classes.btn}
//                 variant="contained"
//                 color="secondary"
//                 onClick={onScanFile}
//               >
//                 Scan Qr Code
//               </Button>
//               <QrReader
//                 ref={qrRef}
//                 delay={300}
//                 style={{ width: "100%" }}
//                 onError={handleErrorFile}
//                 onScan={handleScanFile}
//                 legacyMode
//               />
//               <h3>Scanned Code: {scanResultFile}</h3>
//             </Grid>
//             <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
//               <h3>Qr Code Scan by Web Cam</h3>
//               <QrReader
//                 delay={300}
//                 style={{ width: "100%" }}
//                 onError={handleErrorWebCam}
//                 onScan={handleScanWebCam}
//               />
//               <h3>Scanned By WebCam Code: {scanResultWebCam}</h3>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// }

// const useStyles = makeStyles((theme) => ({
//   conatiner: {
//     marginTop: 10,
//   },
//   title: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background: "#3f51b5",
//     color: "#fff",
//     padding: 20,
//   },
//   btn: {
//     marginTop: 10,
//     marginBottom: 20,
//   },
// }));
// export default App;
// import "styles.css";
// import { useState } from "react";
// import { QrReader } from "react-qr-reader";
// import axios from "axios";
// import { useEffect } from "react";

// const App = () => {
//   const [code, setCode] = useState(null);
//   const [showDialog, setDiaglog] = useState(false);
//   const [processing, setProcessing] = useState(false);
//   const [precScan, setPrecScan] = useState("");
//   const [selected, setSelected] = useState("environment");
//   const [errorMessage, setErrorMessage] = useState(null);

//   async function fetchData({ qr = "" }) {
//     try {
//       setProcessing(true);
//       const result = await axios.get(
//         `https://ucs-goma-backend.herokuapp.com/payement/scan?matricule=${qr}&forThisYear=1`
//       );
//       console.log("scanned code", qr);
//       const { message, payement } = result.data;
//       console.log(payement);
//       if (!message) {
//         setCode({
//           text: payement.matricule,
//           identite: `${payement.nom} ${payement.postnom} ${payement.prenom}`,
//           promotion: payement.auditoire,
//           annee: payement.annee,
//           frais: Number.parseFloat(payement.totalPayer),
//           total: Number.parseFloat(payement.totalAPayer),
//           recouvrement: "Premiere tranche",
//           maxEncours: 800,
//         });
//         // setPrecScan(null);
//         setDiaglog(true);
//       } else {
//         setCode(null);
//         setPrecScan(null);
//         setErrorMessage(message);
//         setDiaglog(true);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const handleScan = async (scanData) => {
//     console.log(`loaded data data`, scanData);
//     if (scanData && scanData !== "" && !showDialog && !processing) {
//       console.log(`loaded >>>`, scanData);
//       // setPrecScan(scanData);
//       await fetchData({ qr: scanData });
//     }
//   };
//   const handleError = (err) => {
//     console.error(err);
//   };
//   return (
//     <div className="App">
//       <h1>Hello CodeSandbox</h1>
//       <h2>
//         Last Scan:{precScan}
//         {selected}
//       </h2>
//       <select onChange={(e) => setSelected(e.target.value)}>
//         <option value={"environment"}>Back Camera</option>
//         <option value={"user"}>Front Camera</option>
//       </select>
//       {showDialog && (
//         <div className="dialog">
//           <div className="dialog-content">
//             <div className="close">
//               <button
//                 onClick={() => {
//                   setCode(null);
//                   setErrorMessage(null);
//                   setDiaglog(false);
//                   setProcessing(false);
//                 }}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>
//             {errorMessage && (
//               <div className="errorMessage">
//                 <h2>{errorMessage}</h2>
//               </div>
//             )}
//             {code && (
//               <div className="description">
//                 <h4 className="title">Scan Result</h4>
//                 <div className="detail detail-first-child">
//                   <h6 className="detail-header">Matricule :</h6>
//                   <h6 className="detail-content green">{code.text}</h6>
//                 </div>
//                 <div className="detail">
//                   <h6 className="detail-header">Identité :</h6>
//                   <h6 className="detail-content">{code.identite}</h6>
//                 </div>
//                 <div className="detail">
//                   <h6 className="detail-header">Pomotion :</h6>
//                   <h6 className="detail-content">{code.promotion}</h6>
//                 </div>
//                 <div className="detail">
//                   <h6 className="detail-header">Année Academique :</h6>
//                   <h6 className="detail-content">{code.annee}</h6>
//                 </div>
//                 <div className="detail">
//                   <h6 className="detail-header">Total payé :</h6>
//                   <h6 className="detail-content red">
//                     {code.frais} (USD,dollars americains)
//                   </h6>
//                 </div>
//                 <div className="detail">
//                   <h6 className="detail-header">Total prévu :</h6>
//                   <h6 className="detail-content red">
//                     {code.total} (USD,dollars americains)
//                   </h6>
//                 </div>
//                 <div className="detail">
//                   <h6 className="detail-header">Reste à payer :</h6>
//                   <h6 className="detail-content red">
//                     {code.total - code.frais} (USD,dollars americains)
//                   </h6>
//                 </div>
//                 <div className="detail">
//                   <h6 className="detail-header">Votre Situation :</h6>
//                   <h6
//                     className={
//                       code.total <= code.frais
//                         ? `detail-content green`
//                         : "detail-content red small"
//                     }
//                   >
//                     {code.total <= code.frais
//                       ? "Eligible"
//                       : "Vous etes en retard de payement"}
//                   </h6>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//       {/* {code && <h2>{code.text}</h2>} */}
//       {!showDialog && !processing && (
//         <QrReader
//           facingMode={selected}
//           delay={500}
//           onError={handleError}
//           onScan={handleScan}
//           // chooseDeviceId={()=>selected}
//           style={{ width: "200px", heigth: "100px" }}
//         />
//       )}
//     </div>
//   );
// };

// export default App;
