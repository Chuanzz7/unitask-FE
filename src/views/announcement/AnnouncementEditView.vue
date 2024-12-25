<script setup>

import AppButton from "@/components/AppButton.vue";
import {onMounted, reactive, ref} from "vue";
import {apiClient, GET_ANNOUNCEMENT, PUT_ASSESSMENT} from "@/api/index.js";
import {POSITION, useToast} from "vue-toastification";
import {useRoute, useRouter} from "vue-router";
import pathnames from "@/router/pathnames.js";
import AnnouncementForm from "@/components/announcement/AnnouncementForm.vue";

const toast = useToast();
const router = useRouter();
const route = useRoute();
const isLoading = ref(true);
const formData = reactive({
  isDisabled: false,
  title: "",
  description: "",
  subjectId: "",
});

const update = async () => {
  try {
    const payload = {
      title: formData.title,
      description: formData.description,
      subjectId: formData.subjectId,
    };
    const response = await apiClient.put(`${PUT_ASSESSMENT}${formData.id}`, payload);
    if (response.status === 200) {
      toast.success("Successfully Updated!", {position: POSITION.TOP_CENTER});
    }
  } catch (error) {
    toast.error("Something Wrong", {position: POSITION.TOP_CENTER});
  } finally {
    router.push(pathnames.SubjectView);
  }
};

const readApi = async (id) => {
  if (id != null) {
    try {
      const response = await apiClient.get(`${GET_ANNOUNCEMENT}${id}`);
      isLoading.value = false;
      let x = response.data;
      formData.id = x.id;
      formData.title = x.title;
      formData.description = x.description;
      formData.subjectId = x.subjectId;
      formData.postedDate = x.postedDate;
      formData.lecturerName = x.lecturerName;
    } catch (error) {
      toast.error("Something Wrong", {position: "top-center"});
    }
  }
};

onMounted(() => {
  readApi(route.params.id);
});

</script>


<template>
  <div class="flex-col w-full justify-items-center">
    <AnnouncementForm :loading="isLoading" v-model="formData"></AnnouncementForm>
    <AppButton @click="update" class="mb-5">Update</AppButton>
  </div>
</template>

<style scoped>

</style>