/**
 * Formats a millisecond-precision timestamp into a relative date if difference
 * is less than a week, otherwise shows absolute date.
 */
export function formatDate(timestamp) {
	const difference = Date.now() - timestamp;
	const secondsPassed = Math.trunc(difference / 1000);
	const minutesPassed = Math.trunc(secondsPassed / 60);
	const hoursPassed = Math.trunc(minutesPassed / 60);
	const daysPassed = Math.trunc(hoursPassed / 24);
	const relativeFormat = new Intl.RelativeTimeFormat();

	if (Math.abs(secondsPassed) < 60)
		return relativeFormat.format(-secondsPassed, "second");

	if (Math.abs(minutesPassed) < 60)
		return relativeFormat.format(-minutesPassed, "minute");

	if (Math.abs(hoursPassed) < 24)
		return relativeFormat.format(-hoursPassed, "hour");

	if (Math.abs(daysPassed) < 7)
		return relativeFormat.format(-daysPassed, "day");

	return new Intl.DateTimeFormat().format(timestamp);
}
