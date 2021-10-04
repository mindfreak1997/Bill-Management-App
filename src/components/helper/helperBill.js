

export const selectCustomer = (customers) => {
    const result = []
    customers.forEach(ele => {
        result.push({ label: ele.name, value: ele.name })
    })
    return result
}