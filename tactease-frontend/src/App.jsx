import Header from './components/Header/Header.jsx';
import CalenderPage from './Pages/CalenderPage/CalenderPage.jsx';
import Login from "./Pages/Login/Login.jsx";
import AddMissions from "./Pages/AddMissions/AddMissions.jsx";
import {Route, Routes, Navigate} from 'react-router-dom'
import Requests from "./Pages/Requests/Requests.jsx";
import {useEffect} from "react";

function App() {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    useEffect(() => {
        if (user) {
            console.log(user);
        }
    }, [user]);

    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route exact path="/" element={user ? <CalenderPage/> : <Navigate to="/login"/>}/>
                <Route path="/addMissions" element={user ? <AddMissions/> : <Navigate to="/login"/>}/>
                {/*<Route path="/newRequest" element={</>}/>*/}
                <Route path="/requests" element={user? <Requests/> : <Navigate to="/login" />}/>
                {/*<Route path="/soldiersRequests" element={</>}/>*/}
            </Routes>
        </div>
    );
}

export default App;
