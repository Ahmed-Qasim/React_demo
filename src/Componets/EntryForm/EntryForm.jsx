import {
    Button,
    TextField,
    Stack,
    MenuItem,
    Select,
    InputLabel,
} from "@mui/material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { useForm, Controller } from "react-hook-form";
import {
    addEmployee,
    getEmployeeById,
    updateEmployee,
} from "../../Services/API.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import db from "../../Services/db.jsx";
import { useState } from "react";

dayjs.locale("en");

const status = [
    {
        value: "valid",
        label: "valid",
    },
    {
        value: "unvalid",
        label: "unvalid",
    },
];

function EntryForm() {
    const navigate = useNavigate();

    const { id } = useParams();

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (id) {
            const fetchedEmp = getEmployeeById(id);
            console.log("fetchedEmp :>> ", fetchedEmp);
            if (!fetchedEmp) {
                //TODO: resource not found
                navigate("/");
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
            navigate("/");
            //create
        } else {
            addEmployee(newData);
            navigate("/");
        }

        // console.log(db);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack width={450} spacing={2}>
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
                            required: "Code is required",
                            maxLength: {
                                value: 5,
                                message:
                                    "Code must be at most 5 characters long",
                            },
                        })}
                        id="outlined-basic"
                        label="Code"
                        type="number"
                        size="small"
                        error={!!errors.code}
                        helperText={errors?.code?.message}
                    />

                    <Controller
                        name="salaryStatus"
                        control={control}
                        render={({ field }) => (
                            <Select {...field}>
                                {status.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    />

                    {/* <TextField
                        id="outlined-basic"
                        {...register("salaryStatus")}
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
                    </TextField> */}
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
                        label="Job Code"
                        type="string"
                        size="small"
                    >
                        {db.JobCodes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
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
