import React from 'react';
import { Layout } from 'antd';
import { Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from './component/Sidebar';
import { Landing } from './page/Landing';
import './scss/style.scss'
import './scss/navbar.scss'
import './scss/login.scss'
import { Chat } from './page/Chat';
import { Login } from './page/Login';
import { PrivateRoute } from './component/ProtectedRoute';
import Navbar from './component/nav/NavBar';
import { useState } from 'react';
import { CoverLogin } from './component/CoverLogin';

function App() {
  const [user, setUser] = useState(window.localStorage.getItem('user'))
  return (
    <>
      <Layout>
        <Navbar />
        <Layout>
          {user ? <Sidebar></Sidebar> : <></>}
          <Routes>

            <Route path='/login' element={
              <CoverLogin>
                <Login />
              </CoverLogin>
            } />
            <Route exact path='/' element={
              <PrivateRoute><Landing /></PrivateRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path='/chat' element={
              <PrivateRoute><Chat /></PrivateRoute>
            } />
          </Routes>
        </Layout>
      </Layout>

    </>

  )
}

export default App;
