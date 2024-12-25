<script setup>

import AppButton from "@/components/AppButton.vue";
import {reactive} from "vue";
import {apiClient, POST_ANNOUNCEMENT} from "@/api/index.js";
import {POSITION, useToast} from "vue-toastification";
import {useRouter} from "vue-router";
import pathnames from "@/router/pathnames.js";
import AnnouncementForm from "@/components/announcement/AnnouncementForm.vue";
import moment from "moment";

const toast = useToast();
const router = useRouter();

const formData = reactive({
  isDisabled: false,
  title: "",
  description: "",
  subjectId: "",
});


const create = async () => {
  console.log(formData);
  try {
    const payload = {
      title: formData.title,
      description: formData.description,
      subjectId: formData.subjectId,
    };

    const response = await apiClient.post(POST_ANNOUNCEMENT, payload);
    if (response.status === 200) {
      toast.success("Successfully created!", {position: POSITION.TOP_CENTER});
    }
  } catch (error) {
    toast.error("Something Wrong", {position: POSITION.TOP_CENTER});
  } finally {
    router.push(pathnames.AnnouncementView);
  }
};
</script>


<template>
  <div class="flex-col w-full justify-items-center">
    <AnnouncementForm v-model="formData"></AnnouncementForm>
    <AppButton @click="create" class="mb-5">Create</AppButton>
  </div>
</template>

<style scoped>

</style>