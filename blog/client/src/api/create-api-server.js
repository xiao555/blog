import Firebase from 'firebase'
import LRU from 'lru-cache'

export function createAPI ({ config, version }) {
  let api
  if (process.__API__) {
    api = process.__API__
  } else {
    Firebase.initializeApp(config)
    api = process.__API__ = Firebase.database().ref(version)

    api.onServer = true

    api.cachedItems = LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15 // 15 min cache
    })

    api.cacheIds = {}
  }
  return api
}
