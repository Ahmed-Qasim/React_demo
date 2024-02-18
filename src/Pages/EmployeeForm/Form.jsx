import { TextField, Stack, MenuItem, Box, Autocomplete } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { useForm, Controller } from "react-hook-form";
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { isEmpty } from "../../utils";

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
    const [codeOptions, setcodeOptions] = useState([]);

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm();

    const fetchEmployeeFiles = async (filterObject) => {
        const URL =
            "/api/employees" +
            (filterObject && !isEmpty(filterObject)
                ? "?" + new URLSearchParams(filterObject)
                : "");

        const response = await fetch(URL);
        const data = await response.json();

        setcodeOptions(data.employees);
    };

    const getJobCodes = async () => {
        const res = await fetch("/api/jobCodes");
        const data = await res.json();
        setJobCodes(data.jobCodes);
    };
    const getEmpById = async (id) => {
        try {
            const res = await fetch(`/api/employees/${id}`);

        const data = await res.json();
            if (res.ok) {
                const employee = data.employee;
                Object.keys(employee).forEach((key) => {
                    setValue(key, employee[key]);
                });
            } else {
                const error = data.error;
                enqueueSnackbar(error, { variant: "error" });
                navigate("/");
            }
        } catch (err) {
            enqueueSnackbar(err.message, { variant: "error" });
            navigate("/");
        }
    };

    const handleEmployeeSelect = (value) => {
        // console.log("location :>> ", location);
        navigate("/employees/" + value.id);
    };
    const initializeForm = async () => {
        setLoadingForm(true);
        await getJobCodes();
        if (id) {
            await getEmpById(id);
        }
        setLoadingForm(false);
    };
    useEffect(() => {
        initializeForm();
    }, [id]);

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
                // setloadingButton(false);
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

    const createEmp = async (data) => {
        try {
            setloadingButton(true);
            const res = await fetch("/api/employees", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
            });
            console.log("res :>> ", res);
            const employee = await res.json();
            if (res.ok) {
                setloadingButton(false);
                enqueueSnackbar("Employee created Successfully", {
                    variant: "success",
                });
                navigate("/");
            } else {
                setloadingButton(false);
                const error = employee.error;
                enqueueSnackbar(error, { variant: "error" });
            }
        } catch (err) {
            setloadingButton(false);

            enqueueSnackbar(err.message, { variant: "error" });
        }
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
                <Autocomplete
                    {...register("code")}
                    disablePortal
                    freeSolo
                    id="combo-box-demo"
                    getOptionLabel={(employee) => `${employee.code}`}
                    size="small"
                    onChange={(event, newValue) =>
                        handleEmployeeSelect(newValue)
                    }
                    options={codeOptions}
                    renderInput={(params) => (
                        <TextField
                            onChange={(e) =>
                                fetchEmployeeFiles({ code: e.target.value })
                            }
                            {...params}
                            error={!!errors.code}
                            helperText={errors?.code?.message}
                            label="Code"
                        />
                    )}
                />
               
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
