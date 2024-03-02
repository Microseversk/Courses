import {Route, Routes} from "react-router-dom";
import {PrivateLayout} from "../layouts/PrivateLayout";
import {PublicLayout} from "../layouts/PublicLayout";
import {GroupsPage} from "../pages/groupsPage/GroupsPage";
import {LoginPage} from "../pages/loginPage/LoginPage";
import {RegistrationPage} from "../pages/registrationPage/RegistrationPage";
import {ProfilePage} from "../pages/profilePage/ProfilePage";

export function Router() {
    return (
        <Routes>
            <Route path='/groups' element={<PrivateLayout children={<GroupsPage/>}/>}/>
            <Route path='/profile' element={<PrivateLayout children={<ProfilePage/>}/>}/>
            <Route path='/login' element={<PublicLayout children={<LoginPage/>}/>}/>
            <Route path='/registration' element={<PublicLayout children={<RegistrationPage/>}/>}/>
            <Route path='*' element={<PublicLayout children={<>Not found</>}/>}/>
        </Routes>
    )
}