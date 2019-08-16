import React from 'react'
import { Pagination } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//action
import { fetchFilms } from '../store/action'

const ListPagination = ({ count, page, fetchFilms, sort_field, sort_direction }) => 
    <Pagination defaultPageSize={5} total={count} current={page} onChange={page => fetchFilms(page, sort_field, sort_direction)} className='ListPagination' />

const mapStateToProps = state => ({
    count: state.films.count,
    page: state.films.page,
    sort_field: state.films.sort_field,
    sort_direction: state.films.sort_direction,
})
const mapDispatchToProps = dispatch => ({
    fetchFilms: bindActionCreators(fetchFilms, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(ListPagination)