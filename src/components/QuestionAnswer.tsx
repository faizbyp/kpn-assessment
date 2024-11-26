import { Box, Card, CardActions, Typography, Grid2 as Grid, CardContent } from "@mui/material";
import Answer from "./Answer";
import { QuestionProps } from "@/types/MasterData";

const QuestionAnswer = ({ question, answers }: QuestionProps) => {
  return (
    <Card raised>
      <CardContent>
        <Grid container spacing={2} alignItems="end">
          {question.input_image_url && (
            <Grid
              size={{ xs: 12, sm: 4 }}
              sx={{
                display: "flex",
                position: "relative",
                height: 300,
                justifyContent: "center",
              }}
            >
              <img
                src={`${import.meta.env.VITE_API_URL}/static/question/${question.input_image_url}`}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </Grid>
          )}
          <Grid
            size={{ xs: 12, sm: question.input_image_url ? 8 : 12 }}
            sx={{ position: "relative" }}
          >
            {question.input_text && (
              <Box
                sx={{
                  display: "flex",
                  height: 300,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography>{question.input_text}</Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
          {answers.map((answer) => (
            <Answer text={answer.text} image_url={answer.image_url} point={answer.point} />
          ))}
        </Box>
      </CardActions>
    </Card>
  );
};
export default QuestionAnswer;
