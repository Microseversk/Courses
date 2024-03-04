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
        logoutUser: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
        }),
        getUserProfile: builder.query<IProfileResponse, any>({
            query: () => ({
                url: '/profile',
                method: 'GET',
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
        }),
        getUserRoles : builder.query<IRolesResponse, any>({
            query: () => ({
                url: '/roles',
                method: 'GET',
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
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


