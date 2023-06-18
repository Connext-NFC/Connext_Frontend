import FirsState from "./FirstState";
import SecondState from "./SecondState";
import FinalState from "./FinalState";
import jwtDecode from "jwt-decode";
import NotFound404 from "../NotFound404";
import { IForgotToken } from "../../types/Token";

export default function index() {
  let token = localStorage.getItem("forgotToken");
  return token == null ? (
    <FirsState />
  ) : jwtDecode<IForgotToken>(token).isForgot == true &&
    jwtDecode<IForgotToken>(token).canChange == undefined ? (
    <SecondState />
  ) : jwtDecode<IForgotToken>(token).isForgot == undefined &&
    jwtDecode<IForgotToken>(token).canChange == true ? (
    <FinalState />
  ) : (
    <NotFound404/>
  );
}
