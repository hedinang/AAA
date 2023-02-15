import React from "react";
import { Menu } from "antd";

const LeftMenu = ({ mode }) => {
    return (
        <div className="left-menu">
            <h3 className="menu-item">Explore</h3>
            <h3 className="menu-item">Features</h3>
            <h3 className="menu-item">About Us</h3>
            <h3 className="menu-item">Contact Us</h3>
        </div>
        // <Menu className="left-menu" mode={mode}>
        //     <Menu.Item key="explore">Explore</Menu.Item>
        //     <Menu.Item key="features">Features</Menu.Item>
        //     <Menu.Item key="about">About Us</Menu.Item>
        //     <Menu.Item key="contact">Contact Us</Menu.Item>
        // </Menu>
    );
};

export default LeftMenu;

