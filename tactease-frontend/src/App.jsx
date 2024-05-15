import Header from './components/Header/Header.jsx';
import CalenderPage from './Pages/CalenderPage/CalenderPage.jsx';
import Login from "./Pages/Login/Login.jsx";
import Requests from "./Pages/Requests/Requests.jsx";
import AddMissions from "./Pages/AddMissions/AddMissions.jsx";
import NewRequest from "./Pages/NewRequest/NewRequest.jsx";
import NotFound from "./Pages/NotFound/NotFound.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { Route, Routes, Navigate } from 'react-router-dom'
import { useEffect } from "react";
import { MainContainer } from "./App.style";

const App = () => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    useEffect(() => {
        if (user) {
            console.log(user);
        }
    }, [user]);

    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route exact path="/" element={user ? <CalenderPage /> : <Navigate to="/login" />} />
                <Route path="/addMissions" element={user ? <AddMissions /> : <Navigate to="/login" />} />
                <Route path="/requests" element={user ? <Requests /> : <Navigate to="/login" />} />
                <Route path="/newRequest" element={user ? <NewRequest /> : <Navigate to="/login" />} />
                <Route path="/notFound" element={<NotFound />} />
                <Route path="*" element={user ? <Navigate to="/notFound" /> : <Navigate to="/login" />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;