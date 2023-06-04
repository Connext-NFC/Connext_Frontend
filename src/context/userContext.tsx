import React, { createContext, useState } from "react";
import { UserInfoContextType,IUserInfo} from "../types/User";
import { UserApiCall } from "../services/User/user";

const UserContext = createContext<UserInfoContextType>({
    userInfoContext:null,
    getUserInfoContext:()=>{},
    updateUserInfoContext:()=>{}
});

type Props = {
    children: React.ReactNode;
  };

const UserProvider : React.FC<Props>=({ children } : Props) =>{
    const [userInfoContext,setUserInfoContext] = useState<IUserInfo | null>(null);

    const getUserInfoContext =async()=>{
        await UserApiCall.getUserInfo().then(async(res) => {
            await setUserInfoContext(res.data);
          });
    }

    const updateUserInfoContext =(newUserInfo : IUserInfo)=>{
        setUserInfoContext(newUserInfo);
    }

    return(
        <UserContext.Provider value={{userInfoContext,getUserInfoContext,updateUserInfoContext}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext,UserProvider};