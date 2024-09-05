import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Docker from './docker';
import Display from './display';

import './App.css';



const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Docker/>}/>
                <Route path="/display" element={<Display/>}/>
            </Routes>

    </BrowserRouter>
    )
}


export default App;
