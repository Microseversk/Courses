import {createApi, EndpointBuilder, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IUserLogin} from "../../components/pages/loginPage/LoginPage";
import {IUserRegistration} from "../../components/pages/registrationPage/RegistrationPage";


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
    tagTypes: ['userProfile','userRoles'],
    endpoints: builder => ({
        loginUser: builder.mutation<ILoginResponse, IUserLogin>({
            query: (loginTerm: IUserLogin) => ({
                url: '/login',
                body: loginTerm,
                method: 'POST'
            }),
            invalidatesTags: ['userProfile','userRoles']
        }),
        registerUser: builder.mutation<ILoginResponse, IUserRegistration>({
            query: (registerTerm: IUserRegistration) => ({
                url: '/registration',
                body: registerTerm,
                method: 'POST'
            }),
            invalidatesTags: ['userProfile','userRoles']
        }),
        logoutUser: builder.mutation<any,any>({
            query: (token : string) => ({
                url: '/logout',
                method: 'POST',
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
        }),
        getUserProfile: builder.query<IProfileResponse, any>({
            query: (token : string) => ({
                url: '/profile',
                method: 'GET',
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            }),
            providesTags: ['userProfile']
        }),
        getUserRoles : builder.query<IRolesResponse, any>({
            query: (token : string) => ({
                url: '/roles',
                method: 'GET',
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            }),
            providesTags: ['userRoles']
        })
    })
})

export const {
    useLoginUserMutation,
    useRegisterUserMutation,
    useLogoutUserMutation,
    useGetUserProfileQuery,
    useGetUserRolesQuery,
} = accountApi


