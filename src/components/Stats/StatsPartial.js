/* Import Libs */
import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import Button from '@material-ui/core/Button'
import 'react-datepicker/dist/react-datepicker.css'

/* Import WebApi */
import { getStats } from '../../webapi'

/* Import Constants */
import { COLOR_PRIMARY } from '../../constants'

/* Import Utils */
import { generateStart, generateEnd } from '../../utils'

const StatsPartial = () => {
  const [startDate, changeStartDate] = useState(generateStart())
  const [endDate, changeEndDate] = useState(generateEnd())

  const toString = date => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }

  const doGetStats = () => {
    getStats(toString(startDate), toString(endDate))
      .then(response => {
        const { data } = response
        console.error(data)
      })
      .catch(_ => {
        console.error('Get Stats Error')
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

        <Button
          variant='contained'
          style={{ backgroundColor: COLOR_PRIMARY }}
          onClick={doGetStats}
        >
          Obtener
        </Button>
      </div>
    </div>
  )
}

export default StatsPartial
