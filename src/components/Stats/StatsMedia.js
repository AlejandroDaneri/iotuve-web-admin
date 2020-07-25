/* Import Libs */
import React, { useState, useEffect } from 'react'
import { registerLocale } from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import CircleLoader from 'react-spinners/CircleLoader'
import { Doughnut, HorizontalBar } from 'react-chartjs-2'
import { es } from 'date-fns/esm/locale'

/* Import Styled Components */
import { StatWrapper } from '../../styles/StatStyled'

/* Import WebApi */
import { getMediaStats } from '../../webapi'

/* Import Constants */
import { COLOR_PRIMARY } from '../../constants'

/* Import Utils */
import { generateBarConfig, barOptions, DoughnutOptions } from '../../utils'

const StatsPartial = () => {
  registerLocale('es', es)
  const [data, changeData] = useState([])
  const [loading, changeLoading] = useState(true)

  const doGetStats = () => {
    changeLoading(true)
    getMediaStats()
      .then(response => {
        const { data } = response
        changeData(data)
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
    <StatWrapper>
      {loading ? (
        <CircleLoader color={COLOR_PRIMARY} size={250} />
      ) : (
        <>
          <h2> Videos, comentarios y likes</h2>
          <div className='chart'>
            <h2>Videos más vistos</h2>
            <HorizontalBar
              data={{
                labels: data.most_viewed.map(x => x.title),
                datasets: [
                  generateBarConfig(
                    75,
                    192,
                    192,
                    'Cantidad',
                    data.most_viewed.map(x => x.count_views)
                  )
                ]
              }}
              options={barOptions()}
            />
          </div>
          <div className='chart'>
            <h2>Usuarios más activos (vistas)</h2>
            <HorizontalBar
              data={{
                labels: data.top_active_users.map(x => x._id),
                datasets: [
                  generateBarConfig(
                    230,
                    92,
                    0,
                    'Cantidad',
                    data.top_active_users.map(x => x.count)
                  )
                ]
              }}
              options={barOptions()}
            />
          </div>
          <div className='chart'>
            <h2>Usuarios más activos (comentarios)</h2>
            <HorizontalBar
              data={{
                labels: data.top_writer_users.map(x => x._id),
                datasets: [
                  generateBarConfig(
                    0,
                    255,
                    128,
                    'Cantidad',
                    data.top_writer_users.map(x => x.count)
                  )
                ]
              }}
              options={barOptions()}
            />
          </div>
          <div className='chart'>
            <h2>Videos con mas reacciones positivas</h2>
            <HorizontalBar
              data={{
                labels: data.top_likes.map(x => x.title),
                datasets: [
                  generateBarConfig(
                    71,
                    209,
                    71,
                    'Cantidad',
                    data.top_likes.map(x => x.count_likes)
                  )
                ]
              }}
              options={barOptions()}
            />
          </div>
          <div className='chart'>
            <h2>Videos con mas reacciones negativas</h2>
            <HorizontalBar
              data={{
                labels: data.top_dislikes.map(x => x.title),
                datasets: [
                  generateBarConfig(
                    255,
                    51,
                    51,
                    'Cantidad',
                    data.top_dislikes.map(x => x.count_dislikes)
                  )
                ]
              }}
              options={barOptions()}
            />
          </div>
          <div className='chart'>
            <h2>Usuarios que dieron mas dislikes</h2>
            <HorizontalBar
              data={{
                labels: data.top_disliker.map(x => x._id),
                datasets: [
                  generateBarConfig(
                    122,
                    122,
                    82,
                    'Cantidad',
                    data.top_disliker.map(x => x.count)
                  )
                ]
              }}
              options={barOptions()}
            />
          </div>
          <div className='chart'>
            <h2>Usuarios que dieron mas likes</h2>
            <HorizontalBar
              data={{
                labels: data.top_liker.map(x => x._id),
                datasets: [
                  generateBarConfig(
                    75,
                    192,
                    192,
                    'Cantidad',
                    data.top_liker.map(x => x.count)
                  )
                ]
              }}
              options={barOptions()}
            />
          </div>
          <div className='chart'>
            <h2>Estado de las solicitudes de amistad</h2>
            <Doughnut
              data={{
                labels: ['Aprobadas', 'Pendientes'],
                datasets: [
                  {
                    data: [data.approved_friends, data.pending_friends],
                    backgroundColor: ['#42eb36', '#FF6384'],
                    hoverBackgroundColor: ['#42eb36', '#FF6384'],
                    borderWidth: 0
                  }
                ]
              }}
              options={DoughnutOptions()}
            />
          </div>
          <div className='chart'>
            <h2>Distribución de visibilidad en los videos</h2>
            <Doughnut
              data={{
                labels: ['Publico', 'Privado'],
                datasets: [
                  {
                    data: data.visibility.map(x => x.count),
                    backgroundColor: ['#dcdee0', '#685c5c'],
                    hoverBackgroundColor: ['#dcdee0', '#685c5c'],
                    borderWidth: 0
                  }
                ]
              }}
              options={DoughnutOptions()}
            />
          </div>
        </>
      )}
    </StatWrapper>
  )
}

export default StatsPartial
