import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import EmployeeCard from "../components/EmployeeCard";
import AddressCard from "../components/AddressCard";
import { makeStyles } from "@mui/styles";
import { useTheme } from "../Theme/ThemeContext";
import { Link } from "react-router-dom";
import { useCHistory } from "../Reducer/ReducerContext";
import MenuIcon from "@mui/icons-material/Menu";
import EmployeeAddCard from "../components/EmployeeAddCard";
import AddressAddCard from "../components/AddressAddCard";

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

  // For filter dropdown
  const [filterChange, setFilterChange] = React.useState("");
  const handleFilterChange = (event) => {
    setFilterChange(event.target.value);
  };

  // Try to remove the border of dropdown but fail...
  const useStyles = makeStyles(() => ({
    noBorder: {
      border: "0px",
      boxShadow: "none",
      borderWidth: "0px",
    },
  }));

  // For dark theme
  const darkTheme = useTheme();
  const themeStyles = {
    backgroundColor: darkTheme ? "#e5e5e5" : "#333",
    minHeight: "100vh",
  };
  const useIconStyles = makeStyles({
    select: {
      "&:after": {
        borderBottomColor: "darkred",
      },
      "& .MuiSvgIcon-root": {
        color: darkTheme ? "#757575" : "#FFFFFF",
      },
    },
  });
  const classes = useIconStyles();

  const items = useCHistory();
  const [historyData, setHistoryData] = useState(items);
  useEffect(() => {
    fetch("http://localhost:8000/historyDel")
      .then((res) => res.json())
      .then((data) => setHistoryData(data));
  }, [historyData]);

  return (
    <div className="main" style={themeStyles}>
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
            color: darkTheme ? "#000000" : "#FFFFFF",
          }}
        >
          Employees
        </Typography>
        <Button
          startIcon={
            <PersonAddOutlinedIcon
              sx={{
                color: darkTheme ? "#50D49280" : "#D2FFF1",
              }}
            />
          }
          sx={{
            top: "147px",
            left: "253px",
            border: "1px solid rgba(80, 212, 146, 0.5)",
            boxSizing: "border-box",
            borderRadius: "10px",
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
              color: darkTheme ? "#50D492" : "#83FFC5",
            }}
          >
            ADD NEW EMPLOYEE
          </Typography>
        </Button>
        <Button
          startIcon={
            <MenuIcon
              sx={{
                color: darkTheme ? "#757575" : "#a5a397",
              }}
            />
          }
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0px",
            left: "469px",
            top: "117px",
            borderRadius: "10px",
          }}
        >
          <Link to="/history" style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                position: "static",
                left: "13.48%",
                right: "0%",
                top: "0%",
                bottom: "0%",
                fontFamily: "Exo",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "14px",
                lineHeight: "24px",
                letterSpacing: "0.4px",
                textTransform: "uppercase",
                color: darkTheme ? "rgba(0, 0, 0, 0.54)" : "#a5a397",
                flex: "none",
                order: "1",
                flexGrow: "0",
                margin: "0px 8px",
                "&:hover": {
                  color: darkTheme ? "#5D5D5D" : "#C3C3C3",
                },
              }}
            >
              REMOVED EMPLOYEES ({historyData.length})
            </Typography>
          </Link>
        </Button>

        {/* Employees add dialog */}
        <EmployeeAddCard
          setOpenEMP={setOpenEMP}
          handleEMPClose={handleEMPClose}
          openEMP={openEMP}
          darkTheme={darkTheme}
          classes={classes}
          addresses={addresses}
        />

        {/* Filter address */}
        <Box
          sx={{
            paddingLeft: "1200px",
            paddingTop: "74px",
          }}
        >
          <FormControl
            sx={{
              width: "203px",
              background: darkTheme ? "#e5e5e5" : "#242526",
            }}
          >
            <InputLabel
              id="demo-simple-select-label"
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                color: darkTheme ? "rgba(0, 0, 0, 0.87)" : "#FFFFFF",
              }}
            >
              <FilterAltIcon
                sx={{
                  color: darkTheme ? "#0000001F" : "#757575",
                }}
              />
              Filter Address
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filterChange}
              style={{
                color: darkTheme ? "#434343" : "#FFFFFF",
              }}
              className={classes.select}
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
                  <EmployeeCard employee={employee} />
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
            color: darkTheme ? "#000000" : "#FFFFFF",
          }}
        >
          Address
        </Typography>
        <Button
          startIcon={
            <ApartmentOutlinedIcon
              sx={{
                color: darkTheme ? "#50D49280" : "#D2FFF1",
              }}
            />
          }
          sx={{
            left: "204px",
            border: "1px solid rgba(80, 212, 146, 0.5)",
            boxSizing: "border-box",
            borderRadius: "10px",
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
              color: darkTheme ? "#50D492" : "#83FFC5",
            }}
          >
            ADD NEW ADDRESS
          </Typography>
        </Button>

        {/* Address add dialog */}
        <AddressAddCard
          handleADDClose={handleADDClose}
          setOpenADD={setOpenADD}
          darkTheme={darkTheme}
          openADD={openADD}
        />
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
                  <AddressCard address={address} />
                </Grid>
              ))}
          </Grid>
        </div>
      </Box>
    </div>
  );
}
