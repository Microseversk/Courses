import { MDBListGroupItem } from 'mdb-react-ui-kit'
import { Button, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../../../hooks/useModal'
import { useToastMutate } from '../../../hooks/useToastMutate'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useDeleteGroupMutation } from '../../../store/api/groupsApi'
import { IGroupResponse } from '../../../types/response.types'
import { ButtonCustom } from '../../shared/ButtonCustom'
import { EditGroupItemModal } from './EditGroupItemModal'

export function GroupsItem(props: IGroupResponse) {
	const user = useTypedSelector(state => state.auth.user)
	const nav = useNavigate()
	const [deleteGroup, { isLoading, isSuccess, isError }] = useDeleteGroupMutation()

	const { isShow, onHide, onShow } = useModal()

	useToastMutate(isSuccess, isError, 'Группа удалена')

	const onDelete = () => {
		deleteGroup({ id: props.id })
	}

	return (
		<>
			<EditGroupItemModal name={props.name} id={props.id} isShow={isShow} onHide={onHide} />
			<MDBListGroupItem
				action
				className={'d-flex pe-0'}
				onClick={e => {
					if (!user?.roles.isAdmin) nav(`/groups/${props.id}`)
				}}>
				<Row className={'w-100'}>
					<Col
						sm={12}
						md={12}
						lg={9}
						onClick={e => {
							if (user?.roles.isAdmin) nav(`/groups/${props.id}`)
						}}
						className={'d-flex justify-content-center justify-content-lg-start align-items-center '}
						style={{ textWrap: 'nowrap', cursor: 'pointer', overflow: 'auto' }}>
						{props.name}
					</Col>
					{user?.roles.isAdmin && (
						<Col
							sm={12}
							md={12}
							lg={3}
							className={'d-flex gap-2 mt-3 mt-lg-0 justify-content-center justify-content-lg-end'}>
							<Button className={'btn-warning'} onClick={onShow}>
								РЕДАКТИРОВАТЬ
							</Button>
							<ButtonCustom className={'btn-danger'} text='УДАЛИТЬ' popup action={onDelete} isLoading={isLoading} />
						</Col>
					)}
				</Row>
			</MDBListGroupItem>
		</>
	)
}
