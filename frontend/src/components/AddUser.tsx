import axios from "axios"
import { useState } from "react"

const AddUser = () =>{
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")

    const handleAddItem = () => {
        axios
        .post("http://localhost:8081/add_user", {
            name, phone, email
        })
        .then((response) =>{
            setName("")
            setPhone("")
            setEmail("")

            console.log("reponse: " +  response.data);
        })
    }

    return (
        <div className="container m-3">
            <h2>Add User</h2>
            <label className="form-label">Enter name:</label>
            <input
                className="form-control"
                type="text"
                placeholder="Name"
                value = {name}
                onChange={(e) => setName(e.target.value)}
            />
            <label className="form-label">Enter phone:</label>
            <input
                className="form-control"
                type="text"
                placeholder="Phone"
                value = {phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <label className="form-label">Enter email:</label>
            <input
                className="form-control"
                type="text"
                placeholder="email"
                value = {email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br/>
            <button className="btn btn-primary" onClick={handleAddItem}>
                Add User
            </button>
        </div>
    )
}

export default  AddUser