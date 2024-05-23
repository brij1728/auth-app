import {
  About,
  ForgotPasswordPage,
  Home,
  NotFound,
  Profile,
  SignInPage,
  SignUpPage,
} from '../pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Header } from '../components';

export const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<SignInPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/about' element={<About />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
