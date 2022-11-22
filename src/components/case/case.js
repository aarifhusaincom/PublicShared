import React, { useEffect, useState } from "react";
import axios from "axios";
import "./case.css";
import "../popup.css";
import { Sidebar } from "../sidebar/sidebar";
import { Topbar } from "../topbar/topbar";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Loader from "../Loader/LoaderCam";
import authHeader from "../login/auth-headers";

export const Case = () => {
  const [isloading, setisloading] = useState(undefined);

  const [show, setShow] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  const [search, setSearch] = useState("");

  //Calling a api for all products
  const [caseData, setCaseData] = useState([]);
  console.log(caseData);
  // console.log("case data", data);

  //Create a Base url variable
  const baseUrl = "https://cerbosys.in:1700/rxaushadi";

  //get local storage token
  let userToken = localStorage.getItem("usertoken");
  // console.log("user token", userToken);

  // get all cases
  useEffect(async (e) => {
    await axios
      .get(`${baseUrl}/getAllAppointmentCases`, {
        headers: authHeader(),
      })
      .then((res) => {
        console.log(res);
        setCaseData(res.data.data);
        setisloading(true);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  // show popup model
  const hanldeClick = (selectedRec) => {
    setSelectedData(selectedRec);
    setShow(true);
  };

  // hide popup model
  const hideModal = () => {
    setShow(false);
  };

  // select dropdown case
  function caseSelect(e) {
    console.log("case select and update succesfully", e);
    fetch(`https://cerbosys.in:1700/rxaushadi/getCaseByStatus?status=${e}`, {
      headers: authHeader(),
    })
      .then((res) => res.json())
      .then((res) => {
        setCaseData(res.data);
        console.log("Appointment Pending", res.data);
      })
      .catch((err) => {
        console.log("nodata", err);
      });
  }

  console.log("search", search);

  const onChangeSearch = (e) => {
    const search = e.target.value;
    if (search == "") {
      window.location.reload();
    }
    setSearch(search);
  };

  const searchAPI = () => {
    console.log("search", search);
    axios
      .get(`${baseUrl}/searchCases?name=${search}`, {
        headers: authHeader(),
      })
      .then((res) => {
        console.log(res);
        setCaseData(res.data.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <>
      <div className="dashboard">
        <Sidebar />

        {/* <!-- ========================= Main ==================== --> */}
        <div className="main">
          <Topbar />

          <div className="dashbord_data">
            <div className="details">
              <div className="">
                <div className="row g-0 my-1 apoint_top_menu">
                  {/* <span>Appoinment Requiest</span> */}
                  <div
                    className="d-flex"
                    style={{ justifyContent: "space-around" }}
                  >
                    <div>
                      <select
                        className="dropdown"
                        onChange={(e) => {
                          caseSelect(e.target.value);
                        }}
                        style={{ border: "2px solid grey", fontWeight: "bold" }}
                      >
                        <option value="Driver Assigned (To Doctor)">
                          Driver Assigned (To Doctor)
                        </option>
                        <option value="Appointment Rescheduled">
                          Appointment Rescheduled
                        </option>
                        <option value="Ride Cancelled">Ride Cancelled</option>
                        <option value="Ride Rescheduled">
                          Ride Rescheduled
                        </option>
                        <option value="Appointment & Ride Cancelled">
                          Appointment & Ride Cancelled
                        </option>
                        <option value="Appointment & Ride Rescheduled">
                          Appointment & Ride Rescheduled
                        </option>
                        <option value="Driver Assigned (To Home)">
                          Driver Assigned (To Home)
                        </option>
                        <option value="Ride Bereached">Ride Bereached</option>
                        <option value="Driver Pending">Driver Pending</option>
                        <option value="Ride Not Taken">Ride Not Taken</option>
                        <option value="Prescription Received">
                          Prescription Received
                        </option>
                        <option value="Medicine Prescribed">
                          Medicine Prescribed
                        </option>
                        <option value="No Medicine">No Medicine</option>
                        <option value="False Prescription">
                          False Prescription
                        </option>
                        <option value="Send To Rx">Send To Rx</option>
                        <option value="Send to Rx">Send to Rx</option>
                        <option value="Rx Confirmed">Rx Confirmed</option>
                        <option value="Medicine Unavailable">
                          Medicine Unavailable
                        </option>
                        <option value="Partially Available">
                          Partially Available
                        </option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>

                    <div className="dropdown">
                      <input
                        className="serch_data"
                        placeholder="Search"
                        onChange={(e) => {
                          onChangeSearch(e);
                          searchAPI();
                        }}
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="cardHeader">
                  <h4>Total Cases</h4>
                </div>
                {!isloading ? (
                  <Loader />
                ) : (
                  <table>
                    <thead>
                      <tr className="case_table_heading">
                        <th style={{ borderRadius: "8px 0px 0px 8px" }}>
                          Sr.no
                        </th>
                        <th>Case Id</th>
                        <th>Full Name</th>
                        <th>Phone No.</th>
                        <th>Creation Date Time</th>
                        <th style={{ borderRadius: "0px 8px 8px 0px" }}>
                          Status
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {caseData ? (
                        caseData.map((item, i) => {
                          return (
                            <tr
                              style={{ cursor: "pointer" }}
                              onClick={() => hanldeClick(item)}
                            >
                              <th scope="row">{i + 1}</th>
                              <td>{item.appointmentcaseId}</td>
                              <td>{item.fullname}</td>
                              <td>{item.contact_number}</td>
                              <td>{item.creationDate.substr(0, 10)}</td>
                              <td>{item.case_status}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <p>No data</p>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {show && <Modal details={selectedData} handleClose={hideModal} />}
    </>
  );
};

//child component
const Modal = ({ handleClose, details }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close_icon" onClick={handleClose}>
          <AiOutlineArrowLeft />
          Back To Case
        </button>
        <h6>Case Id {details.appointmentcaseId}</h6>
        <div className="row p-3">
          <div className="col-sm-6">
            <div className="card case_card">
              <div className="card-body case_card_body">
                <div className="d-flex card_top_row">
                  <h4 className="card-title card_heading">1.Appointment</h4>
                  <button className="card_icon"></button>
                </div>
                <label style={{ color: "gray" }}>
                  Status: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <strong style={{ color: "black" }}>
                    {details.appointment_status}
                  </strong>
                </label>{" "}
                <br />
                <label style={{ color: "gray" }}>
                  Remark: &nbsp;&nbsp;&nbsp;
                  <strong style={{ color: "black" }}>
                    {details.appointment_statusdescription}
                  </strong>
                </label>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card case_card">
              <div className="card-body case_card_body">
                <div className="d-flex card_top_row">
                  <h4 className="card-title card_heading">3.Prescreption</h4>
                  <button className="card_icon"></button>
                </div>
                <label style={{ color: "gray" }}>
                  Status: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <strong style={{ color: "black" }}>
                    {details.prescription_status}
                  </strong>
                </label>{" "}
                <br />
                <label style={{ color: "gray" }}>
                  Remark: &nbsp;&nbsp;&nbsp;
                  <strong style={{ color: "black" }}>
                    {details.prescription_status_description}
                  </strong>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="row p-3">
          <div className="col-sm-6">
            <div className="card case_card">
              <div className="card-body case_card_body">
                <div className="d-flex card_top_row">
                  <h4 className="card-title card_heading">2.Ride And Drive</h4>
                  <button className="card_icon"></button>
                </div>
                <strong style={{ color: "green" }}>To Doctor</strong>
                <br />
                <label style={{ color: "gray" }}>
                  Status: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <strong style={{ color: "black" }}>
                    {details.ride_status}
                  </strong>
                </label>{" "}
                <br />
                <label style={{ color: "gray" }}>
                  Remark: &nbsp;&nbsp;&nbsp;
                  <strong style={{ color: "black" }}>
                    {details.ride_status_description}
                  </strong>
                </label>
                <br />
                <strong style={{ color: "red" }}>To Home Back</strong>
                <br />
                <label style={{ color: "gray" }}>
                  Status: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <strong style={{ color: "black" }}>
                    {details.ride_status}
                  </strong>
                </label>{" "}
                <br />
                <label style={{ color: "gray" }}>
                  Remark: &nbsp;&nbsp;&nbsp;
                  <strong style={{ color: "black" }}>
                    {details.ride_status_description}
                  </strong>
                </label>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card case_card">
              <div className="card-body case_card_body">
                <div className="d-flex card_top_row">
                  <h4 className="card-title card_heading">4.Medicine</h4>
                  <button className="card_icon"></button>
                </div>
                <label style={{ color: "gray" }}>
                  Status: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <strong style={{ color: "black" }}>
                    {details.medicine_status}
                  </strong>
                </label>{" "}
                <br />
                <label style={{ color: "gray" }}>
                  Remark: &nbsp;&nbsp;&nbsp;
                  <strong style={{ color: "black" }}>
                    {details.medicine_status_description}
                  </strong>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
