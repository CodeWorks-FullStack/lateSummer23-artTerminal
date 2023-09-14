import { AppState } from "../AppState.js"
import { Project } from "../models/Project.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class ProjectsService{
  async getProjects(){
    AppState.projects = []
    const res = await api.get('api/projects')
    logger.log('🖼️Got Projects', res.data)
    AppState.projects = res.data.map(project => new Project(project))
  }

  async getProjectsByProfileId(profileId){
    AppState.projects = []
    const res = await api.get(`api/projects?creatorId=${profileId}`)
    logger.log('🙆🖼️', res.data)
    AppState.projects = res.data.map(project => new Project(project))
  }


  setActiveProject(projectId){
    const project = AppState.projects.find(project => project.id == projectId)
    AppState.activeProject = project
  }

}

export const projectsService = new ProjectsService()
