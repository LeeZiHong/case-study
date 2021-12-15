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
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function Register({ setOpen }) {
  // History to navigate back previous
  const history = useHistory();

  // Get user email and password
  const [email, setemail] = useState("");
  const [confirmPassword, setconfirmpassword] = useState("");
  const [password, setpassword] = useState("");

  const signUp = (e) => {
    e.preventDefault();

    if (confirmPassword !== password) {
      alert("Password set doesn't match!");
    } else {
      if (email && password) {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // send verification mail.
            userCredential.user.sendEmailVerification();
            auth.signOut();
            setOpen(true);
            history.push("/login");
          })
          .catch(alert);
      } else {
        alert("Please fill out all info stated");
      }
    }
  };

  // Show password
  const [passwordShow, setPasswordShow] = useState(false);
  const togglePasswordShow = () => {
    if (passwordShow) {
      setPasswordShow(false);
    } else {
      setPasswordShow(true);
    }
  };
  const [confirmPasswordShow, setconfirmpasswordShow] = useState(false);
  const toggleConfirmPasswordShow = () => {
    if (confirmPasswordShow) {
      setconfirmpasswordShow(false);
    } else {
      setconfirmpasswordShow(true);
    }
  };

  return (
    <div className="register">
      <Box sx={{ background: "#9ADCBB", width: "100vw", height: "100vh" }}>
        {/* Card of register */}
        <Card
          sx={{
            position: "absolute",
            width: "381px",
            height: "458px",
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
                  left: "137px",
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
                Register
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
                type={passwordShow ? "text" : "password"}
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
              {passwordShow ? (
                <VisibilityIcon
                  onClick={togglePasswordShow}
                  sx={{
                    padding: "0px",
                    position: "absolute",
                    left: "310px",
                    top: "222px",
                  }}
                />
              ) : (
                <VisibilityOffIcon
                  onClick={togglePasswordShow}
                  sx={{
                    padding: "0px",
                    position: "absolute",
                    left: "310px",
                    top: "222px",
                  }}
                />
              )}
              <TextField
                label="Confirm Password"
                type={confirmPasswordShow ? "text" : "password"}
                fullWidth
                required
                onChange={(e) => {
                  setconfirmpassword(e.target.value);
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
                  top: "278px",
                }}
              />
              {confirmPasswordShow ? (
                <VisibilityIcon
                  onClick={toggleConfirmPasswordShow}
                  sx={{
                    padding: "0px",
                    position: "absolute",
                    left: "310px",
                    top: "292px",
                  }}
                />
              ) : (
                <VisibilityOffIcon
                  onClick={toggleConfirmPasswordShow}
                  sx={{
                    padding: "0px",
                    position: "absolute",
                    left: "310px",
                    top: "292px",
                  }}
                />
              )}
              <Button
                type="submit"
                variant="contained"
                onClick={signUp}
                sx={{
                  padding: "0px",
                  position: "absolute",
                  width: "320px",
                  height: "42px",
                  left: "30px",
                  top: "358px",
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
                SIGN UP
              </Button>
            </form>

            <Link to="/login">
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
                  top: "400px",
                  textAlign: "center",
                  "&:hover": {
                    color: "#3366BB",
                  },
                }}
              >
                Already a user? Login here
              </Typography>
            </Link>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}
