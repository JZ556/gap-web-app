import "server-only";

import { createElement } from "react";
import { Resend } from "resend";
import { MatchNotification } from "@/emails/match-notification";

type SendMatchNotificationInput = {
  firstName: string;
  applicationNumber: string;
};

export async function sendMatchNotification({
  firstName,
  applicationNumber,
}: SendMatchNotificationInput) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const recipient = process.env.DEMO_NOTIFICATION_EMAIL?.trim();

  if (!apiKey || !recipient) {
    throw new Error("Resend demo notification is not configured.");
  }

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from: "Greyhound Adoption Demo <onboarding@resend.dev>",
    to: recipient,
    subject: "Your adoption application has been matched",
    react: createElement(MatchNotification, { firstName, applicationNumber }),
  });

  if (error || !data?.id) {
    throw new Error(error?.message || "Resend did not confirm the notification.");
  }

  return { emailId: data.id, recipient };
}
