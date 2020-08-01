import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import Header from '../components/Header/index';
import asyncComponent from '../util/asyncComponent';
import Container from "@material-ui/core/Container";
import Footer from "../components/Footer";
import TemporaryDrawer from "../components/Bucket";
class App extends React.Component {

    render() {
        return (
            <Container>
                <Header/>
                <main className="app-main-content-wrapper">
                    <div className="app-main-content">
                        <TemporaryDrawer />
                        <Switch>
                            <Route path={`/app/dashboard`} component={asyncComponent(() => import('./routes/Dashboard'))}/>
                            <Route path={`/app/products/:title/:id`} component={asyncComponent(() => import('./routes/Products'))}/>
                            <Route path={`/app/payment`} component={asyncComponent(() => import('./routes/Payment'))}/>
                            <Route component={asyncComponent(() => import('../components/Error404'))}/>
                        </Switch>
                    </div>
                </main>
                <Footer />
            </Container>

        );
    }
}

export default withRouter(App);