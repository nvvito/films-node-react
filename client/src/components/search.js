import React from 'react'
import { Icon, AutoComplete, Input } from 'antd'
import moment from 'moment'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//action
import { openFilm, getItemsAsync } from '../store/action'

const { Option } = AutoComplete

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.getItemsAsync = this.getItemsAsync.bind(this)
        this.renderResult = this.renderResult.bind(this)
    }
    getItemsAsync = searchValue => {
        if (searchValue) {
            this.props.getItemsAsync(searchValue)
        } else this.props.openFilm()
    }
    renderResult = data => {
        return (
            data.map(el =>
                <Option key={el._id} value={el._id}>
                    <Link className="search-item" to={`/${el._id}`}>
                        <div className="search-item-name">
                            <span>{`Name: `}</span>
                            <span>{el.name}</span>
                        </div>
                        <div className="search-item-age">
                            <span>{`Release: `}</span>
                            <span>{moment(el.release).format("YYYY-MM-DD")}</span>
                        </div>
                    </Link>
                </Option>
            )
        )
    }
    render() {
        return (
            <div>
                <AutoComplete
                    dropdownMatchSelectWidth={false}
                    dropdownStyle={{ width: 100 }}
                    placeholder="Search..."
                    optionLabelProp="value"
                    onSearch={this.getItemsAsync}
                    dataSource={this.renderResult(this.props.result)}
                    onSelect={this.props.openFilm}
                    value={this.props.value}
                >
                    <Input suffix={<Icon type="search" className="certain-category-icon" />} />
                </AutoComplete>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    value: state.search.value,
    result: state.search.result
})
const mapDispatchToProps = dispatch => ({
    openFilm: bindActionCreators(openFilm, dispatch),
    getItemsAsync: bindActionCreators(getItemsAsync, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(Search)