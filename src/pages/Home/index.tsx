import jwtDecode from "jwt-decode";
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { IAccessToken } from "../../types/Token";

type Props = {};

function index({}: Props) {
  const navigate = useNavigate();
  

  const linkToUserProfile = async()=>{
    const token = await localStorage.getItem('accessToken')
    if(token!=null){
      navigate(`/userProfile/${jwtDecode<IAccessToken>(token).userName}`)
    }
  }

  return localStorage.getItem("accessToken") ? (
    <div style={{ color: "blue", textAlign: "center" }}>HOME
      <div onClick={()=>linkToUserProfile()}>
          Profile
      </div>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default index;
