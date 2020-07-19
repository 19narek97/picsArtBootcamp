import React from "react";
import {Switch} from 'react-router-dom'
import {AppRouter} from './Components/AppRouter/AppRouter'
import {LoginAndRegistrationLayout as LoginAndRegistration} from "./Components/layouts/LoginAndRegistrationLayout"
import {Login,Registration,Home,Topics,Projects,PageNotFound} from "./view"
import UserLayout from "./Components/layouts/UserLayout";

export const Routers = () => {

    return (
            <>
                <Switch>
                    <AppRouter exact  path={'/'} layout={LoginAndRegistration} component={Login}/>
                    <AppRouter exact  path={'/registration'} layout={LoginAndRegistration} component={Registration}/>
                    <AppRouter exact  path={'/home'} layout={UserLayout} component={Home}/>
                    <AppRouter exact  path={'/home/:action'} layout={UserLayout} component={Home}/>
                    <AppRouter exact  path={'/topics'} layout={UserLayout} component={Topics}/>
                    <AppRouter exact  path={'/topics/:action'} layout={UserLayout} component={Topics}/>
                    <AppRouter exact  path={'/projects'} layout={UserLayout} component={Projects}/>
                    <AppRouter exact path={"*"} layout={UserLayout} component={PageNotFound}/>
                </Switch>
            </>
    )
}