import React from 'react'
import { List, Skeleton, Button } from 'antd'
import { Link } from "react-router-dom"
import moment from 'moment'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//action
import { fetchFilms } from '../store/action'
//component
import ListPagination from '../components/pagination'
import ListSort from '../components/sort'


class Films extends React.Component {
    componentDidMount() {
        this.props.fetchFilms(1, 'name', 'asc')
    }
    render() {
        let { count, load, list } = this.props
        return (
            <div className='list-body'>
                {
                    !load
                        ?
                        <FilmsList list={list} count={count} />
                        :
                        <LoadData size={5} />
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    count: state.films.count,
    page: state.films.page,
    sort_field: state.films.sort_field,
    sort_direction: state.films.sort_direction,
    load: state.films.load,
    list: state.films.list,
})
const mapDispatchToProps = dispatch => ({
    fetchFilms: bindActionCreators(fetchFilms, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Films)

//helper
//skeleton
const LoadData = ({ size }) => {
    let list = []
    for (let i = 0; i < size; i++) list.push(<Skeleton title={false} loading={true} active key={i}></Skeleton>)
    return list
}
//List
const FilmsList = ({ list, count }) =>
    <div>
        <Link key="list-loadmore-more" to={`/add`}><Button type="primary" shape="circle" icon="file-add" size='large' className='add-user-btn' /></Link>
        {
            count
                ?
                <ListSort />
                :
                ""
        }
        <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={list}
            renderItem={item => <ListElement data={item} key={item.id} />}
        />
        {
            count > 5
                ?
                <ListPagination />
                : ''
        }
    </div>
//ListElement
const ListElement = ({ data }) => {
    let actors = ''
    data.actors.map((el, i, arr) => {
        actors += `${el.f_name} ${el.l_name}`
        if(el.surname) actors += ` ${el.surname}`
        if (i + 1 !== arr.length) actors += ', '
        return el
    })
    return (
        <React.Fragment>
            <List.Item
                actions={[<Link key="list-loadmore-more" to={`/${data._id}`}>more</Link>]}
            >
                <List.Item.Meta
                    title={'Name: ' + data.name}
                    description={`Release: ${moment(data.release).format("YYYY-MM-DD")} / Format: ${data.format}`}

                />
                {`Actors: ${actors}`}
            </List.Item>
        </React.Fragment>
    )
}