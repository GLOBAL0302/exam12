import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserRegister from './features/users/UserRegister';
import UserLogin from './features/users/UserLogin';
import AppBarComponent from './components/AppToolBar/AppBarComponent';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="overflow-hidden h-screen w-screen">
      <AppBarComponent />
      <div className="max-w-3xl mx-auto">
        <Routes>
          <Route path="/" element={<UserRegister />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="*" element={<h1>No Page such</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
