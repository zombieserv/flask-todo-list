import React from "react";
import {Route, Routes} from 'react-router-dom'
import TaskPage from "./pages/TaskPage";
import AuthPage from "./pages/Auth";

function App() {
    return (
        <>
        <Routes>
            <Route path="/" element={<TaskPage/>}/>
            <Route path="/auth" element={<AuthPage/>}/>
        </Routes>
        </>
    )
}

export default App;
