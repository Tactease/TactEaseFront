import Header from './components/Header/Header.jsx';
import { useEffect } from "react";
import CalenderPage from './Pages/CalenderPage/CalenderPage.jsx';
import Login from "./Pages/Login/Login.jsx";
import AddMissions from "./Pages/AddMissions/AddMissions.jsx";
import {Route, Routes, useNavigate} from 'react-router-dom'

function App() {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    console.log("User value:", user); // Log the user value
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
            </Routes>
        </div>
    );
}

export default App;
