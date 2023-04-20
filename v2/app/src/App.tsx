import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export interface IUser {
  id?: string;
  name: string;
  age: number;
}

const StyleWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  margin: 0 5px;
  background-color: #f0f0f0f;
`;

const Table = styled.table`
  margin: 0 5px;
  background-color: #f0f0f0f;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 16px;
`;

const Button = styled.button`
  padding: 8px;
  background-color: #007bff;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
`;



const App = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const UserForm = () => {
    return (
      <Form>
        <label>
          User ID:
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </label>
        <br />
        <label>
          Name:
          <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
        </label>
        <br />
        <label>
          Age:
          <input type="text" value={userAge} onChange={(e) => setUserAge(e.target.value)} />
        </label>
        <br />
        <button onClick={fetchUser}>Fetch User</button>
        <button onClick={updateUser}>Update User</button>
        <button onClick={deleteUser}>Delete User</button>
        <button onClick={createUser}>Create User</button>
        <p>{message}</p>
      </Form>
    )
  }
  const UserTable = () => {
    return (
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: IUser) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }

  // Create User
  const createUser = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: userId, name: userName, age: userAge })
      });
      if (response.ok) {
        setMessage('User created successfully');
      } else {
        const error = await response.json();
        setMessage(error.error);
      }
    } catch (error) {
      setMessage('Failed to create user');
    }
  };

  // Fetch User by UserId
  const fetchUser = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/${userId}`);
      if (response.ok) {
        const user = await response.json();
        setUserName(user.name);
        setUserAge(user.age);
        setMessage('');
      } else {
        const error = await response.json();
        setMessage(error.error);
      }
    } catch (error) {
      setMessage('Failed to fetch user');
    }
  };

  // Fetch All Users
  const fetchAllUsers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/users`);
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setUsers([]);
    }
  };

  // Update User by UserId
  const updateUser = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: userName, age: userAge })
      });
      if (response.ok) {
        setMessage('User updated successfully');
      } else {
        const error = await response.json();
        setMessage(error.error);
      }
    } catch (error) {
      setMessage('Failed to update user');
    }
  };

  // Delete User by UserId
  const deleteUser = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/users/${userId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setMessage('User deleted successfully');
      } else {
        const error = await response.json();
        setMessage(error.error);
      }
    } catch (error) {
      setMessage('Failed to delete user');
    }
  };

  return (
    <StyleWrapper>
      <h1>Users</h1>
      <UserForm />
      <UserTable />
    </StyleWrapper>
  );
};

export default App;