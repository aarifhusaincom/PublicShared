import React, { useEffect, useState } from "react";
import axios from "axios";
import "./medicine.css";
import "../popup.css";
import { Sidebar } from "../sidebar/sidebar";
import { Topbar } from "../topbar/topbar";
import { SERVER } from "../baseUrl";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/LoaderCam";
import authHeader from "../login/auth-headers";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import jsPDF from "jspdf";
import html2pdf from "html2pdf.js";

import { HiOutlineDocumentDownload } from "react-icons/hi";
import { BsWhatsapp } from "react-icons/bs";
import logo from "../../image/privecy.jpg";
const IMAGE_URL = "https://cerbosys.in:1700/prescription/";

export const Medicine = () => {
  // print data start
  // const printpage = () => {
  //   document.getElementById("btnhide").style.display = "none";
  //   window.print();
  //   var page = document.getElementById("page");
  //   var opt = {
  //     margin: 0,
  //     filename: "billnumber",
  //     image: { type: "jpeg", quality: 10 },
  //     html2canvas: { scale: 5 },
  //     jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  //   };
  //   html2pdf().set(opt).from(page).save();
  // };

  // print data end

  const [selectedRows, setSelectedRows] = useState([]);
  const [isloading, setisloading] = useState(undefined);
  const [update, setUpdate] = useState(false);

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [remark, setRemark] = useState("");
  const [apoointcaseid, setAppointCaseId] = useState("");
  const [medicinestatus, setMedicineStatus] = useState("");
  const [appoinmentstatus, setAppoinmentStatus] = useState("");
  const [image, setImage] = useState("");

  const [updateimg, setUpdateImg] = useState();

  const [errorsrk, setErrorsRk] = useState(false);
  const [errorsremark, setErrorsRemark] = useState("");

  const [data, setData] = useState([]); //Calling a api for all products
  // console.log("medicine data", data);

  let userToken = localStorage.getItem("usertoken");
  // console.log("user token", userToken);

  // get all medicine data
  useEffect(async () => {
    await axios
      .get(`${SERVER}/getAllMedicineStatusData`, {
        headers: authHeader(),
      })
      .then((res) => {
        console.log(res);
        setData(res.data.data);
        setisloading(true);
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  }, []);

  // close popup model
  const modal = () => {
    document.getElementById("medicine_popup").style.display = "none";
  };

  // get medicine data by id
  const hanldeClick = (e) => {
    var formData = new FormData();
    formData.append("appointmentcaseId", userToken?.apoointcaseid);
    formData.append("fullname", name);
    formData.append("appointeecontact_number", contact);
    formData.append("appointee_address", address);
    formData.append("prescription_uploaddate", date);
    formData.append("medicine_status_description", remark);
    formData.append("prescription_img1", image);
    axios
      .get(
        `${SERVER}/getAllMedicineStatusDataById?appointmentcaseId=` + e,

        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        const i = res?.data?.data.length - 1;
        console.log("popup data", res?.data?.data[i]);
        console.log("medicine popup", res);
        localStorage.getItem(userToken);

        setUpdate(true);
        setName(res?.data?.data[i].appointee_name);
        setAppointCaseId(res?.data?.data[i].appointmentcaseId);
        setContact(res?.data?.data[i].appointeecontact_number);
        setAddress(res?.data?.data[i].appointee_address);
        setDate(res?.data?.data[i].creationDate);
        setRemark(res?.data?.data[i].medicine_status_description);
        // setImage(res?.data?.data[i].prescription_img1.substr(22));
        console.log("image", image);
      });
    document.getElementById("medicine_popup").style.display = "block";
  };

  // const updateRideDetails = () => {
  //   axios
  //     .post(
  //       `https://cerbosys.in:1700/rxaushadi/updateRideStatus`,
  //       {
  //         ridemaster_id: rideMasterId,
  //         ride_status: "Ride Pending",
  //         ride_status_description: "Ride Pending",
  //       },
  //       {
  //         headers: {
  //           // "content-type": "application/json",
  //           Authorization: "Bearer " + userToken,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       console.log("update ride data", res);
  //       console.log("rideMasterId", rideMasterId);
  //       document.getElementById("medicine_popup").style.display = "none";
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // select status of popup

  const onchangeStatus = (e) => {
    const medicinestatus = e.target.value;
    setMedicineStatus(medicinestatus);
    if (medicinestatus == medicinestatus) {
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

  const statusSelect = () => {
    axios
      .post(
        `https://cerbosys.in:1700/rxaushadi/updateAppointmentCase`,
        {
          appointmentcaseId: apoointcaseid,
          case_status: medicinestatus,
          case_status_description: remark,
        },
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        console.log("update status data", res);
        setAppoinmentStatus(res.data);
        // updateRideDetails(res.data);
        document.getElementById("medicine_popup").style.display = "none";
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // update medicine data
  const updateMedicineData = async () => {
    axios
      .post(
        "https://cerbosys.in:1700/rxaushadi/updateAppointmentMedicineCase",
        {
          appointmentcaseId: apoointcaseid,
          medicine_status: medicinestatus,
          medicine_status_description: remark,
        },
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        console.log("update medicine", res);
        statusSelect();
        // document.getElementById("medicine_popup").style.display = "none";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // select dropdoun function
  const medicineSelect = (e) => {
    console.log("status update succesfully", e);
    fetch(
      `https://cerbosys.in:1700/rxaushadi/getAppointmentCaseByStatus?medicine_status=${e}`,
      {
        headers: authHeader(),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          console.log("if", res.message);
          throw new Error(`This is an HTTP error: The status is ${res.status}`);
        } else {
          setData(res.data);
          console.log("Appointment" + e, res.data);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  // update popup image
  const onChangeUpdateImg = (e) => {
    const [file] = e.target.files;
    setUpdateImg(URL.createObjectURL(file));
  };

  // dawnlod pdf start
  const pdfGenreter = (item) => {
    const doc = new jsPDF();
    console.log(item);
    // doc.addImage({item.})
    // doc.setFontSize(22);
    // doc.setTextColor(255, 0, 0);
    doc.text(40, 20, "Rx Aushdhi Medical");

    doc.addFont("Helvertica", "bold");
    doc.text("Name", 50, 30);
    doc.text("Phone No.", 50, 40);
    doc.text("Address", 50, 50);
    doc.text("Gender", 50, 60);
    doc.text("Status", 50, 70);
    doc.addFont("Helvertica", "Normal");
    doc.text(`${item.appointee_name}`, 80, 30);
    doc.text(`${item.appointeecontact_number}`, 80, 40);
    doc.text(`${item.appointee_address}`, 80, 50);
    doc.text(`${item.gender}`, 80, 60);
    doc.text(`${item.case_status_description}`, 80, 70);
    doc.addImage(
      `${IMAGE_URL + item.prescription_img1.substr(22)}`,
      "PNG",
      50,
      90,
      100,
      100
    );
    doc.save(`${item.appointee_name}.pdf`);
  };
  // dawnlod pdf End

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
                          medicineSelect(e.target.value);
                        }}
                        style={{ border: "2px solid grey", fontWeight: "bold" }}
                      >
                        <option value="Medicine Prescribed">
                          Medicine Prescribed
                        </option>
                        <option value="Send to Rx">Send to Rx</option>
                        <option value="Rx Validated">Rx Validated</option>
                        <option value="Undelivered">Undelivered</option>
                        <option value="Cancled">Cancled</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="cardHeader d-flex">
                  <h2>Medicine</h2>
                  {/* <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="appoint_btn"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Download as XLS"
                  /> */}
                </div>
                {!isloading ? (
                  <Loader />
                ) : (
                  <table>
                    <thead>
                      <tr className="medicine_table_heading">
                        <th style={{ borderRadius: "8px 0px 0px 8px" }}>
                          Sr.no
                        </th>
                        <th>Full Name</th>
                        <th>Phone No.</th>
                        <th>Address</th>
                        <th>File</th>
                        <th>Uploaded Date & Time</th>
                        <th>Status</th>
                        <th>Remark</th>
                        <th style={{ borderRadius: "0px 8px 8px 0px" }}>
                          Send to RX
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {data ? (
                        data.map((item, i) => {
                          return (
                            <tr
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                hanldeClick(item.appointmentcaseId)
                              }
                              id={item.appointmentcaseId}
                            >
                              <th scope="row">{i + 1}</th>
                              <td>{item.appointee_name}</td>
                              <td>{item.appointeecontact_number}</td>
                              <td>{item.appointee_address}</td>
                              <td>
                                <img
                                  src={
                                    IMAGE_URL +
                                    item.prescription_img1.substr(22)
                                  }
                                  width="50px"
                                  height="50px"
                                  alt=""
                                />
                              </td>
                              <td>{item.creationDate.substr(0, 10)}</td>
                              <td>{item.medicine_status}</td>
                              <td>{item.medicine_status_description}</td>
                              <td onClick={() => pdfGenreter(item)}>
                                <a
                                  href="https://wa.me/+919669469547"
                                  target="_blank"
                                >
                                  <span className="p-3">
                                    {/* <HiOutlineDocumentDownload className="file_icon" /> */}

                                    <BsWhatsapp className="whatsp_icone" />
                                  </span>
                                </a>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <p>No data</p>
                      )}
                    </tbody>
                  </table>
                )}

                {/* <div onClick={GenretPDF}>Genret pdf</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* medicine popup div start */}
      <div id="medicine_popup" style={{ display: "none" }}>
        <div className="popup">
          <div className="popup-inner">
            <button className="close-btn" onClick={modal}>
              <AiOutlineClose />
            </button>
            <h4 className="popup_main_heading">Medicine</h4>
            <span className="popup_caseId">Case Id: {apoointcaseid}</span>
            <div className="d-flex" style={{ justifyContent: "space-between" }}>
              <div>
                <span className="popup_caseId">
                  Appoinment Date and Time: {date.substr(0, 10)}
                </span>
              </div>
              <div>
                <span className="popup_caseId">Status</span>&nbsp;
                <select
                  className="dropdown"
                  style={{ border: "2px solid grey", fontWeight: "bold" }}
                  value={medicinestatus}
                  onChange={onchangeStatus}
                >
                  <option value="Medicine Prescribed">
                    Medicine Prescribed
                  </option>
                  <option value="Send to Rx">Send to Rx</option>
                  <option value="Rx Validated">Rx Validated</option>
                  <option value="Undelivered">Undelivered</option>
                  <option value="Cancled">Cancled</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
            <form className="pt-4">
              <div>
                {/* <button id="btnhide" onClick={printpage}>
                  Print
                </button> */}

                <div className="row p-1">
                  <div className="col">
                    <span className="popup_textBox_heading">Full Name</span>
                    <input
                      type="text"
                      className="form-control popup_textBox_data"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <span className="popup_textBox_heading">Phone no.</span>
                    <input
                      type="number"
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
                      <div style={{ color: "red" }}>{errorsremark}</div>
                    )}
                  </div>
                </div>
                <div className="row p-1">
                  {/* <div className="col">
                  <strong>Files</strong>
                  <input
                    type="File"
                    multiple={true}
                    className="form-control popup_textBox_data"
                    onChange={onChangeUpdateImg}
                  />
                  <div className="prescription_update_popup_image">
                    <img src={IMAGE_URL + image} width="100px" height="100px" />
                    <img
                      src={updateimg}
                      width="100px"
                      height="100px"
                      style={{ marginLeft: "10px" }}
                    />
                  </div>
                </div> */}
                  <div className="col">
                    <div className="d-grid gap-2 col-6 mx-auto">
                      <button
                        className="btn btn-danger update-btn medicine_update_button"
                        type="button"
                        onClick={updateMedicineData}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* medicine popup div end */}
    </>
  );
};
