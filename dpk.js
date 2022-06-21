const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate = TRIVIAL_PARTITION_KEY;

  if (event) {
    const data = JSON.stringify(event);

    candidate = event.partitionKey || crypto.createHash("sha3-512").update(data).digest("hex");
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }

  return candidate.toString();
};

/*
 * So on 11 line we assign to condidate either event.partitionKey or hash
 * without any additional 'if' checks. Operator || will assign second value
 * if first one falsy.
 * 
 * In case to not check if candidate wasn't created and assign it to TRIVIAL_PARTITION_KEY
 * I assigned it at the beginning
 *
 * And since we expect the string as output, in case 'event.partitionKey' will be a number
 * result of candidate I'm transofrming to stream
 */