import React, {ReactNode} from "react";
import {Header} from "./header/Header";
import {Container} from "react-bootstrap";

export function MainLayout({children}: { children: React.ReactNode }) {
    return (
        <>
            <Header/>
            <Container className={'mt-4'}>
                {children}
            </Container>
        </>
    )
}