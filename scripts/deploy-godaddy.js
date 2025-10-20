const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();

// Читаем конфигурацию из переменных окружения или .env.ftp файла
require('dotenv').config({ path: '.env.ftp' });

const config = {
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
  host: process.env.FTP_HOST,
  port: process.env.FTP_PORT || 21,
  localRoot: __dirname + "/../public",
  remoteRoot: process.env.FTP_REMOTE_PATH || "/public_html/",
  include: ["*", "**/*"],
  exclude: [
    "**/*.map",
    "node_modules/**",
    "node_modules/**/.*",
    ".git/**"
  ],
  deleteRemote: false,
  forcePasv: true,
  sftp: false
};

// Проверка наличия учетных данных
if (!config.user || !config.password || !config.host) {
  console.error("❌ Ошибка: FTP credentials не найдены!");
  console.error("Создайте файл .env.ftp с следующими параметрами:");
  console.error("");
  console.error("FTP_HOST=ftp.yourdomain.com");
  console.error("FTP_USER=your_username");
  console.error("FTP_PASSWORD=your_password");
  console.error("FTP_PORT=21");
  console.error("FTP_REMOTE_PATH=/public_html/");
  console.error("");
  process.exit(1);
}

console.log("🚀 Начинаю загрузку на GoDaddy...");
console.log(`📡 Хост: ${config.host}`);
console.log(`👤 Пользователь: ${config.user}`);
console.log(`📁 Удаленная папка: ${config.remoteRoot}`);
console.log("");

ftpDeploy
  .deploy(config)
  .then(res => {
    console.log("✅ Загрузка завершена успешно!");
    console.log(`📊 Загружено файлов: ${res.length}`);
  })
  .catch(err => {
    console.error("❌ Ошибка при загрузке:", err);
    process.exit(1);
  });

ftpDeploy.on("uploading", function (data) {
  console.log(`📤 ${data.transferredFileCount}/${data.totalFilesCount} - ${data.filename}`);
});

ftpDeploy.on("uploaded", function (data) {
  console.log(`✓ Загружен: ${data.filename}`);
});

ftpDeploy.on("log", function (data) {
  console.log(data);
});
