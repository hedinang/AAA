import React, { createContext, useEffect, useState } from 'react';
import { Layout } from 'antd';
import { Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from './component/Sidebar';
import { Landing } from './page/Landing';
import './scss/style.scss'
import './scss/navbar.scss'
import './scss/login.scss'
import './scss/chat.scss'
import './scss/sidebar.scss'
import { Chat } from './page/Chat';
import { Login } from './page/Login';
import { PrivateRoute } from './component/ProtectedRoute';
import Navbar from './component/nav/NavBar';
import { CoverLogin } from './component/CoverLogin';
import { messaging } from './config/config';
import { getToken } from "firebase/messaging";
import { updateFirebaseToken } from './api/api';


const SideContext = createContext({
  sideStatus: false,
  setSideStatus: () => { },
});
function App() {
  const [sideStatus, setSideStatus] = useState(true);
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
    <SideContext.Provider value={{ sideStatus: sideStatus, setSideStatus: setSideStatus }}>
      <Layout>
        <Navbar />
        <Layout>
          <Sidebar />
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
    </SideContext.Provider>
  )
}

export { App, SideContext };
