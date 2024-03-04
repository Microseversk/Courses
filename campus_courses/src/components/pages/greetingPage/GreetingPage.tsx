import {Container} from "react-bootstrap";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

export function GreetingPage(){

    const user = useTypedSelector(state => state.auth.user)

    return(
        <Container className={'text-center fw-light fs-1'}>
            <span>{user && user.fullName}, добро пожаловать в систему кампусных курсов</span>
        </Container>
    )
}