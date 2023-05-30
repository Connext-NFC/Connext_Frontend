import FirsState from "./FirstState";
import SecondState from "./SecondState";
import FinalState from "./FinalState";
import jwtDecode from "jwt-decode";
import NotFound404 from "../NotFound404";

interface decodeToken {
  email: string;
  isForgot: boolean;
  userID: string;
  canChange: boolean;
}

export default function index() {
  let token = localStorage.getItem("forgotToken");
  return token == null ? (
    <FirsState />
  ) : jwtDecode<decodeToken>(token).isForgot == true &&
    jwtDecode<decodeToken>(token).canChange == undefined ? (
    <SecondState />
  ) : jwtDecode<decodeToken>(token).isForgot == undefined &&
    jwtDecode<decodeToken>(token).canChange == true ? (
    <FinalState />
  ) : (
    <NotFound404/>
  );
}
