import { AppState } from "../AppState.js"
import { Profile } from "../models/Profile.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"




class ProfilesService{
  async getProfileById(profileId){
    AppState.activeProfile = null
    const res = await api.get(`api/profiles/${profileId}`)
    logger.log('🙆', res.data)
    AppState.activeProfile = new Profile(res.data) //REVIEW can't map an object, just looking at one profile
  }
}

export const profilesService = new ProfilesService()
