import React from 'react'
import { Tag, Input, Tooltip, Icon, message } from 'antd'

class EditableTagGroup extends React.Component {
    state = {
        inputVisible: false,
        inputValue: '',
    }

    handleClose = removedTag => {
        const actors = this.props.actors.filter((actor, i) => i !== removedTag)
        this.props.filmChangeTag(actors)
    }

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    }

    handleInputChange = e => {
        this.setState({ inputValue: e.target.value })
    }

    handleInputConfirm = () => {
        const { inputValue } = this.state
        let { actors } = this.props
        let actor = inputValue.split(' ').filter(el => el !== '')
        if (actor.length === 2) {
            actors = [...actors, { f_name: actor[0], l_name: actor[1] }]
            this.setState({
                inputVisible: false,
                inputValue: '',
            })
            this.props.filmChangeTag(actors)
        } else {
            message.error('Name and surname must be entered!')
            this.setState({
                inputVisible: false,
                inputValue: '',
            })
        }
    }

    saveInputRef = input => (this.input = input)

    render() {
        const { inputVisible, inputValue } = this.state
        const { actors } = this.props
        return (
            <div>
                {
                    actors.map((actor, i) => {
                        let tag = `${actor.f_name} ${actor.l_name}`
                        const isLongTag = tag.length > 20
                        const tagElem = (
                            <Tag key={tag} closable onClose={() => this.handleClose(i)}>
                                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                            </Tag>
                        )
                        return isLongTag ? (
                            <Tooltip title={tag} key={tag}>
                                {tagElem}
                            </Tooltip>
                        ) : (
                                tagElem
                            )
                    })
                }
                {
                    inputVisible && (
                        <Input
                            ref={this.saveInputRef}
                            type="text"
                            size="small"
                            style={{ width: 100 }}
                            value={inputValue}
                            onChange={this.handleInputChange}
                            onBlur={this.handleInputConfirm}
                            onPressEnter={this.handleInputConfirm}
                        />
                    )
                }
                {
                    !inputVisible && (
                        <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
                            <Icon type="plus" /> New Actor
                        </Tag>
                    )
                }
            </div>
        )
    }
}
export default EditableTagGroup