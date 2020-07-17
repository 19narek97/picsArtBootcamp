import React from "react";
import {Switch} from 'react-router-dom'
import {AppRouter} from './Components/AppRouter/AppRouter'
import {LoginAndRegistrationLayout as LoginAndRegistration} from "./Components/layouts/LoginAndRegistrationLayout"
import {Login,Registration,Home} from "./view"
import UserLayout from "./Components/layouts/UserLayout";

export const Routers = () => {

    return (
            <>
                <Switch>
                    <AppRouter exact  path={'/'} layout={LoginAndRegistration} component={Login}/>
                    <AppRouter exact  path={'/registration'} layout={LoginAndRegistration} component={Registration}/>
                    <AppRouter exact  path={'/home'} layout={UserLayout} component={Home}/>
                </Switch>
            </>
    )
}