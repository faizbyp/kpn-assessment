import { Box, Card, Typography, CardContent } from "@mui/material";
import { AnswerProps } from "@/types/MasterData";

const Answer = ({ text, image_url, point }: AnswerProps) => {
  return (
    <Card
      variant="outlined"
      sx={{
        bgcolor: "action.selected",
        display: "flex",
        alignItems: "end",
        width: "100%",
      }}
    >
      <CardContent sx={{ width: "100%" }}>
        {image_url && (
          <Box sx={{ display: "flex", mb: 2, height: 200 }}>
            <img
              src={`${import.meta.env.VITE_API_URL}/static/question/${image_url}`}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Box>
        )}
        {text && <Typography textAlign="center">{text}</Typography>}
        {point && (
          <Typography textAlign="center" color={point > 0 ? "success" : "error"}>
            Point: {point}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
export default Answer;
