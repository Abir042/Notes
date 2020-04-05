const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

const setFilters = (update) => {
    if (typeof update.searchText === 'string') {
        filters.searchText = update.searchText
    }

    if (typeof update.sortBy === 'string') {
        filters.sortBy === update.sortBy
    }
}

const getFilters = () => filters

export {
    getFilters,
    setFilters
} 