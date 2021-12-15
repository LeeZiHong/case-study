import React, { useState } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { styled } from "@mui/material/styles";

// For dialog
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function AddEmployeeCard({
  setOpenEMP,
  handleEMPClose,
  openEMP,
  darkTheme,
  classes,
  addresses,
}) {
  // For work address dropdown
  const [workAddress, setWorkAddress] = React.useState("");
  const handleChange = (event) => {
    setWorkAddressErr(false);
    setWorkAddress(event.target.value);
  };

  // For role dropdown
  const [role, setRole] = React.useState("");
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  // Add employee & address
  const [empName, setEmpName] = useState("");
  const [empPos, setEmpPos] = useState("");
  const [empID, setEmpID] = useState("");
  const handleEMPSubmit = (e) => {
    e.preventDefault();
    setEmpNameErr(false);
    setEmpPosErr(false);
    setEmpIDErr(false);
    setWorkAddressErr(false);
    setRoleErr(false);

    if (empName === "") {
      setEmpNameErr(true);
    }
    if (empPos === "") {
      setEmpPosErr(true);
    }
    if (empID === "") {
      setEmpIDErr(true);
    }
    if (workAddress === "") {
      setWorkAddressErr(true);
    }
    if (role === "") {
      setRoleErr(true);
    }
    if (empName && empPos && empID && workAddress && role) {
      setOpenEMP(false);
      fetch("http://localhost:8000/employees", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ empName, empPos, workAddress, role, empID }),
      });
    }
  };

  // Field blank reminder
  const [empNameErr, setEmpNameErr] = useState(false);
  const [empPosErr, setEmpPosErr] = useState(false);
  const [empIDErr, setEmpIDErr] = useState(false);
  const [workAddressErr, setWorkAddressErr] = useState(false);
  const [roleErr, setRoleErr] = useState(false);

  return (
    <div>
      <BootstrapDialog
        onClose={handleEMPClose}
        aria-labelledby="customized-dialog-title"
        PaperProps={{
          style: {
            borderRadius: 20,
            background: darkTheme ? "#FFFFFF" : "#242526",
          },
          sx: { width: "450px", height: "441px" },
        }}
        open={openEMP}
      >
        <DialogContent>
          <Typography
            sx={{
              position: "absolute",
              width: "182px",
              height: "32px",
              left: "25px",
              top: "25px",
              fontFamily: "Exo",
              fontStyle: "normal",
              fontWeight: "500",
              fontSize: "20px",
              lineHeight: "160%",
              display: "flex",
              alignItems: "center",
              letterSpacing: "0.15px",
              color: darkTheme ? "rgba(0, 0, 0, 0.87)" : "#FFFFFF",
            }}
          >
            Add New Employee
          </Typography>
          <form noValidate autoComplete="off" onSubmit={handleEMPSubmit}>
            <TextField
              onChange={(e) => setEmpName(e.target.value)}
              label="Employee Name"
              fullWidth
              required
              error={empNameErr}
              InputLabelProps={{
                style: { color: darkTheme ? "#707070" : "#a7ada8" },
              }}
              InputProps={{
                style: { color: darkTheme ? "#434343" : "#FFFFFF" },
              }}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "0px",
                position: "absolute",
                width: "400px",
                height: "56px",
                left: "25px",
                top: "73px",
                background: darkTheme ? "#FFFFFF" : "#3a3b3c",
              }}
            />
            <TextField
              onChange={(e) => setEmpPos(e.target.value)}
              label="Current Position"
              required
              error={empPosErr}
              InputLabelProps={{
                style: { color: darkTheme ? "#707070" : "#a7ada8" },
              }}
              InputProps={{
                style: { color: darkTheme ? "#434343" : "#FFFFFF" },
              }}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "0px",
                position: "absolute",
                width: "220px",
                height: "56px",
                left: "25px",
                top: "145px",
                background: darkTheme ? "#FFFFFF" : "#3a3b3c",
              }}
            />
            <TextField
              onChange={(e) => setEmpID(e.target.value)}
              label="Employee ID"
              required
              error={empIDErr}
              InputLabelProps={{
                style: { color: darkTheme ? "#707070" : "#a7ada8" },
              }}
              InputProps={{
                style: { color: darkTheme ? "#434343" : "#FFFFFF" },
              }}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "0px",
                position: "absolute",
                width: "161px",
                height: "56px",
                left: "264px",
                top: "145px",
                background: darkTheme ? "#FFFFFF" : "#3a3b3c",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "0px",
                position: "absolute",
                width: "400px",
                height: "56px",
                left: "25px",
                top: "217px",
                background: darkTheme ? "#FFFFFF" : "#3a3b3c",
              }}
            >
              <FormControl fullWidth error={workAddressErr}>
                <InputLabel
                  id="demo-simple-select-label"
                  style={{ color: darkTheme ? "#707070" : "#a7ada8" }}
                >
                  Work Address
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={workAddress}
                  label="Work Address"
                  style={{
                    color: darkTheme ? "#434343" : "#FFFFFF",
                  }}
                  className={classes.select}
                  onChange={handleChange}
                >
                  {addresses.map((result) => (
                    <MenuItem key={result.id} value={result.addName}>
                      {result.addName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "0px",
                position: "absolute",
                width: "400px",
                height: "56px",
                left: "25px",
                top: "289px",
                background: darkTheme ? "#FFFFFF" : "#3a3b3c",
              }}
            >
              <FormControl fullWidth>
                <InputLabel
                  style={{ color: darkTheme ? "#707070" : "#a7ada8" }}
                >
                  Role
                </InputLabel>
                <Select
                  value={role}
                  label="Role"
                  error={roleErr}
                  style={{
                    color: darkTheme ? "#434343" : "#FFFFFF",
                  }}
                  className={classes.select}
                  onChange={handleRoleChange}
                >
                  <MenuItem value="User">User</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button
              type="submit"
              variant="contained"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "0px",
                position: "absolute",
                width: "400px",
                height: "36px",
                left: "25px",
                top: "375px",
                background: "#50D492",
                boxShadow:
                  "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)",
                borderRadius: "10px",
                "&:hover": {
                  background: "#37BB79",
                },
              }}
            >
              SAVE
            </Button>
          </form>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
