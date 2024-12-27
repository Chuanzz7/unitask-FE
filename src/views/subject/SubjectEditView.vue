<script setup>

import SubjectForm from "@/components/subject/SubjectForm.vue";
import AppButton from "@/components/AppButton.vue";
import {onMounted, reactive, ref} from "vue";
import {apiClient, GET_SUBJECT, PUT_SUBJECT} from "@/api/index.js";
import {POSITION, useToast} from "vue-toastification";
import {useRoute, useRouter} from "vue-router";
import pathnames from "@/router/pathnames.js";

const toast = useToast();
const router = useRouter();
const route = useRoute();
const isLoading = ref(true);
const formData = reactive({
  id: 0,
  name: "",
  code: "",
  course: "",
  creditHour: "",
  description: "",
  learningOutcome: "",
  lecturerName: "",
  lecturerContact: "",
  lecturerEmail: "",
  lecturerOffice: "",
  color: "",
  assessment: [],
});

const update = async () => {
  try {
    const payload = {
      code: formData.code,
      name: formData.name,
      course: formData.course,
      creditHour: formData.creditHour,
      description: formData.description,
      learningOutcome: formData.learningOutcome,
      lecturerName: formData.lecturerName,
      lecturerContact: formData.lecturerContact,
      lecturerEmail: formData.lecturerEmail,
      lecturerOffice: formData.lecturerOffice,
      color: formData.color,
      assessment: [],
      status: "ACTIVE",
    };

    formData.assessment.map((x) => {
      payload.assessment.push({id: x.id, name: x.name, weightage: x.weightage});
    });

    const response = await apiClient.put(`${PUT_SUBJECT}${formData.id}`, payload);
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
      const response = await apiClient.get(`${GET_SUBJECT}${id}`);
      isLoading.value = false;
      let x = response.data;
      formData.id = x.id;
      formData.name = x.name;
      formData.code = x.code;
      formData.course = x.course;
      formData.creditHour = x.creditHour;
      formData.description = x.description;
      formData.learningOutcome = x.learningOutcome;
      formData.lecturerName = x.lecturerName;
      formData.lecturerContact = x.lecturerContact;
      formData.lecturerEmail = x.lecturerEmail;
      formData.lecturerOffice = x.lecturerOffice;
      formData.color = x.color;
      formData.assessment = [];
      x.assessment.map((x) => {
        formData.assessment.push({
          id: x.id,
          name: x.name,
          assignmentMode: x.assignmentMode,
          weightage:
          x.weightage
        })
        ;
      });
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
    <SubjectForm :loading="isLoading" v-model="formData"></SubjectForm>
    <AppButton @click="update" class="mb-5">Update</AppButton>
  </div>
</template>

<style scoped>

</style>