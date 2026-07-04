"use client";

import { useState } from "react";
import { Search, Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPopup,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import AddServiceForm from "@/components/admin/AddServiceForm";
import { ServiceItem } from "./types";

// ─── Component ──────────────────────────────────

export default function ServicesTable({
  services,
  onRefresh,
}: {
  services: ServiceItem[];
  onRefresh: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [deletingService, setDeletingService] = useState<ServiceItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredServices = services.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleServiceSaved = () => {
    setIsSheetOpen(false);
    setEditingService(null);
    onRefresh();
  };

  const openEditSheet = (service: ServiceItem) => {
    setEditingService(service);
    setIsSheetOpen(true);
  };

  const openNewServiceSheet = () => {
    setEditingService(null);
    setIsSheetOpen(true);
  };

  const handleDelete = async () => {
    if (!deletingService) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/services/${deletingService.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete service");
      }

      setDeletingService(null);
      onRefresh();
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {/* filters */}
      <div className="flex gap-4 items-center">
        <div className="flex w-[420px] items-center gap-3 rounded-full border border-gray-200 bg-white px-5 py-3">
          <Search size={16} />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search services..."
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

        {/* Clear filters */}
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm text-gray-500 transition-colors hover:border-gray-300 hover:text-[#2C2C2C]"
          >
            Clear
            <span className="flex size-5 items-center justify-center rounded-full bg-gray-200 text-xs">
              ×
            </span>
          </button>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Add Service button */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen} modal>
          <SheetTrigger
            onClick={openNewServiceSheet}
            className="flex cursor-pointer items-center gap-3 rounded-full bg-[#E4CC72] px-6 py-3 text-[#2C2C2C] font-medium"
          >
            Add Service
            <div className="rounded-full bg-[#2C2C2C] p-2 text-white">
              <Plus size={16} />
            </div>
          </SheetTrigger>

          <SheetContent>
            <AddServiceForm
              key={editingService?.id ?? "new"}
              editService={editingService}
              onSuccess={handleServiceSaved}
              onClose={() => {
                setIsSheetOpen(false);
                setEditingService(null);
              }}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* table */}
      <div className="mt-8 overflow-hidden rounded-3xl border border-gray-200 bg-white">
        <table className="w-full">
          <thead className="border-b">
            <tr className="font-mono text-left text-xs text-gray-500">
              <th className="p-5">#</th>
              <th>NAME</th>
              <th>IMAGE</th>
              <th>DESCRIPTION</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredServices.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="p-10 text-center font-mono text-sm text-[#6A6A6A]"
                >
                  {searchQuery
                    ? "No services match your search. Try adjusting your criteria."
                    : 'No services yet. Click "Add Service" to create one.'}
                </td>
              </tr>
            ) : (
              filteredServices.map((item, index) => (
                <tr key={item.id} className="border-b last:border-b-0">
                  <td className="p-5">{String(index + 1).padStart(2, "0")}</td>

                  <td>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </td>

                  <td>
                    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-[#E4CC72]">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-bold text-[#2C2C2C]">
                          {item.name.charAt(0)}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="max-w-md">
                    <p className="text-sm text-[#6A6A6A] leading-relaxed">
                      {item.description}
                    </p>
                  </td>

                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditSheet(item)}
                        className="flex size-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-[#2C2C2C]"
                        title="Edit service"
                      >
                        <Pencil size={15} />
                      </button>
                      <AlertDialog>
                        <AlertDialogTrigger
                          onClick={() => setDeletingService(item)}
                          className="flex size-8 cursor-pointer items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                          title="Delete service"
                        >
                          <Trash2 size={15} />
                        </AlertDialogTrigger>
                        <AlertDialogPopup>
                          <div className="p-7">
                            <h3 className="font-mono text-lg font-semibold text-[#2C2C2C]">
                              Delete Service
                            </h3>
                            <p className="mt-2 font-mono text-sm text-[#6A6A6A]">
                              Are you sure you want to delete{" "}
                              <span className="font-medium text-[#2C2C2C]">
                                {item.name}
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
    </>
  );
}
