"use client";

import moment from "moment";
import { Controller, useForm } from "react-hook-form";
import {
  FormControlLabel,
  Box,
  RadioGroup,
  Radio,
  Button,
  Typography,
  Grid2 as Grid,
} from "@mui/material";
import TextFieldCtrl from "./TextField";
import { useState } from "react";
import API from "@/services/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ApprovalAction = ({ id_user, id_po, id_gr }) => {
  const [reject, setReject] = useState(false);
  const [approve, setApprove] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { control, handleSubmit, resetField } = useForm({
    defaultValues: {
      status: "",
      id_user: id_user,
      approval_date: moment(),
      reject_notes: "",
    },
  });

  const handleApproval = async (values) => {
    setLoading(true);
    console.log(values);
    let url;
    if (id_po) url = `/po/approval/${id_po}`;
    if (id_gr) url = `/gr/approval/${id_gr}`;

    try {
      const res = await API.patch(url, values);
      toast.success(`${res.data.message}`);
      router.push("/dashboard");
    } catch (error) {
      if (isAxiosError(error)) {
        const data = error.response?.data;
        toast.error(data.message);
      } else {
        toast.error("Error");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={4} sx={{ mt: 4 }}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="h2">Approval</Typography>
        <Box component="form" onSubmit={handleSubmit(handleApproval)} sx={{ width: "100%" }}>
          <Controller
            rules={{ required: true }}
            control={control}
            name="status"
            render={({ field }) => (
              <RadioGroup {...field} row>
                <FormControlLabel
                  value="approved"
                  control={<Radio />}
                  label="Approve"
                  onClick={() => {
                    setReject(false);
                    setApprove(true);
                    resetField("reject_notes");
                  }}
                />
                <FormControlLabel
                  value="rejected"
                  control={<Radio />}
                  label="Reject"
                  onClick={() => {
                    setApprove(false);
                    setReject(true);
                  }}
                />
              </RadioGroup>
            )}
          />
          {approve && (
            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={loading}
              sx={{ mt: 2 }}
            >
              Approve
            </Button>
          )}
          {reject && (
            <Box sx={{ mt: 2 }}>
              <TextFieldCtrl
                multiline={true}
                rows={5}
                control={control}
                name="reject_notes"
                label="Reject Notes"
                rules={{
                  required: true,
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="error"
                disabled={loading}
                sx={{ mt: 1 }}
              >
                Reject
              </Button>
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ApprovalAction;
