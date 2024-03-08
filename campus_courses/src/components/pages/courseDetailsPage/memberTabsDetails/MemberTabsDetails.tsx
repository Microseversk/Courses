import { Button, Tab, Tabs } from 'react-bootstrap'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { UserCourseRole } from '../../../../store/slices/course.slice'
import { StudentsList } from './StudentsList'
import { TeachersList } from './TeachersList'

interface IMemberTabsDetailsProps {
	className?: string
}

export function MemberTabsDetails(props: IMemberTabsDetailsProps) {
	const { course, userCourseRole } = useTypedSelector(
		state => state.openedCourse
	)

	if (!course?.students || !course?.teachers) {
		return <></>
	}

	return (
		<Tabs className={props.className} defaultActiveKey={'Students'}>
			<Tab className={'border mb-3'} title={'Студенты'} eventKey={'Students'}>
				<StudentsList students={course.students} />
			</Tab>
			<Tab className={'border'} title={'Преподаватели'} eventKey={'Teachers'}>
				{[UserCourseRole.Admin, UserCourseRole.MainTeacher].includes(
					userCourseRole!
				) && (
					<Button size={'sm'} className={'ms-3 mb-3 mt-3'}>
						ДОБАВИТЬ ПРЕПОДАВАТЕЛЯ
					</Button>
				)}
				<TeachersList teachers={course.teachers} />
			</Tab>
		</Tabs>
	)
}
