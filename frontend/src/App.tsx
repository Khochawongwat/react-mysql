import './App.css'
import UserList from './components/UserList'
import { Route, Routes } from 'react-router'
import AddUser from './components/AddUser'

function App() {
  return (
    <>
    <Routes>
      <Route path = "/" element = {<UserList/>}></Route>
      <Route path = "/add" element = {<AddUser/>}></Route>
    </Routes>
    </>
  )
}

export default App
