import React, { useState } from "react";
import { Menu, Switch, Divider } from 'antd';
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LinkOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

export default ()=>{
  return (
    <>
      <Menu
        defaultSelectedKeys={['1']}
        // defaultOpenKeys={['sub1']}
        mode="vertical"
        theme="light"
      >
        <Menu.Item key="1" icon={<MailOutlined />}>
          TOP
        </Menu.Item>
        <Menu.Item key="2" icon={<CalendarOutlined />}>
          Summer Dresses
        </Menu.Item>
        <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Greek">
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
          <SubMenu key="sub1-2" title="Submenu">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub2" icon={<SettingOutlined />} title="French">
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
        </SubMenu>
      </Menu>
    </>
  );
}