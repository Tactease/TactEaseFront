import Header from './components/Header/Header.jsx';
import Calendar from './components/Schedule/Schedule.jsx';
import Login from "./Pages/Login/Login.jsx";
import {Route, Routes} from 'react-router-dom'

function App() {
    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path="/" element={<Calendar/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </div>
    );
}

export default App;
