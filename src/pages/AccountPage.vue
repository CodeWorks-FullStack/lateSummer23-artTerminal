<template>
  <div class="container-fluid text-light">
    <section class="row mt-2">
      <div class="col-4 bg-dark rounded elevation-2 p-2">
        <h3>Welcome {{ account.name }}</h3>
        <img class="rounded" :src="account.picture" alt="" />
        <p>{{ account.email }}</p>
      </div>
      <div class="col-8">
        <h3>Edit Profile</h3>
        <!-- NOTE IF I DON'T GET TO IT, THAT DOESN'T MEAN YOUR FORMS SHOULD NOT HAVE VALIDATION I JUST RAN OUT OF TIME -->
        <form @submit.prevent="editProfile" class="row">
          <div class="mb-2 col-6">
            <label for="">
              name
            </label>
          <input v-model="editable.name" class="form-control" type="text">
        </div>
          <div class="mb-2 col-6">
            <label for="">
              picture
            </label>
          <input v-model="editable.picture" class="form-control" type="text">
        </div>
          <div class="mb-2 col-12">
            <label for="">
              github
            </label>
          <input v-model="editable.github" class="form-control" type="text">
        </div>
          <div class="mb-2 col-12">
            <label for="">
              bio
            </label>
            <textarea v-model="editable.bio" rows="10" class="form-control h-100"></textarea>
        </div>
        <button class="btn btn-success">save changes <i class="mdi mdi-check"></i></button>

        </form>
      </div>
    </section>
    </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { accountService } from '../services/AccountService.js';
import {  useRouter } from 'vue-router';
export default {
  setup() {
    const editable = ref({})
    const router = useRouter()

    // NOTE watchEffect with run when inner values change
    watchEffect(()=>{
      logger.log('watch ran', editable.value)
      AppState.account
      editable.value = AppState.account
      // The above line will fill the form in with the information from the account
      // don't forget to update your account model if you are trying to edit extra properties!
    })

    return {
      editable,
      account: computed(() => AppState.account),
      async editProfile(){
        try {
          logger.log('edited info', editable.value)
          await accountService.editProfile(editable.value)
          Pop.success('Profile updated')
          router.push({name: 'Profile', params: {profileId: AppState.account.id}})
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
