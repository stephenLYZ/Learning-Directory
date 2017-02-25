export default class RedditClient {
  constructor(token) {
    this.baseUrl = 'https://oauth.reddit.com/'
    this.defaultHeaders = {
        'Authorization': `bearer ${token}`,
    }
  }

  getPosts(endpoints) {
    const url = this.baseUrl + endpoints
    return fetch(url, {
      headers: this.defaultHeaders
    }).then((res) => res.json())
  }
}
