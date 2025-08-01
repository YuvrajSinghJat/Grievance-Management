//optional

const { Employee } = require("../../../modals/user/employee.modal");

// Example function to create employee
const createEmployeeByDosa = async (req, res) => {
  try {
    const { empId, empName, Designation, Department, Faculty, MobileNo, Email, Password } = req.body;

    const existingEmployee = await Employee.findOne({ Email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Employee with this email already exists." });
    }

    const newEmployee = new Employee({
      empId,
      empName,
      Designation,
      Department,
      Faculty,
      MobileNo,
      Email,
      Password,
    });

    await newEmployee.save();

    res.status(201).json({ message: "Employee created successfully", employee: newEmployee });
  } catch (error) {
    console.error("Error creating employee by DOSA:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//view all employees
const VcViewAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});

    if (!employees || employees.length === 0) {
      return res.status(404).json({ message: "No employees found." });
    }

    return res.status(200).json({
      message: "Employees retrieved successfully",
      data: employees, 
    });
  } catch (error) {
    console.error("Error retrieving employees:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { 
  createEmployeeByDosa,
  VcViewAllEmployees
};
