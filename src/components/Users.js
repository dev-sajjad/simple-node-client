import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAddUser = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
      const email = event.target.email.value;
      event.target.reset();

      const user = { name, email };
      

    // send to server - post
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
          console.log("Success:", data);
          const newUser = [...users, data]
          setUsers(newUser);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" placeholder="Name" />
        <br />
        <input type="email" name="email" id="" placeholder="Email" />
        <br />
        <button type="submit">Add User</button>
      </form>

      <h2>Users: {users.length}</h2>
      {users.map((user) => (
        <p key={user.id}>
          {user.name} {user.email}
        </p>
      ))}
    </div>
  );
};

export default Users;
