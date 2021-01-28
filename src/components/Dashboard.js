import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Dashboard() {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError(false);
    setErrorMessage("");

    try {
      await logout();
      history.replace("/login");
    } catch {
      setError(true);
      return setErrorMessage("Failed to logout");
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{errorMessage}</Alert>}
          <strong>Email:</strong> {currentUser?.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </>
  );
}

export default Dashboard;
