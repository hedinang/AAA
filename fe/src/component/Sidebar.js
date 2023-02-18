import { Layout, Menu } from 'antd';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MailOutlined, SettingOutlined } from '@ant-design/icons';
import { SideContext } from '../App';
const { Sider } = Layout;
const Sidebar = () => {
    const navigate = useNavigate();
    const { sideStatus } = useContext(SideContext);
    const user = localStorage.getItem('user')
    const items = [
        {
            label: 'User list',
            key: 'userList',
            icon: <MailOutlined onClick={() => {
                navigate('');
            }} />,
        },
        {
            label: 'Chat',
            key: 'chat',
            icon: <SettingOutlined onClick={() => {
                navigate('/chat');
            }} />,
        }
    ];
    const onClickItem = (e) => {
        const key = e.key
        switch (key) {
            case 'userList':
                navigate('');
                break;
            case 'chat':
                navigate('/chat');
                break;
            default:
                break;
        }
    }
    return (
        <>
            {user ?
                sideStatus ?
                    <Sider width={200} style={{ height: '100vh' }} className='side-bar'>
                        <Menu
                            // theme='dark'
                            mode='inline'
                            inlineCollapsed={false}
                            style={{
                                height: '100%',
                                borderRight: 0,
                                width: 200,
                            }}
                            onClick={(e) => onClickItem(e)}
                            items={items}
                        >
                        </Menu>
                    </Sider> : <></>
                : <></>}
        </>
    );
};

export default Sidebar;
