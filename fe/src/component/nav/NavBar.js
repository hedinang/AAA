import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Drawer, Image, Row } from "antd";
import { Header } from "antd/es/layout/layout";
import { MenuOutlined, PicLeftOutlined, PicRightOutlined } from "@ant-design/icons";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import LeftHorizontalMenu from "./LeftHorizontalMenu";
import { SideContext } from "../../App";
import brand from '../../asset/img/header/raccoon1.jpg'

const Navbar = () => {
    const { sideStatus, setSideStatus } = useContext(SideContext);
    const [rightVisible, setRightVisible] = useState(false);
    const user = localStorage.getItem('user')
    const showRightDrawer = () => {
        setRightVisible(!rightVisible);
    };
    const toggleCollapsed = () => {
        setSideStatus(!sideStatus)
    }
    return (
        <>
            {user ?
                <Header className="nav-header">
                    <Row>
                        <Col lg={2} span={1}>
                            <Button
                                type="text"
                                onClick={toggleCollapsed}
                                className="left-menu-button"
                            >
                                <PicLeftOutlined />
                            </Button>
                        </Col>
                        <Col lg={4} span={19} className="brand">
                            <Image
                                height={46}
                                src={brand}
                            />
                        </Col>
                        <Col lg={15} span={0} >
                            <LeftHorizontalMenu mode={'horizontal'} />
                        </Col>
                        <Col lg={0} span={4}>
                            <Button className="menuButton" type="text"
                                onClick={showRightDrawer}
                            >
                                <PicRightOutlined />
                            </Button>
                        </Col>
                        <Col lg={3} span={0}>
                            <RightMenu mode={'horizontal'} />
                        </Col>
                    </Row>
                    <Drawer
                        // title="Two-level Drawer"
                        width={320}
                        closable={false}
                        onClose={showRightDrawer}
                        open={rightVisible}
                    >
                        <LeftMenu mode={"inline"} />
                        <RightMenu mode={'inline'} />
                    </Drawer>
                </Header>
                : <></>}
        </>
    );
};

export default Navbar;
