import { Telegraf } from 'telegraf';
import BotService from './src/lib/bot.js';
import dotenv from 'dotenv';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command("fgis_egrn", (ctx) => {
  const botService = new BotService(ctx);
  botService.execute(process.env.URL_IR_EGRN);
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));