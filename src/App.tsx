import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"

import Login from './pages/login'
import Layout from "./pages/layout";

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/login' component={ Login }></Route>
                <Route path='/' component={ Layout }/>
            </Switch>
        </BrowserRouter>
    )
}
export default App;
