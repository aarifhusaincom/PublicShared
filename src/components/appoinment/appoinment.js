import React, { useEffect, useState } from "react";
import axios from "axios";
import "./appoinment.css";
import "../popup.css";
import { Sidebar } from "../sidebar/sidebar";
import { Topbar } from "../topbar/topbar";
import { SERVER } from "../baseUrl";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/LoaderCam";
import "react-datepicker/dist/react-datepicker.css";
import authHeader from "../login/auth-headers";
import addDays from "date-fns/addDays";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Appoinment = () => {
  const [isloading, setisloading] = useState(undefined);
  const [update, setUpdate] = useState(false);
  const [doctormasterid, setDoctorMasterId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [doctorcategory, setDoctorCategory] = useState("");
  const [docname, setDocName] = useState("");
  // console.log(doctorname);

  const [appointdate, setAppointDate] = useState("");
  // const [startDate, setStartDate] = useState("");

  const [AppointUpdateDate, setAppointUpdateDate] = useState("");
  // console.log("Appoint Update Date", AppointUpdateDate);

  const [appointtime, setAppointTime] = useState("");

  const [remark, setRemark] = useState("");
  const [apoointcaseid, setAppointCaseId] = useState("");

  const [appoinmentstatus, setAppoinmentStatus] = useState("");
  console.log(appoinmentstatus);
  const [appointmentid, setAppointmentId] = useState("");

  // add appoinment ridedetail state
  const [dropaddress, setDropAddress] = useState("");
  const [ridedate, setRideDate] = useState("");
  const [ridetime, setRideTime] = useState("");
  const [doctorcategoryid, setDoctorCategoryId] = useState([]);

  // const [casestatus, setCaseStatus] = useState("");
  const [casestatusdesc, setCaseStatusDesc] = useState("");

  //ride state
  const [rideMasterId, setRideMasterId] = useState("");

  const [doctorlist, setDoctorList] = useState([]);
  const [slots, setSlots] = useState([]);

  const [errorscon, setErrorsCon] = useState(false);
  const [errorscontact, setErrorsContact] = useState("");
  const [errorsrk, setErrorsRk] = useState(false);
  const [errorsremark, setErrorsRemark] = useState("");
  const [errorsag, setErrorsAg] = useState(false);
  const [errorsage, setErrorsAge] = useState("");
  const [errorsname, setErrorsName] = useState("");
  const [errorsNa, setErrorsNa] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  //Calling a api for all appointment
  console.log(data);
  const [cases, setCases] = useState([]);
  // console.log(Case);
  //Create a Base url variable
  const baseUrl = "https://cerbosys.in:1700/rxaushadi";

  let userToken = localStorage.getItem("token");
  // console.log("user token", userToken);

  useEffect(async () => {
    await axios
      .get(`${SERVER}/getAllAppointments`, {
        headers: authHeader(),
      })
      .then((res) => {
        console.log("get all appoinment", res.data.data);
        setData(res.data.data);
        setisloading(true);
      })
      .catch((err) => {
        console.log("error", err);
      });

    await axios
      .get(`${SERVER}/getAllAppointmentCases`, {
        headers: authHeader(),
      })
      .then((res) => {
        console.log("get all getAllAppointmentCases", res.data);
        setCases(res.data.data);
        // setisloading(true);
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
        console.log("test", doctorcategoryid);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  // close popup model
  const modal = () => {
    document.getElementById("appointment_popup").style.display = "none";
    window.location.reload();
    document.getElementById("add_appointment_popup").style.display = "none";
  };

  const allStatus = () => {
    console.log("click");
    // window.location.reload();
  };

  // get data by id
  const hanldeClick = (e) => {
    var formData = new FormData();
    formData.append("appointmentcaseId", apoointcaseid);
    formData.append("appointment_id", appointmentid);
    formData.append("fullname", name);
    formData.append("contact_number", contact);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("pickup_address", address);
    formData.append("landmark", landmark);
    formData.append("doctormaster_id", doctormasterid);
    formData.append("doctorname", docname);
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
        if (res.data.status == 200) {
          const i = res?.data?.data.length - 1;
          // console.log("popup", res?.data?.data[i]);
          console.log("popup appoint data", res);
          console.log("RideMaster", res.data.data);
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
          setDocName(res?.data?.data[i].doctorname);
          setAppointDate(res?.data?.data[i].appointment_date);
          setAppointTime(res?.data?.data[i].appointment_time);
          setRemark(res?.data?.data[i].appointment_statusdescription);
          setAppointUpdateDate(res?.data?.data[i].appointment_date);
        }
      });
    document.getElementById("appointment_popup").style.display = "block";
  };

  const onchangeStatus = (e) => {
    const appoinmentstatus = e.target.value;
    console.log(appoinmentstatus);
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

  const updateRideDetails = () => {
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
        document.getElementById("appointment_popup").style.display = "none";
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // select status of popup
  const statusSelect = () => {
    axios
      .post(
        `https://cerbosys.in:1700/rxaushadi/updateAppointmentCase`,
        {
          appointmentcaseId: apoointcaseid,
          case_status: appoinmentstatus,
          case_status_description: casestatusdesc,
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

  // update appointment function
  const updateAppointment = async () => {
    let testData = {
      doctorcategory_id: doctorcategory,
      doctormaster_id: doctormasterid,
      appointment_id: appointmentid,
      appointment_time: appointtime,
      appointment_date: AppointUpdateDate,
      appointment_status: appoinmentstatus,
      appointment_statusdescription: remark,
    };
    console.log("testData", testData);
    axios
      .post(
        "https://cerbosys.in:1700/rxaushadi/updateAppointment",
        {
          doctorcategory_id: doctorcategory,
          doctormaster_id: doctormasterid,
          appointment_id: appointmentid,
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
        console.log("testData", testData);
        console.log("update appoint data", res);

        statusSelect();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //nested json object for insert Appointment
  const ride = {
    pickup_address: address,
    drop_address: dropaddress,
    landmark: landmark,
    ride_date: ridedate,
    ride_time: ridetime,
    ride_status: "Ride Pending",
    ride_status_description: "Ride Pending",
  };
  // console.log("Ride Json Created Object", ride)

  //Insret Appointment
  const addAppointment = (e) => {
    document.getElementById("add_appointment_popup").style.display = "block";
    e.preventDefault();
    let data = {
      doctorcategory_id: doctorcategory,
      doctormaster_id: doctormasterid,
      fullname: name,
      age: age,
      gender: gender,
      contact_number: contact,
      doctorname: docname,
      appointment_time: appointtime,
      appointment_date: appointdate,
      appointment_status: "Appointment Pending",
      appointment_statusdescription: "New Appointment",
      ridedetail: {
        pickup_address: ride.pickup_address,
        drop_address: ride.drop_address,
        landmark: ride.landmark,
        ride_date: appointdate,
        ride_time: appointtime,
        ride_status: ride.ride_status,
        ride_status_description: ride.ride_status_description,
      },
    };
    console.log("Test App", data);

    axios
      .post(
        "https://cerbosys.in:1700/rxaushadi/insertAppointment",
        {
          doctorcategory_id: doctorcategory,
          doctormaster_id: doctormasterid,
          fullname: name,
          age: age,
          gender: gender,
          contact_number: contact,
          doctorname: docname,
          appointment_time: appointtime,
          appointment_date: appointdate,
          appointment_status: "Appointment Pending",
          appointment_statusdescription: "New Appointment",
          ridedetail: {
            pickup_address: ride.pickup_address,
            drop_address: ride.drop_address,
            landmark: ride.landmark,
            ride_date: appointdate,
            ride_time: appointtime,
            ride_status: ride.ride_status,
            ride_status_description: ride.ride_status_description,
          },
        },

        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        console.log("add appoint data", res.data);
        // if (res == 200) {
        //   alert("Appointment Booked Succesfully");
        // }
        document.getElementById("add_appointment_popup").style.display = "none";
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // select dropcon of page
  const appointSelect = (e) => {
    console.log("status update succesfully", e);
    fetch(
      `https://cerbosys.in:1700/rxaushadi/getAppointmentByStatus?appointment_status=${e}`,
      {
        headers: authHeader(),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status == 200 && res.message === "No Detail Available") {
          console.log("if", res.message);
          // throw new Error(`This is an HTTP error: The status is ${res.status}`);
        } else {
          setData(res.data);
          console.log("Appointment" + e, res.data);
        }
      })
      .catch((err) => {
        console.log("err", err);
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
        setDoctorList(data.data);
        console.log("Doctors list", doctorlist);
        if (data.success) {
          setDoctorCategory(data.data[0].doctorcategory_id);
          setDoctorMasterId(data.data[0].doctormaster_id);
        }
        getAllSlot();
        console.log("doctor categery", doctorcategory);
        console.log("master id", doctormasterid);
      });
    });
  };

  const getAllSlot = (data) => {
    var e = data;
    // console.log("slot id", e);
    fetch(
      "https://cerbosys.in:1700/rxaushadi/getDoctorTimeSlot?doctormaster_id=" +
        e,
      {
        headers: authHeader(),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log("slots", data);
        setSlots({ slots: data.data, e });
      });
  };

  // Form Validation
  const onchangeFullName = (e) => {
    const name = e.target.value.replace(/[^a-z]/gi, " ");
    setName(name);
    if (name.length <= 5) {
      setErrorsName("Enter Name");
      setErrorsNa(true);
      return name;
    } else {
      setErrorsName(false);
    }
  };
  const onchangeAge = (e) => {
    // console.log("onchangeContact");
    const age = e.target.value.replace(/([^0-9])+/i, "");
    setAge(age);
    if (age.length <= 1) {
      setErrorsAge("Enter valid Age");
      setErrorsAg(true);
      return age;
    } else {
      setErrorsAge(false);
    }
  };

  const onchangeContact = (e) => {
    // console.log("onchangeContact");
    const contact = e.target.value.replace(/([^0-9])+/i, "");
    setContact(contact);
    // (contact.length < 10 || contact.length > 10)
    if (contact.length < 9) {
      setErrorsContact("Enter valid Contact");
      setErrorsCon(true);
    } else {
      setErrorsCon(false);
    }
  };

  const onChangeSearch = (e) => {
    const search = e.target.value;
    setSearch(search);
    if (search == "") {
      window.location.reload();
    }
    console.log("search", search);
  };

  const searchAPI = () => {
    var formData = new FormData();
    formData.append("appointmentcaseId", apoointcaseid);
    formData.append("appointment_id", appointmentid);
    formData.append("fullname", name);
    formData.append("contact_number", contact);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("pickup_address", address);
    formData.append("landmark", landmark);
    formData.append("doctorcategory_id", doctorcategoryid);
    formData.append("doctormaster_id", doctormasterid);
    formData.append("doctorname", docname);
    formData.append("appointment_date", appointdate);
    formData.append("appointment_time", appointtime);
    formData.append("appointment_statusdescription", remark);
    formData.append("ridemaster_id", rideMasterId);
    console.log("search", search);
    axios
      .get(`${baseUrl}/getAppointmentByStatus?appointment_status=${search}`, {
        headers: authHeader(),
      })
      .then((res) => {
        console.log(res);
        setData(res.data.data);
        if (res.data.status == 200) {
          const i = res?.data?.data.length - 1;
          // console.log("popup", res?.data?.data[i]);
          console.log("popup appoint data", res);
          console.log("RideMaster", res.data.data);
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
          setDocName(res?.data?.data[i].doctorname);
          setAppointDate(res?.data?.data[i].appointment_date);
          setAppointTime(res?.data?.data[i].appointment_time);
          setRemark(res?.data?.data[i].appointment_statusdescription);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 0).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  function militaryTimeTo12Hour(s) {
    if (s.length == 3) s = `0${s}`; // 930 -> 0930
    const hour = parseInt(s.substring(0, 2), 10);
    const min = parseInt(s.substring(2, 4), 10);
    if (hour < 12) return `${hour % 12}:${min} AM`;
    return `${hour % 12 || 12}:${min} PM`;
  }

  const [timetopost, setTimetopost] = useState("");

  // function convert12(str) {
  //   // Get Hours
  //   var h1 = Number(str[0] - "0");
  //   var h2 = Number(str[1] - "0");
  //   var hh = h1 * 10 + h2;
  //   // Finding out the Meridien of time
  //   // ie. AM or PM
  //   var Meridien;
  //   if (hh < 12) {
  //     Meridien = "AM";
  //   } else Meridien = "PM";
  //   hh %= 12;
  //   // Handle 00 and 12 case separately
  //   if (hh == 0) {
  //     document.write("12");
  //     // Printing minutes and seconds
  //     for (var i = 2; i < 8; ++i) {
  //       document.write(str[i]);
  //     }
  //   } else {
  //     document.write(hh);
  //     // Printing minutes and seconds
  //     for (var i = 2; i < 8; ++i) {
  //       document.write(str[i]);
  //     }
  //   }
  //   // After time is printed
  //   // cout Meridien

  //   document.write(" " + Meridien);
  // }
  // // Driver code
  // // 24 hour format
  // var str = appointtime;
  // convert12(str);
  // // This code is contributed by bunnyram19.

  return (
    <>
      <div className="dashboard">
        <Sidebar />

        {/* <!-- ========================= Main ==================== --> */}
        <div className="main">
          <Topbar />

          <div className="dashbord_data">
            <div className="details">
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
                        appointSelect(e.target.value);
                      }}
                      style={{ border: "2px solid grey", fontWeight: "bold" }}
                    >
                      <option
                        value="All"
                        onChange={(e) => {
                          allStatus(e.target.value);
                        }}
                      >
                        All
                      </option>
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

                  <div className="dropdown">
                    <input
                      onChange={(e) => {
                        onChangeSearch(e);
                        searchAPI();
                      }}
                      className="serch_data"
                      placeholder="Search"
                    ></input>
                  </div>

                  <div>
                    <button
                      className="appoint_btn"
                      onClick={(e) => addAppointment(e)}
                    >
                      Book New Appointment
                    </button>
                  </div>
                </div>
              </div>
              <div className="cardHeader">
                <h4>Appointments</h4>
              </div>
              {!isloading ? (
                <Loader />
              ) : (
                <table className="">
                  <thead>
                    <tr className="appoint_table_heading ">
                      <th style={{ borderRadius: "8px 0px 0px 8px" }}>Sr.no</th>
                      <th>Case Id</th>
                      <th>Date </th>
                      <th>Full Name</th>
                      <th>Age</th>
                      <th>Address</th>
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
                      data.map((item, i, updateTime) => {
                        return (
                          <tr
                            style={{ cursor: "pointer" }}
                            onClick={() => hanldeClick(item.appointment_id)}
                            id={item.appointment_id}
                            className="appoint_table_content "
                          >
                            <th className="dashbord_th">{i + 1}</th>
                            <td>{item.appointmentcaseId}</td>
                            <td>{item.appointment_date}</td>
                            <td>{item.fullname}</td>
                            <td>{item.age}</td>
                            <td>{item.pickup_address}</td>
                            <td>{item.contact_number}</td>
                            <td>{item.doctorname}</td>
                            <td>
                              {/* {item.appointment_time} */}
                              <input
                                readOnly={true}
                                value={item.appointment_time}
                                type="time"
                                className="dateitmeTabl"
                              />
                            </td>

                            {/* {cases.map((item, index) => {
                              return <td>{item.case_status}</td>;
                            })} */}
                            <td>{item.appointment_status}</td>
                            <td>{item.appointment_statusdescription}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <p>No data </p>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {/*add appointment popup div start */}
      <div>
        <div id="add_appointment_popup" style={{ display: "none" }}>
          <div className="popup">
            <div className="popup-inner">
              <button className="close-btn" onClick={modal}>
                <AiOutlineClose />
              </button>
              <form className="pt-2">
                <div className="row p-1">
                  <div className="col">
                    <span className="popup_textBox_heading">Full Name</span>
                    <input
                      type="text"
                      className="form-control popup_textBox_data"
                      // value={name}
                      // onChange={(e) => setName(e.target.value)}
                      value={name}
                      onChange={onchangeFullName}
                    />
                    {errorsNa && (
                      <div className="massage" style={{ color: "red" }}>
                        {errorsname}
                      </div>
                    )}
                  </div>
                  <div className="col">
                    <span className="popup_textBox_heading">Age</span>
                    <input
                      type="text"
                      className="form-control popup_textBox_data"
                      maxLength="2"
                      value={age}
                      onChange={onchangeAge}
                    />
                    {errorsag && (
                      <div className="massage" style={{ color: "red" }}>
                        {errorsage}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row p-1">
                  <div className="col">
                    <span className="popup_textBox_heading">Gender</span>

                    <select
                      className="form-control popup_textBox_data"
                      // value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option>Other</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                  <div className="col">
                    <span className="popup_textBox_heading">Phone no.</span>
                    <input
                      type="tel"
                      className="form-control popup_textBox_data"
                      maxLength="10"
                      value={contact}
                      // error={errorscontact}
                      onChange={onchangeContact}
                    />
                    {errorscon && (
                      <div className="massage" style={{ color: "red" }}>
                        {errorscontact}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row p-1">
                  <div className="col">
                    <span className="popup_textBox_heading">Address</span>
                    <input
                      type="text"
                      className="form-control popup_textBox_data"
                      // value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <span className="popup_textBox_heading">Landmark</span>
                    <input
                      type="text"
                      className="form-control popup_textBox_data"
                      // value={landmark}
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
                      // value={doctorcategoryid}
                      onChange={(e) => getAllDoctorList(e.target.value)}
                    >
                      <option>select Category</option>
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
                      value={docname}
                      onChange={(e) => setDocName(e.target.value)}
                    >
                      <option>Select docter</option>
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
                  <div className="col">
                    <span className="popup_textBox_heading">
                      Appointment Date
                    </span>
                    <input
                      className="form-control popup_textBox_data"
                      // value={appointdate}
                      min={disablePastDate()}
                      max={disablePastDate() + 30}
                      type="date"
                      onChange={(e) => setAppointDate(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <span className="popup_textBox_heading">
                      Appointment Time
                    </span>

                    <input
                      id="timepost"
                      type="time"
                      className="form-control popup_textBox_data"
                      //militaryTimeTo12Hour
                      // onChange={TimeTo12Hour}
                      // value={appointtime}
                      max="12:00"
                      onChange={(e) => setAppointTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row p-3">
                  <div className="col">
                    <div className="d-grid gap-6 col-3 mx-auto">
                      <button
                        className="btn btn-danger update-btn add_appoinment_btn"
                        type="button"
                        onClick={addAppointment}
                      >
                        Add Appointment
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* add appoinment popup div end */}

      {/* Update appointment popup start */}
      <div>
        <div id="appointment_popup" style={{ display: "none" }}>
          <div className="popup">
            <div className="popup-inner">
              <button className="close-btn" onClick={modal}>
                <AiOutlineClose />
              </button>
              <h4 className="popup_main_heading">Appoinment</h4>
              <span className="popup_caseId">Case Id: {apoointcaseid}</span>
              <div
                className="d-flex"
                style={{ justifyContent: "space-between" }}
              >
                <div>
                  <span className="popup_caseId">
                    Appoinment Date and Time: {appointdate}&nbsp;
                    <input
                      readOnly={true}
                      value={appointtime}
                      type="time"
                      className="dateitme"
                    />
                    {/* {appointtime} */}
                  </span>
                </div>
                <div>
                  <span className="popup_caseId">Status</span>&nbsp;
                  <select
                    className="dropdown"
                    value={appoinmentstatus}
                    onChange={onchangeStatus}
                    style={{
                      border: "2px solid grey",
                      fontWeight: "bold",
                    }}
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
                      value={name}
                      readOnly={true}
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
                      onChange={(e) => {
                        setDoctorCategory(e.target.value);
                        getAllDoctorList(e.target.value);
                      }}
                    >
                      <option>select Category</option>
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
                        <p>no data</p>
                      )}
                    </select>
                  </div>
                  <div className="col">
                    <span className="popup_textBox_heading">Doctor Name</span>
                    <select
                      className="form-control popup_textBox_data"
                      value={docname}
                      onChange={(e) => setDocName(e.target.value)}
                    >
                      <option>Select docter</option>

                      {doctorlist ? (
                        doctorlist.map((docname, index) => {
                          return (
                            <option key={index} value={docname.doctorname}>
                              {docname.doctorname}
                            </option>
                          );
                        })
                      ) : (
                        <p>no data</p>
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
                        required
                        onChange={(e) => setAppointUpdateDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <span className="popup_textBox_heading">
                      Appoinment Time
                    </span>
                    <input
                      type="time"
                      className="form-control popup_textBox_data"
                      value={appointtime}
                      // onChange={militaryTimeTo12Hour}
                      // onChange={(e) => {
                      //   militaryTimeTo12Hour();
                      //   setAppointTime(e.target.value);
                      // }}
                      // value={appointtime}
                      onChange={(e) => setAppointTime(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row p-1">
                  <div className="col">
                    <span className="popup_textBox_heading">Remark</span>
                    <input
                      type="text"
                      id="remark_input_field"
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
                        onClick={updateAppointment}
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
      {/* update popup end */}
    </>
  );
};
