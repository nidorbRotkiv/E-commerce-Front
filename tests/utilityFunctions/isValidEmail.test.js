import UtilityFunctions from "../../lib/utilityFunctions";

const { isValidEmail } = UtilityFunctions;

describe("isValidEmail", () => {
  it("should return true for a valid email address", () => {
    const validEmails = [
      "test@example.com",
      "user123@gmail.com",
      "john.doe@my-domain.co",
    ];

    validEmails.forEach((email) => {
      expect(isValidEmail(email)).toBe(true);
    });
  });

  it("should return false for an invalid email address", () => {
    const invalidEmails = [
      "notanemail",
      "missing@dotcom",
      "spaces @ example.com",
    ];

    invalidEmails.forEach((email) => {
      expect(isValidEmail(email)).toBe(false);
    });
  });

  it("should return false for empty input", () => {
    expect(isValidEmail("")).toBe(false);
  });

  it("should return false for null input", () => {
    expect(isValidEmail(null)).toBe(false);
  });

  it("should return false for undefined input", () => {
    expect(isValidEmail(undefined)).toBe(false);
  });
});
