export default class TweetService {
  constructor(http) {
    this.http = http;
  }

  // Problem : 함수마다 headers나 받아 온 데이터 json 변환 같은 중복되는 코드가 있어서 각 함수별로 기능이 한 눈에 보이지 않는다.
  // Solve : http 모듈을 만들자.
  async getTweets(username) {
    const query = username ? `?username=${username}` : "";
    return this.http.fetch(`/tweets${query}`, {
      method: "GET",
    });
  }

  async postTweet(text) {
    return this.http.fetch(`/tweets`, {
      method: "POST",
      body: JSON.stringify({ text, username: "ellie", name: "Ellie" }), // Object to JSON
    });
  }

  async deleteTweet(tweetId) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: "DELETE",
    });
  }

  async updateTweet(tweetId, text) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: "PUT",
      body: JSON.stringify({ text }),
    });
  }
}
