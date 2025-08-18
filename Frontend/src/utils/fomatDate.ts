export const formatDateForInput = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

// yyyy-mm-dd
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
};

// mm/dd/yyyy & time
export const formatDateTimeWithSuffix = (dateString: string) => {
 const date = new Date(dateString)

  const day = date.getDate()
  const year = date.getFullYear()
  const month = date.toLocaleString("en-US", { month: "short" })

  const getDaySuffix = (d: number) => {
    if (d > 3 && d < 21) return "th"
    switch (d % 10) {
      case 1: return "st"
      case 2: return "nd"
      case 3: return "rd"
      default: return "th"
    }
  }

  const readableDate = `${day}${getDaySuffix(day)} ${month} ${year}`
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  })

  return { readableDate, time }
}

