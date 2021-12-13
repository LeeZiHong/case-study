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
import { useTheme } from "../Theme/ThemeContext";
import { makeStyles } from "@mui/styles";
import { useDisptachHistory } from "../Reducer/ReducerContext";

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
    fetch(`http://localhost:8000/employees/${employee.id}`, {
      method: "DELETE",
    });
  };

  var myCurrentDate = new Date();
  var date = myCurrentDate.getDate() + '/' + (myCurrentDate.getMonth()+1) + '/' + myCurrentDate.getFullYear();

  const dispatch = useDisptachHistory();
  const [hisID, setHisID] = useState(employee.empID);
  const [hisName, setHisName] = useState(employee.empName);
  const [hisDate, setHisDate] = useState(date);
  

  const handleHistory = (e) => {
    e.preventDefault();
    setConfirmation(false);
    setOpenEMP(false);
    fetch(`http://localhost:8000/employees/${employee.id}`)
      .then((res) => res.json())
      .then(
        (data) =>
        setHisID( empID) &
          setHisName(empName) &
          handleAddHistory(data) &
          setHisDate(date) &
          dispatch({ type: "ADD", data }) &
          handleEMPDelete(data)
      );
  };
  const handleAddHistory = (e) => {
    fetch("http://localhost:8000/historyDel", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        hisName,
        hisDate,
        hisID,
      }),
    });
  };

  // For dark theme
  const darkTheme = useTheme();
  const useStyles = makeStyles({
    select: {
      "&:after": {
        borderBottomColor: "darkred",
      },
      "& .MuiSvgIcon-root": {
        color: darkTheme ? "#757575" : "#FFFFFF",
      },
    },
  });
  const classes = useStyles();

  return (
    <div className="emp-card">
      {/* Card of employees info */}
      <Card
        sx={{
          width: "436px",
          height: "156px",
          background: darkTheme ? "#FFFFFF" : "#242526",
          boxShadow:
            "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)",
          borderRadius: "20px",
        }}
      >
        <CardHeader
          action={
            <IconButton
              style={{ color: darkTheme ? "#767676" : "#A9A9A9" }}
              onClick={handleEMPOpen}
            >
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
                color: darkTheme ? "#9E9E9E" : "#D1D1D1",
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
                  color: darkTheme ? "#389466" : "#85E1B3",
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
                  color: darkTheme ? "rgba(0, 0, 0, 0.6)" : "#FFFFFF",
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
            style: {
              borderRadius: 20,
              background: darkTheme ? "#FFFFFF" : "#242526",
            },
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
                color: darkTheme ? "rgba(0, 0, 0, 0.87)" : "#FFFFFF",
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
              defaultValue={employee.empPos}
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
              defaultValue={employee.empID}
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
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  style={{
                    color: darkTheme ? "#707070" : "#a7ada8",
                  }}
                >
                  Work Address
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={employee.workAddress}
                  style={{
                    color: darkTheme ? "#434343" : "#FFFFFF",
                  }}
                  className={classes.select}
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
          PaperProps={{
            style: {
              background: darkTheme ? "#FFFFFF" : "#242526",
            },
          }}
          onClose={handleConfirmationClose}
          open={openConfirmation}
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{ color: darkTheme ? "rgba(0, 0, 0, 0.87)" : "#FFFFFF" }}
          >
            {"Delete Employee"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              sx={{ color: darkTheme ? "rgba(0, 0, 0, 0.87)" : "#FFFFFF" }}
            >
              Are you sure you want to delete?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleHistory} color="primary" autoFocus>
              Yes
            </Button>
            <Button onClick={handleConfirmationClose} color="primary">
              No
            </Button>
          </DialogActions>
        </BootstrapDialog>

        <CardContent
          sx={{
            background: darkTheme ? "#F5F5F5" : "#3a3b3c",
            borderRadius: "20px 20px 0px 0px",
            fontFamily: "Open Sans",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "16px",
            lineHeight: "150%",
            letterSpacing: "0.15px",
            color: darkTheme ? "#757575" : "#a5a397",
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
