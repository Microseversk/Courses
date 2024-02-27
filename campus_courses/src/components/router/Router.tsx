import {createBrowserRouter} from "react-router-dom";
import {MainLayout} from "../layouts/MainLayout";
import {LoginPage} from "../pages/loginPage/LoginPage";
import {RegistrationPage} from "../pages/registrationPage/RegistrationPage";
import {ProfilePage} from "../pages/profilePage/ProfilePage";
import {GroupsPage} from "../pages/groupsPage/GroupsPage";


export const Router = createBrowserRouter(
    [
        {
            path: '/',
            element: <MainLayout children={<>Main page</>}/>
        },

        {
            path: '/registration',
            element: <MainLayout children={<RegistrationPage/>}/>
        },
        {
            path: '/login',
            element: <MainLayout children={<LoginPage/>}/>
        },
        {
            path: '/profile',
            element: <MainLayout children={<ProfilePage/>}/>
        },
        {
            path: '/groups',
            element: <MainLayout children={<GroupsPage/>}/>
        },
        {
            path: '/groups/:id',
            element: <>groups item</>
        },
        {
            path: '/courses/:id',
            element: <>course item</>
        },
        {
            path: '/courses/my',
            element: <>my courses</>
        },
        {
            path: '/courses/teaching',
            element: <>my courses teaching</>
        },
    ]
)