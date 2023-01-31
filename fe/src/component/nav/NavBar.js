import React, { useEffect, useState } from "react";
import { Button, Drawer } from "antd";
import { Header } from "antd/es/layout/layout";
import { MenuOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const [user, setUser] = useState(window.localStorage.getItem('user'))
    const showDrawer = () => {
        setVisible(!visible);
    };

    // If you do not want to auto-close the mobile drawer when a path is selected
    // Delete or comment out the code block below
    // From here
    let { pathname: location } = useLocation();
    useEffect(() => {
        setVisible(false);
    }, [location]);
    // Upto here

    return (
        <>
            {user ?
                <Header className="nav-header" style={{ backgroundColor: 'white' }}>
                    <div className="logo">
                        <h3 className="brand-font">Brand Here</h3>
                    </div>
                    <div className="navbar-menu">
                        <div className="leftMenu">
                            <LeftMenu mode={"horizontal"} />
                        </div>
                        <Button className="menuButton" type="text"
                            onClick={showDrawer}
                        >
                            <MenuOutlined />
                        </Button>
                        <div className="rightMenu">
                            <div style={{ float: 'left', color: 'red' }}>Welcome {window.localStorage.user}</div>
                            <RightMenu mode={"horizontal"} />
                        </div>

                        <Drawer
                            title={"Brand Here"}
                            placement="right"
                            closable={true}
                            onClose={showDrawer}
                            visible={visible}
                            style={{ zIndex: 99999 }}
                        >
                            <LeftMenu mode={"inline"} />
                            <RightMenu mode={"inline"} />
                        </Drawer>
                    </div>
                </Header>
                : <></>}
        </>
    );
};

export default Navbar;
