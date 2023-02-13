import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from './component/Sidebar';
import { Landing } from './page/Landing';
import './scss/style.scss'
import './scss/navbar.scss'
import './scss/login.scss'
import './scss/chat.scss'
import { Chat } from './page/Chat';
import { Login } from './page/Login';
import { PrivateRoute } from './component/ProtectedRoute';
import Navbar from './component/nav/NavBar';
import { useState } from 'react';
import { CoverLogin } from './component/CoverLogin';
import { messaging } from './config/config';
import { getToken } from "firebase/messaging";
import { updateFirebaseToken } from './api/api';


function App() {
  const [user, setUser] = useState(localStorage.getItem('user'))
  const checkFirebaseToken = async () => {
    try {
      const token = await getToken(messaging, { vapidKey: process.env.PUBLIC_KEY });
      await updateFirebaseToken({
        id: localStorage.getItem('userId'),
        firebaseToken: token
      })
      console.log(token)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    checkFirebaseToken()
  }, [])
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
