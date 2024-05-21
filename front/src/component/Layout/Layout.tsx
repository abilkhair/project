import {Header} from "antd/es/layout/layout";
import {Menu } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import {header, link} from "./style.ts";
import Link from "antd/es/typography/Link";




function _Header() {


    return (
        <>
            <Header  style={header}>
                <div>
                    <a style={link} href={'#'}><h2>My Chat</h2></a>
                </div>
                <Menu theme="light"  mode="horizontal" defaultSelectedKeys={['']}>
                    <Menu.Item key="1" icon={<HomeOutlined/>}>
                        <Link>Home</Link>
                    </Menu.Item>
                </Menu>
            </Header>
        </>
    );
}

export default _Header;