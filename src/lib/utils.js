import https from 'https';
import fetch from 'node-fetch';


export default class BotUtils {
  static async checkedStatusCode (url) {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      referrerPolicy: 'no-referrer',
      agent: httpsAgent
    });

    return response.status;
  }

  static startTimer (callback, delay) {
    const timerId = setInterval(() => {
      callback.call(null, timerId);
    }, delay);
  }
}