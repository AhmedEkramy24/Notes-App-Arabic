export default function displayDateArabic(x) {
  const daysOfWeek = [
    "الأحد",
    "الإثنين",
    "الثلاثاة",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];

  const months = [
    "يناير",
    "فبراير",
    "مارس",
    "إبريل",
    "مايو",
    "يونية",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];
  let date = new Date(x);
  let number = date.getUTCDate();
  let day = daysOfWeek[date.getDay()];
  let month = months[date.getMonth()];
  let year = date.getFullYear();

  return `${day} ${number},${month} ${year} `;
}
