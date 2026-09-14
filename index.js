require('dotenv').config();
const { Client, GatewayIntentBits, Events } = require('discord.js');
const express = require('express');

// ==========================================
// 1. TẠO SERVER WEB ĐỂ TREO BOT ONLINE 24/7
// (Dùng để ping qua UptimeRobot / Cron-job)
// ==========================================
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot Discord đang hoạt động trực tuyến!');
});

app.listen(PORT, () => {
  console.log(`[Web Server] Đang lắng nghe tại cổng ${PORT}`);
});

// ==========================================
// 2. KHỞI TẠO DISCORD BOT
// ==========================================
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

// Sự kiện khi bot kết nối thành công và online
client.once(Events.ClientReady, () => {
  console.log(`✅ Đã đăng nhập thành công với tên: ${client.user.tag}!`);
});


// Kiểm tra token trước khi đăng nhập
if (!process.env.DISCORD_TOKEN || process.env.DISCORD_TOKEN === 'your_bot_token_here') {
  console.error('❌ LỖI: Bạn chưa điền DISCORD_TOKEN trong file .env!');
  console.error('👉 Vui lòng mở file .env và thay thế your_bot_token_here bằng Token bot thật của bạn.');
  process.exit(1);
}

// Đăng nhập bot
client.login(process.env.DISCORD_TOKEN).catch((err) => {
  console.error('❌ Đăng nhập thất bại. Kiểm tra lại Token của bạn:', err.message);
});
