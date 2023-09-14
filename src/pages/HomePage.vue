<template>
  <div class="container">

    <div class="row">
      <div class="col-6">
        <!-- NOTE while not being utilized, this is a use case for a flexible modal component -->
        <ModalWrapper :showButton="true" id="create-project">
          <template #body>
            <ProjectForm/>
          </template>
        </ModalWrapper>
      </div>
    </div>

    <section class="row bg-shade">

      <div v-for="project in projects" :key="project.id" class="col-12 col-md-6 px-3 py-1">
        <!-- REVIEW do a simple test before moving info to component with props -->
        <!-- {{ project.title }} {{ project.creator.name }} -->
        <ProjectCard :project="project"/>
      </div>

    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { projectsService } from '../services/ProjectsService.js';
import {AppState} from '../AppState.js'
import ProjectCard from '../components/ProjectCard.vue'; //NOTE make sure if you import the component it doesn't tack on a .js at the end!
import ModalWrapper from '../components/ModalWrapper.vue';
import ProjectForm from '../components/ProjectForm.vue';

export default {
    setup() {
        onMounted(() => {
            getProjects();
        });
        async function getProjects() {
            try {
                await projectsService.getProjects();
            }
            catch (error) {
                Pop.error(error);
            }
        }
        return {
            projects: computed(() => AppState.projects)
        };
    },
    components: { ProjectCard, ModalWrapper, ProjectForm }
}
</script>

<style scoped lang="scss">

</style>
