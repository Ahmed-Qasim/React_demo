/* eslint-disable no-use-before-define */
import React from "react";
import { TextField, Stack, MenuItem, Box, Autocomplete } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Controller } from "react-hook-form";

export default function CodeAutoComplete({ control }) {
    const [employees, setEmployees] = useState([]);
    const stringCodes = employees.map((employee) => `${employee.code}`);
    const navigate = useNavigate();

    const filterEmployeesWithCode = async (code) => {
        const URL =
            `${import.meta.env.VITE_BASE_URL}/api/Employee?$filter=code eq ` + code;
        const response = await fetch(URL);
        const data = await response.json();
        setEmployees(data);
    };
    const handleEmployeeSelect = (value) => {
        const employee = employees.find((employee) => employee.code == value);

        navigate("/employees/" + employee.id);
    };
    return (
        <Controller
            name="code"
            control={control}
            render={({ field: { onChange, value }, formState: { errors } }) => (
                <Autocomplete
                    options={stringCodes}
                    value={value ? `${value}` : ""}
                    autoHighlight
                    getOptionLabel={(code) => `${code}`}
                    onChange={(event, newValue) => {
                        console.log("newValue :>> ", newValue);
                        onChange(newValue);
                        handleEmployeeSelect(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            helperText={errors?.code?.message}
                            error={!!errors.code}
                            label="Code"
                            variant="outlined"
                            fullWidth
                            value={`${value}`}
                            onChange={(e) => {
                                const codeValue = parseInt(e.target.value);
                                filterEmployeesWithCode(codeValue);
                                onChange(e.target.value);
                            }}
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: "disabled", // disable autocomplete and autofill
                            }}
                        />
                    )}
                />
            )}
        />
    );
}
