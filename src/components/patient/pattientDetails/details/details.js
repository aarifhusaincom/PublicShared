import React, { useEffect, useState } from "react";
import axios from "axios";
import { Topbar } from "../../../topbar/topbar";
import { Sidebar } from "../../../sidebar/sidebar";
import { useParams } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import authHeader from "../../../login/auth-headers";
const Details = () => {
  const [userCaseDesc, setUserCaseDesc] = useState([]);
  console.log(userCaseDesc);
  const [allUserCases, setAllUserCases] = useState([]);

  //Create a Base url variable
  const baseUrl = "https://cerbosys.in:1700/rxaushadi";

  let userToken = localStorage.getItem("usertoken");

  const { id, caseId } = useParams();

  // const history = useNavigate();
  const history = useHistory();

  // get patient case data by id
  useEffect(async (e) => {
    await axios
      .get(
        `${baseUrl}/getUserCaseDescriptionByCaseId?appointmentcaseId=${caseId}&login_registerid=` +
          id,
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        console.log("getUserCaseDescriptionByCaseId", res.data.data);
        setUserCaseDesc(res.data.data);
      });
  }, []);

  // hide popup model
  const hideModal = () => {
    console.log("close");
    history.push(`/patientDetails/${id}`);
  };

  return (
    <>
      <div id="patientDetails_page" className="dashboard">
        <Sidebar />
        {/* <!-- ========================= Main ==================== --> */}

        <div className="main">
          <Topbar />

          <div className="dashbord_data">
            <div className="details">
              <div className="cardHeader">
                <h4>Patient Details</h4>
                <h4>Total User</h4>
                <input className="serch_data" placeholder="Search"></input>
              </div>
              <table>
                <thead>
                  <tr className="patient_table_heading">
                    <th style={{ borderRadius: "8px 0px 0px 8px" }}>Sr.no</th>
                    <th>CaseId</th>
                    <th>Creation Date and Time</th>
                    <th style={{ borderRadius: "0px 8px 8px 0px" }}>
                      Current status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {allUserCases ? (
                    allUserCases.map((item, i) => {
                      return (
                        <tr
                          onClick={() => {
                            Details(item.appointmentcaseId);
                          }}
                          caseId={item.appointmentcaseId}
                        >
                          <th scope="row">{i + 1}</th>
                          <td>{item.appointmentcaseId}</td>
                          <td>{item.creationdate}</td>
                          <td>{item.case_status}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <p>no data</p>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="popup">
        {userCaseDesc ? (
          userCaseDesc.map((details, index) => {
            return (
              <div className="popup-inner">
                <button className="close_icon" onClick={hideModal}>
                  <AiOutlineArrowLeft />
                  Back To Patients
                </button>

                <h6>Case Id {details.appointmentcaseId}</h6>
                <div className="row p-3">
                  <div className="col-sm-6">
                    <div className="card case_card">
                      <div className="card-body case_card_body">
                        <div className="d-flex card_top_row">
                          <h4 className="card-title card_heading">
                            1.Appoinments
                          </h4>
                          <button className="card_icon"></button>
                        </div>
                        <label style={{ color: "gray" }}>
                          Status: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <strong style={{ color: "black" }}>
                            {details.case_status}
                          </strong>
                        </label>{" "}
                        <br />
                        <label style={{ color: "gray" }}>
                          Remark: &nbsp;&nbsp;&nbsp;
                          <strong style={{ color: "black" }}>
                            {details.case_status_description}
                          </strong>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="card case_card">
                      <div className="card-body case_card_body">
                        <div className="d-flex card_top_row">
                          <h4 className="card-title card_heading">
                            3.Prescreption
                          </h4>
                          <button className="card_icon"></button>
                        </div>
                        <label style={{ color: "gray" }}>
                          Status: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <strong style={{ color: "black" }}>
                            {details.case_status}
                          </strong>
                        </label>{" "}
                        <br />
                        <label style={{ color: "gray" }}>
                          Remark: &nbsp;&nbsp;&nbsp;
                          <strong style={{ color: "black" }}>
                            {details.case_status_description}
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
                          <h4 className="card-title card_heading">
                            2.Ride And Drive
                          </h4>
                          <button className="card_icon"></button>
                        </div>
                        <strong style={{ color: "green" }}>To Doctor</strong>
                        <br />
                        <label style={{ color: "gray" }}>
                          Status: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <strong style={{ color: "black" }}>
                            {details.case_status}
                          </strong>
                        </label>{" "}
                        <br />
                        <label style={{ color: "gray" }}>
                          Remark: &nbsp;&nbsp;&nbsp;
                          <strong style={{ color: "black" }}>
                            {details.case_status_description}
                          </strong>
                        </label>
                        <br />
                        <strong style={{ color: "red" }}>To Home Back</strong>
                        <br />
                        <label style={{ color: "gray" }}>
                          Status: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <strong style={{ color: "black" }}>
                            {details.case_status}
                          </strong>
                        </label>{" "}
                        <br />
                        <label style={{ color: "gray" }}>
                          Remark: &nbsp;&nbsp;&nbsp;
                          <strong style={{ color: "black" }}>
                            {details.case_status_description}
                          </strong>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="card case_card">
                      <div className="card-body case_card_body">
                        <div className="d-flex card_top_row">
                          <h4 className="card-title card_heading">
                            4.Medicine
                          </h4>
                          <button className="card_icon"></button>
                        </div>
                        <label style={{ color: "gray" }}>
                          Status: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <strong style={{ color: "black" }}>
                            {details.case_status}
                          </strong>
                        </label>{" "}
                        <br />
                        <label style={{ color: "gray" }}>
                          Remark: &nbsp;&nbsp;&nbsp;
                          <strong style={{ color: "black" }}>
                            {details.case_status_description}
                          </strong>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h4>No Data</h4>
        )}
      </div>
    </>
  );
};

export default Details;
