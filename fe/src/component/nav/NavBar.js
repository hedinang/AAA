import React, { useEffect, useState } from "react";
import { Button, Col, Drawer, Row } from "antd";
import { Header } from "antd/es/layout/layout";
import { MenuOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import VerticalRightMenu from "./VerticalRightMenu";

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const [user, setUser] = useState(window.localStorage.getItem('user'))
    const [verticalMenu, setVerticalMenu] = useState(false)
    const showDrawer = () => {
        setVisible(!visible);
    };
    let { pathname: location } = useLocation();
    useEffect(() => {
        setVisible(false);
    }, [location]);

    let onVerticalMenu = () => {
        setVerticalMenu(!verticalMenu)
    }
    return (
        <>
            {user ?
                <Header className="nav-header">
                    <Row>
                        <Col lg={5} span={5}>
                            <h3>Brand Here</h3>
                        </Col>
                        <Col lg={15} span={0}>
                            <LeftMenu mode={"horizontal"} />
                        </Col>
                        <Col lg={0} span={19}>
                            sssss
                        </Col>
                        <Col lg={4} span={0}>
                            <RightMenu onVerticalMenu={onVerticalMenu} />
                        </Col>
                    </Row>
                    {verticalMenu ? <VerticalRightMenu /> : <></>}

                    {/* <div className="logo">
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
                    </div> */}
                </Header>
                : <></>}
        </>
    );
};

export default Navbar;
