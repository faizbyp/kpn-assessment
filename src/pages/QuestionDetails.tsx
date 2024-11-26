import QuestionAnswer from "@/components/QuestionAnswer";
import { BoxSkeleton } from "@/components/Skeleton";
import useFetch from "@/hooks/useFetch";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const QuestionDetails = () => {
  const { id } = useParams();
  const { data } = useFetch<any>(`/question/${id}`);
  const question = data?.data;

  return (
    <>
      <Typography color="primary" variant="h1">
        Question Details
      </Typography>
      <Typography color="text.secondary">{id}</Typography>
      {question ? (
        <>
          <Typography sx={{ mb: 4 }}>Created by: {question.created_by}</Typography>
          <QuestionAnswer question={question.question} answers={question.answers} />
        </>
      ) : (
        <BoxSkeleton />
      )}
    </>
  );
};
export default QuestionDetails;
