export const initialState = {
    films: {
        list: [],
        count: 0,
        page: 1,
        sort_field: 'name',
        sort_direction: 'asc',
        load: false,
    },
    film: {
        data: {
            name: '',
            release: '',
            format: '',
            actors: []
        },
        load: false,
    },
    search: {
        value: '',
        result: []
    },
    import: {
        load: false,
        result: false,
    }
}

export function reduser(state = initialState, action) {
    switch (action.type) {
        //films
        case 'START_LOAD_FILMS':
            return { ...state, films: { ...state.films, load: true, page: action.payload.page, sort_field: action.payload.sort_field, sort_direction: action.payload.sort_direction } }
        case 'FAILED_LOAD_FILMS':
            return { ...state, films: { ...state.films, load: false } }
        case 'SUCCESS_LOAD_FILMS':
            return { ...state, films: { ...state.films, load: false, list: action.payload.list, count: action.payload.count } }
        //film
        case 'START_LOAD_FILM':
            return {
                ...state, film: {
                    ...state.film, load: true,
                    name: '',
                    release: '',
                    format: '',
                    actors: []
                }
            }
        case 'FAILED_LOAD_FILM':
            return { ...state, film: { ...state.film, load: false } }
        case 'SUCCESS_LOAD_FILM':
            return { ...state, film: { ...state.film, load: false, data: action.payload } }
        case 'CHANGE_NAME':
            return { ...state, film: { ...state.film, data: { ...state.film.data, name: action.payload } } }
        case 'CHANGE_DATE':
            return { ...state, film: { ...state.film, data: { ...state.film.data, release: action.payload } } }
        case 'CHANGE_FORMAT':
            return { ...state, film: { ...state.film, data: { ...state.film.data, format: action.payload } } }
        case 'CHANGE_TAG':
            return { ...state, film: { ...state.film, data: { ...state.film.data, actors: action.payload } } }
        case 'FAILED_CREATE':
            return { ...state, film: { ...state.film, load: false } }
        case 'FAILED_DELETE':
            return { ...state, film: { ...state.film, load: false } }
        case 'FAILED_UPDATE':
            return { ...state, film: { ...state.film, load: false } }
        //add
        case 'OPEN_ADD_START':
            return {
                ...state, film: {
                    ...state.film, load: true, data: {
                        name: '',
                        release: '',
                        format: '',
                        actors: []
                    }
                }
            }
        case 'OPEN_ADD_END':
            return {
                ...state, film: {
                    ...state.film, load: false, data: {
                        name: '',
                        release: '',
                        format: '',
                        actors: []
                    }
                }
            }
        //search
        case 'CHANGE_SEARCH_INPUT':
            return { ...state, search: { ...state.search, value: action.payload } }
        case 'OPEN_FILM':
            return { ...state, search: { ...state.search, value: '', result: [] } }
        case 'CHANGE_SEARCH_RESULT':
            return { ...state, search: { ...state.search, result: action.payload } }
        //import=
        case 'IMPORT_START':
            return { ...state, import: { load: true, result: false, } }
        case 'IMPORT_RESET':
            return { ...state, import: { load: false, result: false, } }
        case 'IMPORT_FAILED':
            return { ...state, import: { load: false, result: false, } }
        case 'IMPORT_SUCCESS':
            return { ...state, import: { load: false, result: true, } }
        default:
            return state
    }
}