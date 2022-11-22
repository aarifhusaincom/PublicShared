import React, { useEffect, useState } from "react";
import axios from "axios";
import "./doctor.css";
import "../popup.css";
import { Sidebar } from "../sidebar/sidebar";
import { Topbar } from "../topbar/topbar";
import { SERVER } from "../baseUrl";
import { AiOutlineClose } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import Loader from "../Loader/LoaderCam";
import { useRef } from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css"; // for ES6 modules
import authHeader from "../login/auth-headers";

const IMAGE_URL = "https://cerbosys.in:1700/doctorprofile/";
const IMAGE_URL2category = "https://cerbosys.in:1700/category/";

export const Doctor = () => {
  const [isloading, setisloading] = useState(undefined);

  const [update, setUpdate] = useState(false);
  const [doctormasterid, setDoctorMasterId] = useState("");
  const [doctorname, setDoctorName] = useState("");
  const [doctorcategory, setDoctorCategory] = useState("");
  const [doctordegree, setDoctorDegree] = useState("");
  const [doctorexp, setDoctorExp] = useState("");
  const [doctoraddress, setDoctorAddress] = useState("");
  const [doctorcontact, setDoctorContact] = useState("");
  const [fromtime, setFromTime] = useState("");
  const [totime, setToTime] = useState("");
  const [doctorfees, setDoctorFees] = useState("");
  const [profile, setProfileImage] = useState("");
  const [remark, setRemark] = useState("");
  const [categoryname, setCategoryName] = useState("");
  const [statusid, setStatusId] = useState("");

  const [doctorcategoryid, setDoctorCategoryId] = useState([]);
  console.log(doctorcategoryid);
  const [docCategoryId, setDocCategoryId] = useState("");

  const [image, setImage] = useState("");

  const [categoryimg, setCategoryImg] = useState();
  const [categorygebyimg, setCategorygebyimg] = useState("");
  const [docterCategorystates, setDocterCategorystates] = useState("");
  console.log(docterCategorystates);

  const [DoctorCategoryIds, setDoctorCategoryIds] = useState("");
  const [categorygetNmae, setcategorygetNmae] = useState("");
  const [imageshow, setImageshow] = useState("");
  const [cetgoryImage, setcetgoryImage] = useState("");
  const [newcategoryimg, setNewCategoryImg] = useState("");

  const [doctorimg, setDoctorImg] = useState();
  const [newdoctorimg, setNewDoctorImg] = useState("");

  const [updateimg, setUpdateImg] = useState();
  const [newupdateimg, setNewUpdateImg] = useState();

  const [errorscon, setErrorsCon] = useState(false);
  const [errorscontact, setErrorsContact] = useState("");
  const [errorsfee, setErrorsfee] = useState(false);
  const [errorsfees, setErrorsfees] = useState("");

  const [search, setSearch] = useState("");
  const [caseData, setCaseData] = useState([]);
  console.log(caseData);
  const [doctorresult, setDoctorResult] = useState("");
  console.log("in state", doctorresult);
  const [categoryresult, setCategoryrResult] = useState("");

  //Calling a api for all products
  const [data, setData] = useState([]);

  //Calling a api for all prescreption
  console.log("doctor data", data);

  const [doctorlist, setDoctorList] = useState([]); // Calling a api for all doctorlist
  // console.log("doctorlist", doctorlist);

  const [slots, setSlots] = useState([]); // Calling a api for all slots
  // console.log("slots", slots);

  const [errorsex, setErrorsex] = useState(false);
  const [errorsexprence, setErrorsexprence] = useState("");
  const [errorsdeeg, setErrorsDeeg] = useState(false);
  const [errorsdeegree, setErrorsDeegree] = useState("");
  const [errorsname, setErrorsName] = useState("");
  const [errorsNa, setErrorsNa] = useState("");

  //Create a Base url variable
  const baseUrl = "https://cerbosys.in:1700/rxaushadi";

  let userToken = localStorage.getItem("usertoken");
  // console.log("user token", userToken);
  // get all data fro api of doctor table

  useEffect(async (e) => {
    await axios
      .get(`${baseUrl}/getAllDoctorMaster`, {
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
        setDoctorCategoryId(res.data);
        console.log(res.data);
        // const i = res.data.data.length - 1;
        // console.log(res.data[2].doctorcategory_id);
        // console.log(res.data[2].statusId);
        // setStatusId(res.data[i].statusId);
        // console.log(statusid);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  const modal = () => {
    document.getElementById("doctor_popup").style.display = "none";
    // window.location.reload();
    document.getElementById("add_doctor_popup").style.display = "none";
    document.getElementById("add_doctor_category_popup").style.display = "none";
    document.getElementById("inner_category_popup").style.display = "none";
  };
  // add new doctor function
  const addNewDoctor = (e) => {
    document.getElementById("add_doctor_popup").style.display = "block";
    e.preventDefault();
    let insertDoctor = "https://cerbosys.in:1700/rxaushadi/insertDoctorMaster";
    let data = {
      doctorcategory_id: doctorcategory,
      doctorname: doctorname,
      doctor_profileimage: newdoctorimg,
      doctor_address: doctoraddress,
      doctordegree: doctordegree,
      doctorexperience: doctorexp,
      doctorcontact_number: doctorcontact,
      fees: doctorfees,
      fromtime: fromtime,
      totime: totime,
    };

    var formData = new FormData();
    formData.append("doctorcategory_id", doctorcategory);
    formData.append("doctorname", doctorname);
    formData.append("doctor_profileimage", newdoctorimg);
    formData.append("doctor_address", doctoraddress);
    formData.append("doctordegree", doctordegree);
    formData.append("doctorexperience", doctorexp);
    formData.append("doctorcontact_number", doctorcontact);
    formData.append("fees", doctorfees);
    formData.append("fromtime", fromtime);
    formData.append("totime", totime);

    fetch(insertDoctor, {
      method: "POST",
      headers: authHeader(),
      body: formData,
    }).then((result) => {
      result.json().then((resp) => {
        console.log("insert new doctor", data, resp);
        document.getElementById("add_doctor_popup").style.display = "none";
        window.location.reload();
      });
    });
  };
  // get doctor data by id fuction
  const hanldeClick = (e) => {
    var formData = new FormData();
    formData.append("doctor_profileimage", image);
    formData.append("doctormaster_id", doctormasterid);
    formData.append("doctor_profileimage", profile);
    formData.append("doctorname", doctorname);
    formData.append("doctordegree", doctordegree);
    formData.append("doctorexperience", doctorexp);
    formData.append("doctorcontact_number", doctorcontact);
    formData.append("doctor_address", doctoraddress);
    formData.append("fromtime", fromtime);
    formData.append("totime", totime);
    formData.append("fees", doctorfees);
    formData.append("doctorcategory_id", docCategoryId);
    axios
      .get(
        `${SERVER}/getDoctorMasterById?doctormaster_id=` + e,

        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        const i = res?.data?.data.length - 1;
        // console.log("popup", res?.data?.data[i]);
        console.log("doctor popup", res);
        setUpdate(true);
        setImage(res?.data?.data[i].doctor_profileimage.substr(22));
        setDoctorMasterId(res?.data?.data[i].doctormaster_id);
        setDoctorName(res?.data?.data[i].doctorname);
        setDoctorCategory(res?.data?.data[i].category_name);
        setDoctorDegree(res?.data?.data[i].doctordegree);
        setDoctorExp(res?.data?.data[i].doctorexperience);
        setDoctorContact(res?.data?.data[i].doctorcontact_number);
        setDoctorAddress(res?.data?.data[i].doctor_address);
        setFromTime(res?.data?.data[i].fromtime);
        setToTime(res?.data?.data[i].totime);
        setDoctorFees(res?.data?.data[i].fees);
        setDocCategoryId(res?.data?.data[i].doctorcategory_id);
        setDocterstate(res?.data?.data[i].statusId);
      });

    fetch(
      "https://cerbosys.in:1700/rxaushadi/getDoctorTimeSlot?doctormaster_id=" +
        e,
      {
        headers: authHeader(),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("slot data", data);
        setSlots(data.data);
      });

    document.getElementById("doctor_popup").style.display = "block";
  };

  // update doctor data function
  const updateDoctorData = async () => {
    axios
      .post(
        "https://cerbosys.in:1700/rxaushadi/updateDoctorMaster",
        {
          doctormaster_id: doctormasterid,
          doctor_profileimage: profile,
          doctorname: doctorname,
          doctordegree: doctordegree,
          doctorexperience: doctorexp,
          doctor_address: doctoraddress,
          doctorcontact_number: doctorcontact,
          fromtime: fromtime,
          totime: totime,
          fees: doctorfees,
        },
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        console.log("update doctor data", res);
        document.getElementById("doctor_popup").style.display = "none";
        disableDoctor(doctormasterid);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // add doctor category function
  const addDoctorCategory = (e) => {
    console.log("addDoctorCategory");
    document.getElementById("add_doctor_category_popup").style.display =
      "block";
    e.preventDefault();
    let updateData = {
      category_name: categoryname,
      category_image: newcategoryimg,
    };
    console.log("updateData", updateData);
    var formDataUpdate = new FormData();
    formDataUpdate.append("category_name", categoryname);
    formDataUpdate.append("category_image", newcategoryimg);
    fetch("https://cerbosys.in:1700/rxaushadi/insertDoctorCategory", {
      method: "POST",

      headers: authHeader(),

      body: formDataUpdate,
    }).then((result) => {
      result
        .json()
        .then((resp) => {
          console.log("category add", resp);

          document.getElementById("add_doctor_category_popup").style.display =
            "none";
          window.location.reload();
        })
        .catch((err) => {
          console.log("error", err);
        });
    });
  };
  // get doctor category by id  function
  const categoryinnerPopup = (e) => {
    console.log("categoryinnerPopup get by id", e);
    document.getElementById("inner_category_popup").style.display = "block";
    // e.preventDefault();
    axios
      .get(
        `https://cerbosys.in:1700/rxaushadi/getDoctorCategoryById?doctorcategory_id=${e}`,
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        if (res.data.status == 200) {
          const i = res?.data?.data.length - 1;
          console.log(res.data.data);
          setDoctorCategoryIds(res?.data?.data[i].doctorcategory_id);
          setcategorygetNmae(res?.data?.data[i].category_name);
          setCategorygebyimg(res?.data?.data[i].category_image);
          // setDocterCategorystates(res?.data?.data[i].statusId);
          setDocterCetogorystate1(res?.data?.data[i].statusId);
        }
      });
  };
  // UPDATER doctor category function
  const updateDoctorCategory = async () => {
    document.getElementById("add_doctor_category_popup").style.display =
      "block";
    // e.preventDefault();
    var formdata = new FormData();
    formdata.append("doctorcategory_id", DoctorCategoryIds);
    formdata.append("category_name", categorygetNmae);
    formdata.append("category_image", cetgoryImage);
    console.log("updateData", formdata);
    axios
      .post(
        "https://cerbosys.in:1700/rxaushadi/updateDoctorCategory",
        {
          doctorcategory_id: DoctorCategoryIds,
          category_name: categorygetNmae,
          category_image: cetgoryImage,
        },
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        console.log("update doctor cetogory", res);
        // document.getElementById("doctorcetogory_popup").style.display = "none";
        disableDoctorCategory(DoctorCategoryIds);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ref = useRef(null);
  const enableDoctor = (e) => {
    const el2 = ref.current;
    if (document.getElementById("doctor_toggle").checked == true) {
      var doctorresult = 0;
      setDoctorResult(doctorresult);
    } else if (document.getElementById("doctor_toggle").checked == false) {
      var doctorresult = 1;
      setDoctorResult(doctorresult);
    }
    // var doctorresult = document.getElementById("doctor_toggle").checked ? 0 : 1;
    // console.log("doctor_toggle result", doctorresult);
    // setDoctorResult(doctorresult);

    //return result;
  };
  const disableDoctor = (id, x, doctormasterid) => {
    console.log(doctormasterid);
    console.log("id", id);
    console.log("x", x);
    console.log("doctorresult", doctormasterid);
    axios
      .post(
        `https://cerbosys.in:1700/rxaushadi/disableDoctorMaster?doctormaster_id=${id}&statusId=${x}`,
        {
          doctormaster_id: id,
          statusId: docterstate,
        },
        {
          headers: authHeader(),
        }
      )
      // .then((result) => {
      //   result.json().then((res) => {
      //     console.log("disbal  doctor", res);
      //     // window.location.reload();
      //   });
      // });
      .then((res) => {
        console.log("disableDoctor", res);
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const categoryRef = useRef(null);
  const categroryStatusToggle = () => {
    const el2 = categoryRef.current;
    var categoryresult = document.getElementById("category_toggle").checked
      ? 0
      : 1;
    console.log("category_toggle result", categoryresult);
    setCategoryrResult(categoryresult);
    //return result;
  };

  // Docter catogy stutas in toggal update
  const disableDoctorCategory = (cid, cs, docterCategorystate) => {
    console.log(docterCategorystate);
    console.log("cid", cid);
    console.log("cs", cs);
    console.log("doctorresult", docterCategorystate);

    axios
      .post(
        `https://cerbosys.in:1700/rxaushadi/disableDoctorCategory?doctorcategory_id=${cid}&statusId${cs}`,
        {
          doctorcategory_id: cid,
          statusId: docterCetogorystate1,
        },
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        console.log("disableDoctor Ctpgory", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //dropdoun slect filter of doctor page
  const doctorSelect = (e) => {
    console.log("status update succesfully", e);
    fetch(
      `https://cerbosys.in:1700/rxaushadi/getDoctorMasterByCategoryName?category_name=${e}`,
      {
        headers: authHeader(),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status == 200 && res.message === "No Detail Available") {
          console.log("if", res.message);
          throw new Error(`This is an HTTP error: The status is ${res.status}`);
        } else {
          setData(res.data);
          console.log("category" + e, res.data);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const getAllSlot = (e) => {
    console.log("slot id", e);
    fetch(
      "https://cerbosys.in:1700/rxaushadi/getDoctorTimeSlot?doctormaster_id=" +
        e,
      {
        headers: authHeader(),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setSlots({ slots: data.data, e });
      });
  };

  const [updatetime, setUpdateTime] = useState("");
  const updateTimeRef = useRef(null);
  const updateTimeToggle = () => {
    const el2 = categoryRef.current;
    var updatetime = document.getElementById("update_time_toggle").checked
      ? 1
      : 0;
    setUpdateTime(updatetime);
  };

  const updateTimeSlot = (ts, tid, tsid) => {
    console.log("ts", ts);
    console.log("tid", tid);
    console.log("tsid", tsid);
    fetch(
      `https://cerbosys.in:1700/rxaushadi/updateTimeSlot?timeSlot=${ts}&doctormaster_id=${tid}&statusId=${tsid}`,
      {
        method: "GET",

        headers: authHeader(),
      }
    ).then((result) => {
      result.json().then((resp) => {
        console.log("delete doctor category", resp);
      });
    });
  };

  //category popup image function of popup
  const onChangeCategoryImg = (e) => {
    const [file] = e.target.files;
    setCategoryImg(URL.createObjectURL(file));
    setNewCategoryImg(file);
  };
  // forupdate image

  const onchangeImage = (e) => {
    const blogimage = e.target.files[0];
    console.log("image", blogimage);
    setImageshow(URL.createObjectURL(e.target.files[0]));
    setcetgoryImage(blogimage);
    document.getElementById("blogeditimageshow").style.display = "block";
    document.getElementById("blogeditGETimageshow").style.display = "none";
  };

  //add new doctor image function of popup
  const onChangeDoctorImg = (e) => {
    const [file] = e.target.files;
    setDoctorImg(URL.createObjectURL(file));
    setNewDoctorImg(file);
  };

  //update doctor image function of popup
  const onChangeUpdateImg = (e) => {
    const [file] = e.target.files;
    setUpdateImg(URL.createObjectURL(file));
    setNewUpdateImg(file);
    document.getElementById("imageshow").style.display = "none";
    document.getElementById("imageuplodeing").style.display = "block";
  };

  // Form Validation

  const onchangeFullName = (e) => {
    const doctorname = e.target.value.replace(/[^a-z]/gi, " ");
    setDoctorName(doctorname);
    if (doctorname.length <= 5) {
      setErrorsName("Enter Name");
      setErrorsNa(true);
      return doctorname;
    } else {
      setErrorsName(false);
    }
  };
  const onchangeDegree = (e) => {
    console.log("onchangeContact");
    const doctordegree = e.target.value.replace(/[^a-z .]/gi, " ");
    setDoctorDegree(doctordegree);
    if (doctordegree.length <= 1) {
      setErrorsDeegree("Enter valid Degree");
      setErrorsDeeg(true);
      return doctordegree;
    } else {
      setErrorsDeegree(false);
    }
  };
  const onchangeExp = (e) => {
    console.log("onchangeContact");
    const doctorexp = e.target.value.replace(/([^0-9])+/i, "");
    setDoctorExp(doctorexp);
    if (doctorexp.length <= 0) {
      setErrorsexprence("Enter valid Exprence");
      setErrorsex(true);
      return doctorexp;
    } else {
      setErrorsexprence(false);
    }
  };
  const onchangeContact = (e) => {
    const doctorcontact = e.target.value.replace(/([^0-9])+/i, "");
    setDoctorContact(doctorcontact);
    if (doctorcontact.length <= 9) {
      setErrorsContact("Enter valid Number");
      setErrorsCon(true);
    } else {
      setErrorsCon(false);
    }
  };
  const onChangeFees = (e) => {
    const doctorfees = e.target.value.replace(/([^0-9])+/i, "");
    setDoctorFees(doctorfees);
    if (doctorfees.length <= 0) {
      setErrorsfees("Enter valid Number");
      setErrorsfee(true);
    } else {
      setErrorsfee(false);
    }
  };

  // console.log("search :--", search);
  // const onChangeSearch = (e) => {
  //   const search = e.target.value;
  //   setSearch(search);
  //   if (search == "") {
  //     window.location.reload();
  //   }
  //   console.log("search", search);
  // };

  // const searchAPI = () => {
  //   console.log("search", search);
  //   axios
  //     .get(`${baseUrl}/searchDoctor?name=${search}`, {
  //       headers: {
  //         Authorization: "Bearer " + userToken,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       setData(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log("error", err);
  //     });
  // };

  //  for Search
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  // const searchItems = (searchValue) => {
  //   setSearchInput(searchValue);
  //   if (searchInput !== "") {
  //     const filteredData = data.filter((item) => {
  //       return Object.values(item)
  //         .join("")
  //         .toLowerCase()
  //         .includes(searchInput.toLowerCase());
  //     });
  //     setFilteredResults(filteredData);
  //   } else {
  //     setFilteredResults(data);
  //   }
  // };
  const [docterstate, setDocterstate] = useState("");
  console.log(docterstate);
  const [docterCetogorystate1, setDocterCetogorystate1] = useState("");
  console.log(docterCetogorystate1);

  // serch api start
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
      .get(`${baseUrl}/searchDoctor?name=${search}`, {
        headers: authHeader(),
      })
      .then((res) => {
        console.log(res.data.SearchData);
        setData(res.data.SearchData);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  // serch api End
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
                  <h4>Doctor List</h4>
                  <div
                    className="d-flex"
                    style={{ justifyContent: "space-around" }}
                  >
                    <div>
                      <select
                        className="dropdown"
                        onChange={(e) => {
                          doctorSelect(e.target.value);
                        }}
                        style={{ border: "2px solid grey", fontWeight: "bold" }}
                      >
                        <option value="all">ALL</option>
                        <option value="Dentist">Dentist</option>
                        <option value="Cardiologist">Cardiologist</option>
                        <option value="Pediatricians">Pediatricians</option>
                        <option value="Gynecologist">Gynecologist</option>
                        <option value="Dermatologists">Dermatologists</option>
                      </select>
                    </div>

                    <div className="dropdown">
                      <input
                        onChange={(e) => {
                          onChangeSearch(e);
                          searchAPI();
                        }}
                        // onChange={(e) => searchItems(e.target.value)}
                        className="serch_data"
                        placeholder="Search"
                      ></input>
                    </div>

                    <div className="update_button_div">
                      <button
                        className="doctor_update_button"
                        onClick={() => addDoctorCategory()}
                      >
                        Doctor Category
                      </button>
                      <button
                        className="doctor_update_button add_doctor"
                        onClick={() => addNewDoctor()}
                      >
                        Add New Doctor
                      </button>
                    </div>
                  </div>
                </div>
                {!isloading ? (
                  <Loader />
                ) : (
                  <table>
                    <thead>
                      <tr className="prescreption_table_heading">
                        <th style={{ borderRadius: "8px 0px 0px 8px" }}>
                          Sr.no
                        </th>
                        <th>Doctor Category</th>
                        <th>Doctor Name</th>
                        <th>Phone No.</th>
                        <th>Address</th>
                        <th>Degree</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Fees</th>
                        <th style={{ borderRadius: "0px 8px 8px 0px" }}>
                          Status
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {/* searchInput.length > 1
                        ? filteredResults.map((item, i) => {
                            return (
                              <tr
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  hanldeClick(item.doctormaster_id)
                                }
                                id={item.doctormaster_id}
                              >
                                <th scope="row">{i + 1}</th>
                                <td
                                
                                >
                                  {item.category_name}
                                </td>
                                <td
                                
                                >
                                  {item.doctorname}
                                </td>
                                <td
                               
                                >
                                  {item.doctorcontact_number}
                                </td>

                                <td
                               
                                >
                                  {item.doctor_address}
                                </td>
                                <td
                               
                                >
                                  {item.doctordegree}
                                </td>
                                <td
                               
                                >
                                  <input
                                    readOnly={true}
                                    value={item.fromtime}
                                    type="time"
                                    className="dateitmeTabl"
                                  />
                                  
                                </td>
                                <td
                               
                                >
                                  <input
                                    readOnly={true}
                                    value={item.totime}
                                    type="time"
                                    className="dateitmeTabl"
                                  />
                                </td>
                                <td
                                
                                >
                                  {item.fees}
                                </td>
                                <td>
                                  
                                  {item.statusId == 1 ? "Active" : "DeActive"}
                                </td>
                              </tr>
                            );
                          })
                        : */}
                      {data ? (
                        data.map((item, i) => {
                          return (
                            <tr
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                var id = item.doctormaster_id;
                                hanldeClick(item.doctormaster_id);
                              }}
                              id={item.doctormaster_id}
                            >
                              <th scope="row">{i + 1}</th>
                              <td
                              // style={{ cursor: "pointer" }}
                              // onClick={() =>
                              //   hanldeClick(item.doctormaster_id)
                              // }
                              // id={item.doctormaster_id}
                              >
                                {item.category_name}
                              </td>
                              <td
                              // style={{ cursor: "pointer" }}
                              // onClick={() =>
                              //   hanldeClick(item.doctormaster_id)
                              // }
                              // id={item.doctormaster_id}
                              >
                                {item.doctorname}
                              </td>
                              <td
                              // style={{ cursor: "pointer" }}
                              // onClick={() =>
                              //   hanldeClick(item.doctormaster_id)
                              // }
                              // id={item.doctormaster_id}
                              >
                                {item.doctorcontact_number}
                              </td>

                              <td
                              // style={{ cursor: "pointer" }}
                              // onClick={() =>
                              //   hanldeClick(item.doctormaster_id)
                              // }
                              // id={item.doctormaster_id}
                              >
                                {item.doctor_address}
                              </td>
                              <td
                              // style={{ cursor: "pointer" }}
                              // onClick={() =>
                              //   hanldeClick(item.doctormaster_id)
                              // }
                              // id={item.doctormaster_id}
                              >
                                {item.doctordegree}
                              </td>
                              <td
                              // style={{ cursor: "pointer" }}
                              // onClick={() =>
                              //   hanldeClick(item.doctormaster_id)
                              // }
                              // id={item.doctormaster_id}
                              >
                                <input
                                  readOnly={true}
                                  value={item.fromtime}
                                  type="time"
                                  className="dateitmeTabl"
                                />
                                {/* {item.fromtime} */}
                              </td>
                              <td
                              // style={{ cursor: "pointer" }}
                              // onClick={() =>
                              //   hanldeClick(item.doctormaster_id)
                              // }
                              // id={item.doctormaster_id}
                              >
                                <input
                                  readOnly={true}
                                  value={item.totime}
                                  type="time"
                                  className="dateitmeTabl"
                                />
                                {/* {item.totime} */}
                              </td>
                              <td
                              // style={{ cursor: "pointer" }}
                              // onClick={() =>
                              //   hanldeClick(item.doctormaster_id)
                              // }
                              // id={item.doctormaster_id}
                              >
                                {item.fees}
                              </td>
                              {/* <td>
                                  <Toggle
                                    // defaultChecked={true}
                                    icons={false}
                                    id="doctor_toggle"
                                    ref={ref}
                                    onChange={() => {
                                      var id = item.doctormaster_id;
                                      enableDoctor();
                                      disableDoctor(
                                        item.doctormaster_id,
                                        doctorresult
                                        // setDoctorResult(item.statusId)
                                      );
                                    }}
                                  />
                                </td> */}
                              {/* <select>
                                  <option>{item.statusId}</option>
                                  <option>Active2</option>
                                </select> */}
                              {item.statusId == 1 ? "Active" : "DeActive"}
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

      {/* doctor update popup start */}
      <div>
        <div id="doctor_popup" style={{ display: "none" }}>
          <div className="popup">
            <div className="popup-inner">
              <button className="close-btn" onClick={modal}>
                <AiOutlineClose />
              </button>

              <h4 className="popup_main_heading">Doctor Details</h4>
              <span className="popup_caseId">Doctor Id: {doctormasterid}</span>
              <div className="d-flex">
                <div className="col-sm-8">
                  <form className="pt-4">
                    <div className="row p-1">
                      <div className="col-sm-4">
                        <span className="doctor_popup_textBox_heading">
                          Doctor Name
                        </span>
                        <input
                          type="text"
                          className="form-control doctor_popup_textBox_data"
                          value={doctorname}
                          readOnly={true}
                          onChange={(e) => setDoctorName(e.target.value)}
                        />
                      </div>
                      <div className="col-sm-4">
                        <span className="doctor_popup_textBox_heading">
                          Category
                        </span>
                        <input
                          type="text"
                          className="form-control doctor_popup_textBox_data"
                          value={doctorcategory}
                          readOnly={true}
                          onChange={(e) => setDoctorCategory(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row p-1">
                      <div className="col-sm-4">
                        <span className="doctor_popup_textBox_heading">
                          Doctor Degree
                        </span>
                        <input
                          type="text"
                          className="form-control doctor_popup_textBox_data"
                          value={doctordegree}
                          onChange={(e) => setDoctorDegree(e.target.value)}
                        />
                      </div>
                      <div className="col-sm-4">
                        <span className="doctor_popup_textBox_heading">
                          Experiance
                        </span>
                        <input
                          type="text"
                          className="form-control doctor_popup_textBox_data"
                          value={doctorexp}
                          onChange={(e) => setDoctorExp(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row p-1">
                      <div className="col-sm-4">
                        <span className="doctor_popup_textBox_heading">
                          Doctor Address
                        </span>
                        <input
                          type="text"
                          className="form-control doctor_popup_textBox_data"
                          value={doctoraddress}
                          onChange={(e) => setDoctorAddress(e.target.value)}
                        />
                      </div>
                      <div className="col-sm-4">
                        <span className="doctor_popup_textBox_heading">
                          Doctor Contact
                        </span>
                        <input
                          type="text"
                          className="form-control doctor_popup_textBox_data"
                          value={doctorcontact}
                          onChange={(e) => setDoctorContact(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row p-1">
                      <div className="col-sm-4">
                        <span className="doctor_popup_textBox_heading">
                          Appoinment From
                        </span>
                        <input
                          type="time"
                          className="form-control doctor_popup_textBox_data"
                          value={fromtime}
                          onChange={(e) => setFromTime(e.target.value)}
                        />
                      </div>
                      <div className="col-sm-4">
                        <span className="doctor_popup_textBox_heading">
                          Appoinment To
                        </span>
                        <input
                          type="time"
                          className="form-control doctor_popup_textBox_data"
                          value={totime}
                          onChange={(e) => setToTime(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row p-1">
                      <div className="col-sm-4">
                        <span className="doctor_popup_textBox_heading">
                          Fees
                        </span>
                        <input
                          type="text"
                          className="form-control doctor_popup_textBox_data"
                          value={doctorfees}
                          onChange={(e) => setDoctorFees(e.target.value)}
                        />
                      </div>
                      <div className="col-sm-4">
                        <span className="doctor_popup_textBox_heading">
                          Docter Status
                        </span>
                        {/* <input
                          type="text"
                          className="form-control doctor_popup_textBox_data"
                          value={doctorfees}
                          onChange={(e) => setDoctorFees(e.target.value)}
                        /> */}
                        <select
                          className="form-control doctor_popup_textBox_data"
                          value={docterstate}
                          onChange={
                            (e) =>
                              // DocterState();
                              setDocterstate(e.target.value)

                            // item.doctormaster_id,
                            // doctorresult
                            // setDoctorResult(item.statusId)
                          }
                          // onChange={  var id = item.doctormaster_id; DocterState()}
                        >
                          <option value="1">Active</option>
                          <option value="0">Deactivate</option>
                        </select>
                      </div>
                    </div>

                    <div className="row p-1">
                      <div className="col-sm-12">
                        <span className="doctor_popup_textBox_heading">
                          File
                        </span>
                        <input
                          type="File"
                          className="form-control doctor_popup_textBox_data"
                          onChange={onChangeUpdateImg}
                        />
                        <div className="doctor_update_popup_image">
                          <img
                            id="imageshow"
                            src={IMAGE_URL + image}
                            width="100px"
                            height="100px"
                          />
                          <img
                            id="imageuplodeing"
                            src={updateimg}
                            width="100px"
                            height="100px"
                            style={{ marginLeft: "10px", display: "none" }}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="col-sm-4">
                  <h5 className="card-title">Total Slot</h5>
                  <div className="card doctor_popup_card_data">
                    {slots ? (
                      slots.map((time, index) => {
                        return (
                          <div className="card-body">
                            <div className="d-flex doctor_popup_card">
                              <label>{time.timeslot}</label>

                              <div>
                                <Toggle
                                  defaultChecked={true}
                                  icons={false}
                                  id="update_time_toggle"
                                  ref={updateTimeRef}
                                  onChange={() => {
                                    updateTimeSlot(
                                      time.timeslot,
                                      time.doctormaster_id,
                                      updatetime
                                    );
                                    updateTimeToggle();
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p>No Slots Added</p>
                    )}
                  </div>
                  <div className="row p-1">
                    <div className="col-sm-4">
                      <div className="d-grid gap-2 col-6 mx-auto">
                        <button
                          className="btn btn-danger update-btn doctor_update_button"
                          type="button"
                          onClick={updateDoctorData}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* doctor popup end */}

      {/*add doctor popup div start */}
      <div>
        <div id="add_doctor_popup" style={{ display: "none" }}>
          <div className="popup">
            <div className="popup-inner">
              <button className="close-btn" onClick={modal}>
                <AiOutlineClose />
              </button>
              <h4 className="popup_main_heading">Add Doctor</h4>
              <form className="pt-4">
                <div className="row p-1">
                  <div className="col">
                    <span className="popup_textBox_heading">Full Name</span>
                    <input
                      type="text"
                      className="form-control popup_textBox_data"
                      onChange={onchangeFullName}
                      value={doctorname}
                      // onChange={(e) => setDoctorName(e.target.value)}
                    />
                    {errorsNa && (
                      <div className="massage" style={{ color: "red" }}>
                        {errorsname}
                      </div>
                    )}
                  </div>
                  <div className="col">
                    <span className="popup_textBox_heading">Category</span>
                    <select
                      className="form-control popup_textBox_data"
                      value={doctorcategory}
                      onChange={(e) => setDoctorCategory(e.target.value)}
                    >
                      <option>Select Category</option>
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
                        <p>no category available</p>
                      )}
                    </select>
                  </div>
                </div>
                <div className="row p-1">
                  <div className="col">
                    <span className="popup_textBox_heading">Degree</span>
                    <input
                      type="text"
                      className="form-control popup_textBox_data"
                      onChange={onchangeDegree}
                      value={doctordegree}
                      // onChange={(e) => setDoctorDegree(e.target.value)}
                    />

                    {errorsdeeg && (
                      <div className="massage" style={{ color: "red" }}>
                        {errorsdeegree}
                      </div>
                    )}
                  </div>
                  <div className="col">
                    <span className="popup_textBox_heading">Experiance</span>
                    <input
                      type="text"
                      className="form-control popup_textBox_data"
                      onChange={onchangeExp}
                      value={doctorexp}
                      maxLength="2"

                      // onChange={(e) => setDoctorExp(e.target.value)}
                    />

                    {errorsex && (
                      <div className="massage" style={{ color: "red" }}>
                        {errorsexprence}
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
                      value={doctoraddress}
                      onChange={(e) => setDoctorAddress(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <span className="popup_textBox_heading">Contact</span>
                    <input
                      type="text"
                      className="form-control popup_textBox_data"
                      value={doctorcontact}
                      onChange={onchangeContact}
                      maxLength="10"
                    />
                    {errorscon && (
                      <div style={{ color: "red", marginLeft: "47px" }}>
                        {errorscontact}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row p-1">
                  <div className="col">
                    <span className="popup_textBox_heading">
                      Appoinment From
                    </span>
                    <input
                      type="time"
                      className="form-control popup_textBox_data"
                      value={fromtime}
                      onChange={(e) => setFromTime(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <span className="popup_textBox_heading">Appoinment To</span>
                    <input
                      type="time"
                      className="form-control popup_textBox_data"
                      value={totime}
                      onChange={(e) => setToTime(e.target.value)}
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
                      onChange={(e) => setRemark(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <span className="popup_textBox_heading">Cunsult Fees</span>
                    <input
                      type="text"
                      className="form-control popup_textBox_data"
                      value={doctorfees}
                      onChange={onChangeFees}
                      maxLength="5"
                      // onChange={(e) => setDoctorFees(e.target.value)}
                    />
                    {errorsfee && (
                      <div className="massage" style={{ color: "red" }}>
                        {errorsfees}
                      </div>
                    )}
                  </div>
                </div>

                <div className="row p-1">
                  <div className="col">
                    <div className="col">
                      <span className="popup_textBox_heading">File</span>
                      <input
                        type="File"
                        className="form-control popup_textBox_data"
                        onChange={onChangeDoctorImg}
                      />
                      <div className="doctor_add_popup_image">
                        <img src={doctorimg} width="100px" height="100px" />
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="d-grid gap-2 col-6 mx-auto">
                      <button
                        className="btn btn-danger update-btn doctor_update_button"
                        type="button"
                        onClick={(e) => addNewDoctor(e)}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* add doctor popup div end */}

      {/*add doctor category popup div start */}
      <div>
        <div id="add_doctor_category_popup" style={{ display: "none" }}>
          <div className="popup">
            <div className="popup-inner">
              <button className="close-btn" onClick={modal}>
                <AiOutlineClose />
              </button>
              <h4 className="popup_main_heading">Doctor Category</h4>
              <span className="popup_caseId">Category</span>
              <div className="popup_category">
                <div className="pt-2 popup_left_category">
                  <table className="popup_left_category_data">
                    <thead>
                      <tr className="prescreption_table_heading">
                        <th style={{ borderRadius: "8px 0px 0px 8px" }}>
                          Sr.no
                        </th>
                        <th>Doctor Category</th>
                        <th>Status</th>
                        <th
                          style={{
                            borderRadius: "0px 8px 8px 0px",
                            cursor: "pointer",
                          }}
                        >
                          Edit
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {doctorcategoryid ? (
                        doctorcategoryid.map((category, i) => {
                          return (
                            <tr>
                              <th>{i + 1}</th>
                              <td>{category.category_name}</td>
                              <td>
                                {/* <Toggle
                                  defaultChecked={false}
                                  icons={false}
                                  id="category_toggle"
                                  ref={categoryRef}
                                  onChange={() => {
                                    var cid = category.doctorcategory_id;
                                    categroryStatusToggle();
                                    disableDoctorCategory(
                                      category.doctorcategory_id,
                                      categoryresult
                                    );
                                  }}
                                /> */}
                                {category.statusId == 1 ? "Active" : "DeActive"}
                              </td>
                              <td
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  var id = category.doctorcategory_id;
                                  categoryinnerPopup(
                                    category.doctorcategory_id
                                  );
                                }}
                                id={category.doctorcategory_id}
                              >
                                <MdEdit />
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <p>no category</p>
                      )}
                    </tbody>
                  </table>
                </div>
                {/* Add docter cetogory start  */}
                <div className="popup_right_category">
                  <form className="pt-1">
                    <div className="row p-1">
                      <div className="col">
                        <span className="popup_textBox_heading">
                          Doctor Category
                        </span>
                        <input
                          type="text"
                          className="form-control popup_textBox_data"
                          onChange={(e) => setCategoryName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="row p-1">
                      <div className="col">
                        <span className="popup_textBox_heading">File</span>
                        <div className="doctor_category_popup_image">
                          <img src={categoryimg} width="100px" height="100px" />
                        </div>

                        <input
                          type="File"
                          className="form-control popup_textBox_data"
                          onChange={onChangeCategoryImg}
                        />
                      </div>
                    </div>
                    <div className="row p-1">
                      <div className="col">
                        <button
                          className="popup_category_add_button"
                          type="button"
                          onClick={addDoctorCategory}
                        >
                          +Add Category
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                {/* Add docter cetogory End  */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* add doctor category popup div end */}

      {/*inner category popup div start */}
      <div>
        <div id="inner_category_popup" style={{ display: "none" }}>
          <div className="popup">
            <div className="doctor_inner_popup">
              <button className="close-btn" onClick={modal}>
                <AiOutlineClose />
              </button>
              <form className="pt-1">
                <div className="row p-1">
                  <div className="col">
                    <span className="inner_popup_textBox_heading">
                      Doctor Category
                    </span>
                    <input
                      type="text"
                      className="form-control inner_popup_textBox_data"
                      value={categorygetNmae}
                      onChange={(e) => setcategorygetNmae(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row p-1">
                  <div className="col">
                    <span className="inner_popup_textBox_heading">
                      Doctor Category Status
                    </span>
                    {/* <input
                      type="text"
                      className="form-control inner_popup_textBox_data"
                      value={categorygetNmae}
                      onChange={(e) => setcategorygetNmae(e.target.value)}
                    /> */}
                    <select
                      className="form-control inner_popup_textBox_data"
                      value={docterCetogorystate1}
                      onChange={
                        (e) =>
                          // DocterState();
                          setDocterCetogorystate1(e.target.value)

                        // item.doctormaster_id,
                        // doctorresult
                        // setDoctorResult(item.statusId)
                      }
                      // onChange={  var id = item.doctormaster_id; DocterState()}
                    >
                      <option value="1">Active</option>
                      <option value="0">Deactivate</option>
                    </select>
                  </div>
                </div>
                <div className="row p-1">
                  <div className="col">
                    <span className="inner_popup_textBox_heading">File</span>
                    <div className="doctor_category_popup_image">
                      <img
                        id="blogeditGETimageshow"
                        src={
                          IMAGE_URL2category +
                          `${categorygebyimg.substring(18)}`
                        }
                        width="100px"
                        height="100px"
                      />
                      <img
                        style={{ display: "none" }}
                        id="blogeditimageshow"
                        src={imageshow}
                        width="100px"
                        height="100px"
                      />
                    </div>

                    <input
                      type="File"
                      className="form-control inner_popup_textBox_data"
                      onChange={onchangeImage}
                    />
                  </div>
                </div>
                <div className="row p-1">
                  <div className="col">
                    <button
                      className="inner_popup_category_add_button"
                      type="button"
                      onClick={updateDoctorCategory}
                    >
                      +Update Category
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/*inner category popup div end */}
    </>
  );
};
