import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const UserList = () => {
  const [data, setData] = useState<[]>([])
  
  useEffect(() => {
    fetch("http://localhost:8081/users")
      .then((res) => {
        if (!res.ok) {
          console.error(Error(res.statusText))
          throw Error(res.statusText)
        }
        return res.json()
      })
      .then((data) => {
        if(data){
          setData(data)
        }
      })
      .catch((err) => {
        console.error(err)
        throw Error(err)
      })
  }, [])

  function handleDeleteItem(id: String){
    axios
    .delete(`http://localhost:8081/users/${id}`)
    .then((res) => {
      console.log(res)
      window.location.reload()
    }).catch((err)=>{
      console.error(err)
    })
  }

  return (
    <div className='container mt-3'>
      <div className='row'>
        <div className='col-sm-12'>
          <h1>React MYSQL Connection</h1>
          <Link className = "btn btn-success btn-sm mb-3" to = "/add">
          <FontAwesomeIcon icon={faPlus} className="me-2" />

            Add User
          </Link>
          <table className='table table-hover table-bordered'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data, i) => (
                <tr key={i}>
                  <td>{data['id']}</td>
                  <td>{data['name']}</td>
                  <td>{data['phone']}</td>
                  <td>{data['email']}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={()=>handleDeleteItem(data['id'])}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                      Delete
                    </button>
                  <Link
                  className="btn btn-warning btn-sm"
                  to = {`/edit/${data['id']}`}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  Edit
                  </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UserList