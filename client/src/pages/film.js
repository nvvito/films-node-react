import React from 'react'
import { Card, Icon, Popconfirm, Input, Select, DatePicker } from 'antd'
import moment from 'moment'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//action
import { filmChangeName, filmChangeDate, filmChangeFormat, filmChangeTag, updateFilm, deleteFilm, fetchFilm } from '../store/action'
//component
import FilmBreadcrumb from '../components/breadcrumb'
import EditableTagGroup from '../components/tagGroup'

const { Option } = Select

let breadcrumbs = [
    {
        path: '/',
        breadcrumbName: 'Films',
    }
]

class Film extends React.Component {
    constructor(props) {
        super(props)
        this.updateFilm = this.updateFilm.bind(this)
        this.deleteFilm = this.deleteFilm.bind(this)
    }
    updateFilm() {
        this.props.updateFilm(this.props.match.params.id, this.props.data)
    }
    deleteFilm() {
        this.props.deleteFilm(this.props.match.params.id, this.props.history)
    }
    componentDidMount() {
        this.props.fetchFilm(this.props.match.params.id)
    }
    componentDidUpdate(nextProps) {
        if (nextProps.match.params.id !== this.props.match.params.id) {
            this.props.fetchFilm(this.props.match.params.id)
        }
    }
    render() {
        let { load, data } = this.props
        let breadcrumb = [...breadcrumbs, { breadcrumbName: load ? '...' : data.name ? data.name : 'Noname' }]
        return (
            <React.Fragment>
                <FilmBreadcrumb breadcrumbs={breadcrumb} />
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
                            updateFilm={this.updateFilm}
                            deleteFilm={this.deleteFilm}
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
    updateFilm: bindActionCreators(updateFilm, dispatch),
    deleteFilm: bindActionCreators(deleteFilm, dispatch),
    fetchFilm: bindActionCreators(fetchFilm, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Film)

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

const RenderCard = ({ data, filmChangeName, filmChangeDate, filmChangeFormat, filmChangeTag, updateFilm, deleteFilm }) =>
    <Card
        style={{ width: 300, margin: '20px auto' }}
        actions={[
            <Popconfirm
                key='save'
                title="Are you sure Save this Film?"
                onConfirm={updateFilm}
                okText="Yes"
                cancelText="No"
            >
                <Icon type="save" key='save' />
            </Popconfirm>,
            <Popconfirm
                key='delete'
                title="Are you sure Delete this Film?"
                onConfirm={deleteFilm}
                okText="Yes"
                cancelText="No"
            >
                <Icon type="delete" />
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