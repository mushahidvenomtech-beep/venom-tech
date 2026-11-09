"use client";

import React, { useState, useEffect } from "react";
import ProjectsList from "./ProjectsList";
import ProjectForm from "./ProjectForm";
import ProjectCategories from "./ProjectCategories";
import { Project } from "@/lib/projects/types";

interface DashboardProjectsProps {
  subTab?: string;
  onSelectSubTab?: (subTab: string) => void;
}

export default function DashboardProjects({
  subTab = "all-projects",
  onSelectSubTab,
}: DashboardProjectsProps) {
  const [view, setView] = useState<"list" | "form" | "categories">("list");
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Sync subTab with view
  useEffect(() => {
    if (subTab === "add-project") {
      setEditingProject(null);
      setView("form");
    } else if (subTab === "categories") {
      setEditingProject(null);
      setView("categories");
    } else {
      setView("list");
    }
  }, [subTab]);

  const handleAddNew = () => {
    setEditingProject(null);
    setView("form");
    if (onSelectSubTab) onSelectSubTab("add-project");
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setView("form");
  };

  const handleSuccess = () => {
    setView("list");
    setEditingProject(null);
    if (onSelectSubTab) onSelectSubTab("all-projects");
  };

  const handleCancel = () => {
    setView("list");
    setEditingProject(null);
    if (onSelectSubTab) onSelectSubTab("all-projects");
  };

  return (
    <div className="space-y-6">
      {view === "categories" ? (
        <ProjectCategories />
      ) : view === "form" ? (
        <ProjectForm
          initialProject={editingProject}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      ) : (
        <ProjectsList
          subTab={subTab}
          onSelectSubTab={onSelectSubTab}
          onAddNew={handleAddNew}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}
