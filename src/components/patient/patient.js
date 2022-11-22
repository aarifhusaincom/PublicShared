import React, { useEffect, useState } from "react";
import axios from "axios";
import "./patient.css";
import "../popup.css";
import { Sidebar } from "../sidebar/sidebar";
import { Topbar } from "../topbar/topbar";
import { AiOutlineClose } from "react-icons/ai";
import Loader from "../Loader/LoaderCam";
// import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import authHeader from "../login/auth-headers";

export const Patient = () => {
  // const history = useNavigate();

  const history = useHistory();
  const [isloading, setisloading] = useState(undefined);

  const [appointid, setAppointId] = useState("");
  const [creationdate, setCreationDate] = useState("");
  const [status, setStatus] = useState("");

  const [search, setSearch] = useState("");

  //Create a Base url variable
  const baseUrl = "https://cerbosys.in:1700/rxaushadi";

  //Calling a api for all products
  const [data, setData] = useState([]);
  console.log("paisent", data);
  // console.log("patient data", data);

  let userToken = localStorage.getItem("usertoken");
  // console.log("user token", userToken);

  const patientDetails = (id) => {
    history.push(`/patientDetails/${id}`);
  };

  // get all patient
  useEffect(async () => {
    await axios
      .get(`${baseUrl}/getAllUsers`, {
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
      .get(`${baseUrl}/searchUser?name=${search}`, {
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
              <div className="cardHeader">
                <h4>Total User</h4>
                <input
                  className="serch_data"
                  onChange={(e) => {
                    onChangeSearch(e);
                    searchAPI();
                  }}
                  placeholder="Search"
                ></input>
              </div>
              {!isloading ? (
                <Loader />
              ) : (
                <table>
                  <thead>
                    <tr className="patient_table_heading">
                      <th style={{ borderRadius: "8px 0px 0px 8px" }}>Sr.no</th>
                      <th>Login Id</th>
                      <th>Creation Date Time</th>
                      <th>Login Name</th>
                      <th style={{ borderRadius: "0px 8px 8px 0px" }}>
                        Login No.
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
                              patientDetails(item.login_registerid)
                            }
                            id={item.login_registerid}
                          >
                            <th scope="row">{i + 1}</th>
                            <td>{item.login_registerid}</td>
                            <td>{item.creationDate.substr(0, 10)}</td>
                            <td>{item.registeredusername}</td>
                            <td>{item.contact_number}</td>
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
    </>
  );
};
