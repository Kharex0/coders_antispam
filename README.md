<a href="https://nodei.co/npm/coders_antispam.js/"><img src="https://nodei.co/npm/coders_antispam.js.png"></a>

# coders_antispam.js
Discord Botlarınız/Sunucularınız İçin Spam Koruması
Destek Sunucusuna KATILIN [Destek Sunucusu](https://discord.gg/N2H8pPD)

## Kurulum
Bu Modül Discord.js Botları İçindir [Discord.js](https://discord.js.org/#/) Discord.js Sitesi.

Bunu yaptıktan sonra, anti spam'i ayarlamak çok kolay olacaktır.
Başlamak için aşağıdaki kodu takip edebilirsiniz!
```js
const koruma = require("coders_antispam.js"),
db = require('coders.db'),
eco = require('coders.eco')

koruma(client, {
  uyarmaSınırı: 2, 
  banlamaSınırı: 3,
  aralık: 2000, 
  uyarmaMesajı: "Yavaş Olsana Be Arkadaşım Rahatsız Oluyoz", 
  rolMesajı: "Hakettiğini Buldun Arkadaşım :)", 
  maxSpamUyarı: 5,
  maxSpamBan: 5, 
  zaman: 5, 
  rolİsim: "susturulmuş" 
});

```

# Diğer Modüllerimiz Aşağıda

<a href="https://www.npmjs.com/package/coders.db">Database Modülü (coders.db)</a>

<a href="https://www.npmjs.com/package/coders.eco">Ekonomi Modülü (coders.eco)</a>
