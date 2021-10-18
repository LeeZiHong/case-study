import React, { useEffect, useState } from "react";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box, styled } from "@mui/system";

// For dialog
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function EmpCard({ employee }) {
  // For handling dialog
  const [openEMP, setOpenEMP] = React.useState(false);
  const handleEMPOpen = () => {
    setOpenEMP(true);
  };
  const handleEMPClose = () => {
    setOpenEMP(false);
  };
  const [openConfirmation, setConfirmation] = React.useState(false);
  const handleConfirmationOpen = () => {
    setConfirmation(true);
  };
  const handleConfirmationClose = () => {
    setConfirmation(false);
  };

  // For work address dropdown
  const [workAddress, setWorkAddress] = React.useState(employee.workAddress);
  const handleChange = (event) => {
    setWorkAddress(event.target.value);
  };

  // Get address name to be shown in work address
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/addresses")
      .then((res) => res.json())
      .then((data) => setAddresses(data));
  }, []);

  // For employee update & delete
  const [empName, setEmpName] = useState(employee.empName);
  const [empPos, setEmpPos] = useState(employee.empPos);
  const [empID, setEmpID] = useState(employee.empID);
  const handleEMPUpdate = (e) => {
    e.preventDefault();
    setOpenEMP(false);
    fetch(`http://localhost:8000/employees/${employee.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ empName, empPos, workAddress, empID }),
    });
  };
  const handleEMPDelete = (e) => {
    e.preventDefault();
    setConfirmation(false);
    setOpenEMP(false);
    fetch(`http://localhost:8000/employees/${employee.id}`, {
      method: "DELETE",
    });
  };

  return (
    <div className="emp-card">
      {/* Card of employees info */}
      <Card
        sx={{
          width: "436px",
          height: "156px",
          background: "#FFFFFF",
          boxShadow:
            "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)",
          borderRadius: "20px",
        }}
      >
        <CardHeader
          action={
            <IconButton onClick={handleEMPOpen}>
              <ModeEditOutlineOutlinedIcon />
            </IconButton>
          }
          title={
            <Typography
              sx={{
                paddingLeft: "20px",
                fontFamily: "Exo",
                fontStyle: "normal",
                fontWeight: "normal",
                fontSize: "12px",
                lineHeight: "266%",
                display: "flex",
                alignItems: "center",
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "#9E9E9E",
              }}
            >
              {employee.empID}
            </Typography>
          }
          subheader={
            <div>
              <Typography
                sx={{
                  paddingLeft: "20px",
                  fontFamily: "Exo",
                  fontStyle: "normal",
                  fontWeight: "500",
                  fontSize: "20px",
                  lineHeight: "160%",
                  letterSpacing: "0.15px",
                  color: "#389466",
                }}
              >
                {employee.empName}
              </Typography>
              <Typography
                sx={{
                  paddingLeft: "20px",
                  fontFamily: "Open Sans",
                  fontStyle: "normal",
                  fontWeight: "normal",
                  fontSize: "14px",
                  lineHeight: "143%",
                  letterSpacing: "0.15px",
                  color: "rgba(0, 0, 0, 0.6)",
                }}
              >
                {employee.empPos}
              </Typography>
            </div>
          }
        />

        {/* Employees edit dialog */}
        <BootstrapDialog
          onClose={handleEMPClose}
          aria-labelledby="customized-dialog-title"
          PaperProps={{
            style: { borderRadius: 20 },
            sx: { width: "450px", height: "369px" },
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
                color: "rgba(0, 0, 0, 0.87)",
              }}
            >
              Edit Employee
            </Typography>
            <TextField
              onChange={(e) => setEmpName(e.target.value)}
              label="Employee Name"
              fullWidth
              required
              defaultValue={employee.empName}
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
              }}
            />
            <TextField
              onChange={(e) => setEmpPos(e.target.value)}
              label="Current Position"
              required
              defaultValue={employee.empPos}
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
              }}
            />
            <TextField
              onChange={(e) => setEmpID(e.target.value)}
              label="Employee ID"
              required
              defaultValue={employee.empID}
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
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Work Address
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={employee.workAddress}
                  label="Work Address"
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
            <Button
              type="submit"
              variant="contained"
              onClick={handleEMPUpdate}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "0px",
                position: "absolute",
                width: "180px",
                height: "36px",
                left: "235px",
                top: "303px",
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
            <Button
              variant="contained"
              onClick={handleConfirmationOpen}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "0px",
                position: "absolute",
                width: "180px",
                height: "36px",
                left: "35px",
                top: "303px",
                background: "#D11A2A",
                boxShadow:
                  "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)",
                borderRadius: "10px",
                "&:hover": {
                  background: "#B80111",
                },
              }}
            >
              DELETE
            </Button>
          </DialogContent>
        </BootstrapDialog>

        {/* Employees delete confirmation dialog */}
        <BootstrapDialog
          onClose={handleConfirmationClose}
          open={openConfirmation}
        >
          <DialogTitle id="alert-dialog-title">{"Delete Employee"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEMPDelete} color="primary" autoFocus>
              Yes
            </Button>
            <Button onClick={handleConfirmationClose} color="primary">
              No
            </Button>
          </DialogActions>
        </BootstrapDialog>

        <CardContent
          sx={{
            background: "#F5F5F5",
            borderRadius: "20px 20px 0px 0px",
            fontFamily: "Open Sans",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "16px",
            lineHeight: "150%",
            letterSpacing: "0.15px",
            color: "#757575",
            paddingTop: "12px",
            paddingLeft: "38px",
          }}
        >
          {employee.workAddress}
        </CardContent>
      </Card>
    </div>
  );
}
