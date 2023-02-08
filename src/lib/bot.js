import BotUtils from './utils.js';
import BotConstants from './constants.js';

export default class BotService {

  DELAY = BotConstants.DELAY;
  STATUS = BotConstants.STATUS_CODE;
  UTILS = BotUtils;

  constructor (context) {
    this.context = context;
  }

  execute (url) {
    let delay = this.DELAY.MIN_DELAY;
    let isFirstLoop = true;

    this.context.reply(`Готовим запрос для проверки доступа к сайту 👨‍💻\nПодождите ${delay / 1000} сек.`);

    this.UTILS.startTimer(async (timerId) => {
      const statusCode = await this.UTILS.checkedStatusCode(url);

      if (statusCode !== this.STATUS.ERROR) {
        this.context.reply(`Сайт ${ url } снова доступен 🥳`);
        clearInterval(timerId);
        return;
      }

      if (isFirstLoop) {
        this.context.reply(`Сайт ${ url } не доступен 😡\nСообщим когда появится доступ`);
        delay = this.DELAY.MAX_DELAY;
      }

      isFirstLoop = false;

    }, delay)
  }
}
