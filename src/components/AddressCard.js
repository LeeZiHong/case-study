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
import AddressEditCard from "./AddressEditCard";

export default function AddCard({ address }) {
  // For handling dialogs
  const [openADD, setOpenADD] = React.useState(false);
  const handleADDOpen = () => {
    setOpenADD(true);
  };
  const handleADDClose = () => {
    setOpenADD(false);
  };

  const darkTheme = useTheme();

  return (
    <div className="add-card">
      {/* Card of addresses info */}
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
              onClick={handleADDOpen}
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
                fontWeight: "500",
                fontSize: "20px",
                lineHeight: "160%",
                letterSpacing: "0.15px",
                color: darkTheme ? "#389466" : "#85E1B3",
              }}
            >
              {address.addName}
            </Typography>
          }
        />

        {/* Addresses edit dialog */}
        <AddressEditCard
          address={address}
          setOpenADD={setOpenADD}
          handleADDClose={handleADDClose}
          darkTheme={darkTheme}
          openADD={openADD}
        />

        <CardContent>
          {
            <div
              sx={{
                fontFamily: "Open Sans",
                fontStyle: "normal",
                fontWeight: "normal",
                fontSize: "16px",
                lineHeight: "150%",
                letterSpacing: "0.15px",
                color: "rgba(0, 0, 0, 0.87)",
              }}
            >
              <Typography
                style={{
                  paddingLeft: "20px",
                  color: darkTheme ? "#000000" : "#FFFFFF",
                }}
              >
                {address.addUnit}
              </Typography>
              <Typography
                style={{
                  paddingLeft: "20px",
                  color: darkTheme ? "#000000" : "#FFFFFF",
                }}
              >
                {address.addStreet}
              </Typography>
              <Typography
                style={{
                  paddingLeft: "20px",
                  color: darkTheme ? "#000000" : "#FFFFFF",
                }}
              >
                {address.addPostC} {address.addCountry}
              </Typography>
            </div>
          }
        </CardContent>
      </Card>
    </div>
  );
}
