import React from "react";
import { Menu, Avatar } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
const RightMenu = ({ onVerticalMenu }) => {
    return (
        <div onClick={onVerticalMenu}>
            <div className="right-menu">
                <div >
                    <h4 className="username">{window.localStorage.getItem('user')}</h4>
                    <Avatar icon={<UserOutlined />} />
                </div>

            </div>
        </div>
    );
};

export default RightMenu;
