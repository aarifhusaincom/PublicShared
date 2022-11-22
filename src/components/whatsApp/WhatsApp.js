import React from "react";
import { Sidebar } from "../sidebar/sidebar";
import { Topbar } from "../topbar/topbar";
// import "./WhatsApp.css";
function WhatsApp() {
  return (
    <div className="dashboard">
      <Sidebar />

      {/* <!-- ========================= Main ==================== --> */}
      <div className="main">
        <Topbar />

        <div className="dashbord_data " style={{ height: "400px" }}>
          <div className="details">
            <div className="">
              <div className="row g-0 my-1 apoint_top_menu">
                <h4>WhatsApp</h4>
              </div>

              <div>
                {/* WhatsApp icon */}
                {/* <a
                  href="https://wa.me/919669469547"
                  class="whatsapp_float"
                  target="_blank"
                  rel="noopener noreferrer"
                > */}
                <a href="https://wa.me/+919669469547" target="_blank">
                  Send Message
                  <i class="fa fa-whatsapp whatsapp-icon"> </i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhatsApp;
