const bnDigits = {
  "0": "০",
  "1": "১",
  "2": "২",
  "3": "৩",
  "4": "৪",
  "5": "৫",
  "6": "৬",
  "7": "৭",
  "8": "৮",
  "9": "৯",
  ".": ".",
  "-": "-",
  "+": "+",
  ",": ","
};

export function toBanglaNumber(val) {
  if (val === null || val === undefined) return "০";
  return val.toString().replace(/[0-9]/g, (d) => bnDigits[d] || d);
}

export function formatBanglaPercentage(val) {
  if (val === null || val === undefined) return "০.০%";
  const num = typeof val === "number" ? val : parseFloat(val);
  if (isNaN(num)) return "০.০%";
  const abs = Math.abs(num);
  const formatted = abs.toFixed(1);
  return `${toBanglaNumber(formatted)}%`;
}

export function formatBanglaPrice(price) {
  if (price === null || price === undefined) return "০ টাকা";
  if (typeof price === "number" && !Number.isInteger(price)) {
    return `${toBanglaNumber(price.toFixed(2).replace(/\.00$/, ""))} টাকা`;
  }
  return `${toBanglaNumber(price)} টাকা`;
}

export function getBanglaUnit(unit) {
  if (!unit) return "প্রতি একক";
  const u = unit.toLowerCase();
  if (u === "kg") return "প্রতি কেজি";
  if (u === "litre" || u === "liter") return "প্রতি লিটার";
  if (u === "dozen") return "প্রতি ডজন";
  if (u === "piece") return "প্রতি পিস";
  if (u === "gm" || u === "100gm") return "প্রতি ১০০ গ্রাম";
  return `প্রতি ${unit}`;
}

export function getBanglaDate() {
  const days = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
  const months = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
  ];

  const today = new Date();
  const dayName = days[today.getDay()];
  const dateBn = toBanglaNumber(today.getDate());
  const monthBn = months[today.getMonth()];
  const yearBn = toBanglaNumber(today.getFullYear());

  return `${dayName}, ${dateBn} ${monthBn}, ${yearBn}`;
}
