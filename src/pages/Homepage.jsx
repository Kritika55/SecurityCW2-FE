//Rafce ley auto format garchaa 
import React, {useEffect} from 'react'
import { testApi } from '../api/Api'

const Homepage = () => {
  //Auto run when page loads 
  useEffect(()=> {
    testApi().then((res) => {
      console.log(res.data)
    })
  })
  return (
    <div>
      <h1>Home Page from page folder</h1>
    </div>
  )
}

export default Homepage
