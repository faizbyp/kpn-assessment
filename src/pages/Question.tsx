import { Box, Button, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import StandardTable from "@/components/StandardTable";
import { TableSkeleton } from "@/components/Skeleton";
import { useMemo } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { truncateText } from "@/utils/constant";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const Question = () => {
  const navigate = useNavigate();
  const { data: question } = useFetch<any>("/question");

  const columns: any = useMemo(
    () => [
      {
        header: () => null,
        id: "expander",
        cell: ({ row }: { row: any }) => {
          return row.getCanExpand() ? (
            <IconButton
              {...{
                onClick: row.getToggleExpandedHandler(),
              }}
            >
              {row.getIsExpanded() ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          ) : null;
        },
      },
      {
        header: "Layout",
        accessorKey: "q_layout_type",
        cell: (props: any) => props.getValue(),
      },
      {
        header: "Question",
        accessorKey: "q_input_text",
        cell: (props: any) => (
          <>
            {props.getValue() ? (
              truncateText(props.getValue(), 100)
            ) : (
              <Typography color="text.secondary" fontStyle="italic">
                no text
              </Typography>
            )}
          </>
        ),
      },
      {
        header: "Question Image",
        accessorKey: "q_input_image_url",
        cell: (props: any) => (
          <Box sx={{ height: 100, display: "flex", alignItems: "center" }}>
            {props.getValue() ? (
              <img
                height={100}
                src={`${import.meta.env.VITE_API_URL}/static/question/${props.getValue()}`}
                alt="Cannot load image"
              />
            ) : (
              <Typography color="text.secondary" fontStyle="italic">
                no image
              </Typography>
            )}
          </Box>
        ),
      },
      {
        header: "Answer Type",
        accessorKey: "answer_type",
        cell: (props: any) => props.getValue(),
      },
      {
        header: "Created By",
        accessorKey: "created_by",
        cell: (props: any) => props.getValue(),
      },
      {
        header: "Action",
        accessorKey: "id",
        meta: { align: "right" },
        cell: (props: any) => (
          <>
            <IconButton
              onClick={() => navigate(`/admin/question/${props.row.original.id}`)}
              aria-label="edit"
              size="small"
              edge="end"
            >
              <InfoIcon />
            </IconButton>
          </>
        ),
      },
    ],
    []
  );

  const answerColumns: any = useMemo(
    () => [
      {
        header: "Answer",
        accessorKey: "text",
        cell: (props: any) => props.getValue(),
      },
      {
        header: "Answer Image",
        accessorKey: "image_url",
        cell: (props: any) => (
          <Box sx={{ height: 75, display: "flex", alignItems: "center" }}>
            {props.getValue() ? (
              <img
                height={75}
                src={`${import.meta.env.VITE_API_URL}/static/question/${props.getValue()}`}
                alt="Cannot load image"
              />
            ) : (
              <Typography color="text.secondary" fontStyle="italic">
                no image
              </Typography>
            )}
          </Box>
        ),
      },
      {
        header: "Point",
        accessorKey: "point",
        cell: (props: any) => props.getValue(),
      },
    ],
    []
  );

  const answerTable = ({ row }: { row: any }) => {
    return (
      <>
        <StandardTable columns={answerColumns} data={row.original.answers} />
      </>
    );
  };

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

      {question ? (
        <StandardTable columns={columns} data={question?.data} renderSubComponent={answerTable} />
      ) : (
        <TableSkeleton column={4} row={2} small />
      )}
    </>
  );
};
export default Question;
