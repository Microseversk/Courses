export interface IUserRegistration {
    fullName : string,
    birthDate: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export interface IUserLogin {
    email: string,
    password: string,
}


export interface IUserEditProfile {
    fullName: string,
    birthDate: string,
}

export interface IUserGetProfile{
    fullName: string,
    email: string,
    birthDate: string,
}


export interface IToken{
    token : string
}

export interface IErrorResponse{
    status : string,
    message: string
}


export interface IHobby{
    title: string
}


export interface IRegisterErrors{
    birthDate : string,
    fullName : string
    password : string
    confirmPassword : string
    email : string
}