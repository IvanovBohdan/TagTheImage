import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Canvas from "./components/Canvas/Canvas";
import CanvasPage from "./pages/CanvasPage/CanvasPage";
import TestPage from "./pages/TestPage/TestPage";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Error from "./components/Error/Error";
import { observer } from "mobx-react-lite";
import ErrorState from "./store/ErrorState";
import UserState from "./store/UserState";
import Account from "./pages/Account/Account";
import DatasetPage from "./pages/DatasetPage/DatasetPage";
import { useEffect } from "react";
import { getDatasets } from "./fetch/fetchDatasets";
const App = observer(() => {
    useEffect(() => {
        getDatasets();
    });

    return (
        <div className="App">
            <header>
                <h1>
                    <a href="/">TagTheImage</a>
                </h1>
                {UserState.username ? (
                    <a href="/">{UserState.username}</a>
                ) : (
                    <a href="/register">Register</a>
                )}
            </header>
            <div className="content-outer">
                <Error message={ErrorState.error?.message}></Error>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Account />} />
                        <Route path="/test" element={<TestPage />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="register" element={<Register />} />
                        <Route path="login" element={<Login />} />
                        <Route path="/dataset/:id" element={<DatasetPage />} />
                        <Route path="/tagging/:id" element={<CanvasPage />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
});

export default App;
