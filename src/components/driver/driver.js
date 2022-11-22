import React, { useEffect, useState } from "react";
import axios from "axios";
import "./driver.css";
import "../popup.css";
import { MdEdit } from "react-icons/md";
import { Sidebar } from "../sidebar/sidebar";
import { Topbar } from "../topbar/topbar";
import { SERVER } from "../baseUrl";
import { AiOutlineArrowLeft } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Loader from "../Loader/LoaderCam";
import authHeader from "../login/auth-headers";

export const Driver = () => {
  const [isloading, setisloading] = useState(undefined);

  const [update, setUpdate] = useState(false);
  const [drivername, setDriverName] = useState("");
  const [contact, setContact] = useState("");
  const [vehiclenumber, setVehicleNumber] = useState("");
  const [vehiclemake, setVehicleMake] = useState("");
  const [pin, setPin] = useState("");
  const [status, setStatus] = useState("");
  const [driverdetailsid, setDriverDetailsId] = useState("");

  const [errorscon, setErrorsCon] = useState(false);
  const [errorspi, setErrorsPi] = useState(false);

  const [errorscontact, setErrorsContact] = useState("");
  const [errorspin, setErrorsPin] = useState("");
  const [errorsname, setErrorsName] = useState("");
  const [errorsNa, setErrorsNa] = useState("");
  const [data, setData] = useState([]); //Calling a api for all prescreption
  // console.log("prescreption data", data);

  let userToken = localStorage.getItem("usertoken");
  // console.log("user token", userToken);

  // const navigate = useNavigate();

  const history = useHistory();

  // get all driver data
  useEffect(async () => {
    await axios
      .get(`${SERVER}/getAllDrivers`, {
        headers: authHeader(),
      })
      .then((res) => {
        // console.log(res);
        setData(res.data.data);
        setisloading(true);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  // close popup model
  const closePopup = () => {
    document.getElementById("driver_popup").style.display = "none";
  };

  // get driver by id
  const hanldeClick = (e) => {
    var formData = new FormData();
    formData.append("driverdetails_id", userToken?.driverdetails_id);
    formData.append("drivername", drivername);
    formData.append("drivercontact_number", contact);
    formData.append("vehicle_number", vehiclenumber);
    formData.append("vehicle_make", vehiclemake);
    formData.append("driverpin", pin);
    axios
      .get(
        `${SERVER}/getDriverById?driverdetails_id=` + e,

        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        const i = res?.data?.data.length - 1;
        console.log("popup ", res?.data?.data[i]);
        console.log("driver popup", res);
        localStorage.getItem(userToken);

        setUpdate(true);
        setDriverDetailsId(res?.data?.data[i].driverdetails_id);
        setDriverName(res?.data?.data[i].drivername);
        setContact(res?.data?.data[i].drivercontact_number);
        setVehicleNumber(res?.data?.data[i].vehicle_number);
        setVehicleMake(res?.data?.data[i].vehicle_make);
        setPin(res?.data?.data[i].driverpin);
      });
    document.getElementById("driver_popup").style.display = "block";
  };

  // add driver data
  const addNewDriver = () => {
    let drverData = {
      drivername: drivername,
      vehicle_number: vehiclenumber,
      vehicle_make: vehiclemake,
      driver_status: status,
      driverpin: pin,
      drivercontact_number: contact,
    };
    console.log(drverData);
    axios
      .post(
        "https://cerbosys.in:1700/rxaushadi/insertDriverDetails",
        {
          drivername: drivername,
          vehicle_number: vehiclenumber,
          vehicle_make: vehiclemake,
          driver_status: status,
          driverpin: pin,
          drivercontact_number: contact,
        },
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        console.log("add..driver...", res);
        history.push("/driver");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // update driver data
  const updateDriverData = async () => {
    axios
      .post(
        "https://cerbosys.in:1700/rxaushadi/updateDriverDetails",
        {
          driverdetails_id: driverdetailsid,
          vehicle_number: vehiclenumber,
          vehicle_make: vehiclemake,
          driver_status: status,
          drivercontact_number: contact,
        },
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        console.log("update Driver Data", res);
        document.getElementById("driver_popup").style.display = "none";
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Form Validation

  const onchangeFullName = (e) => {
    const drivername = e.target.value.replace(/[^a-z]/gi, " ");
    setDriverName(drivername);
    if (drivername.length <= 5) {
      setErrorsName("Enter Name");
      setErrorsNa(true);
      return drivername;
    } else {
      setErrorsName(false);
    }
  };

  const onchangePin = (e) => {
    const pin = e.target.value.replace(/([^0-9])+/i, "");
    setPin(pin);
    if (pin.length <= 5) {
      setErrorsPin("Enter a 6 digit pin");
      setErrorsPi(true);
      return pin;
    } else {
      setErrorsPi(false);
    }
  };

  const onchangeContact = (e) => {
    const contact = e.target.value.replace(/([^0-9])+/i, "");
    setContact(contact);
    if (contact.length <= 9) {
      setErrorsContact("Enter valid Contact");
      setErrorsCon(true);
      return contact;
    } else {
      setErrorsCon(false);
    }
  };

  return (
    <>
      <div className="dashboard">
        <Sidebar />

        {/* <!-- ========================= Main ==================== --> */}
        <div className="main">
          <Topbar />

          <div className="dashbord_data">
            <div className="details details-form-data">
              <div className="test">
                <div className="cardHeader">
                  <h4>Drivers</h4>
                </div>
                {!isloading ? (
                  <Loader />
                ) : (
                  <table>
                    <thead>
                      <tr className="driver_table_heading">
                        <th style={{ borderRadius: "8px 0px 0px 8px" }}>
                          Sr.no
                        </th>
                        <th>Driver Name</th>
                        <th>Phone No.</th>
                        <th>Vehicle Number</th>
                        <th>Vehicle Make</th>
                        <th style={{ borderRadius: "0px 8px 8px 0px" }}>
                          Edit
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {data ? (
                        data.map((item, i) => {
                          return (
                            <tr
                              style={{ cursor: "pointer" }}
                              onClick={() => hanldeClick(item.driverdetails_id)}
                              id={item.driverdetails_id}
                            >
                              <th scope="row">{i + 1}</th>
                              <td>{item.drivername}</td>
                              <td>{item.drivercontact_number}</td>
                              <td>{item.vehicle_number}</td>
                              <td>{item.vehicle_make}</td>
                              <td>
                                <MdEdit />
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <p>no data </p>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
              {/* driver add form start */}
              <div className="">
                <form className="pt-4">
                  <div className="row p-1">
                    <div className="col">
                      <span className="add_form_heading">Driver Name</span>
                      <input
                        type="text"
                        className="form-control add_form_data"
                        // placeholder="Driver Name"
                        value={drivername}
                        onChange={onchangeFullName}
                        // onChange={(e) => setDriverName(e.target.value)}
                      />
                      {errorsNa && (
                        <div className="" style={{ color: "red" }}>
                          {errorsname}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row p-1">
                    <div className="col">
                      <span className="add_form_heading">Contact</span>
                      <input
                        type="text"
                        className="form-control add_form_data"
                        // placeholder="Driver Contact"
                        maxLength="10"
                        value={contact}
                        onChange={onchangeContact}
                      />
                    </div>
                    {errorscon && (
                      <div style={{ color: "red" }}>{errorscontact}</div>
                    )}
                  </div>
                  <div className="row p-1">
                    <div className="col">
                      <span className="add_form_heading">Vehicle Number</span>
                      <input
                        type="text"
                        className="form-control add_form_data"
                        // placeholder="Vehicle Number"
                        // value={vehiclenumber}
                        onChange={(e) => setVehicleNumber(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row p-1">
                    <div className="col">
                      <span className="add_form_heading">Vehicle Make</span>
                      <input
                        type="text"
                        className="form-control add_form_data"
                        // placeholder="Vehicle Make"
                        // value={vehiclemake}
                        onChange={(e) => setVehicleMake(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row p-1">
                    <div className="col">
                      <span className="add_form_heading">Pin</span>
                      <input
                        type="text"
                        className="form-control add_form_data"
                        // placeholder="Pin"
                        required={true}
                        maxLength="6"
                        value={pin}
                        onChange={onchangePin}
                      />
                    </div>
                    {errorspi && (
                      <div style={{ color: "red" }}>{errorspin}</div>
                    )}
                  </div>
                  <div className="row p-1">
                    <div className="col">
                      <button
                        className="add_update_btn"
                        onClick={addNewDriver}
                        type="button"
                      >
                        Add Driver
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              {/* driver add form end */}
            </div>
          </div>
        </div>
      </div>

      {/* driver popup start */}
      <div>
        <div id="driver_popup" style={{ display: "none" }}>
          <div className="popup">
            <div className="popup-inner">
              <div>
                <button className="drive_close_icon" onClick={closePopup}>
                  <AiOutlineArrowLeft />
                  Back To Drivers
                </button>
              </div>
              <div>
                <form className="pt-4 driver_popup_form">
                  <div className="row p-3">
                    <div className="col">
                      <span className="driver_popup_textBox_heading">
                        Driver Name
                      </span>
                      <input
                        type="text"
                        className="form-control driver_popup_textBox_data"
                        value={drivername}
                        readOnly={true}
                        onChange={(e) => setDriverName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row p-3">
                    <div className="col">
                      <span className="driver_popup_textBox_heading">
                        Driver Contact Number
                      </span>
                      <input
                        type="text"
                        className="form-control driver_popup_textBox_data"
                        value={contact}
                        maxLength="10"
                        onChange={onchangeContact}
                      />
                    </div>
                    {errorscon && (
                      <small style={{ color: "red" }}>{errorscontact}</small>
                    )}
                  </div>
                  <div className="row p-3">
                    <div className="col">
                      <span className="driver_popup_textBox_heading">
                        Vehicle Number
                      </span>
                      <input
                        type="text"
                        className="form-control driver_popup_textBox_data"
                        value={vehiclenumber}
                        onChange={(e) => setVehicleNumber(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row p-3">
                    <div className="col">
                      <span className="driver_popup_textBox_heading">
                        Vehicle Make
                      </span>
                      <input
                        type="text"
                        className="form-control driver_popup_textBox_data"
                        value={vehiclemake}
                        onChange={(e) => setVehicleMake(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row p-3">
                    <div className="col">
                      <span className="driver_popup_textBox_heading">
                        Driver Pin
                      </span>
                      <input
                        type="text"
                        className="form-control driver_popup_textBox_data"
                        placeholder="Pin"
                        value={pin}
                        readOnly={true}
                        onChange={(e) => setPin(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="d-grid gap-2 col-6 mx-auto">
                    <button
                      className="btn btn-danger update-btn driver_update_btn"
                      type="button"
                      onClick={updateDriverData}
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* driver popup end */}
    </>
  );
};
