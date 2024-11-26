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
  MenuItem,
} from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import NumericFieldCtrl from "@/components/forms/NumericField";
import useAPI from "@/hooks/useAPI";
import { snack } from "@/providers/SnackbarProvider";
import { isAxiosError } from "axios";
import { useLoading } from "@/providers/LoadingProvider";
import useAuthStore from "@/hooks/useAuthStore";
import SelectCtrl from "@/components/forms/Select";
import { useNavigate } from "react-router-dom";

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
  const API = useAPI();
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();
  const user_id = useAuthStore((state) => state.user_id);
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<QuestionValues>({
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

  const answerType = [
    {
      name: "Single Answer",
      value: "single",
    },
    {
      name: "Multiple Answer",
      value: "multiple",
    },
  ];

  const removeQuestionImage = () => {
    setValue("q_input_image", undefined);
  };

  // const addAnswerImage = (index: number, image: File) => {
  //   setValue(`answer.${index}.image`, image);
  // };

  const removeAnswerImage = (index: number) => {
    setValue(`answer.${index}.image`, undefined);
  };

  const onSubmit = async (values: QuestionValues) => {
    console.log(values);
    console.log(values.q_input_image?.toString());

    const validAnswers = values.answer.filter((answer) => answer.point > 0);
    const invalidAnswerIndex = values.answer.findIndex(
      (answer: AnswerValues) => !answer.text && !answer.image
    );

    if (invalidAnswerIndex !== -1) {
      setError("answer", {
        type: "custom",
        message: "Each answer must have either text or an image.",
      });
      return;
    }
    if (values.answer_type === "single" && validAnswers.length < 1) {
      setError("answer", {
        type: "custom",
        message: "At least one answer must have more than 0 points.",
      });
      return;
    }
    if (values.answer_type === "multiple" && validAnswers.length < 2) {
      setError("answer", {
        type: "custom",
        message: "At least two answers must have more than 0 points.",
      });
      return;
    }
    clearErrors("answer");

    showLoading();

    const formData = new FormData();
    // Append primitive and non-file properties
    formData.append("created_by", user_id);
    formData.append("q_seq", values.q_seq.toString());
    formData.append("q_layout_type", values.q_layout_type);
    formData.append("q_input_text", values.q_input_text ? values.q_input_text : "");
    formData.append("answer_type", values.answer_type);

    // Append the file for `q_input_image`
    if (values.q_input_image) {
      formData.append("q_input_image", values.q_input_image);
    }

    // Serialize and append the `answer` array
    values.answer.forEach((ans, index) => {
      if (ans.text) {
        formData.append(`answer[${index}][text]`, ans.text);
      }
      formData.append(`answer[${index}][point]`, ans.point.toString());
      if (ans.image) {
        formData.append(`answer[${index}][image]`, ans.image);
      }
    });
    console.log(formData);

    try {
      const res = await API.post(`/question`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      snack.success(`${res.data.message}`);
      navigate("/admin/question");
    } catch (error) {
      if (isAxiosError(error)) {
        const data = error.response?.data;
        snack.error(data.message);
        console.error(error.response);
      } else {
        snack.error("Error, check log for details");
        console.error(error);
      }
    } finally {
      hideLoading();
    }
  };

  return (
    <>
      <Typography variant="h2" color="primary">
        New Question
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        {/* <NumericFieldCtrl control={control} name="q_seq" label="Sequence" /> */}
        <SelectCtrl
          name="answer_type"
          label="Answer Type"
          control={control}
          rules={{
            required: "Field required",
          }}
        >
          {answerType.map((data) => (
            <MenuItem key={data.value} value={data.value}>
              {data.name}
            </MenuItem>
          ))}
        </SelectCtrl>
      </Box>

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
      {errors.answer?.message && (
        <Typography color="error" mt={4}>
          {errors.answer.message}
        </Typography>
      )}
      <Box textAlign="right" mt={4}>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Save
        </Button>
      </Box>
    </>
  );
};
export default CreateQuestion;
