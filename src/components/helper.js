// Function to cut userName to Fallback Initials for Avatar Component
// Ex: duy nguyen => DN
function getFallbackInitials(userName) {
  if (!userName) return "?";
  const words = userName.split(" ");
  const initials = words.map((word) => word[0]).join("");
  return initials.substring(0, 2).toUpperCase();
}

export { getFallbackInitials };
