<template>
  <div class="row bg-dark rounded elevation-2 p-2 project-card selectable"  @click="setActiveProject">
    <div class="col-6 project-cover">
      <p class="bg-shade p-2 rounded">{{ project.title }}</p>
    </div>
    <div class="col-6">
      <div>
        Image count {{ project.projectImgs.length }}
      </div>
      <div class="d-flex justify-content-center align-items-center text-center h-100">
        <!-- NOTE click.stop, keeps the upper @click from running when the router link is clicked -->
        <router-link :to="{name: 'Profile', params: {profileId: project.creatorId}}" @click.stop>
          <img :src="project.creator.picture" class="profile-pic" :alt="project.creator.name">
          <p>{{ project.creator.name }}</p>
        </router-link>
      </div>
    </div>

  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Project } from '../models/Project.js';
import { projectsService } from '../services/ProjectsService.js';
import { Modal } from 'bootstrap';
export default {
  props: {project: {type: Project, required: true}},
  setup(props){
  return {
    // NOTE when creating a computed to bind to, it has to have the exact value the style needs to be defined as.
    projectCover: computed(()=> `url(${props.project.coverImg}`),
    setActiveProject(){
      projectsService.setActiveProject(props.project.id)
      // NOTE how to open a model from the code
      const modal = Modal.getOrCreateInstance('#project-modal')
      modal.show()
    }
   }
  }
};
</script>


<style lang="scss" scoped>

.bg-shade{
background-color: rgba(0, 0, 0, 0.541);
}

.project-card{
  height: 20vh;
}
.project-cover{
  background-image: v-bind(projectCover);
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  p{
    backdrop-filter: blur(15px);
  }
}
.profile-pic{
  height: 50px;
  width: 50px;
  object-fit: cover;
  object-position: center;
  border-radius: 50em;
}
</style>
