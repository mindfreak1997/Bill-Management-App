import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import Chart from 'react-google-charts'
import SelectMonth from './selectMonth'


const MonthlyChart = ({ bills }) => {

    const [data, setData] = useState([])
    const [month, setMonth] = useState('01')

    useEffect(() => {
        getDate()

    }, [month])
    console.log('month', month)
    const getDate = () => {
        //to filter data based on the date
        const filterBills = bills.filter(ele => {
            return (ele.date.substr(5, 2) == month)
        })

        console.log('filterBills', filterBills)
        // to get uniq dates from the arrays
        const uniqDate = _.unionBy(filterBills, 'date')
        console.log('uniqDate', uniqDate)

        const chartData = [['x', 'No of sales']]

        //to create chart data


        uniqDate.forEach(ele => {
            const result = filterBills.filter(bill => {
                return bill.date.substr(8, 2) == ele.date.substr(8, 2)
            })
            chartData.push([ele.date.substr(8, 2), result.length])
            console.log('result', result)
        })
        setData(chartData)

    }

    const addMonth = (month) => {
        setMonth(month)
    }
    return (
        <div>
            <SelectMonth className='mt-7' addMonth={addMonth} getDate={getDate} />
            <Chart
                width={'600px'}
                height={'400px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={data}
                options={{
                    hAxis: {
                        title: 'Date',
                    },
                    vAxis: {
                        title: 'sales',
                    },
                }}
                rootProps={{ 'data-testid': '1' }}
            />

        </div>
    )
}

export default MonthlyChart
