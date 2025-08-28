# Discord Moderation Bot (TypeScript)

Bot Discord quản lý server với các slash command cơ bản: ping, clear, kick, ban, timeout.

## Chuẩn bị
1. Tạo ứng dụng và bot tại Developer Portal của Discord.
2. Bật Privileged Gateway Intents (Server Members Intent; Message Content không bắt buộc cho các lệnh này).
3. Điền các biến môi trường trong `.env`:
   - `DISCORD_TOKEN`
   - `DISCORD_CLIENT_ID`
   - `DISCORD_GUILD_ID` (tùy chọn; nếu có sẽ đăng ký theo guild, hiển thị ngay)

## Cài đặt
```bash
npm install
cp .env.example .env
# Mở .env và điền token, client id, guild id (nếu muốn)
```

## Đăng ký lệnh (Slash Commands)
```bash
npm run deploy
```
- Có `DISCORD_GUILD_ID`: đăng ký trong guild (nhanh, vài giây).
- Không có: đăng ký global (có thể mất ~1 giờ để hiển thị).

## Chạy bot
```bash
npm run dev   # ts-node + nodemon
# hoặc
npm run build && npm start
```

## Lệnh có sẵn
- `/ping`: kiểm tra độ trễ.
- `/clear count:<1-100>`: xóa nhanh tin nhắn gần đây trong kênh.
- `/kick user:<@user> [reason]`: kick thành viên.
- `/ban user:<@user> [days 0-7] [reason]`: ban thành viên và xóa lịch sử N ngày.
- `/timeout user:<@user> duration:<10m|1h|1d> [reason]`: timeout tối đa 28 ngày.

## Quyền cần thiết
- Bot cần quyền: Manage Messages, Kick Members, Ban Members, Moderate Members.
- Role của bot phải cao hơn role của người bị xử lý.

## Cấu trúc thư mục
```
src/
  commands/
  events/
  utils/
```

## Giấy phép
MIT
