export interface ITokenResponse {
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


export interface IGroupResponse {
    id: string,
    name: string
}


export interface IGroupCoursesResponse{
    id: string,
    name: string,
    startYear: number,
    maximumStudentsCount: number,
    remainingSlotsCount: number,
    status: "Started" | "OpenForAssigning" | "Created" | "Finished",
    semester: "Spring" | "Autumn"
}

export interface IUsersResponse{
    id: string,
    fullName: string
}