import DialogComp from "@/components/Dialog";
import QuestionAnswer from "@/components/QuestionAnswer";
import { QuestionSkeleton } from "@/components/Skeleton";
import useAPI from "@/hooks/useAPI";
import useDialog from "@/hooks/useDialog";
import useFetch from "@/hooks/useFetch";
import { useLoading } from "@/providers/LoadingProvider";
import { snack } from "@/providers/SnackbarProvider";
import { Box, Button, Typography } from "@mui/material";
import { isAxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";

const QuestionDetails = () => {
  const { id } = useParams();
  const { data } = useFetch<any>(`/question/${id}`);
  const navigate = useNavigate();
  const API = useAPI();
  const { showLoading, hideLoading } = useLoading();
  const { isOpen: isOpenDelete, open: openDelete, close: closeDelete } = useDialog();
  const question = data?.data;

  const handleDelete = async () => {
    showLoading();
    const url = `/question/${id}`;

    try {
      const res = await API.delete(url);
      snack.success(`${res.data.message}`);
      navigate("/admin/question");
    } catch (error) {
      if (isAxiosError(error)) {
        const data = error.response?.data;
        snack.error(data.message);
      } else {
        snack.error("Error");
      }
      console.error(error);
    } finally {
      hideLoading();
    }
  };

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography color="primary" variant="h1">
          Question Details
        </Typography>
        <Typography color="text.secondary">{id}</Typography>
        <Typography>Created by: {question?.created_by}</Typography>
      </Box>

      {question ? (
        <QuestionAnswer question={question.question} answers={question.answers} />
      ) : (
        <QuestionSkeleton />
      )}

      <Box sx={{ my: 8 }}>
        <Typography variant="h2" color="error">
          DANGER ZONE
        </Typography>
        <Button variant="contained" color="error" sx={{ mt: 1 }} onClick={openDelete}>
          Delete Question
        </Button>
      </Box>

      <DialogComp
        title={`Delete Question`}
        open={isOpenDelete}
        onClose={closeDelete}
        actions={
          <>
            <Button onClick={closeDelete} variant="outlined" color="error">
              Cancel
            </Button>
            <Button onClick={handleDelete} variant="contained" color="error">
              Delete
            </Button>
          </>
        }
      >
        <Typography>{`Are you sure you want to delete this question?`}</Typography>
      </DialogComp>
    </>
  );
};
export default QuestionDetails;
