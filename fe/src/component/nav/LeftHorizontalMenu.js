import React, { useState } from "react";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
const items = [
    {
        label: 'Home',
        key: 'mail',
        icon: <MailOutlined />,
    },
    {
        label: 'Introduce',
        key: 'introduce',
        icon: <SettingOutlined />,
        children: [
            {
                // type: 'group',
                label: 'About us',
                key: 'aboutUs',
                icon: <AppstoreOutlined />
                // children: [
                //     {
                //         label: 'Option 1',
                //         key: 'setting:1',
                //     },
                //     {
                //         label: 'Option 2',
                //         key: 'setting:2',
                //     }
                // ]
            },
            {
                label: 'History of development',
                key: 'historyDevelopment',
                icon: <SettingOutlined />
            }
        ]
    },
    {
        label: 'Service',
        key: 'service',
        icon: <SettingOutlined />,
        children: [
            {
                label: 'Business website',
                key: 'businessWebsite',
                icon: <AppstoreOutlined />
            },
            {
                label: 'Software outsourcing',
                key: 'softwareOutsourcing',
                icon: <SettingOutlined />
            }
        ]
    },
    {
        label: 'Project',
        key: 'project',
        icon: <SettingOutlined />,
        children: [
            {
                label: 'Business',
                key: 'business',
                icon: <AppstoreOutlined />
            },
            {
                label: 'Software',
                key: 'sofware',
                icon: <SettingOutlined />
            }
        ]
    },
    {
        label: 'News',
        key: 'news',
        icon: <SettingOutlined />,
        children: [
            {
                label: 'Internal news',
                key: 'internalNews',
                icon: <AppstoreOutlined />
            },
            {
                label: 'Technology news',
                key: 'technologyNews',
                icon: <SettingOutlined />
            },
            {
                label: 'Career',
                key: 'career',
                icon: <SettingOutlined />
            }
        ]
    },
    {
        label: 'Contact',
        key: 'contact',
        icon: <SettingOutlined />,
        children: [
            {
                // type: 'group',
                label: 'About us',
                key: 'aboutUs',
                icon: <AppstoreOutlined />
                // children: [
                //     {
                //         label: 'Option 1',
                //         key: 'setting:1',
                //     },
                //     {
                //         label: 'Option 2',
                //         key: 'setting:2',
                //     }
                // ]
            },
            {
                label: 'History of development',
                key: 'historyDevelopment',
                icon: <SettingOutlined />
            }
        ]
    }

];
const LeftHorizontalMenu = ({ mode }) => {
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return <Menu className="left-horizontal-menu" onClick={onClick} selectedKeys={[current]} mode={mode} items={items} />;
};
export default LeftHorizontalMenu;
