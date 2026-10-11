# استخدام أ خفيف ومناسب لـ Node.js
FROM node:18-alpine

# تحديد مجلد العمل داخل الـ Container
WORKDIR /app

# نسخ ملفات الاعتمادية وتثبيتها
COPY package*.json ./
RUN npm install

# نسخ باقي ملفات المشروع
COPY . .

# فتح البورت اللي التطبيق بيشتغل عليه
EXPOSE 5000

# أمر تشغيل التطبيق
CMD ["node", "app.js"]

#heloooooooooo 