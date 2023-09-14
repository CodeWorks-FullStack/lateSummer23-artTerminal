<template>
  <!-- NOTE sorry we didnt' get to this part -->
  <form class="component row" @submit.prevent="createProject">
    <div class="mb-1 col-12">
      <input v-model="projectData.title" class="form-control" type="text" placeholder="title">
    </div>
    <div class="mb-1 col-12">
      <input v-model="projectData.coverImg" class="form-control" type="text" placeholder="cover image url">
    </div>
    <button class="btn btn-primary col-12">Create Project</button>
  </form>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
export default {
  setup(){
    const projectData = ref({})
  return {
    projectData,
    async createProject(){
      try {
        logger.log('creating project', projectData.value)
        // NOTE finish the method to create a project
      } catch (error) {
        Pop.error(error)
      }
    }
   }
  }
};
</script>


<style lang="scss" scoped>

</style>
