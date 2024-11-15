import { defineStore } from 'pinia'
import CharacterApi from '../api/character'
import type { ISendData } from '@/models'

export const useCharacterStore = defineStore('character', () => {

  async function list(sendData: ISendData) {
    return CharacterApi.list(sendData)
  }

  return { list }
})
