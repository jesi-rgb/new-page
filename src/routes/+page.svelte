<script>
	import { onMount } from 'svelte';
	import { PUBLIC_OPEN_WEATHER_KEY } from '$env/static/public';

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

		let latitude, longitude;
		const defineCoords = (position) => {
			console.log('bolas');
			latitude = position.coords.latitude;
			longitude = position.coords.longitude;
			console.log(latitude, longitude);
		};

		navigator.geolocation.getCurrentPosition(
			(position) => {
				defineCoords(position);
			},
			() => alert('putada enorme')
		);
		console.log(latitude);

		const data = fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
		);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<div
	class="flex flex-col xl:flex-row items-end my-10 xl:my-20 space-y-20 xl:space-y-0 max-w-[1200px] mx-auto"
>
	<div class="w-1/2 flex flex-col items-center mx-auto">
		<div class="text-purple-100 text-3xl">It's</div>
		<div
			style="font-family: {fontFamily};"
			class="text-purple-100 flex items-baseline mx-auto w-full xl:w-1/2 tabular-nums"
		>
			<div class="flex items-baseline text-9xl mx-auto">
				<div class="flex">
					<div style="font-weight: {hoursWeight};">{hoursDisplay}</div>
					<div style="font-weight: {(hoursWeight + minutesWeight) / 2};">:</div>
					<div style="font-weight: {minutesWeight};">{minutesDisplay}</div>
				</div>
				<div style="font-weight: {secondsWeight};" class="w-10 text-xl">
					{secondsDisplay}
				</div>
			</div>
		</div>
	</div>

	<div class="text-8xl font-thin text-purple-100 w-1/2 mx-auto text-center">Cloudy</div>
</div>
