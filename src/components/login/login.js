import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginLogo from "../images/logo.svg";

export const Login = () => {
  //validation
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [massage, setMassage] = useState("");
  // console.log(massage);
  const [status, setStatus] = useState(false);

  // const history = useNavigate();

  const onSubmitDetails = (e) => {
    axios("https://cerbosys.in:1700/rxaushadi/adminLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => {
        console.log("response login", res.data);
        setMassage(res.data.message);
        if (res.data.token) {
          setStatus(res.data.success);
          localStorage.setItem("admin", JSON.stringify(res.data));
          toast.success("Login Successfully ", massage);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          toast.error("Invalid Username and Password");
        }

        // return res.data;
      })
      .catch((err) => {
        toast.error("error happned");
        console.log("error happned");
      });
    // axios("https://cerbosys.in:1700/rxaushadi/adminLogin", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    //   data: JSON.stringify({
    //     username: username,
    //     password: password,
    //   }),
    // })
    //   .then((res) => {
    //     console.log("responce login", res.data);
    //     // setMassage(res.data.message);
    //     console.log(res.data.message);
    //     // setMassage(res.data.message);

    //     if (res.data.token) {
    //       setStatus(res.data.success);
    //       // localStorage.setItem("token", JSON.stringify(res.data));
    //       localStorage.setItem("token", res.data.token);
    //       toast.success("Login Successfully ", massage);

    //       setTimeout(() => {
    //         history("/dashboard");
    //       }, 2000);
    //     } else {
    //       toast.error("Invalid Username and Password");
    //     }
    //     return res.data;
    //   })
    //   .catch((err) => {
    //     toast.error("error happned");
    //     setTimeout(() => {
    //       window.location.reload();
    //     }, 2000);
    //     console.log("error happned");
    //   });
  };

  return (
    <>
      <div className="container-fluid login_container">
        <form onSubmit={handleSubmit(onSubmitDetails)} autocomplete="off">
          <div className="user_login">
            <div className="col-lg-6 user_login_left">
              <img style={{ width: "100%", height: "327px" }} src={loginLogo} />
            </div>

            <div className="col-lg-6 user_login_right">
              <div className="user_login_form">
                <div className="login_heading">
                  <p>Sign In</p>
                </div>
                <div className="user_name">
                  <br></br>
                  <input
                    {...register("username", { required: true })}
                    type="text"
                    className="input_user_name"
                    placeholder="User Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    // onKeyPress={handleEnter}
                  />
                  <span
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      textAlign: "center",
                      marginTop: "-10%",
                    }}
                  >
                    {errors.username?.type === "required" &&
                      "Username name is required"}
                  </span>
                </div>
                <div className="user_password">
                  <br></br>
                  <input
                    {...register("password", { required: true })}
                    type="password"
                    className="input_password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    // onKeyPress={handleEnter}
                    onKeyPress={(ev) => {
                      if (ev.key === "Enter") {
                        ev.preventDefault();
                        onSubmitDetails();
                      }
                    }}
                  />
                  <span
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {errors.password?.type === "required" &&
                      "Password  is required"}
                  </span>
                </div>
                <div>
                  <button type="submit" className="login_button">
                    Submit
                  </button>

                  <p className="login_msg">
                    <b className="login_massage">{/* {massage} */}</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div>
        <ToastContainer />
      </div>
    </>
  );
};
