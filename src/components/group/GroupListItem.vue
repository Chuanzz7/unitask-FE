<script setup>
const props = defineProps({
	data: {
		id: Number,
		name: String,
		description: String,
	},
});
</script>

<template>
	<div :class="['flex-auto m-3 py-1 px-4 hover:bg-gray-200 rounded-lg']">
		<ul class="flex flex-col pl-0 mb-0 rounded-lg">
			<li class="relative flex justify-between px-4 py-2 pl-0 mb-2 border-0 rounded-t-inherit text-inherit rounded-xl">
				<div class="flex flex-col">
					<h5 class="mb-1 text-sm font-semibold leading-normal dark:text-white text-slate-700">
						{{ data.name }}
					</h5>
					<h6 class="mb-1 text-sm leading-normal dark:text-white text-slate-500">
						{{ data.description }}
					</h6>
				</div>
			</li>
		</ul>
	</div>
</template>
