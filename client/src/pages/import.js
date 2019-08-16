import React from 'react'
import { Button, Result, Spin, Icon } from 'antd'
import moment from 'moment'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//action
import { importData, importReset } from '../store/action'
//component
import FilmBreadcrumb from '../components/breadcrumb'

let breadcrumbs = [
    {
        path: '/',
        breadcrumbName: 'Films',
    },
    {
        path: '/import/',
        breadcrumbName: 'Import',
    }
]

class FileInput extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.fileInput = React.createRef()
    }
    handleSubmit(event) {
        event.preventDefault()
        let reader = new FileReader()
        reader.readAsText(this.fileInput.current.files[0])
        reader.onload = (e) => {
            let result = e.target.result
            result = result.split('\n').filter(el => el !== '')
            let data = []
            for (let i = 0; i < result.length; i += 4) {
                let name = result[i].slice(7)
                let release = moment(result[i + 1].slice(14)).valueOf()
                let format = result[i + 2].slice(8)
                let actors = result[i + 3].slice(7).split(',').map(el => el.trim()).map(el => {
                    let elements = el.split(' ')
                    return {
                        f_name: elements[0],
                        l_name: elements[1]
                    }
                })

                data.push({ name, release, format, actors })
            }
            this.props.importData(data)
        }
    }
    render() {
        return (
            <React.Fragment>
                <FilmBreadcrumb breadcrumbs={breadcrumbs} />{
                    this.props.result
                        ?
                        <Result
                            status="success"
                            title="Import Data Success!"
                            subTitle="You can import the data again!"
                            extra={<Button type="primary" onClick={this.props.importReset}>Import Again</Button>}
                        />
                        :
                        <div className='import-form'>
                            {
                                this.props.load
                                    ?
                                    <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />
                                    :
                                    <label>
                                        Select File PLS!
                                        <input type="file" ref={this.fileInput} name="file" />
                                    </label>

                            }
                            <Button onClick={this.handleSubmit} disabled={this.props.load}>Import</Button>
                        </div>
                }
            </React.Fragment>

        )
    }
}
const mapStateToProps = state => ({
    load: state.import.load,
    result: state.import.result
})
const mapDispatchToProps = dispatch => ({
    importData: bindActionCreators(importData, dispatch),
    importReset: bindActionCreators(importReset, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(FileInput)