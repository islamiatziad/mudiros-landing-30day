import { supabase, isSupabaseConfigured } from "./supabase";

export type TrialRequest = {
  fullName: string;
  companyName: string;
  email: string;
  phone?: string;
  companySize: string;
};

/** Error the UI can show verbatim to the visitor. */
export class SubmitError extends Error {}

/**
 * Insert a trial request into Supabase (`public.trial_requests`).
 * Throws SubmitError with a human-readable message the modal displays.
 */
export async function submitTrialRequest(input: TrialRequest): Promise<void> {
  if (!isSupabaseConfigured || !supabase) {
    throw new SubmitError(
      "Signups aren't connected yet. Please contact us on WhatsApp and we'll set you up.",
    );
  }

  const phone = input.phone?.trim();

  const { error } = await supabase.from("trial_requests").insert({
    full_name: input.fullName.trim(),
    company_name: input.companyName.trim(),
    email: input.email.trim().toLowerCase(),
    phone: phone ? phone : null, // column is nullable
    company_size: input.companySize,
    // id, status ('new') and created_at are set by database defaults
  });

  if (error) {
    // Log the real cause for debugging, show something human to the visitor.
    console.error("[MudirOS] trial_requests insert failed:", error);

    if (error.code === "23505") {
      throw new SubmitError("You've already requested a trial with this email.");
    }
    if (error.message?.toLowerCase().includes("row-level security")) {
      throw new SubmitError(
        "We couldn't save your request. Please try again in a moment.",
      );
    }
    throw new SubmitError(
      "We couldn't save your request. Please check your connection and try again.",
    );
  }
}
