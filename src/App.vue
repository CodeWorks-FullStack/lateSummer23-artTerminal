<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
   <footer class="bg-dark text-light">
    Made with 💖 by CodeWorks
  </footer>
  <ModalWrapper :showButton="false" id="project-modal" size="fullscreen">
    <template #body>
      <ActiveProjectDetails/>
    </template>
  </ModalWrapper>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import ModalWrapper from './components/ModalWrapper.vue'
import ActiveProjectDetails from './components/ActiveProjectDetails.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
      // activeProject: computed(()=> AppState.activeProject)
    }
  },
  components: { Navbar, ModalWrapper, ActiveProjectDetails }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
