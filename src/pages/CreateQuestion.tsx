import FileInput from "@/components/forms/FileInput";
import TextFieldCtrl from "@/components/forms/TextField";
import {
  Grid2 as Grid,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  CardActions,
} from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import NumericFieldCtrl from "@/components/forms/NumericField";

interface AnswerValues {
  text?: string;
  image?: File;
  point: number;
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
  const { control, handleSubmit, watch, setValue } = useForm<QuestionValues>({
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
          point: 0,
        },
        {
          text: "",
          image: undefined,
          point: 0,
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
  const watchAnswer = useWatch({ control, name: "answer" });

  const removeQuestionImage = () => {
    setValue("q_input_image", undefined);
  };

  // const addAnswerImage = (index: number, image: File) => {
  //   setValue(`answer.${index}.image`, image);
  // };

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
          <Grid container spacing={2} alignItems="end">
            {questionImage && (
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
                  src={URL.createObjectURL(questionImage)}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
                <IconButton
                  sx={{ position: "absolute", top: 0, left: 0 }}
                  onClick={removeQuestionImage}
                >
                  <ClearIcon />
                </IconButton>
              </Grid>
            )}
            <Grid size={{ xs: 12, sm: questionImage ? 8 : 12 }} sx={{ position: "relative" }}>
              <TextFieldCtrl
                control={control}
                placeholder="Question"
                name="q_input_text"
                minRows={8}
                multiline
                noMargin
                textAlign="center"
              />
              {!questionImage && (
                <FileInput
                  floating
                  control={control}
                  name="q_input_image"
                  text="Add Question Image"
                  fullWidth
                  icon={<InsertPhotoIcon />}
                />
              )}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Box sx={{ display: "flex", gap: 2 }}>
            {watchAnswer.map((item, index) => (
              <Card
                variant="outlined"
                sx={{ bgcolor: "action.selected", display: "flex", alignItems: "end" }}
                key={index}
              >
                <CardContent>
                  {item.image ? (
                    <Box sx={{ display: "flex", position: "relative", mb: 2, height: 200 }}>
                      <img
                        src={URL.createObjectURL(item.image)}
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
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
                      icon={<InsertPhotoIcon />}
                      // passFile={(file) => addAnswerImage(index, file)}
                    />
                  )}
                  <TextFieldCtrl
                    control={control}
                    name={`answer.${index}.text`}
                    placeholder="Answer"
                    textAlign="center"
                    multiline
                  />
                  <NumericFieldCtrl
                    control={control}
                    name={`answer.${index}.point`}
                    label="Point"
                    allowNegative
                    maxLength={3}
                  />
                  {fields.length > 2 && (
                    <IconButton color="error" onClick={() => remove(index)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </CardContent>
              </Card>
            ))}
            {fields.length !== 5 && (
              <Button
                variant="outlined"
                onClick={() =>
                  append({
                    text: "",
                    image: undefined,
                    point: 0,
                  })
                }
              >
                <AddCircleIcon />
              </Button>
            )}
          </Box>
        </CardActions>
      </Card>
      <Box textAlign="right">
        <Button onClick={handleSubmit(onSave)}>Save</Button>
      </Box>
    </>
  );
};
export default CreateQuestion;
