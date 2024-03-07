import {Container} from "react-bootstrap";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useGetUserProfileQuery, useGetUserRolesQuery} from "../../../store/api/accountApi";
import {useEffect} from "react";

export function GreetingPage(){

    const user = useTypedSelector(state => state.auth.user)

    return(
        <Container className={'text-center fw-light fs-1'}>
            {user ?
                <span>{user.fullName}, добро пожаловать в систему кампусных курсов</span>
                :
                <span>Добро пожаловать в систему кампусных курсов</span>
            }
        </Container>
    )
}