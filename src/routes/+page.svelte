<script>
	import { onMount } from 'svelte';

	let time = new Date();

	let fontFamily = 'Alpino';

	// these automatically update when `time`
	// changes, because of the `$:` prefix
	$: hours = time.getHours();
	$: minutes = time.getMinutes();
	$: seconds = time.getSeconds();

	$: secondsWeight = 100 + (seconds / 60) * 900;
	$: minutesWeight = 100 + (minutes / 60) * 900;
	$: hoursWeight = 100 + (hours / 24) * 900;

	$: hoursDisplay = hours.toString().padStart(2, '0');
	$: minutesDisplay = minutes.toString().padStart(2, '0');
	$: secondsDisplay = seconds.toString().padStart(2, '0');

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<div
	style="font-size: 25vw; font-family: {fontFamily};"
	class="text-purple-100 flex items-baseline ml-12 pt-40"
>
	<div class="flex">
		<div style="font-weight: {hoursWeight};">{hoursDisplay}</div>
		<div style="font-weight: {(hoursWeight + minutesWeight) / 2};">:</div>
		<div style="font-weight: {minutesWeight};">{minutesDisplay}</div>
	</div>
	<div style="font-size: 5vw; font-weight: {secondsWeight};" class="w-1/2">{secondsDisplay}</div>
</div>
