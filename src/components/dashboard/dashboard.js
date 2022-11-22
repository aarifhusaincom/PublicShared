import React, { useEffect, useState } from "react";
import "./dashboard.css";
import "../popup.css";
import axios from "axios";

import { Sidebar } from "../sidebar/sidebar";
import { Topbar } from "../topbar/topbar";

import { FaPhoneAlt } from "react-icons/fa";
import { SERVER } from "../baseUrl";
import { AiOutlineClose } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import authHeader from "../login/auth-headers";

import PrescriptionIcon from "../images/prescription_icon.svg";
import AppointmentIcon from "../images/appointment_icon.svg";
import DriverIcon from "../images/driver_icon.svg";
import UserIcon from "../images/user_icon.svg";

export const Dashboard = () => {
  const [update, setUpdate] = useState(false);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [doctorcategory, setDoctorCategory] = useState("");
  const [doctorname, setDoctorName] = useState("");
  const [appointtime, setAppointTime] = useState("");
  const [remark, setRemark] = useState("");
  const [apoointcaseid, setAppointCaseId] = useState("");

  const [appoinmentstatus, setAppoinmentStatus] = useState("");
  const [casestatusdesc, setCaseStatusDesc] = useState("");
  const [rideMasterId, setRideMasterId] = useState("");
  const [apoointmentid, setAppointmentId] = useState("");
  const [doctormasterid, setDoctorMasterId] = useState("");
  const [dropaddress, setDropAddress] = useState("");

  // cards total value state
  const [totalprescreption, setTotalPrescreption] = useState("");
  
  const [totalappoint, setTotalAppoint] = useState("");
  const [totaluser, setTotalUser] = useState("");
  const [totaldriver, setTotaldriver] = useState("");

  const [appointdate, setAppointDate] = useState("");
  const [AppointUpdateDate, setAppointUpdateDate] = useState("");

  const [data, setData] = useState([]); //Calling a api for all prescreption
  // console.log("prescreption data", data);

  const [doctorcategoryid, setDoctorCategoryId] = useState([]);

  const [slots, setSlots] = useState([]);
  const [isloading, setisloading] = useState(undefined);

  const [errorsrk, setErrorsRk] = useState(false);
  const [errorsremark, setErrorsRemark] = useState("");

  const [doctorlist, setDoctorList] = useState([]);

  let userToken = localStorage.getItem("usertoken");
  // console.log("user token", userToken);

  // const navigate = useNavigate();
  const history = useHistory();
  // get all todays appointment
  useEffect(async () => {
    fetch("https://cerbosys.in:1700/rxaushadi/getTodaysAppointments", {
      headers: authHeader(),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          console.log("data", data);
          setData(data.data);
          setisloading(true);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });

    fetch("https://cerbosys.in:1700/rxaushadi/getAllDoctorCategories", {
      headers: authHeader(),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((res) => {
        console.log("get all doctor category", res.data);
        setDoctorCategoryId(res.data);
        // console.log("test", doctorcategoryid);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  // get total api in card
  useEffect(async () => {
    // get total prececreption
    fetch("https://cerbosys.in:1700/rxaushadi/getTotalPrescription", {
      headers: authHeader(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTotalPrescreption({ Prescription: data.data[0].Total });
        }
      });

    // get total appointment
    fetch("https://cerbosys.in:1700/rxaushadi/getTotalAppointment", {
      headers: authHeader(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTotalAppoint({ Appointment: data.data[0].Total });
        }
      });

    // get total free driver
    fetch("https://cerbosys.in:1700/rxaushadi/getTotalFreeDrivers", {
      headers: authHeader(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
          setTotaldriver({ TotalFreeDrivers: data.data[0].Total });
        }
      });

    // get total user
    fetch("https://cerbosys.in:1700/rxaushadi/getTotalUsers", {
      headers: authHeader(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTotalUser({ TotalUsers: data.data[0].Total });
        }
      });
  }, []);

  // close popup model
  const modal = () => {
    document.getElementById("dashboard_popup").style.display = "none";
  };

  // get todays appointment by id
  const hanldeClick = (e) => {
    var formData = new FormData();
    formData.append("appointmentcaseId", userToken?.apoointcaseid);
    formData.append("appointment_id", userToken?.appointment_id);
    formData.append("fullname", name);
    formData.append("contact_number", contact);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("pickup_address", address);
    formData.append("landmark", landmark);
    formData.append("doctorcategory_id", doctorcategoryid);
    formData.append("doctormaster_id", doctormasterid);
    formData.append("doctorname", doctorname);
    formData.append("appointment_date", appointdate);
    formData.append("appointment_time", appointtime);
    formData.append("appointment_statusdescription", remark);
    formData.append("ridemaster_id", rideMasterId);
    formData.append("appointment_date", AppointUpdateDate);
    axios
      .get(
        `${SERVER}/getAppointmentById?appointment_id=` + e,

        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        const i = res?.data?.data.length - 1;
        console.log("popup", res?.data?.data[i]);
        console.log("dashboard popup", res);

        setUpdate(true);
        setRideMasterId(res?.data?.data[i].ridemaster_id);
        setAppointCaseId(res?.data?.data[i].appointmentcaseId);
        setAppointmentId(res?.data?.data[i].appointment_id);
        setName(res?.data?.data[i].fullname);
        setAppoinmentStatus(res?.data?.data[i].appointment_status);
        setContact(res?.data?.data[i].contact_number);
        setAge(res?.data?.data[i].age);
        setGender(res?.data?.data[i].gender);
        setAddress(res?.data?.data[i].pickup_address);
        setLandmark(res?.data?.data[i].landmark);
        setDoctorCategory(res?.data?.data[i].doctorcategory_id);
        setDoctorName(res?.data?.data[i].doctorname);
        setAppointDate(res?.data?.data[i].appointment_date);
        setAppointTime(res?.data?.data[i].appointment_time);
        setRemark(res?.data?.data[i].appointment_statusdescription);

        setAppointUpdateDate(res?.data?.data[i].appointment_date);
      });
    document.getElementById("dashboard_popup").style.display = "block";
  };

  const onchangeStatus = (e) => {
    const appoinmentstatus = e.target.value;
    setAppoinmentStatus(appoinmentstatus);
    if (appoinmentstatus == appoinmentstatus) {
      setErrorsRemark("Enter valid remark");
      setErrorsRk(true);
      setRemark("");
    } else {
      console.log("Else");
    }
  };

  const onchangeRemark = (e) => {
    const remark = e.target.value;
    setRemark(remark);
    if (remark.length <= 0) {
      setErrorsRemark("Enter valid remark");
      setErrorsRk(true);
    } else {
      setErrorsRk(false);
    }
  };

  const updateRideDetails = (e) => {
    // e.preventdefault()
    console.log("step 3");
    const rideData = {
      ridemaster_id: rideMasterId,
      ride_status: "Ride Pending",
      ride_status_description: "Ride Pending",
    };
    console.log("rideData", rideData);
    axios
      .post(
        `https://cerbosys.in:1700/rxaushadi/updateRideStatus`,
        {
          ridemaster_id: rideMasterId,
          ride_status: "Ride Pending",
          ride_status_description: "Ride Pending",
        },
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        console.log("update ride data", res);
        console.log("rideMasterId", rideMasterId);
        document.getElementById("dashboard_popup").style.display = "none";
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // select status of popup
  const statusSelect = () => {
    console.log("step 2");
    const statusData = {
      appointmentcaseId: apoointcaseid,
      case_status: appoinmentstatus,
      case_status_description: remark,
    };
    console.log("status select", statusData);
    axios
      .post(
        `https://cerbosys.in:1700/rxaushadi/updateAppointmentCase`,
        {
          appointmentcaseId: apoointcaseid,
          case_status: appoinmentstatus,
          case_status_description: remark,
        },
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        console.log("update status data", res);
        setAppoinmentStatus(res.data);
        updateRideDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // update todays appointment
  const updateDhashboardData = async () => {
    console.log("step 1");
    const updateData = {
      appointment_id: apoointmentid,
      appointment_time: appointtime,
      appointment_date: AppointUpdateDate,
      appointment_status: appoinmentstatus,
      appointment_statusdescription: remark,
    };
    console.log("update Data", updateData);
    axios
      .post(
        "https://cerbosys.in:1700/rxaushadi/updateAppointment",
        {
          appointment_id: apoointmentid,
          appointment_time: appointtime,
          appointment_date: AppointUpdateDate,
          appointment_status: appoinmentstatus,
          appointment_statusdescription: remark,
        },
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        statusSelect();
        console.log("update dashboard data", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllDoctorList = (e) => {
    console.log("category id", e);
    fetch(
      `https://cerbosys.in:1700/rxaushadi/getDoctorMasterByCategoryId?doctorcategory_id=${e}`,
      {
        headers: authHeader(),
      }
    ).then((res) => {
      res.json().then((data) => {
        setDoctorCategoryId(data.data);
        if (data.success) {
          setDoctorCategory(data.data[0].doctorcategory_id);
          setDoctorName(data.data[0].doctorname);
          setDoctorMasterId(data.data[0].doctormaster_id);
          setDoctorList(data.data);
          setDropAddress(data.data[0].doctor_address);
        }
        getAllSlot();
        console.log("Doctors list state", doctorcategoryid);
        console.log("doctor categery", doctorcategory);
        console.log("doctor name", doctorname);
        console.log("master id", doctormasterid);
        console.log("doctor list", doctorlist);
      });
    });
  };

  const getAllSlot = (data) => {
    var e = data;
    fetch(
      "https://cerbosys.in:1700/rxaushadi/getDoctorTimeSlot?doctormaster_id=" +
        e,
      {
        headers: authHeader(),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("slots", data);
        setSlots({ slots: data.data, e });
      });
  };

  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 0).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  return (
    <>
      <div className="dashboard">
        <Sidebar />

        {/* <!-- ========================= Main ==================== --> */}
        <div className="main">
          <Topbar />

          {/* <!-- ======================= Cards ================== --> */}
          <div className="dashbord_data">
            <div className="cardBox">
              <Link
                to="/appoinment"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="card">
                  <div>
                    <div className="appoint_card_icon">
                      {/* <FaPhoneAlt /> */}
                      <img src={AppointmentIcon} />
                    </div>
                    <div className="cardName">Appointment</div>
                    <div className="numbers">{totalappoint.Appointment}</div>
                  </div>

                  <div className="iconBx">
                    <ion-icon name="eye-outline"></ion-icon>
                  </div>
                </div>
              </Link>
              <Link
                to="/prescreption"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="card">
                  <div>
                    <div className="prescreption_card_icon">
                      {/* <FaPhoneAlt /> */}
                      <img src={PrescriptionIcon} />
                    </div>
                    <div className="cardName">Prescreption</div>
                    <div className="numbers">
                      {totalprescreption.Prescription}
                    </div>
                  </div>

                  <div className="iconBx">
                    <ion-icon name="cart-outline"></ion-icon>
                  </div>
                </div>
              </Link>
              <Link
                to="/driver"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="card">
                  <div>
                    <div className="driver_card_icon">
                      {/* <FaPhoneAlt /> */}
                      <img src={DriverIcon} />
                    </div>
                    <div className="cardName">Free Driver</div>
                    <div className="numbers">
                      {totaldriver.TotalFreeDrivers}
                    </div>
                  </div>

                  <div className="iconBx">
                    <ion-icon name="chatbubbles-outline"></ion-icon>
                  </div>
                </div>
              </Link>
              <Link
                to="/patient"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="card">
                  <div>
                    <div className="user_card_icon">
                      {/* <FaPhoneAlt /> */}
                      <img src={UserIcon} />
                    </div>
                    <div className="cardName">Total User</div>
                    <div className="numbers">{totaluser.TotalUsers}</div>
                  </div>

                  <div className="iconBx">
                    <ion-icon name="cash-outline"></ion-icon>
                  </div>
                </div>
              </Link>
            </div>

            {/* <!-- ================ Order Details List ================= --> */}
            <div className="details">
              <div className="cardHeader">
                <h4>Todays Appointment</h4>
              </div>
              <div>
                <table>
                  <thead>
                    <tr className="dashboard_table_heading">
                      <th style={{ borderRadius: "8px 0px 0px 8px" }}>
                        Sr No.
                      </th>
                      <th>Case Id</th>
                      <th>Full Name</th>
                      <th>Age</th>
                      <th>doctor Address</th>
                      <th>Phone No.</th>
                      <th>Doctor Name</th>
                      <th>Appoint Time</th>
                      <th>Status</th>
                      <th style={{ borderRadius: "0px 8px 8px 0px" }}>
                        Remark
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {data ? (
                      data.map((item, i) => {
                        return (
                          <tr
                            style={{ cursor: "pointer" }}
                            onClick={() => hanldeClick(item.appointment_id)}
                            id={item.appointment_id}
                          >
                            <th>{i + 1}</th>
                            <td>{item.appointmentcaseId}</td>
                            <td>{item.fullname}</td>
                            <td>{item.age}</td>
                            <td>{item.doctor_address}</td>
                            <td>{item.contact_number}</td>
                            <td>{item.doctorname}</td>
                            <td>{item.appointment_time}</td>
                            <td>{item.appointment_status}</td>
                            <td>{item.appointment_statusdescription}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <p>no data for today</p>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard update popup div start */}
      <div>
        <div id="dashboard_popup" style={{ display: "none" }}>
          <div className="popup">
            <div className="popup-inner">
              <button className="close-btn" onClick={modal}>
                <AiOutlineClose />
              </button>
              <h4 className="popup_main_heading">Appointment</h4>
              <span className="popup_caseId">Case Id: {apoointcaseid}</span>
              <div
                className="d-flex"
                style={{ justifyContent: "space-between" }}
              >
                <div>
                  <span className="popup_caseId">
                    Appointment Date and Time: {appointdate}
                    {appointtime}
                  </span>
                </div>
                <div>
                  <span className="popup_caseId">Status</span>&nbsp;
                  <select
                    className="dropdown"
                    style={{
                      border: "2px solid grey",
                      fontWeight: "bold",
                    }}
                    value={appoinmentstatus}
                    onChange={onchangeStatus}
                  >
                    <option value="Appointment Pending">
                      Appointment Pending
                    </option>
                    <option value="Appointment Confirmed">
                      Appointment Confirmed
                    </option>
                    <option value="Appointment Cancelled">
                      Appointment Cancelled
                    </option>
                    <option value="Appointment Rescheduled">
                      Appointment Rescheduled
                    </option>
                    <option value="Appointment Complete">
                      Appointment Complete
                    </option>
                  </select>
                </div>
              </div>
              <form className="pt-4">
                <div className="row p-1">
                  <div className="col">
                    <span className="popup_textBox_heading">Full Name</span>
                    <input
                      type="text"
                      className="form-control popup_textBox_data"
                      readOnly={true}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <span className="popup_textBox_heading">Age</span>
                    <input
                      type="text"
                      className="form-control popup_textBox_data"
                      value={age}
                      readOnly={true}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row p-1">
                  <div className="col">
                    <span className="popup_textBox_heading">Gender</span>
                    <select
                      className="form-control popup_textBox_data"
                      value={gender}
                      readOnly={true}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="col">
                    <span className="popup_textBox_heading">Phone no.</span>
                    <input
                      type="text"
                      className="form-control popup_textBox_data"
                      value={contact}
                      readOnly={true}
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row p-1">
                  <div className="col">
                    <span className="popup_textBox_heading">Address</span>
                    <input
                      type="text"
                      className="form-control popup_textBox_data"
                      value={address}
                      readOnly={true}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <span className="popup_textBox_heading">Landmark</span>
                    <input
                      type="text"
                      className="form-control popup_textBox_data"
                      value={landmark}
                      readOnly={true}
                      onChange={(e) => setLandmark(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row p-1">
                  <div className="col">
                    <span className="popup_textBox_heading">
                      Doctor Category
                    </span>

                    <select
                      className="form-control popup_textBox_data"
                      value={doctorcategory}
                      onChange={(e) => getAllDoctorList(e.target.value)}
                    >
                      {doctorcategoryid ? (
                        doctorcategoryid.map((category, index) => {
                          return (
                            <option
                              value={category.doctorcategory_id}
                              key={index}
                            >
                              {category.category_name}
                            </option>
                          );
                        })
                      ) : (
                        <p>No data</p>
                      )}
                    </select>
                  </div>
                  <div className="col">
                    <span className="popup_textBox_heading">Doctor Name</span>

                    <select
                      className="form-control popup_textBox_data"
                      value={doctorname}
                      onChange={(e) => setDoctorName(e.target.value)}
                    >
                      {doctorlist ? (
                        doctorlist.map((docname, index) => (
                          <option key={index} value={docname.doctorname}>
                            {docname.doctorname}
                          </option>
                        ))
                      ) : (
                        <p>No data</p>
                      )}
                    </select>
                  </div>
                </div>
                <div className="row p-1">
                  <div className="date_input_field col">
                    <div className="date_input_field_left col">
                      <span className="popup_textBox_heading">
                        Appoinment Date
                      </span>
                      <input
                        className="form-control popup_textBox_date_data"
                        value={appointdate}
                        type="text"
                        readOnly={true}
                      />
                    </div>
                    <div className="date_input_field_right col">
                      <span className="popup_textBox_heading"></span>
                      <input
                        className="form-control popup_textBox_date_data"
                        value={AppointUpdateDate}
                        min={disablePastDate()}
                        type="date"
                        onChange={(e) => setAppointUpdateDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <span className="popup_textBox_heading">
                      Appointment Time
                    </span>
                    <input
                      type="time"
                      className="form-control popup_textBox_data"
                      value={appointtime}
                      onChange={(e) => setAppointTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row p-1">
                  <div className="col">
                    <span className="popup_textBox_heading">Remark</span>
                    <input
                      type="text"
                      className="form-control popup_textBox_data"
                      value={remark}
                      onChange={onchangeRemark}
                    />
                    {errorsrk && (
                      <div className="massage" style={{ color: "red" }}>
                        {errorsremark}
                      </div>
                    )}
                  </div>
                  <div className="col">
                    <div className="d-grid gap-2 col-6 mx-auto">
                      <button
                        className="btn btn-danger update-btn popup_update_button"
                        type="button"
                        onClick={updateDhashboardData}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Dashboard update popup div end */}
    </>
  );
};

// function convertTo24Hour(time) {
//   var hours = parseInt(time.substr(0, 2));
//   if (time.indexOf("am") != -1 && hours == 12) {
//     time = time.replace("12", "0");
//   }
//   if (time.indexOf("pm") != -1 && hours < 12) {
//     time = time.replace(hours, hours + 12);
//   }
//   return time.replace(/(am|pm)/, "");
// }

// const FormatDate = (dateStirng) => {
//   const date = new Date(dateStirng);
//   let day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
//   let month = date.getMonth() > 9 ? date.getMonth() : "0" + date.getMonth();
//   let year =
//     date.getFullYear() > 9 ? date.getFullYear() : "0" + date.getFullYear();
//   const FormatedDate = year + "-" + month + "-" + day;
//   return FormatedDate;
// };
