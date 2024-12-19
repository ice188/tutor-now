import PrivateHeader from "../components/PrivateHeader";
import allAppointments from "../features/allappointments/components/allAppointments";

export const AllAppointmentsPage = () => {
  return (
    <>
      <PrivateHeader />
      <allAppointments />
    </>
  );
};
