import Header from './components/Header/Header.jsx';
import CalenderPage from './Pages/CalenderPage/CalenderPage.jsx';
import Login from "./Pages/Login/Login.jsx";
import AddMissions from "./Pages/AddMissions/AddMissions.jsx";
import {Navigate, Route, Routes} from 'react-router-dom'

function App() {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    console.log("User value:", user); // Log the user value

    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route exact path="/" element={user ? <CalenderPage /> : <Navigate to="/login" />} />
                <Route path="/login" element={user ? <Navigate to="/" /> : <Login/>}/>
                <Route path="/addMissions" element={user ? <AddMissions /> : <Navigate to="/login" />}/>
            </Routes>
        </div>
    );
}
export default App;
