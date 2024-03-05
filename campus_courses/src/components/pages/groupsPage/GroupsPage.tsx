import {Button, Container, ListGroup} from "react-bootstrap";
import {GroupsItem} from "./GroupsItem";
import {useGetGroupsQuery} from "../../../store/api/groupsApi";
import {Loader} from "../../layouts/loader/Loader";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {CreateGroupItemModal} from "./CreateGroupItemModal";
import {useState} from "react";

export function GroupsPage() {

    const {data: groups, isLoading} = useGetGroupsQuery('')
    const userRoles = useTypedSelector(state => state.auth.user?.roles)
    const [isCreating, setIsCreating] = useState(false)

    if (isLoading) {
        return <Loader/>
    }

    return (
        <Container>
            <CreateGroupItemModal isShow={isCreating} onHide={() => setIsCreating(false)}/>
            <div className={'fw-bold fs-2'}>Группы кампусных курсов</div>
            {userRoles?.isAdmin && <Button className={'mt-1'} onClick={() => setIsCreating(true)}>Создать</Button>}
            <ListGroup className={'mt-3'}>
                {groups && groups.map(group => (<GroupsItem key={group.id} id={group.id} name={group.name}/>))}
            </ListGroup>
        </Container>
    )
}