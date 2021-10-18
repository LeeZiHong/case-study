import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import EmpCard from "./EMPCard";
import ADDCard from "./ADDCard";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { styled } from "@mui/material/styles";
import auth from "./firebase";
import { makeStyles } from "@mui/styles";

// For dialog
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function Main() {
  // For handling dialogs
  const [openEMP, setOpenEMP] = React.useState(false);
  const [openADD, setOpenADD] = React.useState(false);
  const handleEMPOpen = () => {
    setOpenEMP(true);
  };
  const handleEMPClose = () => {
    setOpenEMP(false);
  };
  const handleADDOpen = () => {
    setOpenADD(true);
  };
  const handleADDClose = () => {
    setOpenADD(false);
  };

  // For fecthing json data
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, [employees]);
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/addresses")
      .then((res) => res.json())
      .then((data) => setAddresses(data));
  }, [addresses]);

  // For work address dropdown
  const [workAddress, setWorkAddress] = React.useState("");
  const handleChange = (event) => {
    setWorkAddressErr(false);
    setWorkAddress(event.target.value);
  };

  // For filter dropdown
  const [filterChange, setFilterChange] = React.useState("");
  const handleFilterChange = (event) => {
    setWorkAddressErr(false);
    setFilterChange(event.target.value);
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
    if (empName && empPos && empID && workAddress) {
      setOpenEMP(false);
      fetch("http://localhost:8000/employees", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ empName, empPos, workAddress, empID }),
      });
    }
  };

  const [addName, setAddName] = useState("");
  const [addUnit, setAddUnit] = useState("");
  const [addStreet, setAddStreet] = useState("");
  const [addPostC, setAddPostC] = useState("");
  const [addCountry, setAddCountry] = useState("");
  const handleADDSubmit = (e) => {
    e.preventDefault();
    setAddNameErr(false);
    setAddUnitErr(false);
    setAddStreetErr(false);
    setAddPostCErr(false);
    setAddCountryErr(false);

    if (addName === "") {
      setAddNameErr(true);
    }
    if (addUnit === "") {
      setAddUnitErr(true);
    }
    if (addStreet === "") {
      setAddStreetErr(true);
    }
    if (addPostC === "") {
      setAddPostCErr(true);
    }
    if (addCountry === "") {
      setAddCountryErr(true);
    }
    if (addName && addUnit && addStreet && addPostC && addCountry) {
      setOpenADD(false);
      fetch("http://localhost:8000/addresses", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          addName,
          addUnit,
          addStreet,
          addPostC,
          addCountry,
        }),
      });
    }
  };

  // Field blank reminder
  const [empNameErr, setEmpNameErr] = useState(false);
  const [empPosErr, setEmpPosErr] = useState(false);
  const [empIDErr, setEmpIDErr] = useState(false);
  const [workAddressErr, setWorkAddressErr] = useState(false);
  const [addNameErr, setAddNameErr] = useState(false);
  const [addUnitErr, setAddUnitErr] = useState(false);
  const [addStreetErr, setAddStreetErr] = useState(false);
  const [addPostCErr, setAddPostCErr] = useState(false);
  const [addCountryErr, setAddCountryErr] = useState(false);

  // Try to remove the border of dropdown but fail...
  const useStyles = makeStyles(() => ({
    noBorder: {
      border: "0px",
      boxShadow: "none",
      borderWidth :"0px"
    },
  }));

  return (
    <div className="main">
      {/* Nav bar */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "8px 12px",
          position: "absolute",
          width: "1340px",
          height: "64px",
          left: "50px",
          top: "30px",
          background: "#50D492",
          boxShadow:
            "0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12)",
          borderRadius: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "0px",
            position: "static",
            width: "1244px",
            height: "48px",
            left: "12px",
            top: "8px",
            flex: "none",
            order: "0",
            flexGrow: "1",
            margin: "0px 0px",
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <PeopleAltOutlinedIcon
              fontSize="medium"
              sx={{
                display: "absolute",
                color: "#FFFFFF",
                paddingLeft: "27px",
                paddingTop: "23px",
                paddingBottom: "23px",
              }}
            />
            <Typography
              color="#FFFFFF"
              sx={{
                position: "static",
                left: "0%",
                right: "0%",
                top: "0%",
                bottom: "0%",
                fontFamily: "Exo",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "20px",
                lineHeight: "160%",
                letterSpacing: "0.15px",
                flex: "none",
                order: 0,
                flexGrow: 0,
                margin: "0px 0px",
                paddingLeft: "31px",
                paddingTop: "16px",
                paddingBottom: "16px",
              }}
            >
              Employee Management App
            </Typography>
          </Link>
        </Box>
        <Button onClick={() => auth.signOut()}>
          <Typography
            sx={{
              position: "static",
              left: "11.11%",
              right: "11.11%",
              top: "16.67%",
              bottom: "16.67%",
              fontFamily: "Exo",
              fontStyle: "normal",
              fontWeight: "500",
              fontSize: "14px",
              lineHeight: "24px",
              letterspacing: "0.15px",
              texttransform: "uppercase",
              color: "#FFFFFF",
              flex: "none",
              order: 0,
              flexGrow: 0,
              margin: "8px 0px",
              paddingRight: "20px",
              "&:hover": {
                color: "#E6E6E6",
              },
            }}
          >
            LOGOUT
          </Typography>
        </Button>
      </Box>

      {/* Employees text */}
      <Box>
        <Typography
          sx={{
            position: "absolute",
            width: "175px",
            height: "42px",
            left: "62px",
            top: "144px",
            fontFamily: "Exo",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "34px",
            lineHeight: "123.5%",
            letterSpacing: "0.25px",
            color: "#000000",
          }}
        >
          Employees
        </Typography>
        <Button
          startIcon={
            <PersonAddOutlinedIcon
              sx={{
                color: "#50D49280",
              }}
            />
          }
          sx={{
            top: "147px",
            left: "243px",
          }}
          onClick={handleEMPOpen}
        >
          <Typography
            sx={{
              fontFamily: "Exo",
              fontStyle: "normal",
              fontWeight: "500",
              fontSize: "14px",
              lineHeight: "24px",
              letterSpacing: "0.4px",
              textTransform: "uppercase",
              color: "#50D492",
            }}
          >
            ADD NEW EMPLOYEE
          </Typography>
        </Button>

        {/* Employees add dialog */}
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
              Add New Employee
            </Typography>
            <form noValidate autoComplete="off" onSubmit={handleEMPSubmit}>
              <TextField
                onChange={(e) => setEmpName(e.target.value)}
                label="Employee Name"
                fullWidth
                required
                error={empNameErr}
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
                error={empPosErr}
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
                error={empIDErr}
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
                <FormControl fullWidth error={workAddressErr}>
                  <InputLabel id="demo-simple-select-label">
                    Work Address
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={workAddress}
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
                onClick={handleEMPClose}
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
                  background: "#FFFFFF",
                  color: "#808080",
                  boxShadow:
                    "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)",
                  borderRadius: "10px",
                  "&:hover": {
                    background: "#E6E6E6",
                  },
                }}
              >
                CANCEL
              </Button>
            </form>
          </DialogContent>
        </BootstrapDialog>

        {/* Filter address */}
        <Box
          sx={{
            paddingLeft: "1200px",
            paddingTop: "94px",
          }}
        >
          <FormControl error={workAddressErr} sx={{ width: "203px" }}>
            <InputLabel
              id="demo-simple-select-label"
              sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
            >
              <FilterAltIcon
                sx={{
                  color: "#0000001F",
                }}
              />
              Filter Address
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filterChange}
              label="Work Address"
              onChange={handleFilterChange}
              classes={useStyles.noBorder}
            >
              <MenuItem value={"All"}>All</MenuItem>
              {addresses.map((result) => (
                <MenuItem key={result.id} value={result.addName}>
                  {result.addName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Employees info */}
      <Box>
        <div style={{ padding: 50, paddingTop: "20px" }}>
          <Grid container>
            {employees
              .filter((employee) => {
                if (filterChange === "" || filterChange === "All") {
                  return employee;
                } else {
                  return employee.workAddress.includes(filterChange);
                }
              })
              .map((employee) => (
                <Grid
                  item={true}
                  key={employee.id}
                  xs={12}
                  md={6}
                  lg={4}
                  padding={1}
                >
                  <EmpCard employee={employee} />
                </Grid>
              ))}
          </Grid>
        </div>
      </Box>

      {/* Address text */}
      <Box>
        <Typography
          sx={{
            position: "absolute",
            width: "166px",
            height: "42px",
            left: "62px",
            fontFamily: "Exo",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "34px",
            lineHeight: "123.5%",
            letterSpacing: "0.25px",
            color: "#000000",
          }}
        >
          Address
        </Typography>
        <Button
          startIcon={
            <ApartmentOutlinedIcon
              sx={{
                color: "#50D49280",
              }}
            />
          }
          sx={{
            left: "204px",
          }}
          onClick={handleADDOpen}
        >
          <Typography
            sx={{
              fontFamily: "Exo",
              fontStyle: "normal",
              fontWeight: "500",
              fontSize: "14px",
              lineHeight: "24px",
              letterSpacing: "0.4px",
              textTransform: "uppercase",
              color: "#50D492",
            }}
          >
            ADD NEW ADDRESS
          </Typography>
        </Button>

        {/* Address add dialog */}
        <BootstrapDialog
          onClose={handleADDClose}
          aria-labelledby="customized-dialog-title"
          PaperProps={{
            style: { borderRadius: 20 },
            sx: { width: "450px", height: "441px" },
          }}
          open={openADD}
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
              Add New Address
            </Typography>
            <form noValidate autoComplete="off" onSubmit={handleADDSubmit}>
              <TextField
                onChange={(e) => setAddName(e.target.value)}
                label="Address Name"
                fullWidth
                required
                error={addNameErr}
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
                onChange={(e) => setAddUnit(e.target.value)}
                label="Unit/Block/Building"
                fullWidth
                required
                error={addUnitErr}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "0px",
                  position: "absolute",
                  width: "400px",
                  height: "56px",
                  left: "25px",
                  top: "145px",
                }}
              />
              <TextField
                onChange={(e) => setAddStreet(e.target.value)}
                label="Street"
                fullWidth
                required
                error={addStreetErr}
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
              />
              <TextField
                onChange={(e) => setAddPostC(e.target.value)}
                label="Postcode"
                required
                error={addPostCErr}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "0px",
                  position: "absolute",
                  width: "114px",
                  height: "56px",
                  left: "25px",
                  top: "289px",
                }}
              />
              <TextField
                onChange={(e) => setAddCountry(e.target.value)}
                label="Country"
                fullWidth
                required
                error={addCountryErr}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "0px",
                  position: "absolute",
                  width: "270px",
                  height: "56px",
                  left: "155px",
                  top: "289px",
                }}
              />
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
                  width: "180px",
                  height: "36px",
                  left: "235px",
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
              <Button
                variant="contained"
                onClick={handleADDClose}
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
                  top: "375px",
                  background: "#FFFFFF",
                  color: "#808080",
                  boxShadow:
                    "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)",
                  borderRadius: "10px",
                  "&:hover": {
                    background: "#E6E6E6",
                  },
                }}
              >
                CANCEL
              </Button>
            </form>
          </DialogContent>
        </BootstrapDialog>
      </Box>

      {/* Address info */}
      <Box>
        <div style={{ padding: 50, paddingTop: "20px" }}>
          <Grid container>
            {addresses
              .filter((address) => {
                if (filterChange === "" || filterChange === "All") {
                  return address;
                } else {
                  return address.addName.includes(filterChange);
                }
              })
              .map((address) => (
                <Grid
                  item={true}
                  key={address.id}
                  xs={12}
                  md={6}
                  lg={4}
                  padding={1}
                >
                  <ADDCard address={address} />
                </Grid>
              ))}
          </Grid>
        </div>
      </Box>
    </div>
  );
}
