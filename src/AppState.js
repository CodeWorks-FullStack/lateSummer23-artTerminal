import { reactive } from 'vue'
import { Project } from './models/Project.js'
import { Profile } from './models/Profile.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  // REVIEW the user and the Account ARE the LOGGED IN USER ALWAYS
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  // REVIEW the active profile is to store the current profile you are viewing
/**@type {Profile} */
  activeProfile: null,
/**
 * @type {Project[]}
 */
  projects: [],
  /**@type {Project} */
  activeProject: null
})
