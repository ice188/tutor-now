//Yusuf Hamza 261089856
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { LoginStatus

 } from "../login/api/loginStatus";
const Dashboard = () => {
  const navigate = useNavigate();
  const { uid } = useParams();
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      return;
    }

    const loadAuth = async () => {
      try {
      const { user } = await LoginStatus();
      setUser(user);

    }catch(e){
      setUser(null);
      console.log(e);
    }
    };
    loadAuth();
  }, [token]);

 //formatting output buttons with navigate to redirect to appropriate pages
  return user && uid === user.user_id.toString() ? (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
      }}
      className="flex flex-col items-center space-y-4" 
    >
      <button
        className="bg-blue-950 text-white px-5 py-3 font-semibold rounded-md cursor-pointer hover:bg-blue-700 w-80" 
        onClick={() => navigate(`/${uid}/availability-request`)}
      >
        Request Availability
      </button>
      <button
        className="bg-blue-950 text-white px-5 py-3 font-semibold rounded-md cursor-pointer hover:bg-blue-700 w-80" 
        onClick={() => navigate(`/${uid}/all-appointments`)}
      >
        View Appointments
      </button>
    </div>
    ) : (
      <div className="text-center pt-12">Access Denied.</div>
    
  );
};

export default Dashboard;
