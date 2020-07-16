/* Import Libs */
import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import Button from '@material-ui/core/Button'
import 'react-datepicker/dist/react-datepicker.css'
import BeatLoader from 'react-spinners/BeatLoader'
import { Line } from 'react-chartjs-2'

/* Import WebApi */
import { getStats } from '../../webapi'

/* Import Constants */
import { COLOR_PRIMARY } from '../../constants'

/* Import Utils */
import { generateStart, generateEnd } from '../../utils'

const StatsPartial = () => {
  const [startDate, changeStartDate] = useState(generateStart())
  const [endDate, changeEndDate] = useState(generateEnd())
  const [data, changeData] = useState([])
  const [loading, changeLoading] = useState(false)

  const toString = date => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }

  const doGetStats = () => {
    changeLoading(true)
    getStats(toString(startDate), toString(endDate))
      .then(response => {
        const { data } = response
        changeData(data.daily_stats)
        console.error(data.daily_stats)
        changeLoading(false)
      })
      .catch(_ => {
        console.error('Get Stats Error')
        changeLoading(false)
      })
  }

  useEffect(() => {
    doGetStats()
  }, []) //eslint-disable-line

  return (
    <div className='partial'>
      <div className='time-range'>
        <div className='date'>
          <h4>Comienzo</h4>
          <DatePicker
            selected={startDate}
            onChange={changeStartDate}
            showTimeSelect
            dateFormat='yyyy/MM/dd HH:mm'
            timeFormat='HH:mm'
            timeIntervals={15}
            timeCaption='Time'
          />
        </div>

        <div className='date'>
          <h4>Final</h4>
          <DatePicker
            selected={endDate}
            onChange={changeEndDate}
            showTimeSelect
            dateFormat='yyyy/MM/dd HH:mm'
            timeFormat='HH:mm'
            timeIntervals={15}
            timeCaption='Time'
          />
        </div>

        {loading ? (
          <BeatLoader color={COLOR_PRIMARY} />
        ) : (
          <Button
            variant='contained'
            style={{ backgroundColor: COLOR_PRIMARY }}
            onClick={doGetStats}
          >
            Obtener
          </Button>
        )}
      </div>
      <div className='chart'>
        <Line
          data={{
            labels: data.map(d => d.date),
            datasets: [
              {
                label: 'Requests Users',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: data.map(d => d.requests_users)
              },
              {
                label: 'Requests Users Admin',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(255,99,132,0.4)',
                borderColor: 'rgba(255,99,132,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(255,99,132,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(255,99,132,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: data.map(d => d.requests_adminusers)
              }
            ]
          }}
        />
      </div>
    </div>
  )
}

export default StatsPartial
