import React, { useEffect, useState } from "react";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
const VerticalRightMenu = () => {
    const logOut = () => {
        window.localStorage.removeItem('userId')
        window.localStorage.removeItem('user')
        window.location.reload();
    }
    return <div className="vertical-menu">
        <div className="right-down">
            <div className="vertical-item"><UserOutlined />Profile</div>
            <div className="vertical-item" onClick={() => logOut}><LogoutOutlined />Logout</div>
            
        </div>
    </div>
}
export default VerticalRightMenu;