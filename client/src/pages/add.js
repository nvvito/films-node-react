import React from 'react'
import { Card, Icon, Popconfirm, Input, Select, DatePicker } from 'antd'
import moment from 'moment'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//action
import { filmChangeName, filmChangeDate, filmChangeFormat, filmChangeTag, saveFilm, openAdd } from '../store/action'
//component
import FilmBreadcrumb from '../components/breadcrumb'
import EditableTagGroup from '../components/tagGroup'

const { Option } = Select

let breadcrumbs = [
    {
        path: '/',
        breadcrumbName: 'Films',
    },
    {
        path: '/add/',
        breadcrumbName: 'Add',
    }
]

class FilmAdd extends React.Component {
    constructor(props) {
        super(props)
        this.saveFilm = this.saveFilm.bind(this)
    }
    componentDidMount() {
        this.props.openAdd()
    }
    saveFilm() {
        this.props.saveFilm(this.props.data, this.props.history)
    }
    render() {
        let { load, data } = this.props
        return (
            <React.Fragment>
                <FilmBreadcrumb breadcrumbs={breadcrumbs} />
                {
                    load
                        ?
                        <LoadCard />
                        :
                        <RenderCard
                            data={data}
                            filmChangeName={this.props.filmChangeName}
                            filmChangeDate={this.props.filmChangeDate}
                            filmChangeFormat={this.props.filmChangeFormat}
                            filmChangeTag={this.props.filmChangeTag}
                            saveFilm={this.saveFilm}
                        />
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    load: state.film.load,
    data: state.film.data
})
const mapDispatchToProps = dispatch => ({
    filmChangeName: bindActionCreators(filmChangeName, dispatch),
    filmChangeDate: bindActionCreators(filmChangeDate, dispatch),
    filmChangeFormat: bindActionCreators(filmChangeFormat, dispatch),
    filmChangeTag: bindActionCreators(filmChangeTag, dispatch),
    saveFilm: bindActionCreators(saveFilm, dispatch),
    openAdd: bindActionCreators(openAdd, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(FilmAdd)

const LoadCard = () =>
    <Card style={{ width: 300, margin: '20px auto' }} loading={true}
        actions={[
            <Popconfirm
                disabled
                key='save'
            >
                <Icon type="save" key='save' />
            </Popconfirm>,
            <Popconfirm
                disabled
                key='delete'
            >
                <Icon type="delete" />
            </Popconfirm>
        ]}>
    </Card>

const RenderCard = ({ data, filmChangeName, filmChangeDate, filmChangeFormat, filmChangeTag, saveFilm }) =>
    <Card
        style={{ width: 300, margin: '20px auto' }}
        actions={[
            <Popconfirm
                key='save'
                title="Are you sure Save this Film?"
                onConfirm={saveFilm}
                okText="Yes"
                cancelText="No"
            >
                <Icon type="save" key='save' />
            </Popconfirm>
        ]}
    >
        <span>Name:</span>
        <Input value={data.name} onChange={filmChangeName} placeholder="Name..." style={{ width: '100%' }} />
        <span>Release:</span>
        <DatePicker
            value={data.release ? moment(data.release) : null}
            onChange={filmChangeDate}
            style={{ width: '100%' }}
            disabledDate={current => (current && current > moment().endOf('day')) || current < moment('1849-12-31').endOf('day')}
        />
        <span>Format:</span>
        <Select value={data.format} onChange={filmChangeFormat} style={{ width: '100%' }}>
            {
                ['VHS', 'DVD', 'Blu-Ray'].map(el => <Option value={el} key={el}>{el}</Option>)
            }
        </Select>
        <span>Actors:</span>
        <EditableTagGroup actors={data.actors} filmChangeTag={filmChangeTag} />
    </Card>