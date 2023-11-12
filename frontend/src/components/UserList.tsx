import React from "react"
import { useEffect, useState } from "react"

const UserList = () =>{
    const [data, setData] = useState([])
    
    useEffect(()=>{
        fetch("http://localhost:8081/users")
        .then((res) => res.json())
        .then((data) => setData(data))
        .then((err) => console.log(err))
    }, [])

    return(
        <div className='container mt-3'>
        <div className='row'>
          <div className='col-sm-12'>
            <h1>React MYSQL Connection</h1>
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
                  <tr key = {i}>
                    <td>{data['id']}</td>
                    <td>{data['name']}</td>
                    <td>{data['phone']}</td>
                    <td>{data['category']}</td>
                    <td>{data['email']}</td>
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