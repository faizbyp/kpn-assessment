import { Box, Button, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import StandardTable from "@/components/StandardTable";
import { TableSkeleton } from "@/components/Skeleton";
import { useMemo, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { truncateText } from "@/utils/constant";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import useAPI from "@/hooks/useAPI";
import { isAxiosError } from "axios";
import { snack } from "@/providers/SnackbarProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLoading } from "@/providers/LoadingProvider";
import useDialog from "@/hooks/useDialog";
import DialogComp from "@/components/Dialog";

const Question = () => {
  const API = useAPI();
  const navigate = useNavigate();
  const { data: question, refetch } = useFetch<any>("/question");
  const [selected, setSelected] = useState("");
  const { showLoading, hideLoading } = useLoading();
  const { open, isOpen, close } = useDialog();

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
          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton
              onClick={() => handleOpen(props.row.original.id)}
              aria-label="edit"
              size="small"
              edge="end"
              color="error"
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              onClick={() => navigate(`/admin/question/${props.row.original.id}`)}
              aria-label="edit"
              size="small"
              edge="end"
            >
              <InfoIcon />
            </IconButton>
          </Box>
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

  const handleOpen = (id: string) => {
    setSelected(id);
    open();
  };

  const handleDelete = async () => {
    showLoading();
    const url = `/question/${selected}`;

    try {
      const res = await API.delete(url);
      snack.success(`${res.data.message}`);
      refetch();
    } catch (error) {
      if (isAxiosError(error)) {
        const data = error.response?.data;
        snack.error(data.message);
      } else {
        snack.error("Error");
      }
      console.error(error);
    } finally {
      close();
      hideLoading();
    }
  };

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

      <DialogComp
        title={`Delete Question`}
        open={isOpen}
        onClose={close}
        actions={
          <>
            <Button onClick={close} variant="outlined" color="error">
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
export default Question;
