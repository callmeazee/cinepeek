import { useEffect, useState } from "react";
import api from "../../services/api";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchMovies();
  }, []);

  const fetchUsers = async () => {
    const res = await api.get("/admin/users");

    setUsers(res.data);
  };

  const fetchMovies = async () => {
    const res = await api.get("/admin/movies");

    setMovies(res.data);
  };

  const deleteMovie = async (id) => {
    await api.delete(`/admin/movies/${id}`);

    setMovies((prev) => prev.filter((m) => m._id !== id));
  };

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      <h2>Users</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Movies</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>
                <button onClick={() => deleteMovie(movie._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
