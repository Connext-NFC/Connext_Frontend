import React, { createContext, useState } from "react";
import { UserInfoContextType,IUserInfo} from "../types/User";
import { UserApiCall } from "../services/User/user";

const UserContext = createContext<UserInfoContextType>({
    userInfo:null,
    getUserInfoContext:()=>{},
    updateUserInfoContext:()=>{}
});

type Props = {
    children: React.ReactNode;
  };

const UserProvider : React.FC<Props>=({ children } : Props) =>{
    const [userInfo,setUserInfo] = useState<IUserInfo | null>(null);

    const getUserInfoContext =()=>{
        UserApiCall.getUserInfo().then((res) => {
            setUserInfo(res.data);
          });
    }

    const updateUserInfoContext =(newUserInfo : IUserInfo)=>{
        setUserInfo(newUserInfo);
    }

    return(
        <UserContext.Provider value={{userInfo,getUserInfoContext,updateUserInfoContext}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext,UserProvider};