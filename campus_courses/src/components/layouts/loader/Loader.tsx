import ReactLoading from 'react-loading'
import React from "react";
import {Container} from "react-bootstrap";
export function Loader({width = '10%'}){
    return(
        <Container className='d-flex mt-5 justify-content-center'>
        <ReactLoading type={"bars"} color={'#5a92ed'} width={width}/>
    </Container>
)
}