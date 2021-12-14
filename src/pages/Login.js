import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { Link } from "react-router-dom";
import auth from "../authentication/firebase";
import { useHistory } from "react-router";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login({ open, handleClose }) {
  // History to navigate back previous
  const history = useHistory();

  // Get user email and password
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const signIn = (e) => {
    e.preventDefault();

    if (email && password) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Check email verification
          if (userCredential.user.emailVerified) {
            history.push("/");
          } else {
            alert("Please verify your email first");
            return;
          }
        })
        .catch((error) => {
          // Some error occurred.
          alert("Account not found");
        });
    } else {
      alert("Please fill out all info stated");
    }
  };

  return (
    <div className="login">
      <Snackbar
        open={open}
        autoHideDuration={1000}
        sx={{
          width: "350px",
          height: "80px",
          borderRadius: "20px",
          background: "white",
        }}
      >
        <Box>
          <Alert
            icon={<CheckCircleOutlineOutlinedIcon sx={{ color: "#4cac54" }} />}
            sx={{
              width: "100%",
              background: "white",
              color: "#000000",
              boxShadow: "none",
            }}
          >
            Verification email sent.
          </Alert>
          <CancelOutlinedIcon
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0px",
              position: "absolute",
              left: "88.57%",
              right: "3.43%",
              top: "15%",
              bottom: "50%",
              cursor: "pointer",
            }}
            onClick={handleClose}
          />
        </Box>
      </Snackbar>
      {/* Card of login */}
      <Box sx={{ background: "#9ADCBB", width: "100vw", height: "100vh" }}>
        {/* Card of register */}
        <Card
          sx={{
            position: "absolute",
            width: "381px",
            height: "386px",
            left: "calc(50% - 381px/2 - 0.5px)",
            top: "calc(50% - 458px/2 + 8px)",
            boxShadow:
              "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)",
            borderRadius: "20px",
          }}
        >
          <CardHeader
            title={
              <Typography
                sx={{
                  position: "absolute",
                  width: "87px",
                  height: "42px",
                  left: "147px",
                  top: "50px",
                  fontFamily: "Exo",
                  fontStyle: "normal",
                  fontWeight: "normal",
                  fontSize: "34px",
                  lineHeight: "123.5%",
                  display: "flex",
                  alignItems: "center",
                  letterSpacing: "0.25px",
                  color: "#000000",
                }}
              >
                Login
              </Typography>
            }
          />

          <CardContent>
            <form noValidate autoComplete="off">
              <TextField
                label="Username"
                fullWidth
                required
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "0px",
                  position: "absolute",
                  width: "320px",
                  height: "56px",
                  left: "30px",
                  top: "134px",
                  textAlign: "center",
                }}
              />
              <TextField
                label="Password"
                fullWidth
                required
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "0px",
                  position: "absolute",
                  width: "320px",
                  height: "56px",
                  left: "30px",
                  top: "206px",
                }}
              />
              <Button
                type="submit"
                variant="contained"
                onClick={signIn}
                sx={{
                  padding: "0px",
                  position: "absolute",
                  width: "320px",
                  height: "42px",
                  left: "30px",
                  top: "286px",
                  background: "#50D492",
                  boxShadow:
                    "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)",
                  borderRadius: "10px",
                  "&:hover": {
                    background: "#37BB79",
                  },
                }}
                endIcon={<ArrowForwardOutlinedIcon />}
              >
                SIGN IN
              </Button>
            </form>

            <Link to="/register">
              <Typography
                sx={{
                  fontFamily: "Exo",
                  fontStyle: "normal",
                  fontWeight: "normal",
                  lineHeight: "123.5%",
                  color: "#000000",
                  padding: "0px",
                  display: "flex",
                  alignItems: "center",
                  letterSpacing: "0.25px",
                  position: "absolute",
                  width: "320px",
                  height: "56px",
                  left: "73px",
                  top: "328px",
                  textAlign: "center",
                  "&:hover": {
                    color: "#3366BB",
                  },
                }}
              >
                Not a user ? Register here
              </Typography>
            </Link>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}
