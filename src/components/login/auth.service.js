import axios from "axios";
import {SERVER} from "../baseUrl";
class AuthService {
  login(username, password) {
    return axios(SERVER + "/adminLogin", {
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
        console.log("responce login", res.data);
        if (res.data.token) {
          localStorage.setItem("admin", JSON.stringify(res.data));
        }
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        console.log("error happned");
      });
  }

  logout() {
    localStorage.removeItem("admin");
    window.location.reload();
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("admin"));
  }

  isAuthenticated() {
    return localStorage.getItem("user");
  }
}

export default new AuthService();
