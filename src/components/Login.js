import * as React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import baseUrl from "../api";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import img from "../components/media/library3.jpeg";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link to="/">FULL BOOKSTACK</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const Login = (props) => {
  const token = props.token;
  const setToken = props.setToken;
  const setIsLoggedIn = props.setIsLoggedIn;
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const response = await fetch(`${baseUrl}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const info = await response.json();
    console.log(info);

    if (info.error) {
      console.log(info.error);
      return setErrorMessage(info.error);
    }
    localStorage.setItem("token", info.token);

    setIsLoggedIn(true);
    setToken(info.token);
    history.push("/account");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${img})`,
        backgroundRepeat: "repeat",
        minHeight: "84vh",
        height: "100%",
        zIndex: "-2",
        // marginTop: "-3em",
        height: "100vh",
        fontFamily: "Nunito",
      }}
    >
      <br></br>
      <Container
        component="main"
        maxWidth="xs"
        style={{
          width: "60%",
          borderRadius: "10px",
          backgroundColor: "#FBFBFD",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ mt: 2, bgcolor: "#e0bc75" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            style={{
              fontFamily: "satisfy",
              fontSize: "3em",
              fontWeight: "700",
            }}
          >
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              required
              fullWidth
              lassName="login-input"
              placeholder="Enter email"
              minLength={6}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              className="login-input"
              type="password"
              min={8}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{
                backgroundColor: "#7395ae",
              }}
              onClick={() => {
                localStorage.setItem("toast", 1);
              }}
            >
              Login
            </Button>
            <p className="errorMessage">{errorMessage}</p>
            <div style={{ marginBottom: "2rem", alignSelf: "center" }}>
              <Link to="/register">{"Don't have an account? Sign Up"}</Link>
            </div>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
