import Header from './components/Header/Header.jsx';
import { useEffect } from "react";
import CalenderPage from './Pages/CalenderPage/CalenderPage.jsx';
import Login from "./Pages/Login/Login.jsx";
import AddMissions from "./Pages/AddMissions/AddMissions.jsx";
import {Route, Routes, useNavigate} from 'react-router-dom'
import Requests from "./Pages/Requests/Requests.jsx";
import NewRequest from "./Pages/NewRequest/NewRequest.jsx";

function App() {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
        else{
            navigate('/login');
        }
    }, []);


    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route exact path="/" element={<CalenderPage/>}/>
                <Route path="/addMissions" element={<AddMissions/>}/>
                <Route path="/newRequest" element={<NewRequest/>}/>
                {/*<Route path="/newRequest" element={</>}/>*/}
                <Route path="/myRequests" element={<Requests />}/>
                {/*<Route path="/soldiersRequests" element={</>}/>*/}
            </Routes>
        </div>
    );
}

export default App;
