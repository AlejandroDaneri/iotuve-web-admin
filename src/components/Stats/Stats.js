/* Import Libs */
import React from 'react'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

/* Import Styled Components */
import { StatsWrapper } from '../../styles/StatsStyled'

/* Import Constats */
import { COLOR_PRIMARY } from '../../constants'

const Stats = () => {
  return (
    <StatsWrapper>
      <h2>Estadisticas</h2>
      <div className='stats'>
        <Link to='/stats_total'>
          <Button
            variant='contained'
            style={{ backgroundColor: COLOR_PRIMARY }}
          >
            Totales
          </Button>
        </Link>
        <Link to='/stats_daily'>
          <Button
            variant='contained'
            style={{ backgroundColor: COLOR_PRIMARY }}
          >
            Por Rango de Tiempo
          </Button>
        </Link>
      </div>
    </StatsWrapper>
  )
}

export default Stats
