import './App.css'
import UserList from './components/UserList'
import { Route, Routes } from 'react-router'
import AddUser from './components/AddUser'
import EditUser from './components/EditUser'

function App() {
  return (
    <>
    <Routes>
      <Route path = "/" element = {<UserList/>}></Route>
      <Route path = "/add" element = {<AddUser/>}></Route>
      <Route path = "/edit/:id" element = {<EditUser/>}></Route>
    </Routes>
    </>
  )
}

export default App
