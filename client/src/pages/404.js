import React from 'react'
import { Result, Button, Icon } from 'antd'
import { Link } from "react-router-dom"

const Page404 = () =>
    <React.Fragment>
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary"><Link to='/'><Icon type="video-camera" /> Films</Link></Button>}
        />
    </React.Fragment>

export default Page404