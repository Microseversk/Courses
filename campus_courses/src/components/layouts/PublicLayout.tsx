import {ReactNode} from "react";
import {Header} from "./header/Header";
import {ILayoutProps} from "./PrivateLayout";

export function PublicLayout({children} : ILayoutProps){
    return(
        <>
            <Header/>
            {children}
        </>
    )
}