import { DefaultApi, Configuration } from './apiclient'

const config = new Configuration({ basePath: 'http://localhost:3000/v1' })
const ApiClient = new DefaultApi(config)

export default ApiClient
