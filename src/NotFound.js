import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

// For invalid website link
const NotFound = () => {
  return (
    <div className="not-found">
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          position: "absolute",
          top: "30%",
        }}
      >
        <Typography
          variant="h1"
          component="div"
          gutterBottom
          sx={{ fontWeight: "medium" }}
        >
          That page cannot be found
        </Typography>
        <Typography variant="body1" gutterBottom>
          Sorry, the page you were looking for could not be found.
        </Typography>
        <Typography variant="button" display="block" gutterBottom>
          <Link to="/">Back to Home</Link>
        </Typography>
      </Box>
    </div>
  );
};

export default NotFound;
