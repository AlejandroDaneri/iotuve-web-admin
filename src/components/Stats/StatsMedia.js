/* Import Libs */
import React, { useState, useEffect } from 'react'
import { registerLocale } from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import CircleLoader from 'react-spinners/CircleLoader'
import { HorizontalBar, Pie } from 'react-chartjs-2'
import { es } from 'date-fns/esm/locale'

/* Import Styled Components */
import { StatWrapper } from '../../styles/StatStyled'

/* Import WebApi */
import { getMediaStats } from '../../webapi'

/* Import Constants */
import { COLOR_PRIMARY } from '../../constants'

/* Import Utils */
import { generateBarConfig } from '../../utils'

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
          <div className='chart'>
            <h2>Top 10 videos más vistos</h2>
            <HorizontalBar
              data={{
                labels: data.most_viewed.map(x => x.title),
                datasets: [
                  generateBarConfig(
                    75,
                    192,
                    192,
                    'cantidad',
                    data.most_viewed.map(x => x.count_views)
                  )
                ]
              }}
            />
          </div>
          <div className='chart'>
            <h2>Top 10 usuarios más activos (vistas)</h2>
            <HorizontalBar
              data={{
                labels: data.top_active_users.map(x => x._id),
                datasets: [
                  generateBarConfig(
                    75,
                    192,
                    192,
                    'cantidad',
                    data.top_active_users.map(x => x.count)
                  )
                ]
              }}
            />
          </div>
          <div className='chart'>
            <h2>Top 10 usuarios más activos (comentarios)</h2>
            <HorizontalBar
              data={{
                labels: data.top_writer_users.map(x => x._id),
                datasets: [
                  generateBarConfig(
                    75,
                    192,
                    192,
                    'cantidad',
                    data.top_writer_users.map(x => x.count)
                  )
                ]
              }}
            />
          </div>
          <div className='chart'>
            <h2>Top 10 videos con mas reacciones positivas</h2>
            <HorizontalBar
              data={{
                labels: data.top_likes.map(x => x.title),
                datasets: [
                  generateBarConfig(
                    75,
                    192,
                    192,
                    'cantidad',
                    data.top_likes.map(x => x.count_likes)
                  )
                ]
              }}
            />
          </div>
          <div className='chart'>
            <h2>Top 10 videos con mas reacciones negativas</h2>
            <HorizontalBar
              data={{
                labels: data.top_dislikes.map(x => x.title),
                datasets: [
                  generateBarConfig(
                    75,
                    192,
                    192,
                    'cantidad',
                    data.top_dislikes.map(x => x.count_dislikes)
                  )
                ]
              }}
            />
          </div>
          <div className='chart'>
            <h2>Top 10 usuarios que dieron mas dislikes</h2>
            <HorizontalBar
              data={{
                labels: data.top_disliker.map(x => x._id),
                datasets: [
                  generateBarConfig(
                    75,
                    192,
                    192,
                    'cantidad',
                    data.top_disliker.map(x => x.count)
                  )
                ]
              }}
            />
          </div>
          <div className='chart'>
            <h2>Top 10 usuarios que dieron mas likes</h2>
            <HorizontalBar
              data={{
                labels: data.top_liker.map(x => x._id),
                datasets: [
                  generateBarConfig(
                    75,
                    192,
                    192,
                    'cantidad',
                    data.top_liker.map(x => x.count)
                  )
                ]
              }}
            />
          </div>
          <div className='chart'>
            <h2>Cantidad de solicitudes de amistad</h2>
            <Pie
              data={{
                labels: ['Aprobadas', 'Pendientes'],
                datasets: [
                  {
                    data: [data.approved_friends, data.pending_friends],
                    backgroundColor: ['#36A2EB', '#FF6384'],
                    hoverBackgroundColor: ['#36A2EB', '#FF6384']
                  }
                ]
              }}
            />
          </div>
          <div className='chart'>
            <h2>Distribucion de visibilidad en los videos</h2>
            <Pie
              data={{
                labels: ['Publico', 'Privado'],
                datasets: [
                  {
                    data: data.visibility.map(x => x.count),
                    backgroundColor: ['#36A2EB', '#FF6384'],
                    hoverBackgroundColor: ['#36A2EB', '#FF6384']
                  }
                ]
              }}
            />
          </div>
        </>
      )}
    </StatWrapper>
  )
}

export default StatsPartial
