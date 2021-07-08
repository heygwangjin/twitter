export default class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async fetch(url, options) {
    const res = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    // body 가 없는 response에 json을 호출하면 에러가 발생할 수도
    let data;
    try {
      data = await res.json();
    } catch (error) {
      console.error(error);
    }

    // fetch API는 status가 200이 아니어도 데이터가 올 수도 있기 때문에 status 확인 필요
    if (res.status > 299 || res.status < 200) {
      const message =
        data && data.message ? data.message : "Something went wrong! 😢";
      throw new Error(message);
    }
    return data;
  }
}
