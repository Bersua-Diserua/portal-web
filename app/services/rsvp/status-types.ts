import { z } from "zod"

export const rsvpRecordStatus = z.enum([
  "TICKET", // Generate ticket
  "SUBMISSION", // User do submission
  "SUBMISSION.APPROVE", // Submission user already approved by admin
  "RESOLVE", // Payment has received by admin
  "REJECT", // Rsvp submission has rejected by admin
])

export type RsvpRecordStatus = z.infer<typeof rsvpRecordStatus>
