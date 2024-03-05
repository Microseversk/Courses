import {Children, ReactNode, useEffect} from "react";
import {Header} from "./header/Header";
import {useNavigate} from "react-router-dom";
import {useGetUserProfileQuery, useGetUserRolesQuery} from "../../store/api/accountApi";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store";
import {setAuth, setUser} from "../../store/auth.slice";

export interface ILayoutProps {
    children: ReactNode
}

export function PrivateLayout({children}: ILayoutProps) {

    const navigation = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const {
        data: profile,
        isLoading: isLoadingProfile,
        error: profileError,
        refetch: refetchProfile
    } = useGetUserProfileQuery('')
    const {
        data: roles,
        isLoading: isLoadingRoles,
        error: rolesError,
        refetch: refetchRoles
    } = useGetUserRolesQuery('')


    useEffect(() => {
        refetchProfile()
        refetchRoles()


        if (profileError || rolesError) {
            localStorage.removeItem('token')
            navigation('/login')
        }

    }, [profileError,rolesError]);

    if (isLoadingProfile || isLoadingRoles) {
        return (
            <></>
        )
    }


    if (!isLoadingProfile && !isLoadingRoles && profile && roles) {
        dispatch(setAuth(true))
        dispatch(setUser({
            ...profile,
            roles
        }))
    }


        return (
            <>
                <Header/>
                {children}
            </>
        )
    }