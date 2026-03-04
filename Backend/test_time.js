
const SHIFT_TIMES = {
    Morning: { start: '09:00 AM', end: '06:00 PM' },
    Evening: { start: '06:00 PM', end: '03:00 AM' },
};

function toMins(s) {
    let [t, mod] = s.split(' ');
    let [h, m] = t.split(':').map(Number);
    if (mod === 'PM' && h !== 12) h += 12;
    if (mod === 'AM' && h === 12) h = 0;
    return h * 60 + m;
}

function isWithinShift(timeStr, shift) {
    const { start, end } = SHIFT_TIMES[shift];
    const t = toMins(timeStr);
    const s = toMins(start);
    const e = toMins(end);

    if (e > s) {
        return t >= s && t < e;
    } else {
        // Crosses midnight: 18:00 to 03:00
        return t >= s || t < e;
    }
}

// Tests
console.log("Morning Shift (9AM-6PM):");
console.log("8:30 AM is within?", isWithinShift("08:30 AM", "Morning")); // false
console.log("9:00 AM is within?", isWithinShift("09:00 AM", "Morning")); // true
console.log("9:30 AM is within?", isWithinShift("09:30 AM", "Morning")); // true
console.log("6:00 PM is within?", isWithinShift("06:00 PM", "Morning")); // false
console.log("6:30 PM is within?", isWithinShift("06:30 PM", "Morning")); // false

console.log("\nEvening Shift (6PM-3AM):");
console.log("5:30 PM is within?", isWithinShift("05:30 PM", "Evening")); // false
console.log("6:00 PM is within?", isWithinShift("06:00 PM", "Evening")); // true
console.log("7:30 PM is within?", isWithinShift("07:30 PM", "Evening")); // true
console.log("1:30 AM is within?", isWithinShift("01:30 AM", "Evening")); // true
console.log("3:00 AM is within?", isWithinShift("03:00 AM", "Evening")); // false
console.log("3:30 AM is within?", isWithinShift("03:30 AM", "Evening")); // false
console.log("8:30 AM is within?", isWithinShift("08:30 AM", "Evening")); // false
