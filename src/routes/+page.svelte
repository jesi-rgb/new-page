<script>
	import { onMount } from 'svelte';

	let time = new Date();

	let fontFamily = 'Alpino';

	// these automatically update when `time`
	// changes, because of the `$:` prefix
	$: hours = time.getHours();
	$: minutes = time.getMinutes();
	$: seconds = time.getSeconds();

	$: secondsWeight = 50 + (seconds / 60) * 50;
	$: minutesWeight = 50 + (minutes / 60) * 50;
	$: hoursWeight = 50 + (hours / 24) * 50;

	$: hoursDisplay = hours.toString().padStart(2, '0');
	$: minutesDisplay = minutes.toString().padStart(2, '0');
	$: secondsDisplay = seconds.toString().padStart(2, '0');

	let weather;

	let latitude, longitude;
	function getCoords() {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				latitude = position.coords.latitude;
				longitude = position.coords.longitude;
			},
			(e) => {
				error = true;
			}
		);
	}

	async function fetchWeather(latitude, longitude) {
		if (latitude == undefined || longitude == undefined) return;
		let promise = await fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,rain,weather_code`
		);
		let data = await promise.json();

		weather = data;
	}

	$: fetchWeather(latitude, longitude);

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);
		getCoords();

		return () => {
			clearInterval(interval);
		};
	});
</script>

<div class="w-1/2 mx-auto flex flex-col items-center">
	<div
		style="font-family: 'Whirly Birdie'; font-variation-settings: 'wdth' 120;"
		class="text-purple-100 flex items-baseline mx-auto w-full xl:w-1/2 tabular-nums"
	>
		<div class="flex items-baseline text-[250px] mx-auto">
			<div class="flex">
				<div style="font-variation-settings: 'wdth' {hoursWeight};">{hoursDisplay}</div>
				<div
					class="opacity-60"
					style="font-variation-settings: 'wdth' {(hoursWeight + minutesWeight) / 2};"
				>
					:
				</div>
				<div style="font-variation-settings: 'wdth' {minutesWeight};">{minutesDisplay}</div>
			</div>
			<div
				style="font-variation-settings: 'wght' {secondsWeight}, 'wdth' 120;"
				class="w-10 text-xl opacity-60"
			>
				{secondsDisplay}
			</div>
		</div>
	</div>

	<div class="text-8xl font-thin text-purple-100 text-left">
		{#if weather}
			<div class="flex flex-col">
				<span>
					{weather.current.temperature_2m}°
				</span>
				<span class="text-5xl">
					{weather.current.rain}% rain
				</span>
			</div>
		{:else}
			<div>loading...</div>
		{/if}
	</div>
</div>
