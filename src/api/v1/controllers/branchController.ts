import { Request, Response } from "express";
import * as branchService from "../services/branchService";

export function getAllBranches(req: Request, res: Response) {
  res.json(branchService.getAllBranches());
}

export function getBranchById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const branch = branchService.getBranchById(id);
  if (!branch) return res.status(404).json({ error: "Branch not found" });
  res.json(branch);
}

export function createBranch(req: Request, res: Response) {
  const { name, address, phone } = req.body;
  if (!name || !address || !phone) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const newBranch = branchService.createBranch({ name, address, phone });
  res.status(201).json(newBranch);
}

export function updateBranch(req: Request, res: Response) {
  const id = Number(req.params.id);
  const updates = req.body;
  const updated = branchService.updateBranch(id, updates);
  if (!updated) return res.status(404).json({ error: "Branch not found" });
  res.json(updated);
}

export function deleteBranch(req: Request, res: Response) {
  const id = Number(req.params.id);
  const deleted = branchService.deleteBranch(id);
  if (!deleted) return res.status(404).json({ error: "Branch not found" });
  res.json({ message: "Branch deleted" });
}