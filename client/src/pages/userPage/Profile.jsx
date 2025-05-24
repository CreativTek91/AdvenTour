import React from 'react'
import { useAuthStore } from '../../store/authStore'

function Profile() {
    const {user}=useAuthStore()
  return (
    <div>
      <section>
        <h1>Name: {user.name}</h1>
        <p>Email: {user.email}</p>
      
      </section>
    </div>
  )
}

export default Profile
