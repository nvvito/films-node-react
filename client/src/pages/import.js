import React from 'react'
import { Button, Spin, Icon, message } from 'antd'
import moment from 'moment'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//action
import { importData } from '../store/action'
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
        if (this.fileInput.current.files[0]) {
            let extension = this.fileInput.current.files[0].name.split('.').pop().toLowerCase()
            if (extension === 'txt') {
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
            } else {
                message.error('Error file type!')
            }
        } else {
            message.error('PLS Select File!')
        }
    }
    render() {
        return (
            <React.Fragment>
                <FilmBreadcrumb breadcrumbs={breadcrumbs} />
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
            </React.Fragment>

        )
    }
}
const mapStateToProps = state => ({
    load: state.import.load,
})
const mapDispatchToProps = dispatch => ({
    importData: bindActionCreators(importData, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(FileInput)