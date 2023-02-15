import React from "react";
import { Menu, Avatar } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
const RightMenu = ({ mode }) => {
    const logOut = () => {
        window.localStorage.removeItem('userId')
        window.localStorage.removeItem('user')
        window.location.reload();
    }
    return (
        <div>
            <div className="right-menu">
                <div><h4 className="username">{window.localStorage.getItem('user')}</h4>
                    <Avatar icon={<UserOutlined />} /></div>

            </div>
            {/* <div style={{ position: 'absolute', marginTop: '30px' }}>
                <div><UserOutlined /> Profile</div>
                <div>
                    <LogoutOutlined /> Logout

                </div>
            </div> */}
        </div>
        // <Menu mode={mode} className="right-menu">
        //     <Menu.SubMenu
        //         title={
        //             <>
        //                 <Avatar icon={<UserOutlined />} />
        //                 <span className="username">{window.localStorage.getItem('user')}</span>
        //             </>
        //         }
        //     >
        //         <Menu.Item key="about-us">
        //             <UserOutlined /> Profile
        //         </Menu.Item>
        //         <Menu.Item key="log-out" onClick={logOut}>
        //             <LogoutOutlined /> Logout
        //         </Menu.Item>
        //     </Menu.SubMenu>
        // </Menu>
    );
};

export default RightMenu;
