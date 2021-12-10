import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "../Theme/ThemeContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory } from "react-router-dom";

export default function History() {
  // For dark theme
  const darkTheme = useTheme();
  const themeStyles = {
    backgroundColor: darkTheme ? "#e5e5e5" : "#333",
    minHeight: "100vh",
  };

  const history = useHistory();

  return (
    <div style={themeStyles}>
      <Box>
        <Box>
          <Button
            startIcon={
              <ArrowBackIcon
                sx={{
                  position: "absolute",
                  left: "16.67%",
                  right: "16.67%",
                  top: "16.67%",
                  bottom: "16.67%",
                  color: darkTheme ? "#50D49280" : "#D2FFF1",
                }}
              />
            }
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "0px",
              position: "absolute",
              width: "87px",
              height: "42px",
              left: "50px",
              top: "144px",
              borderRadius: "10px",
            }}
            onClick={history.goBack}
          >
            <Typography
              sx={{
                position: "static",
                marginLeft: "40%",
                right: "0%",
                top: "0%",
                bottom: "0%",
                fontFamily: "Exo",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "15px",
                lineHeight: "26px",
                color: darkTheme ? "#50D492" : "#83FFC5",
              }}
            >
              BACK
            </Typography>
          </Button>
          <Typography
            sx={{
              position: "absolute",
              width: "332px",
              height: "42px",
              left: "157px",
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
            Removed Employees
          </Typography>
        </Box>

        <Box>
          <Typography
            sx={{
              position: "absolute",
              width: "86px",
              height: "24px",
              left: "60px",
              top: "206px",
              fontFamily: "Open Sans",
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: "14px",
              lineHeight: "24px",
              letterSpacing: "0.15px",
              color: darkTheme ? "rgba(0, 0, 0, 0.38)" : "#FFFFFF",
            }}
          >
            Employee ID
          </Typography>
          <Typography
            sx={{
              position: "absolute",
              width: "113px",
              height: "24px",
              left: "211px",
              top: "206px",
              fontFamily: "Open Sans",
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: "14px",
              lineHeight: "24px",
              letterSpacing: "0.15px",
              color: darkTheme ? "rgba(0, 0, 0, 0.38)" : "#FFFFFF",
            }}
          >
            Employee Name
          </Typography>
          <Typography
            sx={{
              position: "absolute",
              width: "101px",
              height: "24px",
              left: "1279px",
              top: "206px",
              fontFamily: "Open Sans",
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: "14px",
              lineHeight: "24px",
              letterSpacing: "0.15px",
              color: darkTheme ? "rgba(0, 0, 0, 0.38)" : "#FFFFFF",
            }}
          >
            Removed Date
          </Typography>
          <Divider
            sx={{
              position: "absolute",
              width: "1340px",
              height: "1px",
              left: "50px",
              top: "235px",
              border: darkTheme
                ? "1px solid rgba(0, 0, 0, 0.12)"
                : "1px solid #242526",
              boxSizing: "border-box",
            }}
          />
        </Box>

        <Typography
          sx={{
            position: "absolute",
            width: "122px",
            height: "20px",
            left: "659px",
            top: "256px",
            fontFamily: "Open Sans",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "14px",
            lineHeight: "143%",
            letterSpacing: "0.15px",
            color: darkTheme ? "#000000" : "#FFFFFF",
          }}
        >
          No records found
        </Typography>
      </Box>
    </div>
  );
}
