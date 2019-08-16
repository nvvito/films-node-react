import React from 'react'
import { Menu, Icon } from 'antd'
import { NavLink } from "react-router-dom"
import Search from './search'

const PageMenu = () =>
    <Menu mode="horizontal" theme="dark" selectable={false}>
        <Menu.Item key="film">
            <NavLink to="/">
                <Icon type="video-camera" />Films
            </NavLink>
        </Menu.Item>
        <Menu.Item key="Import">
        <NavLink to="/import">
                <Icon type="import" />Import
            </NavLink>
        </Menu.Item>
        <Menu.Item key="search" style={{ float: 'right' }}>
            <Search />
        </Menu.Item>
    </Menu>

export default PageMenu