import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getToken } from '../stateapi/auth'
import { getUsersAdmin } from '../webapi'

const AdminUsers = () => {
  const token = useSelector(getToken)

  useEffect(() => {
    getUsersAdmin(token)
      .then(response => {
        const { data } = response
        console.error(data)
      })
      .catch(_ => {
        console.error('Users Admin Get Error')
      })
  }, [token])

  return (
    <div>
      <h2>Usuarios Admin</h2>
    </div>
  )
}

export default AdminUsers
