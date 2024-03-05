import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IGroupCreate, IGroupEdit} from "../../types/request.types";
import {IGroupCoursesResponse, IGroupResponse} from "../../types/response.types";


export const groupsApi = createApi({
    reducerPath: 'groups',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://camp-courses.api.kreosoft.space/'
    }),
    tagTypes: ['groups','groupCourses'],
    endpoints: (builder) => ({
        getGroups: builder.query<IGroupResponse[], any>({
            query: () => ({
                url: '/groups',
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
            }),
            providesTags: ['groups']
        }),
        getGroupCourses: builder.query<IGroupCoursesResponse[], { id : string | undefined }>({
            query: ({id}) => ({
                url: `/groups/${id}`,
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
            }),
            providesTags: ['groupCourses']
        }),
        createGroup: builder.mutation<any, IGroupCreate>({
            query: (data : IGroupCreate) => ({
                url: `/groups`,
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                body: data,
                method: 'POST'
            }),
            invalidatesTags: ['groups']
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
    useCreateGroupMutation,
    useGetGroupCoursesQuery,
} = groupsApi