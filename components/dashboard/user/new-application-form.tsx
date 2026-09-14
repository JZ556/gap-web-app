"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  AlertCircle,
  CheckCircle2,
  CircleHelp,
  Home,
  PawPrint,
  Phone,
  ShieldCheck,
} from "lucide-react";

const callTimeOptions = [
  "Morning 9am - 12noon",
  "Lunchtime 12noon - 2pm",
  "Afternoon 2pm - 6pm",
] as const;

const countryCodeOptions = [
  { label: "Australia", value: "+61" },
  { label: "New Zealand", value: "+64" },
  { label: "United Kingdom", value: "+44" },
  { label: "United States", value: "+1" },
  { label: "Canada", value: "+1" },
  { label: "Singapore", value: "+65" },
  { label: "Hong Kong", value: "+852" },
  { label: "India", value: "+91" },
  { label: "Philippines", value: "+63" },
  { label: "South Africa", value: "+27" },
  { label: "Ireland", value: "+353" },
] as const;

const stateOptions = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"] as const;

const childrenOptions = ["0", "1", "2", "3", "4", "5+"] as const;

const residenceOptions = [
  "House",
  "Townhouse",
  "Apartment",
  "Unit",
  "Rural property",
] as const;

const ownershipOptions = [
  "I own my residence",
  "I rent my residence",
  "I live with family or another household",
] as const;

const hoursAloneOptions = [
  "Less than 2 hours",
  "2 - 4 hours",
  "4 - 6 hours",
  "6 - 8 hours",
  "More than 8 hours",
] as const;

const experienceOptions = [
  "I am new to greyhounds",
  "I have owned other dogs",
  "I have previously cared for a greyhound",
] as const;

const referralOptions = [
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

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneCountryCode: string;
  mobile: string;
  bestCallTime: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  residenceType: string;
  ownership: string;
  landlordPermission: string;
  secureYard: string;
  hoursAlone: string;
  household: string;
  hasPets: string;
  petDetails: string;
  childrenUnder15: string;
  experience: string;
  greyhoundPreferences: string;
  referralSource: string;
  hasSeriousConviction: string;
  reasonsForAdopting: string;
  additionalComments: string;
  consent: boolean;
};

type FieldName = keyof FormValues;
type FormErrors = Partial<Record<FieldName, string>>;

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneCountryCode: "+61",
  mobile: "",
  bestCallTime: "",
  address: "",
  suburb: "",
  state: "",
  postcode: "",
  residenceType: "",
  ownership: "",
  landlordPermission: "",
  secureYard: "",
  hoursAlone: "",
  household: "",
  hasPets: "",
  petDetails: "",
  childrenUnder15: "",
  experience: "",
  greyhoundPreferences: "",
  referralSource: "",
  hasSeriousConviction: "",
  reasonsForAdopting: "",
  additionalComments: "",
  consent: false,
};

const errorLabels: Partial<Record<FieldName, string>> = {
  firstName: "First name",
  lastName: "Last name",
  email: "Email address",
  mobile: "Mobile number",
  bestCallTime: "Best time to call",
  address: "Residential address",
  suburb: "Suburb or town",
  state: "State or territory",
  postcode: "Postcode",
  residenceType: "Type of residence",
  ownership: "Home ownership",
  landlordPermission: "Permission to keep a large dog",
  secureYard: "Secure yard or courtyard",
  hoursAlone: "Time home alone",
  household: "Household",
  hasPets: "Current pets",
  petDetails: "Current pet details",
  childrenUnder15: "Children under 15",
  experience: "Dog experience",
  greyhoundPreferences: "Greyhound preferences",
  referralSource: "How you heard about Greyhound as Pets",
  hasSeriousConviction: "Serious conviction",
  reasonsForAdopting: "Reason for adopting",
  consent: "Prototype data notice",
};

