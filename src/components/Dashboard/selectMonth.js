import React, { useState } from 'react'

const SelectMonth = ({ addMonth, getDate }) => {
    const [select, setSelect] = useState('')
    const handleChange = (e) => {
        setSelect(e.target.value)
        addMonth(e.target.value)

    }
    return (
        <div>
            <select value={select} onChange={handleChange}>
                <option value='01'>Jan</option>
                <option value='02'>Feb</option>
                <option value='03'>Mar</option>
                <option value='04'>Apr</option>
                <option value='05'>May</option>
                <option value='06'>Jun</option>
                <option value='07'>Jul</option>
                <option value='08'>Aug</option>
                <option value='09'>Sep</option>
                <option value='10'>Oct</option>
                <option value='11'>Nov</option>
                <option value='12'>Dec</option>
            </select>
        </div>
    )
}

export default SelectMonth
