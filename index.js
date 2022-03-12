const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()

const text = require('./constant')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(ctx => {
	ctx.reply(
		`Привет ${
			ctx.message.from.username ? ctx.message.from.username : 'Привет гость...'
		}`
	)
})

bot.help(ctx => ctx.reply(text.commands))

//Пишим обработчика

bot.command('course', async ctx => {
	await ctx.replyWithHTML(
		'<b>Наши курсы</b>',
		Markup.inlineKeyboard([
			[
				Markup.button.callback('UX/UI', 'btn_ux'),
				Markup.button.callback('HTML/CSS', 'btn_html'),
			],
			[
				Markup.button.callback('JavaScript', 'btn_js'),
				Markup.button.callback('Python', 'btn_pyt'),
			],
		])
	)
})

// обработчик

const handlerAction = (btnName, photo, txt) => {
	bot.action(btnName, async ctx => {
		try {
			//убирает тайминг с кнопки
			await ctx.answerCbQuery()
			if (photo) {
				await ctx.replyWithPhoto({
					source: photo,
				})
			}
			await ctx.replyWithHTML(txt)
		} catch (e) {
			console.error(e)
		}
	})
}

handlerAction(
	'btn_ux',
	'./img/1640039790_4-phonoteka-org-p-sukno-fon-poker-krasivo-4.jpg',
	text.myTxt1
)
handlerAction(
	'btn_html',
	'./img/1640039790_4-phonoteka-org-p-sukno-fon-poker-krasivo-4.jpg',
	text.myTxt2
)
handlerAction(
	'btn_js',
	'./img/1640039790_4-phonoteka-org-p-sukno-fon-poker-krasivo-4.jpg',
	text.myTxt3
)
handlerAction(
	'btn_pyt',
	'./img/1640039790_4-phonoteka-org-p-sukno-fon-poker-krasivo-4.jpg',
	text.myTxt4
)

//Start
bot.launch()
