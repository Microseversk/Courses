import { Button, ListGroup, ListGroupItem, Tab, Tabs } from 'react-bootstrap'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'

interface IInfoTabsCourseDetailsProps {
	className?: string
}

export function InfoTabsCourseDetails(props: IInfoTabsCourseDetailsProps) {
	const courseDetails = useTypedSelector(state => state.openedCourse.course)
	return (
		<Tabs className={props.className} defaultActiveKey={'requirements'}>
			<Tab
				className={'border'}
				title={'Требования к курсу'}
				eventKey={'requirements'}
			>
				{courseDetails?.requirements && (
					<div className={'mt-3 mb-3 ms-3'}>
						<div
							dangerouslySetInnerHTML={{ __html: courseDetails.requirements }}
						/>
					</div>
				)}
			</Tab>
			<Tab className={'border'} title={'Аннотация'} eventKey={'annotation'}>
				{courseDetails?.annotations && (
					<div className={'mt-3 mb-3 ms-3'}>
						<div
							dangerouslySetInnerHTML={{ __html: courseDetails.annotations }}
						/>
					</div>
				)}
			</Tab>
			<Tab
				className={'border'}
				title={
					!courseDetails?.notifications.length ? (
						'Уведомления'
					) : (
						<div>
							Уведомления
							<span className={'ms-1 badge rounded-pill bg-danger'}>
								{courseDetails.notifications.length > 3
									? '3+'
									: courseDetails.notifications.length}
							</span>
						</div>
					)
				}
				eventKey={'notifications'}
			>
				<Button size={'sm'} className={'mt-3 ms-3 mb-3'}>
					СОЗДАТЬ УВЕДОМЛЕНИЕ
				</Button>
				<ListGroup>
					{courseDetails?.notifications.map((notifi, index) => (
						<ListGroupItem
							key={index}
							className={
								notifi.isImportant
									? 'bg-danger-subtle text-danger rounded-0 border-0 border-bottom border-secondary'
									: 'border-bottom-2 rounded-0'
							}
						>
							{notifi.text}
						</ListGroupItem>
					))}
				</ListGroup>
			</Tab>
		</Tabs>
	)
}
