import {Children, ReactNode, useEffect} from "react";
import {Header} from "./header/Header";
import {useNavigate} from "react-router-dom";
import {useGetUserProfileQuery, useGetUserRolesQuery} from "../../store/api/accountApi";
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
    const {data : profile, isLoading : isLoadingProfile, error : profileError} = useGetUserProfileQuery('')
    const {data : roles, isLoading : isLoadingRoles, error : rolesError} = useGetUserRolesQuery('')


    useEffect(() => {
        if (!isLoadingProfile && !isLoadingRoles && profile && roles){
            dispatch(setAuth(true))
            dispatch(setUser({
                ...profile,
                roles
            }))
        }

        if (profileError){
            navigation('/login')
        }
    }, [profile, isLoadingProfile, isLoadingRoles]);

    if (isLoadingProfile || isLoadingRoles){
        return(
            <></>
        )
    }

    // if (profileError){
    //     navigation('/login')
    // }





    return(
       <>
           <Header/>
           {children}
       </>
    )
}