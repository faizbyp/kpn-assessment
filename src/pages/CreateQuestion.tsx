import FileInput from "@/components/forms/FileInput";
import TextFieldCtrl from "@/components/forms/TextField";
import {
  Grid2 as Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  CardActions,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useFieldArray, useForm } from "react-hook-form";
import NumericFieldCtrl from "@/components/forms/NumericField";

interface AnswerValues {
  text?: string;
  image?: File;
  score: number;
}

interface QuestionValues {
  q_seq: number;
  q_layout_type: string;
  q_input_text?: string;
  q_input_image?: File;
  answer_type: string;
  answer: AnswerValues[];
}

const CreateQuestion = () => {
  const { control, getValues, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      q_seq: 0,
      q_layout_type: "",
      q_input_text: "",
      q_input_image: undefined,
      answer_type: "",
      answer: [
        {
          text: "",
          image: undefined,
          score: 0,
        },
        {
          text: "",
          image: undefined,
          score: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "answer",
    rules: {
      minLength: 2,
      maxLength: 5,
    },
  });

  const questionImage = watch("q_input_image");
  const watchAnswer = watch("answer");

  const removeQuestionImage = () => {
    setValue("q_input_image", undefined);
  };

  const removeAnswerImage = (index: number) => {
    setValue(`answer.${index}.image`, undefined);
  };

  const onSave = (values: QuestionValues) => {
    console.log(values);
    console.log(values.q_input_image?.toString());
  };

  return (
    <>
      <Typography variant="h2" color="primary">
        New Question
      </Typography>

      <Card raised>
        <CardContent>
          {!questionImage && (
            <FileInput control={control} name="q_input_image" text="Add Question Image" fullWidth />
          )}
          <Grid container spacing={2} alignItems="end">
            {questionImage && (
              <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex", position: "relative" }}>
                <img
                  src={URL.createObjectURL(questionImage)}
                  style={{ width: "100%", objectFit: "contain" }}
                />
                <IconButton sx={{ position: "absolute" }} onClick={removeQuestionImage}>
                  <ClearIcon />
                </IconButton>
              </Grid>
            )}
            <Grid size={{ xs: 12, sm: questionImage ? 6 : 12 }}>
              <TextFieldCtrl
                control={control}
                label="Question"
                name="q_input_text"
                minRows={8}
                multiline
                noMargin
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container spacing={2}>
            {watchAnswer.map((item, index) => (
              <Grid size={{ xs: 12, md: 12 / 5 }} key={index}>
                <Card variant="outlined" sx={{ flex: 1, bgcolor: "action.selected" }}>
                  <CardContent>
                    {item.image ? (
                      <Box sx={{ display: "flex", position: "relative", mb: 2 }}>
                        <img
                          src={URL.createObjectURL(item.image)}
                          style={{ width: "100%", objectFit: "contain" }}
                        />
                        <IconButton
                          sx={{ position: "absolute" }}
                          onClick={() => removeAnswerImage(index)}
                        >
                          <ClearIcon />
                        </IconButton>
                      </Box>
                    ) : (
                      <FileInput
                        control={control}
                        name={`answer.${index}.image`}
                        text="Add Answer Image"
                        fullWidth
                      />
                    )}
                    <TextFieldCtrl control={control} name={`answer.${index}.text`} label="Answer" />
                    <NumericFieldCtrl
                      control={control}
                      name={`answer.${index}.score`}
                      label="Score"
                      allowNegative
                    />
                    {fields.length > 2 && <Button onClick={() => remove(index)}>Delete</Button>}
                  </CardContent>
                </Card>
              </Grid>
            ))}
            {fields.length !== 5 && (
              <Button
                variant="outlined"
                onClick={() =>
                  append({
                    text: "",
                    image: undefined,
                    score: 0,
                  })
                }
              >
                Add
              </Button>
            )}
          </Grid>
        </CardActions>
      </Card>
      <Box textAlign="right">
        <Button onClick={handleSubmit(onSave)}>Save</Button>
      </Box>
    </>
  );
};
export default CreateQuestion;
