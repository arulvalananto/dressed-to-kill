import { useEffect, useState } from "react";
import "./App.css";

import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Header from "./components/Header/Header";

import { Route, BrowserRouter } from "react-router-dom";
import SignInAndSignUp from "./pages/SignIn-SignUp/SignIn-SignUp";
import { auth, createUserProfileDocument } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { FETCHUSER } from "./redux/reducers/userReducers";

const Hats = () => {
    return <div>Hats</div>;
};

function App() {
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.user.currentUser);
    console.log(currentUser);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            const userRef = await createUserProfileDocument(user);

            userRef?.onSnapshot((snapshot) => {
                dispatch(
                    FETCHUSER({
                        id: snapshot.id,
                        email: snapshot.data().email,
                        displayName: snapshot.data().displayName,
                    })
                );
            });
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div>
            <BrowserRouter>
                <Header />
                <Route exact path="/" component={Home} />
                <Route path="/shop" component={Shop} />
                <Route path="/hats" component={Hats} />
                <Route path="/signin" component={SignInAndSignUp} />
            </BrowserRouter>
        </div>
    );
}

export default App;
