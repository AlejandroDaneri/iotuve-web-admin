/* Import Libs */
import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import Button from '@material-ui/core/Button'
import 'react-datepicker/dist/react-datepicker.css'
import BeatLoader from 'react-spinners/BeatLoader'
import CircleLoader from 'react-spinners/CircleLoader'
import { Line } from 'react-chartjs-2'

/* Import WebApi */
import { getStatsDaily } from '../../webapi'

/* Import Constants */
import { COLOR_PRIMARY } from '../../constants'

/* Import Utils */
import { generateStart, generateEnd, generateLineConfig } from '../../utils'

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
    getStatsDaily(toString(startDate), toString(endDate))
      .then(response => {
        const { data } = response
        console.error(data.daily_stats)
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
      {loading ? (
        <CircleLoader color={COLOR_PRIMARY} size={250} />
      ) : (
        <>
          <div className='chart'>
            <h1>
              Request de: Usuarios | Admines | Sessiones | Recuperar Contraseña
            </h1>
            <Line
              data={{
                labels: data.map(d => d.date),
                datasets: [
                  generateLineConfig(
                    75,
                    192,
                    192,
                    'Requests Users',
                    data.map(d => d.requests_users)
                  ),
                  generateLineConfig(
                    255,
                    99,
                    132,
                    'Requests Users Admin',
                    data.map(d => d.requests_adminusers)
                  ),
                  generateLineConfig(
                    255,
                    255,
                    132,
                    'Requests Sessions',
                    data.map(d => d.requests_sessions)
                  ),
                  generateLineConfig(
                    0,
                    255,
                    0,
                    'Requests Recovery',
                    data.map(d => d.recovery_requests)
                  )
                ]
              }}
            />
          </div>

          <div className='chart'>
            <h1>Requests Total</h1>
            <Line
              data={{
                labels: data.map(d => d.date),
                datasets: [
                  generateLineConfig(
                    75,
                    192,
                    192,
                    'Requests Por Minuto',
                    data.map(d => d.requests_number)
                  )
                ]
              }}
            />
          </div>

          <div className='chart'>
            <h1>Request por Minuto</h1>
            <Line
              data={{
                labels: data.map(d => d.date),
                datasets: [
                  generateLineConfig(
                    75,
                    192,
                    192,
                    'Requests Por Minuto',
                    data.map(d => d.requests_per_minute)
                  )
                ]
              }}
            />
          </div>

          <div className='chart'>
            <h1>Tiempos de respuesta de las requests</h1>
            <Line
              data={{
                labels: data.map(d => d.date),
                datasets: [
                  generateLineConfig(
                    255,
                    0,
                    0,
                    'Tiempo Maximo',
                    data.map(d => d.response_time_max)
                  ),
                  generateLineConfig(
                    0,
                    255,
                    0,
                    'Tiempo Promedio',
                    data.map(d => d.response_time_avg)
                  ),
                  generateLineConfig(
                    0,
                    0,
                    255,
                    'Tiempo Minimo',
                    data.map(d => d.response_time_min)
                  )
                ]
              }}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default StatsPartial
