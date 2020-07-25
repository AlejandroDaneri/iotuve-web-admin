export const generateStart = () => {
  const start = new Date()
  start.setDate(start.getDate() - 5)
  return start
}

export const generateEnd = () => {
  return new Date()
}

export const axisColor = '#bbb9b9'
export const generateLineConfig = (r, g, b, title, data) => {
  return {
    label: title,
    fill: false,
    lineTension: 0.1,
    backgroundColor: `rgba(${r},${g},${b},0.4)`,
    borderColor: `rgba(${r},${g},${b},1)`,
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: `rgba(${r},${g},${b},1)`,
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: `rgba(${r},${g},${b},1)`,
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: data
  }
}

export const generateBarConfig = (r, g, b, title, data) => {
  return {
    label: title,
    backgroundColor: `rgba(${r},${g},${b},0.4)`,
    borderColor: `rgba(${r},${g},${b},1)`,
    borderWidth: 1,
    hoverBackgroundColor: `rgba(${r},${g},${b},1)`,
    hoverBorderColor: 'rgba(220,220,220,1)',
    data: data
  }
}
export const barOptions = () => {
  return {
    legend: {
      display: true,
      labels: {
        fontColor: 'rgb(255,255,255)',
        fontSize: 13
      }
    },
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: axisColor,
            suggestedMin: 0
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: axisColor,
            fontSize: 13,
            suggestedMin: 0
          }
        }
      ]
    }
  }
}

export const DoughnutOptions = () => {
  return {
    legend: {
      display: true,
      labels: {
        fontColor: 'rgb(255,255,255)'
      }
    }
  }
}
