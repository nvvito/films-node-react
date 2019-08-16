import React from 'react'
import { Radio } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//action
import { fetchFilms } from '../store/action'

const Sort = (props) => 
    <div className='sort-list'>
        <Field {...props} />
        <Direction {...props}/>
    </div>

const mapStateToProps = state => ({
    page: state.films.page,
    sort_field: state.films.sort_field,
    sort_direction: state.films.sort_direction,
})
const mapDispatchToProps = dispatch => ({
    fetchFilms: bindActionCreators(fetchFilms, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(Sort)

const Field = ({ page, sort_field, sort_direction, fetchFilms }) =>
    <Radio.Group value={sort_field} onChange={(e) => fetchFilms(page, e.target.value, sort_direction)}>
        <Radio.Button value="_id">_id</Radio.Button>
        <Radio.Button value="name">name</Radio.Button>
        <Radio.Button value="release">release</Radio.Button>
        <Radio.Button value="format">format</Radio.Button>
    </Radio.Group>

const Direction = ({ page, sort_field, sort_direction, fetchFilms }) =>
    <Radio.Group value={sort_direction} onChange={(e) => fetchFilms(page, sort_field, e.target.value)}>
        <Radio.Button value="asc">asc</Radio.Button>
        <Radio.Button value="desc">desc</Radio.Button>
    </Radio.Group>