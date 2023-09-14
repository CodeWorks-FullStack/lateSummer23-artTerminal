<template>
  <div v-if="activeProject" class="container-fluid">
    <section class="row">
      <div class="col-6">
        <h3>{{ activeProject.title }}</h3>
      </div>
      <div class="col-6 text-end d-flex justify-content-end align-items-center" @click="closeModal">
        <router-link :to="{name: 'Profile', params: {profileId: activeProject.creatorId}}">
          <p class="mb-0 me-2">{{ activeProject.creator.name }}</p>
          <img class="profile-pic" :src="activeProject.creator.picture" alt="">
        </router-link>
      </div>

      <div class="col-12">

        <div class="project-imgs">
          <div class="mb-2" v-for="image in activeProject.projectImgs" :key="image">
            <img class="img-fluid" :src="image" alt="">
          </div>

        </div>
      </div>
    </section>


  </div>
</template>


<script>
import { Modal } from 'bootstrap';
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
  setup(){
  return {
    activeProject: computed(()=> AppState.activeProject),
    closeModal(){
       // NOTE how to close a model from code
      const modal = Modal.getOrCreateInstance('#project-modal')
      modal.hide()
    }
   }
  }
};
</script>


<style lang="scss" scoped>
.project-imgs{
  columns: 300px;
}

.profile-pic{
  height: 100px;
  width: 100px;
  object-fit: cover;
  object-position: center;
  border-radius: 50em;
}

</style>
