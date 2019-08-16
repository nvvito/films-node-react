import React from 'react'
import { Link } from "react-router-dom"
import { Breadcrumb } from 'antd'

const FilmBreadcrumb = ({ breadcrumbs }) =>
    <Breadcrumb
        style={{ padding: '20px 50px' }}
        itemRender={(route, params, routes, paths) => {
            const last = routes.indexOf(route) === routes.length - 1;
            return last ? (
                <span>{route.breadcrumbName}</span>
            ) : (
                    <Link to={route.path}>{route.breadcrumbName}</Link>
                );
        }}
        routes={breadcrumbs}
    />

export default FilmBreadcrumb