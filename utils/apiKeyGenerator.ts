export function generateApiKey(): string {
  const prefix = "dominium-";
  const randomString = Math.random().toString(36).substring(2, 15) + 
                      Math.random().toString(36).substring(2, 15) +
                      Math.random().toString(36).substring(2, 10);
  return prefix + randomString;
}

export function maskApiKey(key: string): string {
  return key.substring(0, 8) + "*".repeat(24);
}
