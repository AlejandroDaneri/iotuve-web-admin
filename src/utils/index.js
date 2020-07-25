export const generateStart = () => {
  const start = new Date()
  start.setDate(start.getDate() - 5)
  return start
}

export const generateEnd = () => {
  const end = new Date()
  return end
}

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
