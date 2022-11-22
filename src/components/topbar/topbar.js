import React from "react";
import "./topbar.css";
import { FiPower } from "react-icons/fi";
import { BiBell } from "react-icons/bi";
import { Link,  } from "react-router-dom";

export const Topbar = () => {
  var time = new Date().toLocaleTimeString();
  var day = new Date().getDay();
  var date = new Date().getDay();
  const [ctime, setCtime] = React.useState(time);
  const [cday, setCday] = React.useState(day);
  const [cdate, setCdate] = React.useState(date);

  const Updatetime = () => {
    let time = new Date().toLocaleTimeString();
    setCtime(time);
  };
  setInterval(Updatetime, 1000);

  const updateDate = () => {
    let date = new Date().toLocaleDateString();
    setCdate(date);
  };
  setInterval(updateDate, 1000);

  const updateday = () => {
    var day = new Date().getDay();
    var mon = "monday";
    var tue = "Tuesday";
    var wed = "wednesday";
    var thur = "Thurday";
    var fri = "Friday";
    var sat = "Saturday";
    var sun = "Sunday";
    if (day === 1) {
      setCday(mon);
    } else if (day === 2) {
      setCday(tue);
    } else if (day === 3) {
      setCday(wed);
    } else if (day === 4) {
      setCday(thur);
    } else if (day === 5) {
      setCday(fri);
    } else if (day === 6) {
      setCday(sat);
    } else setCday(sun);
  };
  setInterval(updateday, 1000);

  // const history = useNavigate();


  const test = () => {
    document.getElementById("popupbox").style.display = "block";
  };
  return (
    <>
      <div className="topbar">
        <div className="toggle">
          <ion-icon name="menu-outline"></ion-icon>
        </div>

        <div className="date-time">
          <h5>
            {ctime}&nbsp;&nbsp;{cdate}&nbsp;&nbsp;{cday}&nbsp;&nbsp;
          </h5>
        </div>

        <div className="user">
          <div>
            <Link className="right-icon" to="#" role="button">
              <BiBell />
            </Link>
          </div>

          <div onClick={test}>
            {/* localStorage.removeItem("token");
              history("/"); */}
            <FiPower />
          </div>
        </div>
      </div>
    </>
  );
};
