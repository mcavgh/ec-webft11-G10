import React from 'react'
import axios from 'axios'

export const AdminUser = () => {
    const handleSubmit = () => {
        var product={
            name: "Martin",
            surname: "tincho",
            email: "email@mail.com",
            password: "sadfsdfdf",
            access: "Admin"
        }

        axios.post("/users/register/",product).then((res) => { console.log(res)}).catch(err => { console.log(err) })
   
    }
    
    


    return (
        <div>
            <form onSubmit={handleSubmit}>

                <button >crear usuario</button>
            </form>

        </div>
    )
}