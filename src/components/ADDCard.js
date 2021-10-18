import React, { useState } from "react";
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
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";

// For dialog
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function AddCard({ address }) {
  // For handling dialogs
  const [openADD, setOpenADD] = React.useState(false);
  const handleADDOpen = () => {
    setOpenADD(true);
  };
  const handleADDClose = () => {
    setOpenADD(false);
  };
  const [openConfirmation, setConfirmation] = React.useState(false);
  const handleConfirmationOpen = () => {
    setConfirmation(true);
  };
  const handleConfirmationClose = () => {
    setConfirmation(false);
  };

  // For address update & delete
  const [addName, setAddName] = useState(address.addName);
  const [addUnit, setAddUnit] = useState(address.addUnit);
  const [addStreet, setAddStreet] = useState(address.addStreet);
  const [addPostC, setAddPostC] = useState(address.addPostC);
  const [addCountry, setAddCountry] = useState(address.addCountry);
  const handleADDUpdate = (e) => {
    e.preventDefault();
    setOpenADD(false);
    fetch(`http://localhost:8000/addresses/${address.id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        addName,
        addUnit,
        addStreet,
        addPostC,
        addCountry,
      }),
    });
  };
  const handleADDDelete = (e) => {
    e.preventDefault();
    setConfirmation(false);
    setOpenADD(false);
    fetch(`http://localhost:8000/addresses/${address.id}`, {
      method: "DELETE",
    });
  };

  return (
    <div className="add-card">
      {/* Card of addresses info */}
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
            <IconButton onClick={handleADDOpen}>
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
                color: "#389466",
              }}
            >
              {address.addName}
            </Typography>
          }
        />

        {/* Addresses edit dialog */}
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
              Edit Address
            </Typography>
            <form noValidate autoComplete="off" onSubmit={handleADDUpdate}>
              <TextField
                onChange={(e) => setAddName(e.target.value)}
                label="Address Name"
                fullWidth
                required
                defaultValue={address.addName}
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
                defaultValue={address.addUnit}
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
                defaultValue={address.addStreet}
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
                defaultValue={address.addPostC}
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
                defaultValue={address.addCountry}
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
            </form>
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
                top: "375px",
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

        {/* Addresses delete confirmation dialog */}
        <BootstrapDialog
          onClose={handleConfirmationClose}
          open={openConfirmation}
        >
          <DialogTitle id="alert-dialog-title">{"Delete Address"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleADDDelete} color="primary" autoFocus>
              Yes
            </Button>
            <Button onClick={handleConfirmationClose} color="primary">
              No
            </Button>
          </DialogActions>
        </BootstrapDialog>

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
              <Typography style={{ paddingLeft: "20px" }}>
                {address.addUnit}
              </Typography>
              <Typography style={{ paddingLeft: "20px" }}>
                {address.addStreet}
              </Typography>
              <Typography style={{ paddingLeft: "20px" }}>
                {address.addPostC} {address.addCountry}
              </Typography>
            </div>
          }
        </CardContent>
      </Card>
    </div>
  );
}
