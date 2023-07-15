import BotUtils from './utils.js';
import BotConstants from './constants.js';

export default class BotService {

  CONSTANTS = BotConstants;
  UTILS = BotUtils;

  constructor (context) {
    this.context = context;
    this.DELAY = this.CONSTANTS.DELAY.MIN_DELAY;
    this.IS_FIRST_LOOP = true;
  }

  execute (url) {

    this.context.reply(`Готовим запрос для проверки доступа к сайту 👨‍💻\nПодождите ${this.DELAY / 1000} сек.`);

    this.UTILS.startTimer(async (timerId) => {
      const statusCode = await this.UTILS.checkedStatusCode(url);

      if (statusCode !== this.CONSTANTS.STATUS_CODE.ERROR) {
        this.context.reply(`Сайт снова доступен 🥳\n${ url }`);
        clearInterval(timerId);
        return;
      }

      if (this.IS_FIRST_LOOP) {
        this.context.reply(`Сайт не доступен 😡\n${ url }\nСообщим когда появится доступ`);
        this.IS_FIRST_LOOP = false;
        this.DELAY = this.CONSTANTS.DELAY.MAX_DELAY;
      }

    }, this.DELAY);
  }
}
