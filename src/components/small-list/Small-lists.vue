<script setup>
import SmallList from "@/components/small-list/Small-list.vue";
import { defineProps, onMounted, reactive } from "vue";
import SearchBar from "@/components/SearchBar.vue";
import { useRoute } from "vue-router";
import router from "@/router/index.js";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

const props = defineProps({
	search: Function,
	editable: Boolean,
	title: String,
  titleIcon: String,
	detailsPage: String,
	newPage: String,
	updatePage: String,
	loading: Boolean,
	content: [{
		id: Number,
		title: String,
		description: String,
		code: String,
		color: String,
	}],
});

const model = defineModel();

const state = reactive({
	isActiveId: Number,
	search: String,
});

const route = useRoute();

onMounted(() => {
	state.isActiveId = Number(route.params.id);
});

const getId = (id) => {
	state.isActiveId = id;
};

const newId = () => {
	router.push({ name: props.newPage });
};

</script>

<template>
	<div
		class="h-full overflow-y-hidden pb-14 px-1 bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl ">
		<div class="p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
			<div class="flex flex-wrap -mx-3">
				<div class="flex items-center flex-none w-1/2 max-w-full px-3">
          <h5 :class="`relative top-0.5 leading-normal pi ${titleIcon} pr-2`"></h5>
          <h5 class="mb-0 dark:text-white">{{ title }}</h5>
				</div>
				<div class="flex w-1/2 max-w-full px-3 text-right">
					<SearchBar :search="search" v-model="model"></SearchBar>
					<button v-if="newPage" class="flex py-2 font-semibold text-blue-500 " @click="newId()">
						<i class="text-lg pi pi-plus my-1 mr-1"></i>
						<span>Add</span>
					</button>
				</div>
			</div>
		</div>
		<PulseLoader class="h-full w-full flex justify-center items-center" v-if="props.loading"
					 color="#825ee4"></PulseLoader>
		<div v-else class="max-h-full overflow-y-auto break-words bg-clip-border">
			<SmallList v-for="content in props.content"
					   @click="getId(content.id)"
					   :data="content"
					   :isActive="content.id === state.isActiveId"
					   :update-page="props.updatePage"
					   :details-page="props.detailsPage"
					   :editable="props.editable"></SmallList>
		</div>
	</div>
</template>

<style scoped>

</style>