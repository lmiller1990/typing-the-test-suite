export interface MockAxios {
  get: <T>() => Promise<T>
  __setMockData: (data: any) => void
}

const axios: MockAxios = jest.createMockFromModule('axios')

let data: any

function __setMockData(_data: any) {
  data = _data
}

axios.get = <T>(): Promise<T> => {
  return Promise.resolve({
    data
  } as any)
}

axios.__setMockData = __setMockData

export default axios