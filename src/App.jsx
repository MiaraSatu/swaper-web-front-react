import { useState } from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { AuthContextProvider } from './hooks/useAuth'
import Root from './components/Root'

function App() {
  return <AuthContextProvider>
    <Root />
  </AuthContextProvider>
}

export default App
