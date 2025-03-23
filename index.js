require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");
const http = require("http");

const token = process.env.TOKEN;
const adminChatId = process.env.ADMIN_CHAT_ID;

if (!token) {
  console.error("❌ BOT TOKEN topilmadi! Iltimos, .env faylini tekshiring.");
  process.exit(1);
}

if (!adminChatId) {
  console.error(
    "❌ ADMIN_CHAT_ID topilmadi! Iltimos, .env faylini tekshiring."
  );
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

const bootstrap = () => {
  bot.setMyCommands([
    { command: "/start", description: "Start" },
    { command: "/info", description: "Info" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    const userInfo = `👤 Yangi foydalanuvchi!\n🆔 ID: ${msg.from.id}\n👤 Ism: ${
      msg.from.first_name
    } ${msg.from.last_name ? msg.from.last_name : ""}\n💬 Username: ${
      msg.from.username ? "@" + msg.from.username : "Mavjud emas"
    }\n🌍 Til: ${msg.from.language_code}`;

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

      const imagePath1 = "./images/jasur_premium.jpg";
      const imagePath2 = "./images/telegram_stars.jpg";

      if (fs.existsSync(imagePath1)) {
        await bot.sendPhoto(chatId, fs.createReadStream(imagePath1), {
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
        });
      } else {
        console.error(`❌ Rasm topilmadi: ${imagePath1}`);
      }

      if (fs.existsSync(imagePath2)) {
        await bot.sendPhoto(chatId, fs.createReadStream(imagePath2), {
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
        });
      } else {
        console.error(`❌ Rasm topilmadi: ${imagePath2}`);
      }
    } else if (text === "/info") {
      return bot.sendMessage(
        chatId,
        `Bu bot telegram premium narxlarini bilishni tez va osonlashtiradi.
    
Bot faqat narxlarni bilish uchun!

Savollaringiz bo'lsa @Mister_Jasur ga murojaat qiling!

Narxlarni bilish uchun:  /start`
      );
    } else {
      bot.sendMessage(chatId, "Uzr, men sizning gapingizga tushunmayapman! ):");
      bot.sendMessage(chatId, "Narxlarni bilish uchun: /start");
    }
  });
};

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Bot is running\n");
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

bootstrap();
