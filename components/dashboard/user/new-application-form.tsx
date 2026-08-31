 
const callTimeOptions = [
  "Morning 9am - 12noon",
  "Lunchtime 12noon - 2pm",
  "Afternoon 2pm - 6pm",
] as const;

const stateOptions = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"] as const;

const childrenOptions = ["0", "1", "2", "3", "4", "5+"] as const;

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

type FieldProps = {
  autoComplete?: string;
  label: string;
  name: string;
  required?: boolean;
  type?: string;
};

function TextField({
  autoComplete,
  label,
  name,
  required = true,
  type = "text",
}: FieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-primary">
        {label}
        {required ? <span className="text-danger">*</span> : null}
      </span>
      <input
        autoComplete={autoComplete}
        className="mt-2 h-11 w-full rounded-sm border border-border bg-white px-3 text-sm outline-none transition focus:border-primary"
        name={name}
        required={required}
        type={type}
      />
    </label>
  );
}

type SelectFieldProps = {
  label: string;
  name: string;
  options: readonly string[];
  required?: boolean;
};

function SelectField({ label, name, options, required = true }: SelectFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-primary">
        {label}
        {required ? <span className="text-danger">*</span> : null}
      </span>
      <select
        className="mt-2 h-11 w-full rounded-sm border border-border bg-white px-3 text-sm outline-none transition focus:border-primary"
        defaultValue=""
        name={name}
        required={required}
      >
        <option disabled value="">
          Select an option
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function NewApplicationForm() {
  return (
    <section className="mx-auto max-w-5xl rounded-md border border-border bg-white shadow-sm">
      <div className="bg-primary px-6 py-5 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-white">
          Adoption Application Form
        </h2>
      </div>

      <form className="space-y-8 p-6 sm:p-8">
        <div className="grid gap-5 md:grid-cols-2">
          <TextField autoComplete="given-name" label="First Name" name="firstName" />
          <TextField autoComplete="family-name" label="Last Name" name="lastName" />
          <TextField autoComplete="email" label="Email" name="email" type="email" />
          <TextField autoComplete="tel" label="Mobile" name="mobile" type="tel" />
          <SelectField label="When is the best time to call you?" name="bestCallTime" options={callTimeOptions} />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <TextField autoComplete="street-address" label="Address" name="address" />
          </div>
          <TextField autoComplete="address-level2" label="Suburb" name="suburb" />
          <SelectField label="State" name="state" options={stateOptions} />
          <TextField autoComplete="postal-code" label="Postcode" name="postcode" />
          <SelectField label="Do you have any pets?" name="hasPets" options={["No", "Yes"]} />
          <SelectField label="How many children under 15 years are living with you?" name="childrenUnder15" options={childrenOptions} />
        </div>

        <div className="grid gap-5">
          <SelectField label="How did you learn about Greyhound as Pets?" name="referralSource" options={referralOptions} />
          <SelectField
            label="Have you, in the last 10 years, been convicted of a serious criminal offence punishable by imprisonment for 5 years or more, including offences involving violence or animal cruelty?"
            name="hasSeriousConviction"
            options={["No", "Yes"]}
          />
          <label className="block">
            <span className="text-sm font-semibold text-primary">
              Additional comments
            </span>
            <textarea
              className="mt-2 min-h-32 w-full rounded-sm border border-border bg-white px-3 py-3 text-sm outline-none transition focus:border-primary"
              name="additionalComments"
            />
          </label>
        </div>

        <label className="flex items-start gap-3 rounded-md border border-border bg-surface-app p-4">
          <input className="mt-1 size-4 rounded border-border" name="consent" required type="checkbox" />
          <span className="text-sm leading-6 text-foreground/75">
            I understand this student prototype collects application details for assessment demonstration purposes only.
          </span>
        </label>

        <button
          className="h-12 w-full rounded-sm bg-primary px-5 text-sm font-extrabold text-white transition hover:bg-primary-hover"
          type="submit"
        >
          Submit Application
        </button>
      </form>
    </section>
  );
}
