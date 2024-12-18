import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
      }}
      className="flex flex-col items-center space-y-4" // Vertical spacing between buttons
    >
      <button
        className="bg-blue-950 text-white px-5 py-3 font-semibold rounded-md cursor-pointer hover:bg-blue-700 w-80" // Width set to 80 (tailwind's w-80)
        onClick={() => navigate("/time-request")}
      >
        Request Availability
      </button>
      <button
        className="bg-blue-950 text-white px-5 py-3 font-semibold rounded-md cursor-pointer hover:bg-blue-700 w-80" // Width set to 80 (tailwind's w-80)
        onClick={() => navigate("/time-request")}
      >
        View Appointments
      </button>
    </div>
  );
};

export default Dashboard;
