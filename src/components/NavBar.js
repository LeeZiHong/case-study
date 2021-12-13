import React from "react";
import { useThemeUpdate } from "../Theme/ThemeContext";
import Switch from "@mui/material/Switch";
import auth from "../authentication/firebase";
import { Link } from "react-router-dom";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { Box, Button, Typography } from "@mui/material";
import { useCHistory } from "../Reducer/ReducerContext";

export default function NavBar() {
  const toggleTheme = useThemeUpdate();

  // For Switch
  const [checked, setChecked] = React.useState(false);
  const handleSwitchChange = (event) => {
    setChecked(event.target.checked);
  };

  const items = useCHistory();

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "8px 12px",
          position: "absolute",
          width: "90%",
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
          <Switch
            checked={checked}
            color="default"
            onChange={handleSwitchChange}
            inputProps={{ "aria-label": "controlled" }}
            onClick={toggleTheme}
          />
        </Box>
        <Button>
          <Link to="/history" style={{ textDecoration: "none" }}>
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
              HISTORY ({items.length})
            </Typography>
          </Link>
        </Button>
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
    </div>
  );
}
