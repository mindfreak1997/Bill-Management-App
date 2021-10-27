export const decendingByName = (movies) => {
    movies.sort((a, b) => {
        if (a.name > b.name) {
            return 1
        } else if (a.name < b.name) {
            return -1
        }


    })
}

export const ascendingByName = (data) => {
    data.sort((a, b) => {
        if (a.name > b.name) {
            return -1
        } else if (a.name < b.name) {
            return 1
        }


    })
}

export const highToLow = (data) => {
    const result = data.sort((a, b) => a.price - b.price)
    return result
}

export const lowToHigh = (data) => {
    const result = data.sort((a, b) => b.price - a.price)
    return result
}

