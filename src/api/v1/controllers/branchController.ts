import { Request, Response } from "express";
import * as branchService from "../services/branchService";
import { ApiResponse } from "../../../models/response";

export function getAllBranches(_req: Request, res: Response) {
  const branches = branchService.getAllBranches();
  const response: ApiResponse<typeof branches> = {
    success: true,
    data: branches,
  };
  res.json(response);
}

export function getBranchById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const branch = branchService.getBranchById(id);
  if (!branch) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Branch not found",
    };
    return res.status(404).json(response);
  }
  const response: ApiResponse<typeof branch> = {
    success: true,
    data: branch,
  };
  res.json(response);
}

export function createBranch(req: Request, res: Response) {
  const { name, address, phone } = req.body;
  if (!name || !address || !phone) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Missing required fields",
    };
    return res.status(400).json(response);
  }
  const newBranch = branchService.createBranch({ name, address, phone });
  const response: ApiResponse<typeof newBranch> = {
    success: true,
    data: newBranch,
  };
  res.status(201).json(response);
}

export function updateBranch(req: Request, res: Response) {
  const id = Number(req.params.id);
  const updates = req.body;
  const updated = branchService.updateBranch(id, updates);
  if (!updated) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Branch not found",
    };
    return res.status(404).json(response);
  }
  const response: ApiResponse<typeof updated> = {
    success: true,
    data: updated,
  };
  res.json(response);
}

export function deleteBranch(req: Request, res: Response) {
  const id = Number(req.params.id);
  const deleted = branchService.deleteBranch(id);
  if (!deleted) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Branch not found",
    };
    return res.status(404).json(response);
  }
  const response: ApiResponse<{ message: string }> = {
    success: true,
    data: { message: "Branch deleted" },
  };
  res.json(response);
}