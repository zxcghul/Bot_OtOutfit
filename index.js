require('dotenv').config();
const {Bot, GrammyError, HttpError, Keyboard, InlineKeyboard, InputFile} = require('grammy');

const bot = new Bot(process.env.BOT_API_KEY);

bot.api.setMyCommands([
    {
        command: 'start', description: 'Запуск бота'
    }
])
const newKeyboard = new Keyboard().text('Доставка').text('Эскизы').text('Сроки изготовления').row().text('Размерная сетка').row().text('☑️ Оформить заказ ☑️').resized();
bot.command('start', async (ctx) => {
    await ctx.reply('Привет\\!👋\nЯ бот магазина *[OtakuOutfit](http://80.64.174.67:3000/index.html)*, я помогу узнать интересующиe тебя вопросы', {
        parse_mode: 'MarkdownV2',
        reply_markup: newKeyboard
    }); 
})

bot.hears('Доставка', async (ctx) => {
    await ctx.reply('Мы находимся в *г\\.Новосибирск* по адресу Твардовского 22/2\\.\n\n🚚 Доставку осуществляем по всей России: _CDEK, Boxberry, Почта России_\\.\n🚗 Так же мы осуществляем доставку по Новосибирску: *стоимость доставки 400₽*\n\nРассчитать примерную стоимость доставки можете тут: [CDEK](https://www.cdek.ru/ru/cabinet/calculate/), [Boxberry](https://boxberry.ru/lpip/), [Почта России](https://www.pochta.ru/shipment?type=PARCEL)', {
        parse_mode: 'MarkdownV2',
        disable_web_page_preview: true
    })
})

bot.hears('Эскизы', async (ctx) => {
    const inlineKeyboard = new InlineKeyboard().text('Эскизы', 'Эскизы').text('Варианты строчек', 'Варианты')
    await ctx.reply('📍Помимо готовых вариантов, вы можете сами выбрать вариант исполнения футболки из готовых эскизов\n\\*Все варианты можете посмотреть на нашем сайте *[OtakuOutfit](http://80.64.174.67:3000/index.html)*\n\n📍Так же можете выбрать вариант исполнения окантовочной строчки на руковах, горловине и поясе \\(Или вовсе отказаться от неё\\)\n\n❗️В стоимость футболки включено:\n\\-Футболка базовая \\- *990₽*\n\\-Исполнение 3\\-ёх эскизов *500₽*\n\\*_При желании кол\\-во эскизов можно увеличить или уменьшить *\\150₽ за эскиз*_', {
        parse_mode: 'MarkdownV2',
        reply_markup: inlineKeyboard
    })
})

bot.hears('Сроки изготовления', async (ctx) => {
    await ctx.reply('🕑 В среднем от *2\\-ух* до *4\\-ёх* дней, в зависимости от загруженности', {
        parse_mode: 'MarkdownV2'
    })
})

bot.hears(/Оформить заказ/, async (ctx) => {
    await ctx.reply('✅ Для оформления заказа, напишите нашему менеджеру, он проконсультирует вас:\n\n@fffff0909 [Николай]', {
        parse_mode: 'MarkdownV2'
    })
})

bot.hears(/Размерная сетка/, async (ctx) => {
    await ctx.replyWithPhoto(new InputFile("img/size.jpeg"));
})


bot.callbackQuery('Эскизы', async (ctx) => {
    await ctx.answerCallbackQuery("Наша коллекция эскизов пополняется со временем! 😋");
    await ctx.replyWithPhoto(new InputFile("img/1.jpeg"));
})
bot.callbackQuery('Варианты', async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.replyWithPhoto(new InputFile("img/2.jpeg"));
})


bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
        console.error("Error os request:", e.description);
    } else if (e instanceof HttpError) {
        console.error("Could not contact Telegram:", e);
    } else {
        console.error("Unknown error:", e);
    }
})

bot.start();