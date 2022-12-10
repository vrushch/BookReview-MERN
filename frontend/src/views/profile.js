// src/views/profile.js
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";
import { useAuthToken } from "../auth/AuthTokenContext";
import { useAuth0 } from "@auth0/auth0-react";

function Profile() {
  const { accessToken } = useAuthToken();

  const [inputChanged, setInputChanged] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("https://project-3-backend-fevm.onrender.com/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setName(json.name);
        setEmail(json.email);
        setGender(json.gender);
        setBio(json.bio);
      });
  }, []);

  const handleChange = () => {
    setInputChanged(true);
  };

  const handleNameChange = (e) => {
    handleChange();
    setName(e.target.value);
  };

  const handleGenderChange = (e) => {
    handleChange();
    setGender(e.target.value);
  };

  const handleBioChange = (e) => {
    handleChange();
    setBio(e.target.value);
  };

  const saveProfile = () => {
    fetch("https://project-3-backend-fevm.onrender.com/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name,
        bio,
        gender,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("Profile Updated JSON", json);
        alert("Profile Updated");
        setInputChanged(false);
      });
  };

  return (
    <>
      <Container className="profile-container">
        <Row className="profile-container-row">
          <Col xs={12} md={6}>
            <h2 className="profile-form-title">Your details</h2>
            <Form className="profile-form">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder={email} disabled />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  aria-label="name field"
                  onChange={(e) => handleNameChange(e)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  aria-label="select gender"
                  value={gender}
                  onChange={(e) => handleGenderChange(e)}
                >
                  <option>Select a Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-identifiable">
                    Prefer not to self identify
                  </option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicBio">
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={bio}
                  aria-label="bio field"
                  onChange={(e) => handleBioChange(e)}
                />
              </Form.Group>

              <Button
                variant="primary"
                className="btn btn-primary"
                disabled={!inputChanged}
                onClick={() => saveProfile()}
              >
                Save
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Profile;
