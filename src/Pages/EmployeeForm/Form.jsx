import { TextField, Stack, MenuItem, Box, Snackbar, Fade } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { useForm, Controller } from "react-hook-form";
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

dayjs.locale("en");

const status = [
    {
        value: "valid",
        label: "Valid",
    },
    {
        value: "unvalid",
        label: "Unvalid",
    },
];

function EntryForm() {
    const [loadingForm, setLoadingForm] = useState(true);
    const [jobCodes, setJobCodes] = useState(null);
    const [loadingButton, setloadingButton] = useState(false);

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm();

    const getJobCodes = async () => {
        const res = await fetch("/api/jobCodes");
        const data = await res.json();
        setJobCodes(data.jobCodes);
    };
    const getEmpById = async (id) => {
        const res = await fetch(`/api/employees/${id}`);
        const data = await res.json();
        const employee = data.employee;
        Object.keys(employee).forEach((key) => {
            setValue(key, employee[key]);
        });
    };
    const initializeForm = async () => {
        await getJobCodes();
        if (id) {
            await getEmpById(id);
        }
        setLoadingForm(false);
    };
    useEffect(() => {
        initializeForm();
    }, []);

    const updateEmp = (id, data) => {
        setloadingButton(true);
        fetch(`/api/employees/${id}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then(() => {
                setloadingButton(false);
                enqueueSnackbar("Employee updated successfully", {
                    variant: "success",
                });
                navigate("/");
            })

            .catch(() => {
                setloadingButton(false);
                enqueueSnackbar("Something went wrong", { variant: "error" });
            });
    };

    const createEmp = (data) => {
        setloadingButton(true);
        fetch("/api/employees", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then(() => {
                setloadingButton(false);
                enqueueSnackbar("Employee created Successfully", {
                    variant: "success",
                });
                navigate("/");
            })

            .catch(() => {
                setloadingButton(false);
                enqueueSnackbar("Something went wrong", { variant: "error" });
            });
    };

    const onSubmit = (data) => {
        const newData = {
            ...data,
            hiringDate: dayjs(data.hiringDate).toISOString(),
        };
        // update
        if (id) {
            updateEmp(id, newData);

            //create
        } else {
            createEmp(newData);
        }
    };
    if (loadingForm) {
        return (
            <Box sx={{ width: "100%" }}>
                <LinearProgress />
            </Box>
        );
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                <TextField
                    id="outlined-basic"
                    {...register("name", {
                        required: "Name Required",
                        minLength: {
                            value: 3,
                            message: "Name must be at least 3 characters long",
                        },
                    })}
                    label="Name"
                    type="text"
                    size="small"
                    error={!!errors.name}
                    helperText={errors?.name?.message}
                />
                <TextField
                    {...register("code")}
                    id="outlined-basic"
                    label="Code"
                    type="number"
                    size="small"
                    error={!!errors.code}
                    helperText={errors?.code?.message}
                />

                <TextField
                    select
                    label="Salary Status"
                    type="string"
                    size="small"
                    {...register("salaryStatus", {
                        required: "Code is required",
                    })}
                    defaultValue="valid"
                >
                    {status.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <Controller
                    control={control}
                    defaultValue={dayjs()}
                    name="hiringDate"
                    rules={{
                        required: {
                            value: true,
                            message: "Start date is required",
                        },
                    }}
                    render={({ field: { onChange, value, ref } }) => (
                        <DatePicker
                            label="Hiring Date"
                            disableFuture
                            onChange={onChange}
                            onAccept={onChange}
                            value={dayjs(value)}
                            inputRef={ref}
                        />
                    )}
                />

                <TextField
                    id="outlined-basic"
                    {...register("jobCode")}
                    select
                    defaultValue={jobCodes[0].value}
                    label="Job Code"
                    type="string"
                    size="small"
                >
                    {jobCodes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                {id ? (
                    <LoadingButton
                        loading={loadingButton}
                        loadingIndicator="Updating..."
                        variant="outlined"
                        type="submit"
                    >
                        Update
                    </LoadingButton>
                ) : (
                    <LoadingButton
                        loading={loadingButton}
                        loadingIndicator="Adding..."
                        variant="outlined"
                        type="submit"
                    >
                        Add
                    </LoadingButton>
                )}
            </Stack>
        </form>
    );
}

export default EntryForm;
