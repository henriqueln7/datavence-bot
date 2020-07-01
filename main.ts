import { Telegraf } from 'telegraf';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const bot = new Telegraf(String(process.env.TELEGRAM_BOT_TOKEN));
bot.start((ctx) =>
  ctx.reply(
    'Olá. Este é um bot criado para um desafio da' +
      ' Datavence. Meu único comando disponível é /projetos'
  )
);
bot.command('projetos', async (ctx) => {
  const projects = await axios.get<Object[]>('http://localhost:8080/projects');
  const numberOfProjects = await projects.data.length;

  await ctx.reply(`No momento há ${numberOfProjects} projetos criados :D`);
});

bot.launch().then();
