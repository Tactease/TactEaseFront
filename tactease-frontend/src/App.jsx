import Header from './components/Header/Header.jsx';
import CalenderPage from './Pages/CalenderPage/CalenderPage.jsx';
import Login from "./Pages/Login/Login.jsx";
import AddMissions from "./Pages/AddMissions/AddMissions.jsx";
import {Route, Routes} from 'react-router-dom'

function App() {
    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path="/" element={<CalenderPage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/addMissions" element={<AddMissions/>}/>
            </Routes>
        </div>
    );
}

export default App;
