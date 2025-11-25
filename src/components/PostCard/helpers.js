// Function to cut userName to Fallback Initials for Avatar Component
// Ex: duy nguyen => DN
function getFallbackInitials(userName) {
  if (!userName) return "?";
  const words = userName.split(" ");
  const initials = words.map((word) => word[0]).join("");
  return initials.substring(0, 2).toUpperCase();
}
function formatPostTime(createdAt) {
  if (!createdAt) return "";

  const now = new Date();
  const created = new Date(createdAt);

  // Tính khoảng cách thời gian bằng mili-giây
  const diffInMs = now - created;

  // Chuyển đổi sang các đơn vị
  const seconds = Math.floor(diffInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days >= 1) {
    // Nếu lớn hơn hoặc bằng 1 ngày -> Hiện "X ngày"
    return `${days} ngày`;
  } else if (hours >= 1) {
    // Nếu nhỏ hơn 24h nhưng lớn hơn 1h -> Hiện "Xh"
    return `${hours}h`;
  } else if (minutes >= 1) {
    // Nếu nhỏ hơn 1h -> Hiện "Xm" (Threads dùng 'm' cho phút)
    return `${minutes}m`;
  } else {
    // Nếu nhỏ hơn 1 phút -> Hiện "Vừa xong" hoặc số giây "Xs"
    return `vừa xong`;
  }
}

function formatCompactNumber(number) {
  if (typeof number !== "number") return "0";

  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short", // "short" hiện 1.2k, "long" hiện 1.2 thousand
    maximumFractionDigits: 1, // Giữ tối đa 1 số thập phân (1.5k thay vì 1.53k)
  }).format(number);
}

export { getFallbackInitials, formatPostTime, formatCompactNumber };
