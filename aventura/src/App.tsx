import React, {useEffect} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRoutes from './routes/MainRoutes';
import './App.css';
import {useSelector} from "react-redux";


const App: React.FC = () => {
    const user = useSelector((state: { user: any }) => state.user); // Assuming you have a user in your redux state

    useEffect(() => {
        if (!user) {
            localStorage.removeItem('user');
        }
    }, []);
    return (
 
        <Router>
            <MainRoutes />
        </Router>
   
    );
};

export default App;
