import { About, Home, NotFound, SignInPage, SignUpPage } from '../pages'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export const AppRoutes = () => {
  return (
	<BrowserRouter>
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/signin' element={<SignInPage />} />
    <Route path='/signup' element={<SignUpPage />} />
    <Route path='/home' element={<About />} />
    <Route path='*' element={<NotFound/>} />

  </Routes>
  </BrowserRouter>
  )
}
