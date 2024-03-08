export interface IGroupEdit {
	id: string
	name: string
}

export interface IGroupCreate {
	name: string
}

export interface IUserRegistration {
	fullName: string
	birthDate: string
	email: string
	password: string
	confirmPassword: string
}

export interface IEditUserProfile {
	fullName: string
	birthDate: string
}

export interface ICourseCreate {
	name: string
	startYear: number
	maximumStudentsCount: number
	semester: 'Spring' | 'Autumn'
	requirements: string
	annotations: string
	mainTeacherId: string
}

export interface ICourseEditStatus {
	courseId: string
	status: 'Started' | 'OpenForAssigning' | 'Created' | 'Finished'
}
