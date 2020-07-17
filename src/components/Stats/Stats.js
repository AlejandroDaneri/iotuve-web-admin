/* Import Libs */
import React from 'react'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { Pie, Line } from 'react-chartjs-2'

/* Import Styled Components */
import { StatsWrapper } from '../../styles/StatsStyled'

/* Import Constats */
import { COLOR_PRIMARY } from '../../constants'

/* Import Utils */
import { generateLineConfig } from '../../utils'

const Stats = () => {
  return (
    <StatsWrapper>
      <h2>Estadisticas</h2>
      <div className='options'>
        <div className='option'>
          <div className='picture'>
            <Pie
              data={{
                datasets: [
                  {
                    data: [40, 60],
                    backgroundColor: ['#36A2EB', '#FF6384'],
                    hoverBackgroundColor: ['#36A2EB', '#FF6384']
                  }
                ]
              }}
            />
          </div>
          <Link to='/stats_total'>
            <Button
              variant='contained'
              style={{ backgroundColor: COLOR_PRIMARY }}
            >
              Totales
            </Button>
          </Link>
        </div>
        <div className='option'>
          <div className='picture'>
            <Line
              data={{
                labels: ['1,2,3'],
                datasets: [
                  generateLineConfig(75, 192, 192, '', [20, 30, 40]),
                  generateLineConfig(255, 99, 132, '', [10, 40, 40])
                ]
              }}
            />
          </div>
          <Link to='/stats_daily'>
            <Button
              variant='contained'
              style={{ backgroundColor: COLOR_PRIMARY }}
            >
              Por Rango de Tiempo
            </Button>
          </Link>
        </div>
      </div>
    </StatsWrapper>
  )
}

export default Stats
