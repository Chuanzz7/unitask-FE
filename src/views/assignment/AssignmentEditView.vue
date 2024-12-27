<script setup>

import AppButton from "@/components/AppButton.vue";
import {reactive, watch} from "vue";
import {apiClient, GET_ASSESSMENT, PUT_ASSESSMENT} from "@/api/index.js";
import {POSITION, useToast} from "vue-toastification";
import {useRoute, useRouter} from "vue-router";
import pathnames from "@/router/pathnames.js";
import AssignmentForm from "@/components/assignment/AssignmentForm.vue";

const toast = useToast();
const router = useRouter();
const route = useRoute();

const formData = reactive({
  id: 0,
  name: "",
  weightage: "",
  assignmentMode: "",
  dueDate: new Date(),
  lecturerInstruction: "",
  assessmentMarkingRubrics: [{}],
  attachedDocument: [],
  subject:{}
});

const update = async () => {
  try {
    const payload = {
      name: formData.name,
      weightage: formData.weightage,
      assignmentMode: formData.assignmentMode,
      dueDate: formData.dueDate,
      lecturerInstruction: formData.lecturerInstruction,
      assessmentMarkingRubrics: formData.assessmentMarkingRubrics,
    };
    const response = await apiClient.put(`${PUT_ASSESSMENT}${formData.id}`, payload);
    if (response.status === 200) {
      toast.success("Successfully Updated!", {position: POSITION.TOP_CENTER});
    }
  } catch (error) {
    console.log(error);
    toast.error("Something Wrong", {position: POSITION.TOP_CENTER});
  } finally {
    router.push(pathnames.AssignmentView);
  }
};

const read = async (id) => {
  if (id != null) {
    try {
      const response = await apiClient.get(GET_ASSESSMENT(id));
      let data = response.data;
      let subject = data.subject;
      formData.id = data.id;
      formData.name = data.name;
      formData.weightage = data.weightage;
      formData.subject = subject
      formData.assignmentMode = data.assignmentMode;
      if (data.dueDate != null) {
        formData.dueDate = new Date(data.dueDate);
      }
      formData.lecturerInstruction = data.lecturerInstruction;
      formData.assessmentMarkingRubrics = data.assessmentMarkingRubrics || [{}];
      formData.attachedDocument = data.attachedFile || [];
      formData.isLoading = false;
    } catch (error) {
      toast.error("Something Wrong", {position: POSITION.TOP_CENTER});
    }
  }
};

watch(
    () => route.params.id,
    (newId) => {
      formData.id = Number(newId);
      read(newId); // Fetch data when the ID changes
    },
    {immediate: true}, // Trigger on initial mount
);
</script>

<template>
  <div class="flex-col w-full justify-items-center">
    <AssignmentForm v-model="formData"></AssignmentForm>
    <AppButton @click="update" class="mb-5">Update</AppButton>
  </div>
</template>

<style scoped>
</style>