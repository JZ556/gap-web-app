import {
  createApplicationSchema,
} from "./application";

const validApplication = {
  firstName: "  Alex  ",
  lastName: "Smith",
  email: "alex@example.com",
  mobile: "0412 345 678",
  bestCallTime: "Morning 9am - 12noon",
  address: "1 Main Street",
  suburb: "Sydney",
  state: "NSW",
  postcode: "2000",
  residenceType: "House",
  secureYard: "Yes",
  hasPets: "No",
  petDetails: "",
  childrenUnder15: "0",
  experience: "I am new to greyhounds",
  referralSource: "Online Search",
  hasSeriousConviction: "No",
  additionalComments: "",
  consent: true,
};

describe("createApplicationSchema", () => {
  it("normalizes a valid application for storage", () => {
    const result = createApplicationSchema.parse(validApplication);

    expect(result).toMatchObject({
      firstName: "Alex",
      mobile: "0412345678",
      hasSecureYard: true,
      hasPets: false,
      petDetails: null,
      childrenUnder15: 0,
      additionalComments: null,
    });
    expect(result).not.toHaveProperty("consent");
  });

  it("rejects an application without consent", () => {
    const result = createApplicationSchema.safeParse({
      ...validApplication,
      consent: false,
    });

    expect(result.success).toBe(false);
  });

  it("requires pet details when the applicant has pets", () => {
    const result = createApplicationSchema.safeParse({
      ...validApplication,
      hasPets: "Yes",
      petDetails: "   ",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([expect.objectContaining({ path: ["petDetails"] })]),
      );
    }
  });

  it("rejects an invalid Australian mobile number", () => {
    const result = createApplicationSchema.safeParse({
      ...validApplication,
      mobile: "12345",
    });

    expect(result.success).toBe(false);
  });
});
