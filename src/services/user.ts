import axios, { AxiosPromise } from 'axios'
import config from '../config'

export const createTestUser = (username: string): AxiosPromise<void> =>
  axios.post(`${config.api.url}/user`, {
    u: config.api.username,
    p: config.api.password,
    username,
  })

export const deleteTestUser = (username: string): AxiosPromise<void> =>
  axios.delete(`${config.api.url}/user/${username}`, {
    params: {
      u: config.api.username,
      p: config.api.password,
    },
  })
