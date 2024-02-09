import { Button, TextField, Stack, MenuItem } from "@mui/material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { useForm, Controller } from "react-hook-form";
import { addEmployee, getAllEmployees } from "../../Services/API.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import db from "../../Services/db.jsx";

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
const jobCode = [
    {
        value: "1243",
        label: "1243",
    },
    {
        value: "5712",
        label: "5712",
    },
    {
        value: "8762",
        label: "8762",
    },
];

function EntryForm() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/");
    };
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    const [maxId, setMaxId] = useState(0);

    useEffect(() => {
        const existingData = getAllEmployees();
        const maxId = Math.max(...existingData.map((employee) => employee.id));
        setMaxId(maxId);
        onSubmit();
    }, []);

    const onSubmit = (data) => {
        if (data) {
            const formattedDate = dayjs(data.hiringDate.$d).format(
                "DD/MM/YYYY"
            );
            console.log(formattedDate);
            const newEmployee = {
                id: maxId + 1,
                hiringDate: formattedDate,
                ...data,
            };
            addEmployee(newEmployee);
        }

        console.log(db);
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
                    <TextField
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
                    </TextField>
                    <Controller
                        control={control}
                        defaultValue={dayjs().startOf("D")}
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
                                format="DD/MM/YYYY"
                                value={value}
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
                        {jobCode.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Button variant="outlined" color="primary" type="submit">
                        Save
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleClick}
                    >
                        Query
                    </Button>
                </Stack>
            </form>
        </>
    );
}

export default EntryForm;
