import Alert from "@mui/material/Alert";
import { useContext } from "react";
import { AlertContext } from "../context/alertContext";

const CustomAlert = () => {
  const { alertInfo } = useContext(AlertContext);

  return (
    <Alert
      severity={alertInfo.alertType}
      style={!alertInfo.showAlert ? { visibility: "hidden" } : {}}
      sx={{
        position: "fixed",
        left: "50%",
        top: "5%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {alertInfo.alertMsg}
    </Alert>
  );
};

export default CustomAlert;
