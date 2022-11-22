import React from "react";
import { Dashboard } from "../dashboard/dashboard";
import { Appoinment } from "../appoinment/appoinment";
import { Car } from "../car/car";
import { Case } from "../case/case";
import { Patient } from "../patient/patient";
import PatientDetails from "../patient/pattientDetails/patientDetails";
import { Prescreption } from "../presciption/prescreption";
import { Driver } from "../driver/driver";
import { Medicine } from "../medicine/medicine";
import { Doctor } from "../doctor/doctor";
import Details from "../patient/pattientDetails/details/details";
// import { Link, useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";

// import { Routes, Route } from "react-router-dom";
import { Login } from "../login/login";
import AuthService from "../login/auth.service";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./main.css";
import WhatsApp from "../whatsApp/WhatsApp";
const Main = () => {
  // const history = useNavigate();
  const history = useHistory();
  const handleClose = () => {
    document.getElementById("popupbox").style.display = "none";
  };

  const defaultPage = () => {
    return (
      <>
        <Switch>
          {/* <Route exact path="/" element={<Login />} /> */}
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/appoinment">
            <Appoinment />
          </Route>
          <Route exact path="/car">
            <Car />
          </Route>
          <Route exact path="/case">
            <Case />
          </Route>
          <Route exact path="/patient">
            <Patient />
          </Route>
          <Route exact path="/patientdetails/:id">
            <PatientDetails />
          </Route>
          <Route exact path="/:id/:caseId">
            <Details />
          </Route>
          <Route exact path="/prescreption">
            <Prescreption />
          </Route>
          <Route exact path="/driver">
            <Driver />
          </Route>
          <Route exact path="/medicine">
            <Medicine />
          </Route>
          <Route exact path="/doctor">
            <Doctor />
          </Route>
          <Route exact path="/whatsApp">
            <WhatsApp />
          </Route>

          {/* <Route path="appoinment" element={<Appoinment />} />
          <Route path="car" element={<Car />} />
          <Route path="case" element={<Case />} />
          <Route path="patient" element={<Patient />} />
          <Route path="patientdetails/:id" element={<PatientDetails />} />
          <Route path="patientDetails/:id/:caseId" element={<Details />} />
          <Route path="prescreption" element={<Prescreption />} />
          <Route path="driver" element={<Driver />} />
          <Route path="medicine" element={<Medicine />} />
          <Route path="doctor" element={<Doctor />} /> */}
        </Switch>
       
      </>
    );
  };

  if (!AuthService.getCurrentUser()) return <Login />;

  return (
    <>
      <Router>
        <div>
          <Switch>
            <Route component={defaultPage} />
          </Switch>
        </div>
      </Router>
      <div>
        <div id="popupbox" style={{ display: "none" }}>
          <div className="popupbox ">
            <div className="LogoutPopbox">
              Do You Want To Exit ?
              <div className="logoutbuton">
                <button className="Cancelbtn" onClick={handleClose}>
                  {/* <i className="fa fa-ban" aria-hidden="true"></i> */}
                  Cancel
                </button>
                <br />
                <button className="okbtn" onClick={AuthService.logout}>
                  {/* <i className="fa fa-check-circle-o" aria-hidden="true"></i>  */}
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Main;
