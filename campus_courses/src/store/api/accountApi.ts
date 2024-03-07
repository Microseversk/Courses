import {createApi, EndpointBuilder, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IUserLogin} from "../../components/pages/loginPage/LoginPage";
import {IProfileResponse, IRolesResponse, ITokenResponse} from "../../types/response.types";
import {IEditUserProfile, IUserRegistration} from "../../types/request.types";

export const accountApi = createApi({
    reducerPath: 'accountApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://camp-courses.api.kreosoft.space/'
    }),
    tagTypes: ['userProfile','userRoles'],
    endpoints: builder => ({
        loginUser: builder.mutation<ITokenResponse, IUserLogin>({
            query: (loginTerm: IUserLogin) => ({
                url: '/login',
                body: loginTerm,
                method: 'POST'
            }),
            invalidatesTags: ['userProfile','userRoles']
        }),
        registerUser: builder.mutation<ITokenResponse, IUserRegistration>({
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
            }),
            invalidatesTags: ['userProfile','userRoles']
        }),
        editUserProfile: builder.mutation<any,IEditUserProfile>({
            query: (data: IEditUserProfile) => ({
                url: '/profile',
                method: 'PUT',
                body: data,
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            }),
            invalidatesTags: ['userProfile']
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
    useEditUserProfileMutation,
} = accountApi


