import React from "react";
import { AppstoreOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
const items = [
    {
        label: 'Hello ' + localStorage.getItem('user'),
        key: 'introduce',
        icon: <UserOutlined />,
        children: [
            {
                // type: 'group',
                label: 'Profile',
                key: 'profile',
                icon: <AppstoreOutlined />
            },
            {
                label: 'Log out',
                key: 'logout',
                icon: <SettingOutlined />

            }
        ]
    }
];
const RightMenu = ({ mode }) => {
    const logOut = () => {
        window.localStorage.removeItem('userId')
        window.localStorage.removeItem('user')
        window.location.reload();
    }
    const onClick = (e) => {
        const key = e.key
        switch (key) {
            case 'logout':
                logOut()
                break;

            default:
                break;
        }
    };
    return <Menu className="right-menu" onClick={onClick} selectedKeys={[]} mode={mode} items={items} sel />;
};
export default RightMenu;

