import mockData from "./db";
const DATABASE_KEY = "joberDatabase";
const initializeDatabase = () => {
    const localDatabaseString = localStorage.getItem(DATABASE_KEY);

    if (localDatabaseString) {
        return JSON.parse(localDatabaseString);
    } else {
        localStorage.setItem(DATABASE_KEY, JSON.stringify(mockData));
        return mockData;
    }
};

const database = initializeDatabase();

const saveDatabase = (database) => {
    localStorage.setItem(DATABASE_KEY, JSON.stringify(database));
    console.log(database);
};

// Add Employee
export const addEmployee = (employee) => {
    const newEmployees = [...database.employees];

    const id = Math.max(...newEmployees.map((employee) => employee.id)) + 1;
    console.log("employee.code :>> ", employee.code);
    let code;
    if (employee.code != null && employee.code !== "") {
        console.log("iam in ");
        code = employee.code;
        code = parseInt(employee.code);
    } else {
        console.log("else");
        code = Math.max(...newEmployees.map((employee) => employee.code)) + 1;
        console.log(code);
    }
    const date = employee.hiringDate;
    const newEmployee = {
        ...employee,
        id: id,
        code: code,
        hiringDate: date,
        
    };
    console.log("newEmployee :>> ", newEmployee);
    newEmployees.push(newEmployee);
    const newDatabase = {
        ...database,
        employees: newEmployees,
    };
    saveDatabase(newDatabase);
};

// Get Employee by ID
export const getEmployeeById = (id) => {
    return database.employees.find((employee) => employee.id == id);
};

// Update Employee
export const updateEmployee = (Id, updatedEmployee) => {
    const index = database.employees.findIndex((employee) => employee.id == Id);
    if (index !== -1) {
        const newEmployees = [...database.employees];
        newEmployees[index] = {
            ...database.employees[index],
            ...updatedEmployee,
        };

        const newDatabase = {
            ...database,
            employees: newEmployees,
        };
        saveDatabase(newDatabase);
    }
};

// Delete Employee
export const deleteEmployee = (id) => {
    const index = database.employees.findIndex(
        (employee) => employee.id === id
    );
    if (index !== -1) {
        const newEmployees = [...database.employees];
        newEmployees.splice(index, 1);
        database.employees = newEmployees;
        const newDatabase = {
            ...database,
            employees: newEmployees,
        };
        saveDatabase(newDatabase);
        console.log(newDatabase);
    }
};

// Filter Employees

// export const filterEmployees = (criteria) => {
//     return database.employees.filter((employee) => {
//         for (const key in criteria) {
//             if (criteria.hasOwnProperty(key)) {
//                 if (employee[key] !== criteria[key]) {
//                     return false;
//                 }
//             }
//         }
//         return true;
//     });
// };

export const getEmployees = (filterObject) => {
    const { employees } = database;
    // If no filter object is provided, return all employees
    if (!filterObject) {
        return employees;
    }

    // Filter the employees based on the filter object
    return employees.filter((employee) => {
        return Object.entries(filterObject).every(([key, value]) => {
            if (!employee.hasOwnProperty(key)) {
                return false;
            }
            // Perform strict equality check
            return employee[key]
                ?.toString()
                .toLowerCase()
                .includes(value?.toString().toLowerCase());
        });
    });
};
export const getJobCodes = () => {
    return database.JobCodes;
};
