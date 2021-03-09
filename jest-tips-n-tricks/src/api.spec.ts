import axios from 'axios'
import { MockAxios } from '../__mocks__/axios'

interface Person {
  id: number
  name: string
}

const mockAxios = axios as unknown as MockAxios

describe('api', () => {
  it('get data', async () => {
    const mockData: Person[] = [
      {
        id: 1,
        name: 'lachlan'
      }
    ]

    mockAxios.__setMockData(mockData)
    const spy = jest.spyOn(axios, 'get')
    const res = await axios.get<Person[]>('/people')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('/people')
    expect(res.data).toEqual(mockData)
  })

  it('get tasks', async () => {
    mockAxios.__setMockData('tasks')
    const res = await axios.get<string>('/tasks')
    expect(res.data).toEqual('tasks')
  })
})