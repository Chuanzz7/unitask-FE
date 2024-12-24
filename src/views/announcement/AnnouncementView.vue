<script setup>

import SmallLists from "@/components/small-list/Small-lists.vue";
import {computed, onMounted, reactive, ref, watch} from "vue";
import {apiClient, GET_ANNOUNCEMENT, LIST_ANNOUNCEMENT} from "@/api/index.js";
import {POSITION, useToast} from "vue-toastification";
import {useRoute} from "vue-router";
import AnnouncementForm from "@/components/announcement/AnnouncementForm.vue";

const route = useRoute();
const currentValue = computed(() => route.params.id);
const toast = useToast();

const id = ref(route.params.id);

const state = reactive({
  search: "",
  listData: {isLoading: true, content: []},
  formData: {isLoading: true, content: {}},
});

const listingApi = async () => {
  try {
    const response = await apiClient.get(LIST_ANNOUNCEMENT, {
      params: {
        page: 1,
        pageSize: 999,
        search: state.search,
      },
    });
    state.listData.isLoading = false;
    state.listData.content = [];
    response.data.content.map((x) => {
      state.listData.content.push({
        id: x.id,
        title: x.title,
        code: x.subjectCode,
        description: x.description,
        color: x.color,
      });
    });
  } catch (error) {
    console.log(error);
    toast.error("Something Wrong", {position: POSITION.TOP_CENTER});
  }
};

const announcementApi = async (id) => {
  if (id != null) {
    try {
      const response = await apiClient.get(`${GET_ANNOUNCEMENT}${id}`);
      state.formData.isLoading = false;
      let x = response.data;
      state.formData.content.id = x.id;
      state.formData.content.title = x.title;
      state.formData.content.description = x.description;
      state.formData.content.subjectId = x.subjectId;

    } catch (error) {
      toast.error("Something Wrong", {position: POSITION.TOP_CENTER});
    }
  }
};

onMounted(() => {
  listingApi();
});

watch(
    () => route.params.id,
    (newId) => {
      id.value = newId;
      announcementApi(newId); // Fetch data when the ID changes
    },
    {immediate: true}, // Trigger on initial mount
);
</script>

<template>
  <div class="h-full flex flex-wrap max-w-full pb-4 ">
    <SmallLists class="h-full flex-row flex-grow mx-3 mb-3 min-w-[30%] basis-[30%]" title="Announcement"
                details-page="announcementDetails"
                new-page="announcementCreate"
                update-page="announcementUpdate"
                editable
                v-model="state.search"
                :search="listingApi"
                :content="state.listData.content"
                :loading="state.listData.isLoading"></SmallLists>

    <AnnouncementForm class="h-full flex-row flex-grow mx-3 mb-3 basis-[60%]"
                      disabled
                      v-if="currentValue != null"
                      v-model="state.formData.content"
                      :loading="state.formData.isLoading">
    </AnnouncementForm>

  </div>
</template>

<style scoped>

</style>