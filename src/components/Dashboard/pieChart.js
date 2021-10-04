import React, { useState, useEffect } from 'react'
import Chart from 'react-google-charts'


const PieChart = ({ bills }) => {

    const [data, setData] = useState([])

    useEffect(() => {
        getRevenue()

    }, [])
    // to get uniq dates from the arrays
    const allMonth = [
        {
            month: 'Jan',
            num: '01'
        },
        {
            month: 'Feb',
            num: '02'
        },
        {
            month: 'Mar',
            num: '03'
        },
        {
            month: 'Apr',
            num: '04'
        },
        {
            month: 'May',
            num: '05'
        }
    ]


    //to create chart data
    const getRevenue = () => {
        const chartData = [['month', 'revenue per month']]
        allMonth.forEach(ele => {
            const result = bills.filter(bill => {
                return bill.date.substr(5, 2) == ele.num
            })

            const revenue = result.reduce((a, b) => {
                return a + b.total
            }, 0)
            chartData.push([ele.month, revenue])

        })
        setData(chartData)

    }

    return (
        <div className='col-md-6'>
            <h5 className='my-8 font-weight-bold-display-4 pb-5 text-centre'>Monthly revenue chart</h5>
            <Chart
                width={'600px'}
                height={'400px'}
                chartType="PieChart"
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

export default PieChart
