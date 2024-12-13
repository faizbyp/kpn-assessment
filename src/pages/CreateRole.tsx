import CheckboxCtrl from "@/components/forms/Checkbox";
import TextFieldCtrl from "@/components/forms/TextField";
import { TableSkeleton } from "@/components/Skeleton";
import StandardTable from "@/components/StandardTable";
import useAPI from "@/hooks/useAPI";
import useAuthStore from "@/hooks/useAuthStore";
import useFetch from "@/hooks/useFetch";
import { useLoading } from "@/providers/LoadingProvider";
import { snack } from "@/providers/SnackbarProvider";
import { Box, Button, Typography } from "@mui/material";
import { isAxiosError } from "axios";
import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CreateRole = () => {
  const { data: menu } = useFetch<any>("/menu");
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();
  const API = useAPI();
  const user_id = useAuthStore((state) => state.user_id);
  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      role_name: "",
      is_active: true,
      created_by: user_id,
      permission: [{ menu_id: 0, fcreate: false, fread: false, fupdate: false, fdelete: false }],
    },
  });

  useEffect(() => {
    if (menu) {
      reset({
        is_active: true,
        created_by: user_id,
        permission: menu.data.map((menu: any) => ({
          menu_id: menu.id,
          fcreate: false,
          fread: false,
          fupdate: false,
          fdelete: false,
        })),
      });
    }
  }, [menu]);

  const columns: any = useMemo(
    () => [
      {
        header: "Menu",
        accessorKey: "name",
        cell: (props: any) => props.getValue(),
      },
      {
        header: "Create",
        cell: (props: any) => {
          const fread = useWatch({
            control,
            name: `permission.${props.row.index}.fread`,
          });
          useEffect(() => {
            if (!fread) {
              setValue(`permission.${props.row.index}.fcreate`, false);
              setValue(`permission.${props.row.index}.fupdate`, false);
              setValue(`permission.${props.row.index}.fdelete`, false);
            }
          }, [fread, props.row.index, setValue]);
          return (
            <CheckboxCtrl
              name={`permission.${props.row.index}.fcreate`}
              control={control}
              color="success"
              disabled={!fread}
            />
          );
        },
      },
      {
        header: "Read",
        cell: (props: any) => (
          <CheckboxCtrl
            name={`permission.${props.row.index}.fread`}
            control={control}
            color="success"
          />
        ),
      },
      {
        header: "Update",
        cell: (props: any) => {
          const fread = useWatch({
            control,
            name: `permission.${props.row.index}.fread`,
          });
          return (
            <CheckboxCtrl
              name={`permission.${props.row.index}.fupdate`}
              control={control}
              color="success"
              disabled={!fread}
            />
          );
        },
      },
      {
        header: "Delete",
        cell: (props: any) => {
          const fread = useWatch({
            control,
            name: `permission.${props.row.index}.fread`,
          });
          return (
            <CheckboxCtrl
              name={`permission.${props.row.index}.fdelete`}
              control={control}
              color="success"
              disabled={!fread}
            />
          );
        },
      },
    ],
    []
  );

  const onSubmit = async (values: any) => {
    console.log(values);
    showLoading();
    try {
      const res = await API.post(`/admin/role`, values);
      snack.success(`${res.data.message}`);
      navigate("/admin/role");
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
      <Typography variant="h1" color="primary">
        Create Role
      </Typography>
      <TextFieldCtrl
        control={control}
        name="role_name"
        label="Role Name"
        rules={{ required: "This field is required" }}
      />

      <Typography mb={1} fontWeight="bold">
        Access Permission
      </Typography>
      {menu ? <StandardTable data={menu?.data} columns={columns} /> : <TableSkeleton column={5} />}

      <Box sx={{ textAlign: "right" }}>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </Box>
    </>
  );
};
export default CreateRole;
