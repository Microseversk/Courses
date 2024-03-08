import { Button, Tab, Tabs } from 'react-bootstrap'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { StudentsList } from './StudentsList'
import { TeachersList } from './TeachersList'

interface IMemberTabsDetailsProps {
	className?: string
}

export function MemberTabsDetails(props: IMemberTabsDetailsProps) {
	const courseDetails = useTypedSelector(state => state.openedCourse.course)

	if (!courseDetails?.students || !courseDetails?.teachers) {
		return <></>
	}

	return (
		<Tabs className={props.className} defaultActiveKey={'Students'}>
			<Tab className={'border mb-3'} title={'Студенты'} eventKey={'Students'}>
				<StudentsList students={courseDetails.students} />
			</Tab>
			<Tab className={'border'} title={'Преподаватели'} eventKey={'Teachers'}>
				<Button size={'sm'} className={'ms-3 mb-3 mt-3'}>
					ДОБАВИТЬ ПРЕПОДАВАТЕЛЯ
				</Button>
				<TeachersList teachers={courseDetails.teachers} />
			</Tab>
		</Tabs>
	)
}
