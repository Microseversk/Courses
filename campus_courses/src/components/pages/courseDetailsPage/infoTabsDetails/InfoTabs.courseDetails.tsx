import {Button, ListGroup, ListGroupItem, Tab, Tabs} from "react-bootstrap";
import React from "react";
import {INotification} from "../../../../types/response.types";

interface IInfoTabsCourseDetailsProps{
    requirements: string,
    annotations: string,
    notifications: INotification[],
    className?:string
}

export function InfoTabsCourseDetails(props : IInfoTabsCourseDetailsProps){
    return(
        <Tabs className={props.className} defaultActiveKey={'requirements'}>
            <Tab className={'border'} title={'Требования к курсу'} eventKey={'requirements'}>
                {props?.requirements &&
                    <div className={'mt-3 mb-3 ms-3'}>
                        <div dangerouslySetInnerHTML={{__html: props.requirements}}/>
                    </div>
                }
            </Tab>
            <Tab className={'border'} title={'Аннотация'} eventKey={'annotation'}>
                {props?.annotations &&
                    <div className={'mt-3 mb-3 ms-3'}>
                        <div dangerouslySetInnerHTML={{__html: props.annotations}}/>
                    </div>
                }
            </Tab>
            <Tab className={'border'}
                 title={!props?.notifications.length ?
                     "Уведомления" :
                     <div>Уведомления
                         <span
                             className={'ms-1 badge rounded-pill bg-danger'}>{props.notifications.length > 3 ? "3+" : props.notifications.length}</span>
                     </div>
                 }
                 eventKey={'notifications'}>
                <Button size={'sm'} className={'mt-3 ms-3 mb-3'}>СОЗДАТЬ УВЕДОМЛЕНИЕ</Button>
                <ListGroup>
                    {props?.notifications.map((notifi, index) => (
                        <ListGroupItem key={index}
                                       className={notifi.isImportant ? 'bg-danger-subtle text-danger rounded-0 border-0 border-bottom border-secondary' : 'border-bottom-2 rounded-0'}>{notifi.text}</ListGroupItem>
                    ))}
                </ListGroup>
            </Tab>
        </Tabs>
    )
}