function validateForm(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  const requiredMessages: Array<[FieldName, string]> = [
    ["firstName", "Enter your first name."],
    ["lastName", "Enter your last name."],
    ["email", "Enter your email address."],
    ["mobile", "Enter a mobile number."],
    ["bestCallTime", "Choose the best time for a call."],
    ["address", "Enter your street address."],
    ["suburb", "Enter your suburb or town."],
    ["state", "Choose your state or territory."],
    ["postcode", "Enter your postcode."],
    ["residenceType", "Choose your type of residence."],
    ["ownership", "Tell us whether you own or rent your home."],
    ["secureYard", "Tell us whether your yard is secure."],
    ["hoursAlone", "Choose how long the greyhound may be home alone."],
    ["household", "Tell us who will share the home with your greyhound."],
    ["hasPets", "Tell us whether you have any pets."],
    ["childrenUnder15", "Choose the number of children under 15."],
    ["experience", "Choose the option that best describes your experience."],
    ["greyhoundPreferences", "Tell us what you are looking for, even if you have no preference."],
    ["referralSource", "Choose how you heard about Greyhound as Pets."],
    ["hasSeriousConviction", "Please choose an option."],
    ["reasonsForAdopting", "Tell us why you would like to adopt a retired greyhound."],
  ];

  for (const [field, message] of requiredMessages) {
    if (typeof values[field] === "string" && !values[field].trim()) {
      errors[field] = message;
    }
  }

  if (!values.consent) {
    errors.consent = "Please acknowledge the prototype data notice before submitting.";
  }

  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter an email address in a valid format.";
  }

  const phoneDigits = values.mobile.replace(/\D/g, "");
  if (values.mobile.trim() && (phoneDigits.length < 6 || phoneDigits.length > 15)) {
    errors.mobile = "Use 6–15 digits; spaces and brackets are fine.";
  }

  if (values.postcode.trim() && !/^\d{4}$/.test(values.postcode.trim())) {
    errors.postcode = "Use a 4-digit Australian postcode.";
  }

  if (values.ownership === "I rent my residence" && values.landlordPermission !== "Yes") {
    errors.landlordPermission = "Please confirm that you have landlord or strata permission.";
  }

  if (values.hasPets === "Yes" && !values.petDetails.trim()) {
    errors.petDetails = "Add the species, age and temperament of your current pets.";
  }

  return errors;
}

type FieldMessageProps = {
  error?: string;
  helper?: string;
  id: string;
};

type HelpTipProps = {
  align?: "left" | "right";
  children: ReactNode;
  label: string;
};

function HelpTip({ align = "left", children, label }: HelpTipProps) {
  return (
    <details className={"help-tip relative ml-1 inline-flex align-middle " + (align === "right" ? "help-tip-right" : "")}>
      <summary
        aria-label={label}
        className="inline-grid size-4 cursor-pointer list-none place-items-center rounded-full border border-primary/55 bg-white text-[10px] font-extrabold leading-none text-primary transition hover:bg-primary hover:text-white focus-visible:outline-offset-2"
        title={label}
      >
        ?
      </summary>
      <div className="help-tip-popover absolute left-0 top-6 z-30 hidden w-64 rounded-sm border border-border bg-white p-3 text-xs font-normal leading-5 text-foreground shadow-lg">
        {children}
      </div>
    </details>
  );
}

type FieldLabelProps = {
  help?: string;
  helpAlign?: "left" | "right";
  helpLabel?: string;
  htmlFor: string;
  label: string;
  required?: boolean;
};

function FieldLabel({ help, helpAlign, helpLabel, htmlFor, label, required = true }: FieldLabelProps) {
  return (
    <label className="block text-sm font-semibold text-primary" htmlFor={htmlFor}>
      <span className="inline-flex items-center">
        {label}
        {required ? <span className="ml-1 text-danger">*</span> : null}
        {help ? <HelpTip align={helpAlign} label={helpLabel || "Help for " + label}>{help}</HelpTip> : null}
      </span>
    </label>
  );
}

function FieldMessages({ error, helper, id }: FieldMessageProps) {
  return (
    <>
      {helper ? (
        <p className="text-xs leading-5 text-muted-foreground" id={`${id}-help`}>
          {helper}
        </p>
      ) : null}
      {error ? (
        <p className="flex items-start gap-1.5 text-xs font-semibold leading-5 text-danger" id={`${id}-error`} role="alert">
          <AlertCircle aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" strokeWidth={2.5} />
          <span>{error}</span>
        </p>
      ) : null}
    </>
  );
}

type TextFieldProps = {
  autoComplete?: string;
  error?: string;
  helper?: string;
  help?: string;
  helpAlign?: "left" | "right";
  helpLabel?: string;
  label: string;
  maxLength?: number;
  name: FieldName;
  onBlur: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  value: string;
};

