"use client";

import { Loader2 } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

/**
 * Submit button that shows progress while its form's action runs: a spinner,
 * the pending label, and disabled so a double click can't save twice.
 * Forms that submit with onSubmit instead of `action` pass `pending` themselves.
 */
export function SubmitButton({
  icon,
  children,
  pendingLabel = "Saving…",
  pending: pendingOverride,
  disabled,
  ...props
}: Omit<ComponentProps<typeof Button>, "type"> & {
  icon?: ReactNode;
  pendingLabel?: string;
  pending?: boolean;
}) {
  const { pending: formPending } = useFormStatus();
  const pending = pendingOverride ?? formPending;

  return (
    <Button type="submit" disabled={pending || disabled} aria-busy={pending} {...props}>
      {pending ? <Loader2 className="animate-spin" aria-hidden /> : icon}
      {pending ? pendingLabel : children}
    </Button>
  );
}
