import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export interface IGroupResponse {
    id: string,
    name: string
}

export interface IGroupEdit{
    id : string,
    name: string
}

export const groupsApi = createApi({
    reducerPath: 'groups',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://camp-courses.api.kreosoft.space/'
    }),
    tagTypes: ['groups'],
    endpoints: (builder) => ({
        getGroups: builder.query<IGroupResponse[], any>({
            query: () => ({
                url: '/groups',
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
            }),
            providesTags: ['groups']
        }),
        editGroup: builder.mutation<any, IGroupEdit>({
            query: (data: IGroupEdit) => ({
                url: `/groups/${data.id}`,
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                body: {name : data.name},
                method: 'PUT'
            }),
            invalidatesTags: ['groups']
        }),
        deleteGroup: builder.mutation<any, {id: string}>({
            query: ({id}) => ({
                url: `/groups/${id}`,
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                method: 'DELETE'
            }),
            invalidatesTags: ['groups']
        })
    })
})

export const {
    useGetGroupsQuery,
    useEditGroupMutation,
    useDeleteGroupMutation,
} = groupsApi