function TextField({
  autoComplete,
  error,
  helper,
  help,
  helpAlign,
  helpLabel,
  label,
  maxLength,
  name,
  onBlur,
  onChange,
  placeholder,
  required = true,
  type = "text",
  value,
}: TextFieldProps) {
  const id = `application-${name}`;
  const describedBy = [helper ? `${id}-help` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined;

  return (
    <div className="space-y-2">
      <FieldLabel help={help} helpAlign={helpAlign} helpLabel={helpLabel} htmlFor={id} label={label} required={required} />
      <input
        aria-describedby={describedBy}
        aria-invalid={Boolean(error)}
        autoComplete={autoComplete}
        className={`h-12 w-full rounded-sm border bg-white px-3 text-sm text-foreground outline-none transition placeholder:text-foreground/45 focus:border-primary focus:ring-2 focus:ring-secondary/20 ${error ? "border-danger bg-danger/[.02]" : "border-border"}`}
        id={id}
        maxLength={maxLength}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
      <FieldMessages error={error} helper={helper} id={id} />
    </div>
  );
}

type SelectFieldProps = {
  error?: string;
  helper?: string;
  help?: string;
  helpAlign?: "left" | "right";
  helpLabel?: string;
  label: string;
  name: FieldName;
  onBlur: () => void;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: readonly string[] | readonly { label: string; value: string }[];
  required?: boolean;
  value: string;
};

function SelectField({
  error,
  helper,
  help,
  helpAlign,
  helpLabel,
  label,
  name,
  onBlur,
  onChange,
  options,
  required = true,
  value,
}: SelectFieldProps) {
  const id = `application-${name}`;
  const describedBy = [helper ? `${id}-help` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined;

  return (
    <div className="space-y-2">
      <FieldLabel help={help} helpAlign={helpAlign} helpLabel={helpLabel} htmlFor={id} label={label} required={required} />
      <select
        aria-describedby={describedBy}
        aria-invalid={Boolean(error)}
        className={`h-12 w-full rounded-sm border bg-white px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-secondary/20 ${value ? "" : "text-foreground/55"} ${error ? "border-danger bg-danger/[.02]" : "border-border"}`}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        required={required}
        value={value}
      >
        <option disabled value="">
          Select an option
        </option>
        {options.map((option) => {
          const item = typeof option === "string" ? { label: option, value: option } : option;
          return (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>
      <FieldMessages error={error} helper={helper} id={id} />
    </div>
  );
}

type SectionHeadingProps = {
  description: string;
  icon: LucideIcon;
  number: string;
  title: string;
};

function SectionHeading({ description, icon: Icon, number, title }: SectionHeadingProps) {
  return (
    <div className="flex items-start gap-4 border-b border-border bg-surface-app px-6 py-5 sm:px-8">
      <div className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-sm font-extrabold text-white">
        {number}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-primary">
          <Icon aria-hidden="true" className="size-4" strokeWidth={2.2} />
          <h2 className="text-lg font-extrabold tracking-tight">{title}</h2>
        </div>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export function NewApplicationForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const setField = (name: FieldName, value: string | boolean) => {
    setValues((current) => ({ ...current, [name]: value }));
    setSubmitted(false);
    setErrors((current) => {
      if (!current[name]) {
        return current;
      }

      const next = { ...current };
      delete next[name];
      return next;
    });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, type } = event.target;
    setField(name as FieldName, type === "checkbox" ? event.target.checked : event.target.value);
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setField(event.target.name as FieldName, event.target.value);
  };

  const validateField = (name: FieldName) => {
    const nextErrors = validateForm(values);
    setErrors((current) => ({ ...current, [name]: nextErrors[name] }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
  };

  const errorCount = Object.keys(errors).length;
  const errorEntries = (Object.entries(errors) as Array<[FieldName, string]>).filter(([, message]) =>
    Boolean(message),
  );

  return (
    <section className="mx-auto max-w-6xl">
      <div className="overflow-hidden rounded-md border border-border bg-white shadow-sm">
        <div className="bg-primary px-6 py-7 text-center sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">Greyhound adoption</p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Adoption Application Form
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-white/80">
            Help us understand your home and lifestyle so we can find the right retired greyhound for your family.
          </p>
        </div>

        <div className="space-y-6 p-5 sm:p-8">
          <div className="flex items-start gap-3 rounded-md border border-danger/35 bg-danger/[.04] p-4 text-sm text-foreground/80" role="note">
            <CircleHelp aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-danger" strokeWidth={2.2} />
            <div>
              <p className="font-extrabold text-danger">Before you begin</p>
              <p className="mt-1 leading-6">
                Fields marked <span className="font-bold text-danger">*</span> are required. Use the help icons beside selected labels when you need more detail.
              </p>
            </div>
          </div>

          {errorCount > 0 ? (
            <div className="rounded-md border border-danger/45 bg-danger/[.05] p-4" id="application-error-summary" role="alert">
              <div className="flex items-start gap-3">
                <AlertCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-danger" strokeWidth={2.4} />
                <div>
                  <h2 className="font-extrabold text-danger">
                    Please check {errorCount === 1 ? "the highlighted field" : `${errorCount} highlighted fields`}.
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-foreground/75">
                    Select an item below to jump to the field that needs attention.
                  </p>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-5 text-danger">
                    {errorEntries.map(([field, message]) => (
                      <li key={field}>
                        <a className="font-semibold underline decoration-danger/50 underline-offset-2 hover:decoration-danger" href={"#application-" + field}>
                          {errorLabels[field] || message}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : null}

          {submitted ? (
            <div className="flex items-start gap-3 rounded-md border border-accent/50 bg-accent/10 p-4" role="status">
              <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" strokeWidth={2.3} />
              <div>
                <p className="font-extrabold text-primary">Application ready for review</p>
                <p className="mt-1 text-sm leading-6 text-foreground/75">
                  This student prototype has validated your details locally. In a production service, a coordinator would now contact you about the next steps.
                </p>
              </div>
            </div>
          ) : null}

          <form className="space-y-6" noValidate onSubmit={handleSubmit}>
            <section className="overflow-hidden rounded-md border border-border">
              <SectionHeading
                description="Tell us how we can reach you and when a coordinator should call."
                icon={Phone}
                number="1"
                title="Your details"
              />
              <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
                <TextField
                  autoComplete="given-name"
                  error={errors.firstName}
                  label="First name"
                  name="firstName"
                  onBlur={() => validateField("firstName")}
                  onChange={handleInputChange}
                  placeholder="e.g. Jordan"
                  value={values.firstName}
                />
                <TextField
                  autoComplete="family-name"
                  error={errors.lastName}
                  label="Last name"
                  name="lastName"
                  onBlur={() => validateField("lastName")}
                  onChange={handleInputChange}
                  placeholder="e.g. Smith"
                  value={values.lastName}
                />
                <TextField
                  autoComplete="email"
                  error={errors.email}
                  label="Email address"
                  name="email"
                  onBlur={() => validateField("email")}
                  onChange={handleInputChange}
                  placeholder="e.g. jordan@example.com"
                  type="email"
                  value={values.email}
                />
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-primary" htmlFor="application-mobile">
                    <span className="inline-flex items-center">
                      Mobile number<span className="ml-1 text-danger">*</span>
                      <HelpTip align="right" label="Help for mobile number">
                        Select the country code, then enter the local number without the country code.
                      </HelpTip>
                    </span>
                  </label>
                  <div className="grid grid-cols-[minmax(0,0.95fr)_minmax(0,1.6fr)] gap-2">
                    <select
                      aria-label="Country calling code"
                      className="h-12 w-full rounded-sm border border-border bg-white px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-secondary/20"
                      name="phoneCountryCode"
                      onChange={handleSelectChange}
                      value={values.phoneCountryCode}
                    >
                      {countryCodeOptions.map((option) => (
                        <option key={`${option.label}-${option.value}`} value={option.value}>
                          {option.label} {option.value}
                        </option>
                      ))}
                    </select>
                    <input
                      aria-describedby={`application-mobile-help${errors.mobile ? " application-mobile-error" : ""}`}
                      aria-invalid={Boolean(errors.mobile)}
                      autoComplete="tel-national"
                      className={`h-12 w-full rounded-sm border bg-white px-3 text-sm text-foreground outline-none transition placeholder:text-foreground/45 focus:border-primary focus:ring-2 focus:ring-secondary/20 ${errors.mobile ? "border-danger bg-danger/[.02]" : "border-border"}`}
                      id="application-mobile"
                      inputMode="tel"
                      name="mobile"
                      onBlur={() => validateField("mobile")}
                      onChange={handleInputChange}
                      placeholder="0400 000 000"
                      required
                      type="tel"
                      value={values.mobile}
                    />
                  </div>
                  <FieldMessages
                    error={errors.mobile}
                    helper="Select the country code, then enter the local number."
                    id="application-mobile"
                  />
                </div>
                <SelectField
                  error={errors.bestCallTime}
                  helper="A coordinator will call within the selected window where possible."
                  label="When is the best time to call you?"
                  name="bestCallTime"
                  onBlur={() => validateField("bestCallTime")}
                  onChange={handleSelectChange}
                  options={callTimeOptions}
                  value={values.bestCallTime}
                />
              </div>
            </section>

            <section className="overflow-hidden rounded-md border border-border">
              <SectionHeading
                description="These details help us assess safety, space and the kind of support your home can offer."
                icon={Home}
                number="2"
                title="Your home and household"
              />
              <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
                <div className="sm:col-span-2">
                  <TextField
                    autoComplete="street-address"
                    error={errors.address}
                    helper="Example: 10 Barrack Street"
                    help="Include your house or unit number and street name."
                    helpLabel="Help for residential address"
                    label="Residential address"
                    name="address"
                    onBlur={() => validateField("address")}
                    onChange={handleInputChange}
                    placeholder="House/unit number and street name"
                    value={values.address}
                  />
                </div>
                <TextField
                  autoComplete="address-level2"
                  error={errors.suburb}
                  helper="Example: Sydney"
                  label="Suburb or town"
                  name="suburb"
                  onBlur={() => validateField("suburb")}
                  onChange={handleInputChange}
                  placeholder="Suburb or town"
                  value={values.suburb}
                />
                <SelectField
                  error={errors.state}
                  label="State or territory"
                  name="state"
                  onBlur={() => validateField("state")}
                  onChange={handleSelectChange}
                  options={stateOptions}
                  value={values.state}
                />
                <TextField
                  autoComplete="postal-code"
                  error={errors.postcode}
                  helper="Example: 2000"
                  label="Postcode"
                  maxLength={4}
                  name="postcode"
                  onBlur={() => validateField("postcode")}
                  onChange={handleInputChange}
                  placeholder="4 digits"
                  value={values.postcode}
                />
                <SelectField
                  error={errors.residenceType}
                  helper="Choose the option that best describes your home."
                  label="Type of residence"
                  name="residenceType"
                  onBlur={() => validateField("residenceType")}
                  onChange={handleSelectChange}
                  options={residenceOptions}
                  value={values.residenceType}
                />
                <SelectField
                  error={errors.ownership}
                  label="Do you own or rent your home?"
                  name="ownership"
                  onBlur={() => validateField("ownership")}
                  onChange={handleSelectChange}
                  options={ownershipOptions}
                  value={values.ownership}
                />
                {values.ownership === "I rent my residence" ? (
                  <SelectField
                    error={errors.landlordPermission}
                    helper="Written landlord or strata permission may be requested during review."
                    label="Do you have permission to keep a large dog?"
                    name="landlordPermission"
                    onBlur={() => validateField("landlordPermission")}
                    onChange={handleSelectChange}
                    options={["Yes", "No"]}
                    value={values.landlordPermission}
                  />
                ) : null}
                <SelectField
                  error={errors.secureYard}
                  help="A secure yard or courtyard helps a greyhound settle safely and exercise at home."
                  helpAlign="right"
                  helpLabel="Help for secure yard or courtyard"
                  label="Does your home have a securely fenced yard or courtyard?"
                  name="secureYard"
                  onBlur={() => validateField("secureYard")}
                  onChange={handleSelectChange}
                  options={["Yes", "No"]}
                  value={values.secureYard}
                />
                <SelectField
                  error={errors.hoursAlone}
                  helper="Think about a normal weekday, not a one-off exception."
                  label="How long might your greyhound be home alone?"
                  name="hoursAlone"
                  onBlur={() => validateField("hoursAlone")}
                  onChange={handleSelectChange}
                  options={hoursAloneOptions}
                  value={values.hoursAlone}
                />
                <div className="space-y-2 sm:col-span-2">
                  <label className="block text-sm font-semibold text-primary" htmlFor="application-household">
                    Who will your greyhound share their home with?<span className="ml-1 text-danger">*</span>
                  </label>
                  <textarea
                    aria-describedby={`application-household-help${errors.household ? " application-household-error" : ""}`}
                    aria-invalid={Boolean(errors.household)}
                    className={`min-h-28 w-full rounded-sm border bg-white px-3 py-3 text-sm text-foreground outline-none transition placeholder:text-foreground/45 focus:border-primary focus:ring-2 focus:ring-secondary/20 ${errors.household ? "border-danger bg-danger/[.02]" : "border-border"}`}
                    id="application-household"
                    name="household"
                    onBlur={() => validateField("household")}
                    onChange={(event) => setField("household", event.target.value)}
                    placeholder="e.g. Two adults and one child aged 10; we are all ready to welcome a greyhound."
                    required
                    value={values.household}
                  />
                  <FieldMessages error={errors.household} helper="Include names or ages of children and adults where relevant." id="application-household" />
                </div>
                <SelectField
                  error={errors.hasPets}
                  helper="This includes dogs, cats, birds and other animals."
                  label="Do you have any pets?"
                  name="hasPets"
                  onBlur={() => validateField("hasPets")}
                  onChange={handleSelectChange}
                  options={["No", "Yes"]}
                  value={values.hasPets}
                />
                <SelectField
                  error={errors.childrenUnder15}
                  label="How many children under 15 live with you?"
                  name="childrenUnder15"
                  onBlur={() => validateField("childrenUnder15")}
                  onChange={handleSelectChange}
                  options={childrenOptions}
                  value={values.childrenUnder15}
                />
                {values.hasPets === "Yes" ? (
                  <div className="space-y-2 sm:col-span-2">
                    <label className="block text-sm font-semibold text-primary" htmlFor="application-petDetails">
                      Tell us about your current pets<span className="ml-1 text-danger">*</span>
                    </label>
                    <textarea
                      aria-describedby={`application-petDetails-help${errors.petDetails ? " application-petDetails-error" : ""}`}
                      aria-invalid={Boolean(errors.petDetails)}
                      className={`min-h-28 w-full rounded-sm border bg-white px-3 py-3 text-sm text-foreground outline-none transition placeholder:text-foreground/45 focus:border-primary focus:ring-2 focus:ring-secondary/20 ${errors.petDetails ? "border-danger bg-danger/[.02]" : "border-border"}`}
                      id="application-petDetails"
                      name="petDetails"
                      onBlur={() => validateField("petDetails")}
                      onChange={(event) => setField("petDetails", event.target.value)}
                      placeholder="e.g. Milo, a 6-year-old desexed Labrador who is calm around other dogs."
                      required
                      value={values.petDetails}
                    />
                    <FieldMessages error={errors.petDetails} helper="Include species, age, sex, temperament and where each pet spends time." id="application-petDetails" />
                  </div>
                ) : null}
              </div>
            </section>

            <section className="overflow-hidden rounded-md border border-border">
              <SectionHeading
                description="There is no perfect answer. Honest detail helps our team make a safer, more thoughtful match."
                icon={PawPrint}
                number="3"
                title="Experience and the right fit"
              />
              <div className="grid gap-6 p-6 sm:p-8">
                <SelectField
                  error={errors.experience}
                  helper="Greyhound experience is not required; we provide guidance for first-time adopters."
                  label="Which best describes your experience?"
                  name="experience"
                  onBlur={() => validateField("experience")}
                  onChange={handleSelectChange}
                  options={experienceOptions}
                  value={values.experience}
                />
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-primary" htmlFor="application-greyhoundPreferences">
                      What are you looking for in a greyhound?<span className="ml-1 text-danger">*</span>
                    </label>
                    <textarea
                      aria-describedby={`application-greyhoundPreferences-help${errors.greyhoundPreferences ? " application-greyhoundPreferences-error" : ""}`}
                      aria-invalid={Boolean(errors.greyhoundPreferences)}
                      className={`min-h-32 w-full rounded-sm border bg-white px-3 py-3 text-sm text-foreground outline-none transition placeholder:text-foreground/45 focus:border-primary focus:ring-2 focus:ring-secondary/20 ${errors.greyhoundPreferences ? "border-danger bg-danger/[.02]" : "border-border"}`}
                      id="application-greyhoundPreferences"
                      name="greyhoundPreferences"
                      onBlur={() => validateField("greyhoundPreferences")}
                      onChange={(event) => setField("greyhoundPreferences", event.target.value)}
                      placeholder="e.g. We are open to age and sex; a gentle, people-focused dog would suit our home."
                      required
                      value={values.greyhoundPreferences}
                    />
                    <FieldMessages error={errors.greyhoundPreferences} helper="It is okay to write “no preference”." id="application-greyhoundPreferences" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-primary" htmlFor="application-reasonsForAdopting">
                      Why would you like to adopt a retired greyhound?<span className="ml-1 text-danger">*</span>
                    </label>
                    <textarea
                      aria-describedby={`application-reasonsForAdopting-help${errors.reasonsForAdopting ? " application-reasonsForAdopting-error" : ""}`}
                      aria-invalid={Boolean(errors.reasonsForAdopting)}
                      className={`min-h-32 w-full rounded-sm border bg-white px-3 py-3 text-sm text-foreground outline-none transition placeholder:text-foreground/45 focus:border-primary focus:ring-2 focus:ring-secondary/20 ${errors.reasonsForAdopting ? "border-danger bg-danger/[.02]" : "border-border"}`}
                      id="application-reasonsForAdopting"
                      name="reasonsForAdopting"
                      onBlur={() => validateField("reasonsForAdopting")}
                      onChange={(event) => setField("reasonsForAdopting", event.target.value)}
                      placeholder="Tell us what makes this the right time for your family."
                      required
                      value={values.reasonsForAdopting}
                    />
                    <FieldMessages error={errors.reasonsForAdopting} helper="Share the expectations you have for life with a greyhound." id="application-reasonsForAdopting" />
                  </div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <SelectField
                    error={errors.referralSource}
                    label="How did you hear about Greyhound as Pets?"
                    name="referralSource"
                    onBlur={() => validateField("referralSource")}
                    onChange={handleSelectChange}
                    options={referralOptions}
                    value={values.referralSource}
                  />
                  <SelectField
                    error={errors.hasSeriousConviction}
                    help="This question helps the team assess safety and suitability. Answer honestly."
                    helpAlign="right"
                    helpLabel="Help for serious conviction question"
                    label="Have you had a serious conviction in the last 10 years?"
                    name="hasSeriousConviction"
                    onBlur={() => validateField("hasSeriousConviction")}
                    onChange={handleSelectChange}
                    options={["No", "Yes"]}
                    value={values.hasSeriousConviction}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-primary" htmlFor="application-additionalComments">
                    Additional comments <span className="font-normal text-foreground/55">(optional)</span>
                  </label>
                  <textarea
                    className="min-h-32 w-full rounded-sm border border-border bg-white px-3 py-3 text-sm text-foreground outline-none transition placeholder:text-foreground/45 focus:border-primary focus:ring-2 focus:ring-secondary/20"
                    id="application-additionalComments"
                    name="additionalComments"
                    onChange={(event) => setField("additionalComments", event.target.value)}
                    placeholder="Anything else about your household, lifestyle or greyhound preferences?"
                    value={values.additionalComments}
                  />
                </div>
              </div>
            </section>

            <div className="flex items-start gap-3 rounded-md border border-border bg-surface-app p-4">
              <input
                aria-describedby={errors.consent ? "application-consent-error" : undefined}
                aria-invalid={Boolean(errors.consent)}
                checked={values.consent}
                className="mt-1 size-4 rounded border-border accent-primary"
                id="application-consent"
                name="consent"
                onChange={handleInputChange}
                type="checkbox"
              />
              <div>
                <label className="text-sm font-semibold leading-6 text-foreground/80" htmlFor="application-consent">
                  I understand this student prototype collects application details for assessment demonstration purposes only.
                  <span className="ml-1 text-danger">*</span>
                </label>
                {errors.consent ? (
                  <p className="mt-1 flex items-start gap-1.5 text-xs font-semibold leading-5 text-danger" id="application-consent-error" role="alert">
                    <AlertCircle aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" strokeWidth={2.5} />
                    <span>{errors.consent}</span>
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-2 text-xs leading-5 text-muted-foreground">
                <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={2.2} />
                <p>Your answers help the team make a safe, individual match.</p>
              </div>
              <button
                className="inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-primary px-7 text-sm font-extrabold text-white transition hover:bg-primary-hover focus-visible:outline-offset-4"
                type="submit"
              >
                {submitted ? <CheckCircle2 aria-hidden="true" className="size-4" /> : null}
                {submitted ? "Application validated" : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
