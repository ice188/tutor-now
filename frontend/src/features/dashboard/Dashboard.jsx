import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate(); 

  const buttonStyle = {
    backgroundColor: "#0A2A3A",
    color: "#fff",
    border: "none",
    padding: "20px",
    margin: "10px",
    width: "300px",
    fontSize: "18px",
    cursor: "pointer",
    textAlign: "center",
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button style={buttonStyle} onClick={() => navigate("/time-request")}>
        Create a Booking
      </button>
      <button style={buttonStyle} onClick={() => navigate("/time-request")}>
        Request Availability
      </button>
      <button style={buttonStyle} onClick={() => navigate("/time-request")}>
        View Appointments
      </button>
    </div>
  );
};

export default Dashboard;
