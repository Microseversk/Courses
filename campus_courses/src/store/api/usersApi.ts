import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IUsersResponse} from "../../types/response.types";

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://camp-courses.api.kreosoft.space/'
    }),
    endpoints: (builder) => ({
        getUsers: builder.query<IUsersResponse[],any>({
            query: () => ({
                url: '/users',
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
            })
        })
    })
})

export const {
    useGetUsersQuery,
} = usersApi