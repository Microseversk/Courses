import {Button, Container, ListGroup} from "react-bootstrap";
import {GroupsItem} from "./GroupsItem";

export function GroupsPage(){



    return(
        <Container>
            <div className={'fw-bold fs-2'}>Группы кампусных курсов</div>
            <Button className={'mt-1'}>Создать</Button>
            <ListGroup className={'mt-3'}>
                <GroupsItem/>
                <GroupsItem/>
                <GroupsItem/>
            </ListGroup>
        </Container>
    )
}