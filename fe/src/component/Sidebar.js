import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const { Sider } = Layout;
const Sidebar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(window.localStorage.getItem('user'))
    return (
        <>
            {user ?
                <Sider width={200} style={{ height: '100vh' }}>
                    <Menu
                        theme='dark'
                        mode='inline'
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{
                            height: '100%',
                            borderRight: 0,
                            width: 200,
                        }}
                        onClick={(e) => {
                            console.log('e', e);
                        }}
                    >
                        <Menu.Item
                            onClick={() => {
                                navigate('');
                            }}
                        >Home</Menu.Item>
                        <Menu.Item
                            onClick={() => {
                                navigate('/chat');
                            }}
                        >Chat</Menu.Item>
                    </Menu>
                </Sider>
                : <></>}
        </>
    );
};

export default Sidebar;
