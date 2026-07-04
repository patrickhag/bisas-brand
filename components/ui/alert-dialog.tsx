"use client";

import * as React from "react";
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { Dialog } from "@base-ui/react/dialog";

import { cn } from "@/lib/utils";

const AlertDialog = AlertDialogPrimitive.Root;

function AlertDialogTrigger({
  className,
  ...props
}: AlertDialogPrimitive.Trigger.Props) {
  return (
    <AlertDialogPrimitive.Trigger
      data-slot="alert-dialog-trigger"
      className={cn(className)}
      {...props}
    />
  );
}

function AlertDialogPopup({
  className,
  children,
  ...props
}: Dialog.Popup.Props) {
  return (
    <Dialog.Portal>
      <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-closed:animate-out data-closed:fade-out-0 data-open:animate-in data-open:fade-in-0" />
      <Dialog.Popup
        data-slot="alert-dialog-popup"
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-gray-200 bg-white p-0 shadow-lg duration-100 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
          className,
        )}
        {...props}
      >
        {children}
      </Dialog.Popup>
    </Dialog.Portal>
  );
}

function AlertDialogTitle({
  className,
  ...props
}: Dialog.Title.Props) {
  return (
    <Dialog.Title
      data-slot="alert-dialog-title"
      className={cn(
        "font-mono text-lg font-semibold text-[#2C2C2C]",
        className,
      )}
      {...props}
    />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: Dialog.Description.Props) {
  return (
    <Dialog.Description
      data-slot="alert-dialog-description"
      className={cn("font-mono text-sm text-[#6A6A6A]", className)}
      {...props}
    />
  );
}

function AlertDialogClose({
  className,
  ...props
}: Dialog.Close.Props) {
  return (
    <Dialog.Close
      data-slot="alert-dialog-close"
      className={cn(
        "inline-flex cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white px-6 py-3 font-mono text-sm font-medium text-[#6A6A6A] transition-colors hover:bg-gray-50 hover:text-[#2C2C2C]",
        className,
      )}
      {...props}
    />
  );
}

function AlertDialogCancel({
  className,
  ...props
}: Dialog.Close.Props) {
  return (
    <Dialog.Close
      data-slot="alert-dialog-cancel"
      className={cn(
        "inline-flex cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white px-6 py-3 font-mono text-sm text-[#6A6A6A] transition-colors hover:bg-gray-50 hover:text-[#2C2C2C]",
        className,
      )}
      {...props}
    />
  );
}

function AlertDialogAction({
  className,
  ...props
}: Dialog.Close.Props) {
  return (
    <Dialog.Close
      data-slot="alert-dialog-action"
      className={cn(
        "inline-flex cursor-pointer items-center justify-center rounded-full bg-[#E4CC72] px-6 py-3 font-mono text-sm font-medium text-[#2C2C2C] transition-colors hover:bg-[#D4BC5E]",
        className,
      )}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogClose,
  AlertDialogCancel,
  AlertDialogAction,
};
