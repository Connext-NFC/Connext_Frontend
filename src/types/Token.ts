export interface IAccessToken {
    UserID:string,
    _id:string,
    userName:string
}

export interface IForgotToken{
    email: string;
    isForgot: boolean;
    userID: string;
    canChange: boolean;
}