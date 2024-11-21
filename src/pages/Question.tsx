import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const Question = () => {
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="h1" color="primary">
        Question
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{ ml: 2 }}
          onClick={() => navigate("/admin/question/create")}
        >
          Create Question
        </Button>
      </Typography>
    </>
  );
};
export default Question;
