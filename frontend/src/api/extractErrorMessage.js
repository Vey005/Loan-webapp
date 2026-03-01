export function extractErrorMessage(errorPayload) {
  if (!errorPayload?.errors) {
    return "An unexpected error occurred.";
  }

  const firstKey = Object.keys(errorPayload.errors)[0];
  const value = errorPayload.errors[firstKey];

  if (Array.isArray(value) && value.length > 0) {
    return String(value[0]);
  }

  if (typeof value === "string") {
    return value;
  }

  return "Request failed.";
}
