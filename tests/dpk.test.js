const { deterministicPartitionKey } = require("../dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the literal '123' when given input {partitionKey: 123}", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: 123});
    expect(trivialKey).toBe("123");
  });

  it("Returns the literal when input {partitionKey: undefined}", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: undefined});
    expect(trivialKey).toMatch(/[a-f0-9]{64}/);
  });
});
