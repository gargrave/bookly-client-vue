import { verboseLog } from '../utils/logger'

const ENV = {
  DEV: 0,
  STAGING: 1,
  PROD: 2
}

const STAGING_SITE_URL_CHECK = 'not a real URL'
const PROD_SITE_URL_CHECK = 'not a real URL'

let appEnv = ENV.PROD;

(function setAppEnv () {
  let loc = window.location.href
  if (loc.indexOf(STAGING_SITE_URL_CHECK) !== -1) {
    appEnv = ENV.STAGING
  } else if (loc.indexOf(PROD_SITE_URL_CHECK) !== -1) {
    appEnv = ENV.PROD
  } else {
    appEnv = ENV.DEV
  }
})()

const IS_TEST_ENV = process.env.NODE_ENV === 'testing'
const ENABLE_MOCK_API = false

export default {
  mockApiDelay: IS_TEST_ENV ? 0 : 350,
  mockApiAutoLogin: false,

  isProd () {
    return appEnv === ENV.PROD
  },

  isStaging () {
    return appEnv === ENV.STAGING
  },

  isDev () {
    return appEnv === ENV.DEV
  },

  isTesting () {
    return IS_TEST_ENV
  },

  useMockApi () {
    const USE_MOCK_API = IS_TEST_ENV || (ENABLE_MOCK_API && appEnv === ENV.DEV)
    if (USE_MOCK_API) {
      verboseLog('INFO: Mock API Enabled')
    }
    return USE_MOCK_API
  }
}
