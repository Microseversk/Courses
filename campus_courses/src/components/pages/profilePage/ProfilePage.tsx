import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {FormEvent, useEffect, useState} from "react";
import {useInput} from "../../../hooks/useInput";
import {CustomInput} from "../registrationPage/CustomInput";
import {DateHelper, IDate} from "../../../helpers/DateHelper";
import {useGetUserProfileQuery} from "../../../store/api/accountApi";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

export interface IEditProfile {
    fullName: string,
    birthDate: string,
    email: string,
}

export function ProfilePage() {
    const profile = useTypedSelector(state => state.auth.user)
    const {data: editData, handleOnChange} = useInput<IEditProfile>({
        'fullName': "",
        'birthDate': "",
        'email': ""
    })

    useEffect(() => {
        handleOnChange('fullName', profile.fullName)
        handleOnChange('birthDate', DateHelper.to_DD_MM_YYYY(profile.birthDate).yyyy_mm_dd)
        handleOnChange('email', profile.email)
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(editData)
    }

    return (
        <Container>
            <Card>
                <Card.Header>
                    <Card.Title>Профиль</Card.Title>
                </Card.Header>
                <Card.Body>


                    <Form onSubmit={handleSubmit}>
                        <Row className={'d-flex align-items-center'}>
                            <Col md={2} xs={12}>ФИО:</Col>
                            <Col>
                                <CustomInput type={'text'} value={editData.fullName}
                                             onChange={(value) => handleOnChange('fullName', value)}/>
                            </Col>
                        </Row>
                        <Row className={'d-flex mt-3 align-items-center'}>
                            <Col md={2} xs={12}>Email:</Col>
                            <Col>
                                <Card.Text className={'mt-1 mt-md-0'}>{editData.email}</Card.Text>
                            </Col>
                        </Row>
                        <Row className={'d-flex mt-3 align-items-center'}>
                            <Col md={2} xs={12}>День рождения:</Col>
                            <Col className={'mt-1 mt-md-0'}>
                                <CustomInput type={'date'}
                                             value={editData.birthDate}
                                             onChange={(value) => handleOnChange('birthDate', value)}/>
                            </Col>
                        </Row>
                        <div className={'w-100 d-flex justify-content-end'}>
                            <Button type={'submit'} className={'mt-3'}>Изменить</Button>
                        </div>
                    </Form>

                </Card.Body>
            </Card>
        </Container>
    )
}