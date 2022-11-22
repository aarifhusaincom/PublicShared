import React, { useEffect, useState } from "react";
import axios from "axios";
import "./prescreption.css";
import "../popup.css";
import { Sidebar } from "../sidebar/sidebar";
import { Topbar } from "../topbar/topbar";
import { SERVER } from "../baseUrl";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/LoaderCam";
import authHeader from "../login/auth-headers";

const IMAGE_URL = "https://cerbosys.in:1700/prescription/";

export const Prescreption = () => {
  const [isloading, setisloading] = useState(undefined);

  const [update, setUpdate] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [remark, setRemark] = useState("");
  const [apoointcaseid, setAppointCaseId] = useState("");
  const [prescreptionid, setPrescreptionId] = useState("");
  const [prescreptionstatus, setPrescreptionStatus] = useState("");
  const [image, setImage] = useState("");
  const [appoinmentstatus, setAppoinmentStatus] = useState("");

  const [updateimg, setUpdateImg] = useState();

  const [search, setSearch] = useState("");

  const [errorsrk, setErrorsRk] = useState(false);
  const [errorsremark, setErrorsRemark] = useState("");

  const [data, setData] = useState([]); //Calling a api for all prescreption
  console.log("prescreption data", data);

  let userToken = localStorage.getItem("usertoken");
  // console.log("user token", userToken);

  //Create a Base url variable
  const baseUrl = "https://cerbosys.in:1700/rxaushadi";

  // get all precreption data
  useEffect(async () => {
    await axios
      .get(`${SERVER}/getAllPrescription`, {
        headers: authHeader(),
      })
      .then((res) => {
        console.log(res);
        setData(res.data.data);
        setisloading(true);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  // close popup model function
  const modal = () => {
    document.getElementById("prescreption_popup").style.display = "none";
  };

  // get prescreption data by id
  const hanldeClick = (e) => {
    var formData = new FormData();
    formData.append("prescription_img1", image);
    formData.append("prescription_img1", image);
    formData.append("appointee_name", name);
    formData.append("appointmentcaseId", apoointcaseid);
    formData.append("appointeecontact_number", contact);
    formData.append("appointee_address", address);
    formData.append("prescription_uploaddate", date);
    formData.append("prescription_status_description", remark);
    formData.append("prescription_id", prescreptionid);
    formData.append("prescription_status", prescreptionstatus);
    axios
      .get(
        `${SERVER}/getPrescriptionById?prescription_id=` + e,

        {
          headers: authHeader(),
        }
      )

      .then((res) => {
        const i = res?.data?.data.length - 1;
        // console.log("popup data", res?.data?.data[i]);
        console.log("prescreption popup", res);
        localStorage.getItem(userToken);

        setUpdate(true);
        setImage(res?.data?.data[i].prescription_img1.substr(22));
        console.log("image", image);
        setPrescreptionId(res?.data?.data[i].prescription_id);
        setPrescreptionStatus(res?.data?.data[i].prescription_status);
        setName(res?.data?.data[i].appointee_name);
        setAppointCaseId(res?.data?.data[i].appointmentcaseId);
        setContact(res?.data?.data[i].appointeecontact_number);
        setAddress(res?.data?.data[i].appointee_address);
        setDate(res?.data?.data[i].prescription_uploaddate);
        setRemark(res?.data?.data[i].prescription_status_description);
      });
    document.getElementById("prescreption_popup").style.display = "block";
  };

  const onchangeStatus = (e) => {
    const prescreptionstatus = e.target.value;
    setPrescreptionStatus(prescreptionstatus);
    if (prescreptionstatus == prescreptionstatus) {
      setErrorsRemark("Enter valid remark");
      setErrorsRk(true);
      setRemark("");
    } else {
      console.log("Else");
    }
  };

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

  // update ride details
  const updateRideDetails = () => {
    const update_ride = {
      appointmentcaseId: apoointcaseid,
      medicine_status: prescreptionstatus,
      medicine_status_description: remark,
    };
    axios
      .post(
        `https://cerbosys.in:1700/rxaushadi/updateAppointmentMedicineCase`,
        {
          appointmentcaseId: apoointcaseid,
          medicine_status: prescreptionstatus,
          medicine_status_description: remark,
        },
        {
          headers: authHeader(),
        }
      )

      .then((res) => {
        console.log("step 3");
        console.log("update_ride", update_ride);
        console.log("update ride data", res);
        document.getElementById("prescreption_popup").style.display = "none";
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // update prescreption popup status
  const prescreptionStatus = () => {
    const apointment_case_data = {
      appointmentcaseId: apoointcaseid,
      case_status: prescreptionstatus,
      case_status_description: remark,
    };
    axios
      .post(
        "https://cerbosys.in:1700/rxaushadi/updateAppointmentCase",
        {
          appointmentcaseId: apoointcaseid,
          case_status: prescreptionstatus,
          case_status_description: remark,
        },
        {
          headers: authHeader(),
        }
      )

      .then((res) => {
        console.log("step 2");
        console.log("apointment_case_data", apointment_case_data);
        console.log("update appoint data", res);
        setPrescreptionStatus(res.data);
        updateRideDetails(res.data);
        // document.getElementById("prescreption_popup").style.display = "none";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // update prescreption data
  const updatePrescreption = () => {
    const update_prescription = {
      prescription_id: prescreptionid,
      prescription_status: appoinmentstatus,
      prescription_status_description: remark,
    };
    console.log("prescription id", prescreptionid);
    axios
      .post(
        "https://cerbosys.in:1700/rxaushadi/updatePrescription",
        {
          prescription_id: prescreptionid,
          prescription_status: prescreptionstatus,
          prescription_status_description: remark,
        },
        {
          headers: authHeader(),
        }
      )

      .then((res) => {
        console.log(res);
        console.log("step 1");
        console.log("update_prescription", update_prescription);
        console.log("update prescreption", res);
        prescreptionStatus();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // select dropdown prescreption
  function prescreptionSelect(e) {
    console.log("status update succesfully", e);
    fetch(
      `https://cerbosys.in:1700/rxaushadi/getPrescriptionByStatus?prescription_status=${e}`,
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

  // update popup image
  const onChangeUpdateImg = (e) => {
    const blogimage = e.target.files[0];
    console.log("image ", blogimage);
    setUpdateImg(URL.createObjectURL(e.target.files[0]));
    setImage(blogimage);
    document.getElementById("editimageshow").style.display = "block";
    document.getElementById("GETimageshow").style.display = "none";
  };

  const onChangeSearch = (e) => {
    const search = e.target.value;
    if (search == " ") {
      window.location.reload();
    }
    setSearch(search);
  };

  const searchAPI = () => {
    console.log("search", search);
    axios
      .get(`${baseUrl}/getPrescriptionByStatus?prescription_status=${search}`, {
        headers: authHeader(),
      })

      .then((res) => {
        console.log(res);
        setData(res.data.data);
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
                        prescreptionSelect(e.target.value);
                      }}
                      style={{ border: "2px solid grey", fontWeight: "bold" }}
                    >
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
                </div>
              </div>
              <div className="cardHeader">
                <h4>Prescription</h4>
              </div>
              {!isloading ? (
                <Loader />
              ) : (
                <table>
                  <thead>
                    <tr className="prescreption_table_heading">
                      <th style={{ borderRadius: "8px 0px 0px 8px" }}>Sr.no</th>
                      <th>Full Name</th>
                      <th>Creation Date Time</th>
                      <th>Phone No.</th>
                      <th>Address</th>
                      <th>File</th>
                      <th>Uploaded Date & Time</th>
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
                            onClick={() => hanldeClick(item.prescription_id)}
                            id={item.prescription_id}
                          >
                            <th scope="row">{i + 1}</th>
                            <td>{item.appointee_name}</td>
                            <td>{item.prescription_uploaddate}</td>
                            <td>{item.appointeecontact_number}</td>
                            <td>{item.appointee_address}</td>
                            <td className="medicine_image">
                              <img
                                className=""
                                // src={IMAGE_URL + image}
                                src={
                                  IMAGE_URL + item.prescription_img1.substr(22)
                                }
                                width="50px"
                                height="50px"
                                alt=""
                              />
                            </td>
                            <td>{item.prescription_uploaddate}</td>
                            <td>{item.prescription_status}</td>
                            <td>{item.prescription_status_description}</td>
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

      {/* prescreption popup start */}
      <div>
        <div id="prescreption_popup" style={{ display: "none" }}>
          <div className="popup">
            <div className="popup-inner">
              <button className="close-btn" onClick={modal}>
                <AiOutlineClose />
              </button>
              <h4 className="popup_main_heading">Prescreption</h4>
              <span className="popup_caseId">Case Id: {apoointcaseid}</span>
              <div
                className="d-flex"
                style={{ justifyContent: "space-between" }}
              >
                <div>
                  <span className="popup_caseId">
                    Appointment Date and Time: {date}
                  </span>
                </div>
                <div>
                  <div>
                    <span className="popup_caseId">Status</span>&nbsp;
                    <select
                      className="dropdown"
                      value={prescreptionstatus}
                      onChange={onchangeStatus}
                      style={{
                        border: "2px solid grey",
                        fontWeight: "bold",
                      }}
                    >
                      <option value="Prescription Recived">
                        Prescription Recived
                      </option>
                      <option value="Medicine Prescribed">
                        Medicine Prescribed
                      </option>
                      <option value="No Medicine">No Medicine</option>
                      <option value="False Prescription">
                        False Prescription
                      </option>
                      <option value="Send To Rx">Send To Rx</option>
                    </select>
                  </div>
                </div>
              </div>
              <form className="pt-4">
                <div className="row p-1">
                  <div className="col">
                    <span className="popup_textBox_heading">Full Name</span>
                    <input
                      type="text"
                      readOnly={true}
                      className="form-control popup_textBox_data"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <span className="popup_textBox_heading">Phone no.</span>
                    <input
                      type="text"
                      readOnly={true}
                      className="form-control popup_textBox_data"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row p-1">
                  <div className="col">
                    <span className="popup_textBox_heading">Address</span>
                    <input
                      type="text"
                      readOnly={true}
                      className="form-control popup_textBox_data"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
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
                </div>
                <div className="row p-1">
                  <div className="col">
                    <strong>Files</strong>
                    <input
                      readOnly={true}
                      type="file"
                      file={image}
                      multiple={true}
                      className="form-control popup_textBox_data"
                      onChange={onChangeUpdateImg}
                    />
                    <div className="prescription_update_popup_image">
                      <img
                        // id="GETimageshow"
                        src={IMAGE_URL + image}
                        width="100px"
                        height="100px"
                      />
                      {/* <img
                        style={{ display: "none" }}
                        id="editimageshow"
                        src={updateimg}
                        width="100px"
                        height="100px"
                        
                      /> */}
                    </div>
                  </div>
                  <div className="col pt-5">
                    <div className="d-grid gap-2 col-6 mx-auto">
                      <button
                        className="btn btn-danger update-btn prescreption_update_button"
                        type="button"
                        onClick={updatePrescreption}
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
      {/* prescreption popup end */}
    </>
  );
};
