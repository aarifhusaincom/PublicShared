import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";

import { MdOutlineDashboard } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { AiFillCar } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { MdBarChart } from "react-icons/md";
import { FaStethoscope } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { GiMedicines } from "react-icons/gi";

import sidebarLogo from "../images/logo.svg";

export const Sidebar = () => {
  return (
    <>
      <div className="navigation">
        <Link to="/">
          <span className="icon">
            <ion-icon name="logo-apple"></ion-icon>
          </span>
          <span className="title">
            <img src={sidebarLogo} width="100%" />
          </span>
        </Link>
        <ul className="">
          <li></li>
          <li>
            <Link to="/">
              <span className="icon">
                <MdOutlineDashboard />
              </span>
              <span className="title">Dashboard</span>
            </Link>
          </li>

          <li>
            <Link to="/appoinment">
              <span className="icon">
                <FaPhoneAlt />
              </span>
              <span className="title">Appoinments</span>
            </Link>
          </li>

          <li>
            <Link to="/car">
              <span className="icon">
                <AiFillCar />
              </span>
              <span className="title">Ride and Drive</span>
            </Link>
          </li>

          <li>
            <Link to="/prescreption">
              <span className="icon">
                <BsPencilSquare />
              </span>
              <span className="title">Prescription</span>
            </Link>
          </li>

          <li>
            <Link to="/medicine">
              <span className="icon">
                <GiMedicines />
              </span>
              <span className="title">Medicine</span>
            </Link>
          </li>

          <li>
            <Link to="/driver">
              <span className="icon">
                <BsFillPersonFill />
              </span>
              <span className="title">Driver List</span>
            </Link>
          </li>
          <li>
            <Link to="/case">
              <span className="icon">
                <MdBarChart />
              </span>
              <span className="title">Cases</span>
            </Link>
          </li>
          <li>
            <Link to="/patient">
              <span className="icon">
                <MdBarChart />
              </span>
              <span className="title"> All Patients</span>
            </Link>
          </li>
          <li>
            <Link to="/doctor">
              <span className="icon">
                <FaStethoscope />
              </span>
              <span className="title">Doctor</span>
            </Link>
          </li>
          <li>
            <Link to="/whatsApp">
              <span className="icon">
                <BsWhatsapp />
              </span>
              <span className="title">WhatsApp</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
