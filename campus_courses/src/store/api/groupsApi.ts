import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export interface IGroupResponse{
    id : string,
    name: string
}

export const groupsApi = createApi({
    reducerPath: 'groups',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://camp-courses.api.kreosoft.space/'
    }),
    endpoints: (builder) => ({
        getGroups: builder.query<IGroupResponse[], any>({
            query: () => ({
                url: '/groups',
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
            })
        })
    })
})

export const {useGetGroupsQuery} = groupsApi