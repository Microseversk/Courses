import {Children, ReactNode, useEffect} from "react";
import {Header} from "./header/Header";
import {useNavigate} from "react-router-dom";
import {useGetUserProfileQuery, useGetUserRolesQuery} from "../../store/api/accountApi";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store";
import {setAuth, setUser} from "../../store/auth.slice";

export interface ILayoutProps{
    children : ReactNode
}

export function PrivateLayout({children} : ILayoutProps) {

    const navigation = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const {data : profile, isLoading : isLoadingProfile, error : profileError} = useGetUserProfileQuery(localStorage.getItem('token'))
    const {data : roles, isLoading : isLoadingRoles, error : rolesError} = useGetUserRolesQuery(localStorage.getItem('token'))


    useEffect(() => {
        if (!isLoadingProfile && !isLoadingRoles && profile && roles){
            dispatch(setAuth(true))
            dispatch(setUser({
                ...profile,
                roles
            }))
        }

        if (profileError || rolesError){
            navigation('/login')
        }
    });

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