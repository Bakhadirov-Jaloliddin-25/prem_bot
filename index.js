require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");

const token = process.env.TOKEN;

const adminChatId = process.env.ADMIN_CHAT_ID;

const bot = new TelegramBot(token, { polling: true });

const bootstrap = () => {
  bot.setMyCommands([
    {
      command: "/start",
      description: "Start",
    },
    {
      command: "/info",
      description: "Info",
    },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    const userInfo = `👤 Yangi foydalanuvchi!\n🆔 ID: ${msg.from.id}\n👤 Ism: ${
      msg.from.first_name
    } ${msg.from.last_name ? msg.from.last_name : ""}\n💬 Username: ${
      msg.from.username ? "@" + msg.from.username : "Mavjud emas"
    }\n🌍 Til: ${msg.from.language_code}`;

    // Adminga foydalanuvchi haqida xabar yuborish
    bot.sendMessage(adminChatId, userInfo);

    const escapeMarkdownV2 = (text) => {
      return text.replace(/([_*[\]()~`>#+\-=|{}.!])/g, "\\$1");
    };

    if (text === "/start") {
      await bot.sendMessage(
        chatId,
        `Assalamu Alaykum hurmatli ${escapeMarkdownV2(
          msg.from?.last_name ? msg.from?.last_name : ""
        )} ${escapeMarkdownV2(msg.from?.first_name)}`
      );

      await bot.sendPhoto(
        chatId,
        fs.createReadStream("./images/jasur_premium.jpg"),
        {
          caption: escapeMarkdownV2(
            `Akkountga kirib va kirmasdan telegram premium olib beramiz🔹

1 oylik - 55 ming, akkountga kirib🎁
3 oylik - 190 ming, akkountga kirmasdan🎁
6 oylik - 250 ming, akkountga kirmasdan🎁
12 oylik - 410 ming, akkountga kirmasdan🎁
12 oylik - 310 ming, akkountga kirib🎁

Murojaat uchun @mister_jasur🌟`
          ),
          parse_mode: "MarkdownV2",
        }
      );

      return bot.sendPhoto(
        chatId,
        fs.createReadStream("./images/telegram_stars.jpg"),
        {
          caption: escapeMarkdownV2(
            `Telegram stars olib beramiz⚡️

Akkauntga kirmasdan sovg'a qilib tashlab beriladi👍

⭐️50 tasi - 15 ming⭐
⭐️100 tasi - 30 ming⭐
⭐️250 tasi - 70 ming⭐
⭐️500 tasi - 140 ming⭐
⭐️1000 tasi - 280 ming⭐

Murojaat uchun @Jasur7238✅`
          ),
          parse_mode: "MarkdownV2",
        }
      );
    }

    if (text === "/info") {
      return bot.sendMessage(
        chatId,
        `Bu bot telegram premium narxlarini bilishni tez va osonlashtiradi.
        
Bot faqat narxlarni bilish uchun!

Savollaringiz bo'lsa @Mister_Jasur ga murojaat qiling!

Narxlarni bilish uchun:  /start`
      );
    }

    bot.sendMessage(chatId, "Uzur, men sizning gapingizga tushunmayapman! ):");
  });
};

bootstrap();
