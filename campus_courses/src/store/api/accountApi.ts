import {createApi, EndpointBuilder, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IUserLogin} from "../../components/pages/loginPage/LoginPage";


interface ILoginResponse {
    token: string
}

export interface IProfileResponse {
    fullName: string,
    email: string,
    birthDate: string
}

export interface IRolesResponse {
    isTeacher: boolean,
    isStudent: boolean,
    isAdmin: boolean,
}


export const accountApi = createApi({
    reducerPath: 'accountApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://camp-courses.api.kreosoft.space/'
    }),
    endpoints: builder => ({
        loginUser: builder.mutation<ILoginResponse, IUserLogin>({
            query: (loginTerm: IUserLogin) => ({
                url: '/login',
                body: loginTerm,
                method: 'POST'
            })
        }),
        logoutUser: builder.mutation<any,any>({
            query: (token : string) => ({
                url: '/logout',
                method: 'POST',
                headers: {Authorization: `Bearer ${token}`}
            })
        }),
        getUserProfile: builder.query<IProfileResponse, any>({
            query: (token : string) => ({
                url: '/profile',
                method: 'GET',
                headers: {Authorization: `Bearer ${token}`}
            })
        }),
        getUserRoles : builder.query<IRolesResponse, any>({
            query: (token : string) => ({
                url: '/roles',
                method: 'GET',
                headers: {Authorization: `Bearer ${token}`}
            })
        })
    })
})

export const {
    useLoginUserMutation,
    useLogoutUserMutation,
    useGetUserProfileQuery,
    useGetUserRolesQuery,
} = accountApi


