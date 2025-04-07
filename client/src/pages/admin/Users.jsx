import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState(null); // State for role filter

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/all-users`);
      
      if (Array.isArray(data.users)) {
        setUsers(data.users);  // Store all users initially
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.log("Error fetching users:", error);
      setUsers([]);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const filterUsersByRole = (role) => {
    setRoleFilter(role); // Set the selected role filter
  };

  // Filter users based on selected role
  const filteredUsers = roleFilter !== null ? users.filter(user => user.role === roleFilter) : [];

  return (
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="mb-4">All Users</h1>
          
          {/* Buttons to filter users */}
          <div className="mb-3">
            <button className="btn btn-primary mx-2" onClick={() => filterUsersByRole(1)}>Admin</button>
            <button className="btn btn-secondary mx-2" onClick={() => filterUsersByRole(0)}>Users</button>
          </div>

          <div className="row">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div className="col-md-4 mb-3" key={user._id}>
                  <div className="card shadow-sm p-3">
                    <div className="card-body">
                      <h5 className="card-title text-center">{user.name}</h5>
                      <p className="card-text"><strong>Phone:</strong> {user.phone}</p>
                      <p className="card-text"><strong>Role:</strong> {user.role === 1 ? 'Admin' : 'User'}</p>
                      <p className="card-text"><strong>Email:</strong> {user.email}</p>
                      <p className="card-text"><strong>Address:</strong> {user.address}</p>
                      <p className="card-text"><strong>Joined on:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h3 className="text-warning">Click On Button To Show The Users</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
