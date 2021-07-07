export default class TweetService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async getTweets(username) {
    let query = username ? `?username=${username}` : "";
    const res = await fetch(`${this.baseURL}/tweets${query}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    // 받아 온 데이터를 json으로 변환
    const data = await res.json();
    if (res.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }

  async postTweet(text) {
    const res = await fetch(`${this.baseURL}/tweets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, username: "ellie", name: "Ellie" }), // Object to JSON
    });

    // 받아 온 데이터를 json으로 변환
    const data = await res.json();
    if (res.status !== 201) {
      throw new Error(data.message);
    }
    return data;
  }

  async deleteTweet(tweetId) {
    const res = await fetch(`${this.baseURL}/tweets/${tweetId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    // 받아 오는 데이터가 존재하지 않는다.
    if (res.status !== 204) {
      throw new Error();
    }
  }

  async updateTweet(tweetId, text) {
    const res = await fetch(`${this.baseURL}/tweets/${tweetId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    // 받아 온 데이터를 json으로 변환
    const data = await res.json();
    if (res.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }
}
