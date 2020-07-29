/* Import Libs */
import React, { useState, useEffect } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import Button from '@material-ui/core/Button'
import 'react-datepicker/dist/react-datepicker.css'
import BeatLoader from 'react-spinners/BeatLoader'
import CircleLoader from 'react-spinners/CircleLoader'
import { Line } from 'react-chartjs-2'
import { es } from 'date-fns/esm/locale'

/* Import Styled Components */
import { StatWrapper } from '../../styles/StatStyled'

/* Import WebApi */
import { getStatsDaily } from '../../webapi'

/* Import Constants */
import { COLOR_PRIMARY } from '../../constants'

/* Import Utils */
import {
  generateStart,
  generateEnd,
  generateLineConfig,
  barOptions
} from '../../utils'

const StatsPartial = () => {
  registerLocale('es', es)
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
        changeLoading(false)
      })
  }

  useEffect(() => {
    doGetStats()
  }, []) //eslint-disable-line

  return (
    <StatWrapper>
      <h1>Estadísticas por día</h1>
      <div className='time-range'>
        <div className='date'>
          <h4>Comienzo</h4>
          <DatePicker
            selected={startDate}
            onChange={changeStartDate}
            dateFormat='dd/MM/yyyy'
            locale='es'
          />
        </div>

        <div className='date'>
          <h4>Final</h4>
          <DatePicker
            selected={endDate}
            onChange={changeEndDate}
            dateFormat='dd/MM/yyyy'
            locale='es'
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
            <h2>Requests recibidas</h2>
            <Line
              data={{
                labels: data.map(d => d.date),
                datasets: [
                  generateLineConfig(
                    75,
                    192,
                    192,
                    'Requests usuarios',
                    data.map(d => d.requests_users)
                  ),
                  generateLineConfig(
                    255,
                    99,
                    132,
                    'Requests administradores',
                    data.map(d => d.requests_adminusers)
                  ),
                  generateLineConfig(
                    255,
                    255,
                    132,
                    'Requests sesiones',
                    data.map(d => d.requests_sessions)
                  ),
                  generateLineConfig(
                    0,
                    255,
                    0,
                    'Requests recuperar contraseña',
                    data.map(d => d.requests_recovery)
                  )
                ]
              }}
              options={barOptions()}
            />
          </div>

          <div className='chart'>
            <h2>Requests totales</h2>
            <Line
              data={{
                labels: data.map(d => d.date),
                datasets: [
                  generateLineConfig(
                    75,
                    192,
                    192,
                    'Requests',
                    data.map(d => d.requests_number)
                  )
                ]
              }}
              options={barOptions()}
            />
          </div>

          <div className='chart'>
            <h2>Request promedio por minuto</h2>
            <Line
              data={{
                labels: data.map(d => d.date),
                datasets: [
                  generateLineConfig(
                    75,
                    192,
                    192,
                    'Requests',
                    data.map(d => d.requests_per_minute)
                  )
                ]
              }}
              options={barOptions()}
            />
          </div>

          <div className='chart'>
            <h2>Tiempo de respuesta en las requests</h2>
            <Line
              data={{
                labels: data.map(d => d.date),
                datasets: [
                  generateLineConfig(
                    255,
                    0,
                    0,
                    'Tiempo máximo',
                    data.map(d => d.response_time_max)
                  ),
                  generateLineConfig(
                    0,
                    255,
                    0,
                    'Tiempo promedio',
                    data.map(d => d.response_time_avg)
                  ),
                  generateLineConfig(
                    0,
                    0,
                    255,
                    'Tiempo mínimo',
                    data.map(d => d.response_time_min)
                  )
                ]
              }}
              options={barOptions()}
            />
          </div>

          <div className='chart'>
            <h2>Actividad en las cuentas</h2>
            <Line
              data={{
                labels: data.map(d => d.date),
                datasets: [
                  generateLineConfig(
                    0,
                    0,
                    255,
                    'Usuarios nuevos',
                    data.map(d => d.users_new)
                  ),
                  generateLineConfig(
                    0,
                    255,
                    0,
                    'Usuarios borrados',
                    data.map(d => d.users_deleted)
                  ),
                  generateLineConfig(
                    255,
                    0,
                    0,
                    'Recuperaciones de contraseña',
                    data.map(d => d.recovery_requests)
                  )
                ]
              }}
              options={barOptions()}
            />
          </div>

          <div className='chart'>
            <h2>Actividad de los usuarios</h2>
            <Line
              data={{
                labels: data.map(d => d.date),
                datasets: [
                  generateLineConfig(
                    0,
                    0,
                    255,
                    'Sesiones abiertas',
                    data.map(d => d.sessions_opened)
                  ),
                  generateLineConfig(
                    0,
                    255,
                    0,
                    'Sesiones cerradas',
                    data.map(d => d.sessions_closed)
                  )
                ]
              }}
              options={barOptions()}
            />
          </div>

          <div className='chart'>
            <h2>Errores en las requests</h2>
            <Line
              data={{
                labels: data.map(d => d.date),
                datasets: [
                  generateLineConfig(
                    255,
                    0,
                    0,
                    '400: Bad request',
                    data.map(d => d.requests_error_400)
                  ),
                  generateLineConfig(
                    0,
                    255,
                    0,
                    '401: Unauthorized',
                    data.map(d => d.requests_error_401)
                  ),
                  generateLineConfig(
                    0,
                    0,
                    255,
                    '404: Not Found',
                    data.map(d => d.requests_error_404)
                  ),
                  generateLineConfig(
                    255,
                    255,
                    255,
                    '405: Method Not Allowed ',
                    data.map(d => d.requests_error_405)
                  ),
                  generateLineConfig(
                    100,
                    100,
                    20,
                    '500: Internal Server Error',
                    data.map(d => d.requests_error_500)
                  )
                ]
              }}
              options={barOptions()}
            />
          </div>
        </>
      )}
    </StatWrapper>
  )
}

export default StatsPartial
