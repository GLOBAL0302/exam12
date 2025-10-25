import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserRegister from './features/users/UserRegister';
import UserLogin from './features/users/UserLogin';
import AppBarComponent from './components/AppToolBar/AppBarComponent';
import AddMeal from './features/meals/AddMeal';
import ProtectedRoute from './components/AppToolBar/ProtectedRoute/ProtectedRoute';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/users/UserSlice';
import Meals from './features/meals/Meals';
import MealDetail from './features/meals/MealDetail';

function App() {
  const user = useAppSelector(selectUser);
  return (
    <div className="overflow-hidden h-screen w-screen">
      <AppBarComponent />
      <div className="max-w-6xl mx-auto">
        <Routes>
          <Route path="/" element={<Meals />} />
          <Route path="/meals/:userId" element={<Meals />} />
          <Route path="/:mealId" element={<MealDetail />} />
          <Route
            path="/addMeals"
            element={
              <ProtectedRoute isAllow={user !== null}>
                <AddMeal />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="*" element={<h1>No Page such</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
