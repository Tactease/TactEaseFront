import Header from './components/Header/Header.jsx';
import Calendar from './components/Schedule/Schedule.jsx';
import Login from "./Pages/Login/Login.jsx";
import {Navigate, Route, Routes} from 'react-router-dom'

function App() {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path="/login" element={user ? <Navigate to="/" /> : <Login/>}/>
                <Route exact path="/" element={user ? <Calendar user={user} /> : <Navigate to="/login" />} />
            </Routes>
        </div>
    );
}
export default App;
