"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Pencil, Trash2, Loader2, Star } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPopup,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import AddProjectForm from "@/components/admin/AddProjectForm";

// ─── Types ──────────────────────────────────────

type Project = {
  id: string;
  name: string;
  backgroundImage: string | null;
  images: string[];
  category: string;
  status: "published" | "draft";
  tags: string[];
  description: string;
  cost: string;
  address: string;
  isFeatured: boolean;
};

// ─── Component ──────────────────────────────────

export default function PortfolioAdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const loadProjects = async () => {
    const res = await fetch("/api/projects");
    if (!res.ok) return null;

    const data = await res.json();
    return data.projects as Project[];
  };

  const fetchProjects = async () => {
    try {
      const nextProjects = await loadProjects();
      if (nextProjects) {
        setProjects(nextProjects);
      }
    } catch {
      // silently fail — table will show empty
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadInitialProjects = async () => {
      try {
        const nextProjects = await loadProjects();
        if (isMounted && nextProjects) {
          setProjects(nextProjects);
        }
      } catch {
        // silently fail — table will show empty
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadInitialProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleProjectSaved = () => {
    setIsSheetOpen(false);
    setEditingProject(null);
    setIsLoading(true);
    fetchProjects();
  };

  const openEditSheet = (project: Project) => {
    setEditingProject(project);
    setIsSheetOpen(true);
  };

  const openNewProjectSheet = () => {
    setEditingProject(null);
    setIsSheetOpen(true);
  };

  const handleDelete = async () => {
    if (!deletingProject) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/projects/${deletingProject.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete project");
      }

      setDeletingProject(null);
      setIsLoading(true);
      fetchProjects();
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const uniqueCategories = [...new Set(projects.map((p) => p.category))].sort();

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      !searchQuery ||
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesCategory =
      !selectedCategory || project.category === selectedCategory;

    const matchesStatus = !selectedStatus || project.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const publishedCount = projects.filter(
    (p) => p.status === "published",
  ).length;
  const draftCount = projects.filter((p) => p.status === "draft").length;

  return (
    <div className="p-5 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-gray-500">
              → Portfolio
            </p>

            <h1 className="mt-3 font-mono text-5xl font-bold text-[#2C2C2C] sm:text-7xl">
              Projects
            </h1>

            <p className="mt-3 text-[#6A6A6A]">
              Manage every project shown on your public portfolio.
            </p>
          </div>

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen} modal>
            <SheetTrigger
              onClick={openNewProjectSheet}
              className="flex cursor-pointer items-center gap-3 rounded-full bg-[#E4CC72] px-6 py-4 text-[#2C2C2C] font-medium"
            >
              New Project
              <div className="rounded-full bg-[#2C2C2C] p-2 text-white">
                <Plus size={16} />
              </div>
            </SheetTrigger>

            <SheetContent>
              <AddProjectForm
                key={editingProject?.id ?? "new"}
                editProject={editingProject}
                onSuccess={handleProjectSaved}
                onClose={() => {
                  setIsSheetOpen(false);
                  setEditingProject(null);
                }}
              />
            </SheetContent>
          </Sheet>
        </div>

        {/* stats */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          <StatCard label="TOTAL PROJECTS" value={String(projects.length)} />
          <StatCard label="PUBLISHED" value={String(publishedCount)} />
          <StatCard label="IN DRAFT" value={String(draftCount)} />
        </div>

        {/* filters */}
        <div className="mt-8 flex flex-col gap-4 xl:flex-row">
          <div className="flex w-full items-center gap-3 rounded-full border border-gray-200 bg-white px-5 py-3 xl:w-[420px]">
            <Search size={16} />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full bg-transparent outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="flex size-5 cursor-pointer items-center justify-center rounded-full text-gray-400 hover:text-[#2C2C2C]"
              >
                ×
              </button>
            )}
          </div>

          {/* Category filter */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setOpenDropdown(openDropdown === "category" ? null : "category")
              }
              className={`flex cursor-pointer items-center gap-2 rounded-full border px-6 py-3 text-sm transition-colors ${
                selectedCategory
                  ? "border-[#E4CC72] bg-[#F5F0D6] text-[#2C2C2C]"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
              }`}
            >
              {selectedCategory || "All Categories"}
              <svg
                className={`size-3.5 transition-transform ${
                  openDropdown === "category" ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {openDropdown === "category" && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setOpenDropdown(null)}
                />
                <div className="absolute left-0 z-20 mt-2 w-56 origin-top-left rounded-2xl border border-gray-200 bg-white py-2 shadow-lg">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory(null);
                      setOpenDropdown(null);
                    }}
                    className={`flex w-full cursor-pointer items-center px-5 py-2.5 text-left font-mono text-sm transition-colors hover:bg-[#F9F9F9] ${
                      !selectedCategory
                        ? "text-[#2C2C2C] font-medium"
                        : "text-[#6A6A6A]"
                    }`}
                  >
                    All Categories
                  </button>
                  {uniqueCategories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setOpenDropdown(null);
                      }}
                      className={`flex w-full cursor-pointer items-center px-5 py-2.5 text-left font-mono text-sm transition-colors hover:bg-[#F9F9F9] ${
                        selectedCategory === cat
                          ? "text-[#2C2C2C] font-medium"
                          : "text-[#6A6A6A]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Status filter */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setOpenDropdown(openDropdown === "status" ? null : "status")
              }
              className={`flex cursor-pointer items-center gap-2 rounded-full border px-6 py-3 text-sm transition-colors ${
                selectedStatus
                  ? "border-[#E4CC72] bg-[#F5F0D6] text-[#2C2C2C]"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
              }`}
            >
              {selectedStatus
                ? `Status: ${selectedStatus === "published" ? "Published" : "Draft"}`
                : "Status: Any"}
              <svg
                className={`size-3.5 transition-transform ${
                  openDropdown === "status" ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {openDropdown === "status" && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setOpenDropdown(null)}
                />
                <div className="absolute left-0 z-20 mt-2 w-48 origin-top-left rounded-2xl border border-gray-200 bg-white py-2 shadow-lg">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedStatus(null);
                      setOpenDropdown(null);
                    }}
                    className={`flex w-full cursor-pointer items-center px-5 py-2.5 text-left font-mono text-sm transition-colors hover:bg-[#F9F9F9] ${
                      !selectedStatus
                        ? "text-[#2C2C2C] font-medium"
                        : "text-[#6A6A6A]"
                    }`}
                  >
                    Any Status
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedStatus("published");
                      setOpenDropdown(null);
                    }}
                    className={`flex w-full cursor-pointer items-center px-5 py-2.5 text-left font-mono text-sm transition-colors hover:bg-[#F9F9F9] ${
                      selectedStatus === "published"
                        ? "text-[#2C2C2C] font-medium"
                        : "text-[#6A6A6A]"
                    }`}
                  >
                    Published
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedStatus("draft");
                      setOpenDropdown(null);
                    }}
                    className={`flex w-full cursor-pointer items-center px-5 py-2.5 text-left font-mono text-sm transition-colors hover:bg-[#F9F9F9] ${
                      selectedStatus === "draft"
                        ? "text-[#2C2C2C] font-medium"
                        : "text-[#6A6A6A]"
                    }`}
                  >
                    Draft
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Active filter count */}
          {(searchQuery || selectedCategory || selectedStatus) && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
                setSelectedStatus(null);
                setOpenDropdown(null);
              }}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm text-gray-500 transition-colors hover:border-gray-300 hover:text-[#2C2C2C]"
            >
              Clear
              <span className="flex size-5 items-center justify-center rounded-full bg-gray-200 text-xs">
                ×
              </span>
            </button>
          )}
        </div>

        {/* table */}
        <div className="mt-8 overflow-x-auto rounded-3xl border border-gray-200 bg-white">
          <table className="min-w-[980px]">
            <thead className="border-b">
              <tr className="font-mono text-left text-xs text-gray-500">
                <th className="p-5">#</th>
                <th>PROJECT</th>
                <th>CATEGORY</th>
                <th>STATUS</th>
                <th>FEATURED</th>
                <th>TAGS</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="p-10 text-center">
                    <div className="flex items-center justify-center gap-2 text-[#6A6A6A]">
                      <Loader2 size={18} className="animate-spin" />
                      <span className="font-mono text-sm">
                        Loading projects...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : filteredProjects.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="p-10 text-center font-mono text-sm text-[#6A6A6A]"
                  >
                    {searchQuery || selectedCategory || selectedStatus
                      ? "No projects match your filters. Try adjusting your search or criteria."
                      : 'No projects yet. Click "New Project" to add one.'}
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project, index) => (
                  <tr key={project.id} className="border-b">
                    <td className="p-5">
                      {String(index + 1).padStart(2, "0")}
                    </td>

                    <td>
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-[#E4CC72]">
                          {project.images.length > 0 ? (
                            <img
                              src={project.images[0]}
                              alt={project.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-sm font-bold text-[#2C2C2C]">
                              {project.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <span className="font-medium">{project.name}</span>
                      </div>
                    </td>

                    <td>{project.category}</td>

                    <td>
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          project.status === "published"
                            ? "bg-[#F5F0D6] text-[#9C7D00]"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {project.status === "published" ? "Published" : "Draft"}
                      </span>
                    </td>

                    <td>
                      {project.isFeatured ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F5F0D6] px-3 py-1 text-xs font-medium text-[#9C7D00]">
                          <Star size={12} fill="currentColor" />
                          Featured
                        </span>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>

                    <td>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.length > 0
                          ? project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-gray-100 px-2.5 py-0.5 font-mono text-xs text-gray-500"
                              >
                                {tag}
                              </span>
                            ))
                          : "—"}
                      </div>
                    </td>

                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditSheet(project)}
                          className="flex size-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-[#2C2C2C]"
                          title="Edit project"
                        >
                          <Pencil size={15} />
                        </button>
                        <AlertDialog>
                          <AlertDialogTrigger
                            onClick={() => setDeletingProject(project)}
                            className="flex size-8 cursor-pointer items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                            title="Delete project"
                          >
                            <Trash2 size={15} />
                          </AlertDialogTrigger>
                          <AlertDialogPopup>
                            <div className="p-7">
                              <h3 className="font-mono text-lg font-semibold text-[#2C2C2C]">
                                Delete Project
                              </h3>
                              <p className="mt-2 font-mono text-sm text-[#6A6A6A]">
                                Are you sure you want to delete{" "}
                                <span className="font-medium text-[#2C2C2C]">
                                  {project.name}
                                </span>
                                ? This action cannot be undone.
                              </p>

                              <div className="mt-7 flex justify-end gap-3">
                                <AlertDialogCancel className="rounded-full border border-gray-200 px-6 py-3 font-mono text-sm text-[#6A6A6A] transition-colors hover:bg-gray-50">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={handleDelete}
                                  disabled={isDeleting}
                                  className="flex cursor-pointer items-center gap-2 rounded-full bg-red-500 px-6 py-3 font-mono text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                                >
                                  {isDeleting ? (
                                    <>
                                      <Loader2
                                        size={16}
                                        className="animate-spin"
                                      />
                                      Deleting...
                                    </>
                                  ) : (
                                    "Delete"
                                  )}
                                </AlertDialogAction>
                              </div>
                            </div>
                          </AlertDialogPopup>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
    </div>
  );
}

/* COMPONENTS */

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6">
      <p className="font-mono text-xs text-gray-500">{label}</p>

      <h3 className="mt-4 text-4xl font-bold text-[#2C2C2C]">{value}</h3>
    </div>
  );
}
