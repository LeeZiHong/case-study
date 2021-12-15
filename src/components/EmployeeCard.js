import React from "react";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { useTheme } from "../Theme/ThemeContext";
import { makeStyles } from "@mui/styles";
import EmployeeEditCard from "./EmployeeEditCard";

export default function EmpCard({ employee }) {
  // For handling dialog
  const [openEMP, setOpenEMP] = React.useState(false);
  const handleEMPOpen = () => {
    setOpenEMP(true);
  };
  const handleEMPClose = () => {
    setOpenEMP(false);
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
        <EmployeeEditCard
          employee={employee}
          setOpenEMP={setOpenEMP}
          handleEMPClose={handleEMPClose}
          darkTheme={darkTheme}
          openEMP={openEMP}
          classes={classes}
        />

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
