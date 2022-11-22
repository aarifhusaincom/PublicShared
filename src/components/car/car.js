import React, { useEffect, useState } from "react";
import axios from "axios";
import "./car.css";
import { Sidebar } from "../sidebar/sidebar";
import { Topbar } from "../topbar/topbar";
import { SERVER } from "../baseUrl";
import { AiOutlineClose } from "react-icons/ai";
import Loader from "../Loader/LoaderCam";
import authHeader from "../login/auth-headers";
export const Car = () => {
  const [isloading, setisloading] = useState(undefined);

  const [update, setUpdate] = useState(false);
  const [name, setName] = useState("");
  console.log(name);
  const [age, setAge] = useState("");
  console.log(age);
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [doctorname, setDoctorName] = useState("");
  const [appointdate, setAppointDate] = useState("");
  const [appointtime, setAppointTime] = useState("");
  const [remark, setRemark] = useState("");
  const [ridemasterid, setRideMasterId] = useState("");
  const [doctoraddress, setDoctorAddress] = useState("");
  const [drivername, setDriverName] = useState("");

  const [appoinmentstatus, setAppoinmentStatus] = useState("");

  const [appointmentCaseId, setAppointmentCaseId] = useState("");
  const [appointmentid, setAppointmentId] = useState("");
  const [driverid, setDriverId] = useState("");

  const [rideStatus, setRideStatus] = useState("");

  const [errorsrk, setErrorsRk] = useState(false);
  const [errorsremark, setErrorsRemark] = useState("");

  const [data, setData] = useState([]); //Calling a api for all prescreption
  console.log("prescreption data", data);

  const [driverlist, setDriverList] = useState([]);
  // console.log("get all drive list", driverlist);

  let userToken = localStorage.getItem("usertoken");
  // console.log("user token", userToken);
  // Get all ride data  start
  useEffect(async () => {
    await axios
      .get(`${SERVER}/getRideDetails`, {
        headers: authHeader(),
      })

      .then((res) => {
        console.log("getRideDetails", res.data);
        setData(res.data.data);
        setisloading(true);
      })
      .catch((err) => {
        console.log("error", err.message);
      });

    await axios
      .get(`${SERVER}/getAllDrivers`, {
        headers: authHeader(),
      })
      .then((res) => {
        console.log("getAllDrivers", res);
        setDriverList(res.data.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);
  // Get all ride data  End

  const modal = () => {
    document.getElementById("car_popup").style.display = "none";
  };
  // Ride and drive Get bye id start
  const hanldeClick = (ridedetails_id) => {
    // var formData = new FormData();
    // formData.append("ridemaster_id", userToken?.ridemaster_id);
    // formData.append("ridemaster_id", ridemasterid);
    // formData.append("fullname", name);
    // formData.append("age", age);
    // formData.append("gender", gender);
    // formData.append("contact_number", contact);
    // formData.append("pickup_address", address);
    // formData.append("doctorname", doctorname);
    // formData.append("appointment_time", appointtime);
    // formData.append("drop_address", doctoraddress);
    // formData.append("ride_status_description", remark);
    // formData.append("ride_status", rideStatus);
    // formData.append("drivername", drivername);
    // formData.append("appointment_id", appointmentid);
    // formData.append("appointmentcaseId", appointmentCaseId);
    console.log(ridedetails_id);
    axios
      .get(
        `${SERVER}//getRideDetailByIdAdmin?ridedetails_id=${ridedetails_id}`,

        {
          headers: authHeader(),
        }
      )

      .then((res) => {
        if (res.data.status == 200) {
          console.log(res);
          const i = res?.data?.data.length - 1;
          // console.log("popup", res?.data?.data[i]);
          console.log("ride car popup data", res);
          localStorage.getItem(userToken);
          setUpdate(true);
          setRideMasterId(res?.data?.data[i].ridemaster_id);
          setName(res?.data?.data[i].fullname);
          setAge(res?.data?.data[i].age);
          setGender(res?.data?.data[i].gender);
          setContact(res?.data?.data[i].contact_number);
          setAddress(res?.data?.data[i].pickup_address);
          setDoctorName(res?.data?.data[i].doctorname);
          setAppointTime(res?.data?.data[i].appointment_time);
          setDoctorAddress(res?.data?.data[i].doctor_address);
          setRemark(res?.data?.data[i].ride_status_description);
          setRideStatus(res?.data?.data[i].ride_status);
          setDriverName(res?.data?.data[i].drivername);
          setAppointmentId(res?.data?.data[i].appointment_id);
          setAppointmentCaseId(res?.data?.data[i].appointmentcaseId);
        }
        document.getElementById("car_popup").style.display = "block";
      });
  };
  // Ride and drive Get bye id End

  const onchangeStatus = (e) => {
    const rideStatus = e.target.value;
    setRideStatus(rideStatus);
    if (rideStatus == rideStatus) {
      setErrorsRemark("Enter valid remark");
      setErrorsRk(true);
      setRemark("");
    } else {
      console.log("Else");
    }
  };
  // const onchangeStatus = (e) => {
  //   const appoinmentstatus = e.target.value;
  //   setAppoinmentStatus(appoinmentstatus);
  //   if (appoinmentstatus == appoinmentstatus) {
  //     setErrorsRemark("Enter valid remark");
  //     setErrorsRk(true);
  //     setRemark("");
  //   } else {
  //     console.log("Else");
  //   }
  // };

  const onchangeRemark = (e) => {
    const remark = e.target.value.replace(/[^a-z]/gi, " ");
    setRemark(remark);
    if (remark.length <= 5) {
      setErrorsRemark("Enter valid remark");
      setErrorsRk(true);
    } else {
      setErrorsRk(false);
    }
  };

  const updateRide = () => {
    console.log("appoinmentstatus", appoinmentstatus);
    let popupStatusData = {
      ridemaster_id: ridemasterid,
      ride_status: appoinmentstatus,
      ride_status_description: remark,
    };
    axios
      .post(
        "https://cerbosys.in:1700/rxaushadi/updateRideStatus",
        {
          ridemaster_id: ridemasterid,
          // ride_status: appoinmentstatus,
          ride_status: rideStatus,
          ride_status_description: remark,
        },
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        console.log("updatedriver", res);
        document.getElementById("car_popup").style.display = "none";
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // select status of popup
  const statusSelect = () => {
    let appoinmentCaseData = {
      appointmentcaseId: appointmentCaseId,
      case_status: "Case Closed",
      case_status_description: "Testing",
    };
    axios
      .post(
        "https://cerbosys.in:1700/rxaushadi/updateAppointmentCase",
        {
          appointmentcaseId: appointmentCaseId,
          case_status: appoinmentstatus,
          case_status_description: remark,
        },
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        console.log("case update", res);
        // console.log("appoinmentCaseData", appoinmentCaseData);
        setAppoinmentStatus(res.data);
        updateRide(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // update appointment function
  const updateRideDetails = async () => {
    const updateCarData = {
      driver_id: driverid,
      ridemaster_id: ridemasterid,
    };
    axios
      .post(
        "https://cerbosys.in:1700/rxaushadi/updateDriverDetailsInRideMaster",
        {
          driver_id: driverid,
          ridemaster_id: ridemasterid,
        },
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        console.log("update appoint data", res);
        // console.log("updatecardata", updateCarData);
        statusSelect();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // select dropdown prescreption
  function rideDriveSelect(e) {
    console.log("status update succesfully", e);
    fetch(
      `https://cerbosys.in:1700/rxaushadi/getDriverByStatus?driver_status=${e}`,
      {
        headers: authHeader(),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("Prescreption Pending", res.data);
        if (res.status == 200 && res.message === "No Detail Available") {
          throw new Error(`This is an HTTP error: The status is ${res.status}`);
        } else {
          setData(res.data);
          console.log("Appointment" + e, res.data);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

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
                {/* <div
                  className="d-flex"
                  style={{ justifyContent: "space-around" }}
                >
                  <div>
                    <select
                      className="dropdown"
                      onChange={(e) => {
                        rideDriveSelect(e.target.value);
                      }}
                      style={{ border: "2px solid grey", fontWeight: "bold" }}
                    >
                      <option value="Appointment Cancel">
                        Appointment Cancel
                      </option>
                      <option value="Appointment Rescheduled">
                        Appointment Rescheduled
                      </option>
                      <option value="Ride Cancelled">Ride Cancelled</option>
                      <option value="Ride Rescheduled">Ride Rescheduled</option>
                      <option value="Appointment & Ride Cancelled">
                        Appointment & Ride Cancelled
                      </option>
                      <option value="Appointment & Ride Rescheduled">
                        Appointment & Ride Rescheduled
                      </option>
                      <option value="Ride Bereached">Ride Bereached</option>
                      <option value="Driver Pending">Driver Pending</option>
                      <option value="Driver Assigned for Clinic pickup">
                        Driver Assigned for Clinic pickup
                      </option>
                      <option value="Driver Assigned for Home pickup">
                        Driver Assigned for Home pickup
                      </option>
                      <option value="Picked from Home">Picked from Home</option>
                      <option value="Dropped at Clinic">
                        Dropped at Clinic
                      </option>
                      <option value="Picked from Clinic">
                        Picked From Clinic
                      </option>
                      <option value="Dropped at Home">Dropped at Home</option>
                    </select>
                  </div>

                  <div className="dropdown">
                    <input className="serch_data" placeholder="Search"></input>
                  </div>
                </div> */}
              </div>
              <div className="cardHeader">
                <h4>Ride and Drive</h4>
              </div>
              {!isloading ? (
                <Loader />
              ) : (
                <table>
                  <thead>
                    <tr className="car_table_heading">
                      <th style={{ borderRadius: "8px 0px 0px 8px" }}>Sr.no</th>
                      <th>Case Id</th>
                      <th>Creation Date Time</th>
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
                      data.map((item, i) => {
                        return (
                          <tr
                            style={{ cursor: "pointer" }}
                            key={i}
                            onClick={() =>
                              hanldeClick(
                                item.ridedetails_id,
                                console.log(item.ridedetails_id)
                              )
                            }
                            id={item.ridedetails_id}
                          >
                            <th scope="row">{i + 1}</th>
                            <td>{item.appointmentcaseId}</td>
                            <td>{item.ride_date.substr(0, 10)}</td>
                            <td>{item.fullname}</td>
                            <td>{item.age}</td>
                            <td>{item.pickup_address}</td>
                            <td>{item.contact_number}</td>
                            <td>{item.doctorname}</td>

                            <td>
                              <input
                                readOnly={true}
                                value={item.appointment_time}
                                type="time"
                                className="dateitmeTabl"
                              />
                            </td>
                            <td>{item.ride_status}</td>
                            <td>{item.ride_status_description}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <p>no data</p>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* car update popup start */}
      <div>
        <div id="car_popup" style={{ display: "none" }}>
          <div className="popup">
            <div className="popup-inner">
              <button className="close-btn" onClick={modal}>
                <AiOutlineClose />
              </button>
              <h4 className="popup_main_heading">Ride And Drive</h4>
              <span className="popup_caseId">Case Id: {appointmentCaseId}</span>
              <div
                className="d-flex"
                style={{ justifyContent: "space-between" }}
              >
                <div>
                  <span className="popup_caseId">
                    Appointment Date and Time: {appointdate}&nbsp;
                    <input
                      readOnly={true}
                      value={appointtime}
                      type="time"
                      className="dateitme"
                    />
                  </span>
                </div>
                <div>
                  <span className="popup_caseId">Status</span>
                  <select
                    className="dropdown"
                    style={{
                      border: "2px solid grey",
                      fontWeight: "bold",
                    }}
                    value={rideStatus}
                    onChange={onchangeStatus}
                    // value={appoinmentstatus}
                    // onChange={onchangeStatus}
                  >
                    <option value="Ride Pending">Ride Pending</option>
                    <option value="Appointment Cancel">
                      Appointment Cancel
                    </option>
                    <option value="Appointment Rescheduled">
                      Appointment Rescheduled
                    </option>
                    <option value="Ride Cancelled">Ride Cancelled</option>
                    <option value="Ride Rescheduled">Ride Rescheduled</option>
                    <option value="Appointment & Ride Cancelled">
                      Appointment & Ride Cancelled
                    </option>
                    <option value="Appointment & Ride Rescheduled">
                      Appointment & Ride Rescheduled
                    </option>
                    <option value="Ride Bereached">Ride Bereached</option>
                    <option value="Driver Pending">Driver Pending</option>
                    <option value="Driver Assigned for Clinic pickup">
                      Driver Assigned for Clinic pickup
                    </option>
                    <option value="Driver Assigned for Home pickup">
                      Driver Assigned for Home pickup
                    </option>
                    <option value="Picked from Home">Picked from Home</option>
                    <option value="Dropped at Clinic">Dropped at Clinic</option>
                    <option value="Picked from Clinic">
                      Picked From Clinic
                    </option>
                    <option value="Dropped at Home">Dropped at Home</option>
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
                      <option>Other</option>
                      <option>Male</option>
                      <option>Female</option>
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
                    <span className="popup_textBox_heading">Doctor Name</span>
                    <input
                      type="text"
                      readOnly={true}
                      className="form-control popup_textBox_data"
                      value={doctorname}
                      onChange={(e) => setDoctorName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row p-1">
                  <div className="col">
                    <span className="popup_textBox_heading">
                      Appointment Time
                    </span>
                    <input
                      type="text"
                      className="form-control popup_textBox_data"
                      value={appointtime}
                      readOnly={true}
                      onChange={(e) => setAppointTime(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <span className="popup_textBox_heading">
                      Doctor Address
                    </span>
                    <input
                      type="text"
                      readOnly={true}
                      className="form-control popup_textBox_data"
                      value={doctoraddress}
                      onChange={(e) => setDoctorAddress(e.target.value)}
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
                    <span className="popup_textBox_heading">Driver Name</span>
                    <select
                      className="form-control popup_textBox_data"
                      value={drivername}
                      onChange={(e) => {
                        setDriverName(e.target.value);
                        setDriverId(e.target.value);
                      }}
                    >
                      {driverlist ? (
                        driverlist.map((driver, index) => {
                          return (
                            <option value={driver.driverdetails_id} key={index}>
                              {driver.drivername}
                            </option>
                          );
                        })
                      ) : (
                        <p>No data</p>
                      )}
                    </select>
                  </div>
                </div>

                <div className="row p-1">
                  <div className="col">
                    <div className="d-grid gap-2 col-3 mx-auto">
                      <button
                        className="btn btn-danger update_btn"
                        type="button"
                        onClick={updateRideDetails}
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
      {/* car popup end */}
    </>
  );
};
