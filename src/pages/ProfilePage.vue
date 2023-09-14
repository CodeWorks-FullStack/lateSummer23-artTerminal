<template>
  <div v-if="profile" class="container text-light" >

    <!-- NOTE don't render the profile info if there is none -->
    <!-- Like when you reload, and your appstate activeProfile is null -->
    <!-- if you get an error like 'Cannot read properties of null, reading ('picture')' this is your problem and this is the solution to it -->
    <section  class="row justify-content-center">
      <div class="col-12 cover-img rounded p-5 d-flex justify-content-center align-items-end">
        <div class="bg-dark p-2 text-center rounded w-50">
          <img :src="profile.picture" class="profile-pic" alt="">
          <p class="fw-bold">{{ profile.name }}</p>
          <p class="text-start px-2">{{ profile.bio }}</p>
          <!-- NOTE target="_blank" opens the link in a new tab -->
          <a v-if="profile.github" target="_blank" :href="profile.github">
            <i  class="mdi mdi-github fs-3 text-info">
            </i>
            </a>
        </div>
      </div>
    </section>

    <section v-if="account.id == profile.id" class="row">
      <div class="col-12 bg-dark rounded elevation-2 p-2">
        <ProjectForm/>
      </div>
    </section>

    <section class="row">
      <div class="col-12 fs-2 text-info text-center my-2">{{ profile.name }}'s Projects</div>
      <div v-for="project in projects" :key="project.id" class="col-12 mb-2">
        <!-- {{ project.title }} -->
        <!-- NOTE we re-use the project card for this component -->
        <ProjectCard :project="project"/>
      </div>

    </section>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { projectsService } from '../services/ProjectsService.js';
import {profilesService} from '../services/ProfilesService.js'
import { useRoute } from 'vue-router';
import ProjectCard from '../components/ProjectCard.vue';
import ProjectForm from '../components/ProjectForm.vue';
export default {
    setup() {
        onMounted(() => {
            getProjectsByProfileId();
            getProfileById()
        });
        const route = useRoute();
        async function getProjectsByProfileId() {
            try {
                await projectsService.getProjectsByProfileId(route.params.profileId);
            }
            catch (error) {
                Pop.error(error);
            }
        }
        async function getProfileById(){
          try {
            await profilesService.getProfileById(route.params.profileId)
          } catch (error) {
            Pop.error(error)
          }
        }
        return {
            projects: computed(() => AppState.projects),
            profile: computed(()=> AppState.activeProfile),
            account: computed(()=> AppState.account),
            // NOTE need elvis operator here, cause we still can't reach into a null object, even in our computeds
            coverImg: computed(()=> `url(${AppState.activeProfile?.coverImg})`)
        };
    },
    components: { ProjectCard, ProjectForm }
};
</script>


<style lang="scss" scoped>
.cover-img{
  background-image: v-bind(coverImg);
  min-height: 50vh;
  background-position: center;
  background-size: cover;
}
.profile-pic{
  height: 100px;
  width: 100px;
  object-fit: cover;
  object-position: center;
  border-radius: 50em;
}
</style>
