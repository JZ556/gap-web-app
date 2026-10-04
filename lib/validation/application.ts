import { z } from "zod";

export const callTimeOptions = [
  "Morning 9am - 12noon",
  "Lunchtime 12noon - 2pm",
  "Afternoon 2pm - 6pm",
] as const;

export const stateOptions = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"] as const;

export const residenceOptions = [
  "House",
  "Townhouse",
  "Apartment",
  "Unit",
  "Rural property",
] as const;

export const experienceOptions = [
  "I am new to greyhounds",
  "I have owned other dogs",
  "I have previously cared for a greyhound",
] as const;

export const referralOptions = [
  "TikTok",
  "LinkedIn",
  "Instagram",
  "Facebook",
  "Reddit",
  "Other Social Media",
  "News Online",
  "Print Newspaper Article",
  "Local Newspaper Print",
  "Radio",
  "Sports Radio",
  "Magazine",
  "Google Ad",
  "Another Website",
  "Online Search",
  "A Friend Who Already Adopted",
  "National Adoption Day Advertisement",
  "Royal Easter Show Advertisement",
  "Pet Shop Adoption Day Event",
  "Other",
] as const;

const yesNoSchema = z.enum(["Yes", "No"]);

const optionalTextSchema = (maxLength: number) =>
  z.string().trim().max(maxLength).transform((value) => value || null);

export const createApplicationSchema = z
  .object({
    firstName: z.string().trim().min(1, "First name is required.").max(100),
    lastName: z.string().trim().min(1, "Last name is required.").max(100),
    email: z
      .string()
      .trim()
      .max(254)
      .refine((value) => z.email().safeParse(value).success, {
        message: "Enter a valid email address.",
      }),
    mobile: z
      .string()
      .trim()
      .max(32)
      .refine((value) => /^04\d{8}$/.test(value.replace(/\D/g, "")), {
        message: "Enter a valid Australian mobile number.",
      })
      .transform((value) => value.replace(/\D/g, "")),
    bestCallTime: z.enum(callTimeOptions),
    address: z.string().trim().min(1).max(200),
    suburb: z.string().trim().min(1).max(100),
    state: z.enum(stateOptions),
    postcode: z.string().trim().regex(/^\d{4}$/, "Enter a 4-digit Australian postcode."),
    residenceType: z.enum(residenceOptions),
    secureYard: yesNoSchema.transform((value) => value === "Yes"),
    hasPets: yesNoSchema.transform((value) => value === "Yes"),
    petDetails: z.string().trim().max(2000),
    childrenUnder15: z.enum(["0", "1", "2", "3", "4", "5+"]).transform((value) =>
      value === "5+" ? 5 : Number(value),
    ),
    experience: z.enum(experienceOptions),
    referralSource: z.enum(referralOptions),
    hasSeriousConviction: yesNoSchema.transform((value) => value === "Yes"),
    additionalComments: z.string().trim().max(4000),
    consent: z.literal(true, "Consent is required to submit this application."),
  })
  .strict()
  .superRefine((values, context) => {
    if (values.hasPets && !values.petDetails.trim()) {
      context.addIssue({
        code: "custom",
        path: ["petDetails"],
        message: "Add details about your current pets.",
      });
    }
  })
  .transform((parsed) => {
    const { secureYard, petDetails, additionalComments, consent, ...values } = parsed;
    void consent;

    return {
      ...values,
      hasSecureYard: secureYard,
      petDetails: values.hasPets ? optionalTextSchema(2000).parse(petDetails) : null,
      additionalComments: optionalTextSchema(4000).parse(additionalComments),
    };
  });

export type CreateApplicationInput = z.output<typeof createApplicationSchema>;
