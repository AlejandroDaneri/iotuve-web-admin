import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getToken } from '../stateapi/auth'
import { getUser } from '../webapi'
import { useParams } from 'react-router-dom'

const User = () => {
  const token = useSelector(getToken)
  const { username } = useParams()

  const [user, changeUser] = useState({})

  const dispatch = useDispatch()

  useEffect(() => {
    getUser(token, username)
      .then(response => {
        const { data } = response
        console.error(data)
        changeUser(data)
      })
      .catch(_ => {
        dispatch({
          type: 'AUTH_LOGOUT'
        })
      })
  }, [token, dispatch])

  return <div>{user.username}</div>
}

export default User
