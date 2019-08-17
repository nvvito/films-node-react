import { message } from 'antd'

//films
export const fetchFilms = (page, sort_field, sort_direction) => dispatch => {
  dispatch({
    type: 'START_LOAD_FILMS', payload: {
      page: page,
      sort_field: sort_field,
      sort_direction: sort_direction
    }
  })
  fetch(`/api/film/?page=${page}&sort_field=${sort_field}&sort_direction=${sort_direction}`)
    .then(res => res.json())
    .then(data => {
      setTimeout(() => {
        if (data.status) {
          dispatch({
            type: 'SUCCESS_LOAD_FILMS',
            payload: {
              list: data.message.result,
              count: Number(data.message.count),
            }
          })
        } else {
          message.error('Error Load Data!')
          dispatch({ type: 'FAILED_LOAD_FILMS' })
        }
      }, 500)
    })
    .catch(err => {
      console.log(err)
      message.error('Error Load Data!')
      dispatch({ type: 'FAILED_LOAD_FILMS' })
    })
}

export const fetchFilm = id => dispatch => {
  dispatch({ type: 'START_LOAD_FILM' })
  fetch(`/api/film/${id}`)
    .then(res => res.json())
    .then(data => {
      setTimeout(() => {
        if (data.status) {
          dispatch({
            type: 'SUCCESS_LOAD_FILM',
            payload: data.message
          })
        } else {
          message.error('Error Load Data!')
          dispatch({ type: 'FAILED_LOAD_FILM' })
        }
      }, 500)
    })
    .catch(err => {
      console.log(err)
      message.error('Error Load Data!')
      dispatch({ type: 'FAILED_LOAD_FILM' })
    })
}

export const filmChangeName = e => ({ type: 'CHANGE_NAME', payload: e.target.value })

export const filmChangeDate = value => ({ type: 'CHANGE_DATE', payload: value ? value.valueOf() : null })

export const filmChangeFormat = value => ({ type: 'CHANGE_FORMAT', payload: value })

export const filmChangeTag = value => ({ type: 'CHANGE_TAG', payload: value })

export const saveFilm = (data, history) => dispatch => {
  dispatch({ type: 'START_LOAD_FILM' })
  fetch('/api/film/', {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(data => {
      if (data.status) setTimeout(() => {
        dispatch({
          type: 'SUCCESS_LOAD_FILM',
          payload: data.message
        })
        history.push(`/${data.message._id}`)
        message.success('Success Create!')
      }, 500)
      else {
        console.log(data)
        message.error('Create Film Error!')
        dispatch({ type: 'FAILED_CREATE' })
      }
    })
    .catch(err => {
      console.log(err)
      message.error('Create Film Error!')
      dispatch({ type: 'FAILED_CREATE' })
    })
}

export const updateFilm = (_id, data) => dispatch => {
  dispatch({ type: 'START_LOAD_FILM' })
  fetch(`/api/film/${_id}`, {
    method: 'put',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(data => {
      if (data.status) setTimeout(() => {
        dispatch({
          type: 'SUCCESS_LOAD_FILM',
          payload: data.message
        })
        message.success('Success Update!')
      }, 500)
      else {
        console.log(data)
        message.error('Error Update!')
        dispatch({ type: 'FAILED_UPDATE' })
      }
    })
    .catch(err => {
      console.log(err)
      message.error('Error Update!')
      dispatch({ type: 'FAILED_UPDATE' })
    })
}

export const deleteFilm = (_id, history) => dispatch => {
  dispatch({ type: 'START_LOAD_FILM' })
  fetch(`/api/film/${_id}`, {
    method: 'delete',
    headers: {
      'content-type': 'application/json',
    }
  })
    .then(res => res.json())
    .then(data => {
      if (!data.error) setTimeout(() => {
        dispatch({ type: 'DELETE_FILM' })
        history.push('/')
        message.success('Success Delete!')
      }, 500)
      else {
        console.log(data)
        message.error('Error Delete!')
        dispatch({ type: 'FAILED_DELETE' })
      }
    })
    .catch(err => {
      console.log(err)
      message.error('Error Delete!')
      dispatch({ type: 'FAILED_DELETE' })
    })
}

export const openAdd = () => dispatch => {
  dispatch({ type: 'OPEN_ADD_START' })
  setTimeout(() => dispatch({ type: 'OPEN_ADD_END' }), 200)
}

//search
export const openFilm = () => ({ type: 'OPEN_FILM' })

export const getItemsAsync = searchValue => dispatch => {
  dispatch({ type: 'CHANGE_SEARCH_INPUT', payload: searchValue })
  fetch(`/api/film/search`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ name: searchValue })
  })
    .then(response => response.json())
    .then(result => {
      if (result.status) dispatch({ type: 'CHANGE_SEARCH_RESULT', payload: result.message })
      else {
        console.log(result)
        message.error('Search Error!')
      }
    })
    .catch(err => {
      console.log(err)
      message.error('Search Error!')
    })
}
//import
export const importData = data => dispatch => {
  dispatch({ type: 'IMPORT_START' })
  fetch(`/api/film/import`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ data: data })
  })
    .then(response => response.json())
    .then(result => {
      setTimeout(() => {
        if (result.status) {
          message.success('Import success!')
          dispatch({ type: 'IMPORT_END' })
        }
        else {
          console.log(result)
          message.error('Import Error!')
          dispatch({ type: 'IMPORT_END' })
        }
      }, 500)
    })
    .catch(err => {
      console.log(err)
      message.error('Import Error!')
      dispatch({ type: 'IMPORT_END' })
    })
}