import axios, {AxiosError, AxiosPromise} from "axios";
import {LOGIN, LOGOUT, PROFILE, REGISTRATION} from "../../constansts/API";
import {$api} from "../../http/api";
import {IUserEditProfile, IUserGetProfile, IUserLogin, IUserRegistration} from "./AccountServiceTypes";
class AccountService{

    async registration(data : IUserRegistration){
        return $api.post(REGISTRATION, data)
    }

    async login(data: IUserLogin){
        return $api.post(LOGIN, data)
    }

    async logout(){
        return $api.post(LOGOUT, {}, {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
    }

    async getProfile(){
        return $api.get<IUserGetProfile>(PROFILE, {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
    }

    async editProfile(data: IUserEditProfile){
        return $api.put(PROFILE, {data} ,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
    }
}

export default new AccountService()