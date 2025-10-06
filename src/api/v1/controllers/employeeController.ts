import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";
import { ApiResponse } from "../../../models/response";

export function getAllEmployees(_req: Request, res: Response) {
  const employees = employeeService.getAllEmployees();
  const response: ApiResponse<typeof employees> = {
    success: true,
    data: employees,
  };
  res.json(response);
}

export function getEmployeeById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const employee = employeeService.getEmployeeById(id);
  if (!employee) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Employee not found",
    };
    return res.status(404).json(response);
  }
  const response: ApiResponse<typeof employee> = {
    success: true,
    data: employee,
  };
  res.json(response);
}

export function createEmployee(req: Request, res: Response) {
  const { name, position, department, email, phone, branchId } = req.body;
  if (!name || !position || !department || !email || !phone || !branchId) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Missing required fields",
    };
    return res.status(400).json(response);
  }
  const newEmployee = employeeService.createEmployee({ name, position, department, email, phone, branchId });
  const response: ApiResponse<typeof newEmployee> = {
    success: true,
    data: newEmployee,
  };
  res.status(201).json(response);
}

export function updateEmployee(req: Request, res: Response) {
  const id = Number(req.params.id);
  const updates = req.body;
  const updated = employeeService.updateEmployee(id, updates);
  if (!updated) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Employee not found",
    };
    return res.status(404).json(response);
  }
  const response: ApiResponse<typeof updated> = {
    success: true,
    data: updated,
  };
  res.json(response);
}

export function deleteEmployee(req: Request, res: Response) {
  const id = Number(req.params.id);
  const deleted = employeeService.deleteEmployee(id);
  if (!deleted) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Employee not found",
    };
    return res.status(404).json(response);
  }
  const response: ApiResponse<{ message: string }> = {
    success: true,
    data: { message: "Employee deleted" },
  };
  res.json(response);
}

export function getEmployeesByBranch(req: Request, res: Response) {
  const branchId = Number(req.params.branchId);
  if (isNaN(branchId)) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Invalid branch ID",
    };
    return res.status(400).json(response);
  }
  const employees = employeeService.getEmployeesByBranch(branchId);
  const response: ApiResponse<typeof employees> = {
    success: true,
    data: employees,
  };
  res.json(response);
}

export function getEmployeesByDepartment(req: Request, res: Response) {
  const department = req.params.department;
  if (!department) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Department parameter is required",
    };
    return res.status(400).json(response);
  }
  const employees = employeeService.getEmployeesByDepartment(department);
  const response: ApiResponse<typeof employees> = {
    success: true,
    data: employees,
  };
  res.json(response);
}