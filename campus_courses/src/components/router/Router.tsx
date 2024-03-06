import {Route, Routes} from "react-router-dom";
import {PrivateLayout} from "../layouts/PrivateLayout";
import {PublicLayout} from "../layouts/PublicLayout";
import {GroupsPage} from "../pages/groupsPage/GroupsPage";
import {LoginPage} from "../pages/loginPage/LoginPage";
import {RegistrationPage} from "../pages/registrationPage/RegistrationPage";
import {ProfilePage} from "../pages/profilePage/ProfilePage";
import {GreetingPage} from "../pages/greetingPage/GreetingPage";
import {GroupCoursesPage} from "../pages/groupCoursesPage/GroupCoursesPage";
import {MyCoursesPage} from "../pages/myCoursesPage/MyCoursesPage";
import {TeachingCoursesPage} from "../pages/teachingCoursesPage/TeachingCoursesPage";
import {CourseDetailsPage} from "../pages/courseDetailsPage/CourseDetailsPage";

export function Router() {
    return (
        <Routes>
            <Route path='/' element={<PrivateLayout children={<GreetingPage/>}/>}/>
            <Route path='/groups' element={<PrivateLayout children={<GroupsPage/>}/>}/>
            <Route path='/groups/:id' element={<PrivateLayout children={<GroupCoursesPage/>}/>}/>
            <Route path='/courses/my' element={<PrivateLayout children={<MyCoursesPage/>}/>}/>
            <Route path='/courses/teaching' element={<PrivateLayout children={<TeachingCoursesPage/>}/>}/>
            <Route path='/courses/:id' element={<PrivateLayout children={<CourseDetailsPage/>}/>}/>
            <Route path='/profile' element={<PrivateLayout children={<ProfilePage/>}/>}/>
            <Route path='/login' element={<PublicLayout children={<LoginPage/>}/>}/>
            <Route path='/registration' element={<PublicLayout children={<RegistrationPage/>}/>}/>
            <Route path='*' element={<PublicLayout children={<>Not found</>}/>}/>
        </Routes>
    )
}