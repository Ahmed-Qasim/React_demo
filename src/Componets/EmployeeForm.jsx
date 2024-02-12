import { Button, TextField, Stack, MenuItem } from "@mui/material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { useForm, Controller } from "react-hook-form";
import {
    addEmployee,
    getEmployeeById,
    getJobCodes,
    updateEmployee,
} from "../Services/API.jsx";
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
    const navigate = useNavigate();
    const [jobCodes, setJobCodes] = useState(null);
    const { id } = useParams();

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        const jobCodes = getJobCodes();

        setJobCodes(jobCodes);
        if (id) {
            const fetchedEmp = getEmployeeById(id);
            if (!fetchedEmp) {
                //TODO: resource not found

                throw new Error("Employee not found");
            } else {
                Object.keys(fetchedEmp).forEach((key) => {
                    setValue(key, fetchedEmp[key]);
                });
            }
        }
    }, [id, setValue]);

    const onSubmit = (data) => {
        const newData = {
            ...data,
            hiringDate: dayjs(data.hiringDate).toISOString(),
        };
        // update
        if (id) {
            updateEmployee(id, newData);
            //create
        } else {
            addEmployee(newData);
        }
        navigate("/");
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack
                    width={500}
                    spacing={2}
                    sx={{
                        borderRadius: "10px",
                        borderColor: "text.disabled",
                        padding: 5,
                        border: 1,
                        bgcolor: "background.paper",
                    }}
                >
                    <TextField
                        id="outlined-basic"
                        {...register("name", {
                            required: "Name Required",
                            minLength: {
                                value: 3,
                                message:
                                    "Name must be at most 3 characters long",
                            },
                        })}
                        label="Name"
                        type="name"
                        size="small"
                        error={!!errors.name}
                        helperText={errors?.name?.message}
                    />
                    <TextField
                        {...register("code", {
                            // required: "Code is required",
                            // maxLength: {
                            //     value: 5,
                            //     message:
                            //         "Code must be at most 5 characters long",
                            // },
                        })}
                        id="outlined-basic"
                        label="Code"
                        type="number"
                        size="small"
                        error={!!errors.code}
                        helperText={errors?.code?.message}
                    />

                    <TextField
                        id="outlined-basic"
                        {...register("salaryStatus")}
                        defaultValue={""}
                        select
                        label="Salary Status"
                        type="string"
                        size="small"
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
                    {/* TODO: Split jobcodes into single component */}
                    {jobCodes && (
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
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                    {id ? (
                        <Button
                            variant="outlined"
                            color="primary"
                            type="submit"
                        >
                            Update
                        </Button>
                    ) : (
                        <Button
                            variant="outlined"
                            color="primary"
                            type="submit"
                        >
                            Create
                        </Button>
                    )}
                </Stack>
            </form>
        </>
    );
}

export default EntryForm;
