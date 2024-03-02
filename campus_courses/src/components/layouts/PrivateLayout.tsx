import {Children, ReactNode, useEffect} from "react";
import {Header} from "./header/Header";
import {useNavigate} from "react-router-dom";
import {useGetUserProfileQuery} from "../../store/api/accountApi";
import {Loader} from "./loader/Loader";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store";
import {setAuth, setUser} from "../../store/auth.slice";
import {useTypedSelector} from "../../hooks/useTypedSelector";

export interface ILayoutProps{
    children : ReactNode
}

export function PrivateLayout({children} : ILayoutProps) {

    const navigation = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const {data : profile, isLoading, error} = useGetUserProfileQuery('')


    useEffect(() => {
        if (!isLoading && profile){
            dispatch(setAuth(true))
            dispatch(setUser(profile))
        }
    }, [profile]);

    if (isLoading){
        return(
            <></>
        )
    }

    if (error){
        navigation('/login')
    }





    return(
       <>
           <Header/>
           {children}
       </>
    )
}