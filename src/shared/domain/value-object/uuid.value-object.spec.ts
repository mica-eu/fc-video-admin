import { UUID } from "./uuid.value-object";

describe("UUIDValueObject", () => {
  it("returns true when two UUID value objects are equal", () => {
    const uuid1 = new UUID("123e4567-e89b-12d3-a456-426614174000");
    const uuid2 = new UUID("123e4567-e89b-12d3-a456-426614174000");
    expect(uuid1.equals(uuid2)).toBe(true);
  });

  it("returns false when two UUID value objects are different", () => {
    const uuid1 = new UUID("123e4567-e89b-12d3-a456-426614174000");
    const uuid2 = new UUID("123e4567-e89b-12d3-a456-426614174001");
    expect(uuid1.equals(uuid2)).toBe(false);
  });

  it("throws an error if uuid is not valid", () => {
    expect(() => new UUID("invalid-uuid")).toThrow("Invalid UUID");
  });

  it("generates a new uuid if no id is provided", () => {
    const uuid = new UUID();
    expect(uuid.value).toBeTruthy();
    expect(uuid.value).not.toBe(new UUID().value);
    expect(uuid.value).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
    );
  });

  it("returns the id", () => {
    const uuid = new UUID("123e4567-e89b-12d3-a456-426614174000");
    expect(uuid.value).toBe("123e4567-e89b-12d3-a456-426614174000");
  });

  it("calls validate method on constructor", () => {
    const validateSpy = jest.spyOn(UUID.prototype as any, "validate");
    new UUID("123e4567-e89b-12d3-a456-426614174000");
    expect(validateSpy).toHaveBeenCalled();
  });
});
