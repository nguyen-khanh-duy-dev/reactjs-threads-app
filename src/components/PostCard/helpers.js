// Function to cut userName to Fallback Initials for Avatar Component
// Ex: duy nguyen => DN
function getFallbackInitials(userName) {
  if (!userName) return "?";
  const words = userName.split(" ");
  const initials = words.map((word) => word[0]).join("");
  return initials.substring(0, 2).toUpperCase();
}

function formatTimestamp() {
  // 1. Lấy thời gian hiện tại
  const now = new Date();

  // 2. Tách Date (YYYY-MM-DD)
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Tháng (0-11) nên cần +1
  const day = String(now.getDate()).padStart(2, "0");

  const date = `${year}-${month}-${day}`;

  // 3. Tách Time (HH:MM:SS)
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const time = `${hours}:${minutes}:${seconds}`;

  const result = {
    date,
    time,
  };

  console.log(result);

  return result;
}

export { getFallbackInitials, formatTimestamp };
