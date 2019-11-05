const authors = [];
var warned = [];
var banned = [];
var messagelog = [];


module.exports = async function (bot, options) {

  const uyarmaSınırı = (options && options.prefix) || 2;
  const banlamaSınırı = (options && options.prefix) || 3;
  const aralık = (options && options.aralık) || 2000;
  const uyarmaMesajı = (options && options.warningMessage) || "Spamı Bırakırmısın Yoksa Mute Geliyor.";
  const rolMesajı = (options && options.roleMessage) || "Spam İçin Yasaklandı, Başka Varmı Yürekli Abimiz?";
  const maxSpamUyarı = (options && options.duplicates || 7);
  const maxSpamBan = (options && options.duplicates || 5);
  const zaman = (options && options.zaman || 5);
  const rolİsim = (options && options.roleName) || "susturulmuş";
	
  bot.on('message',async  msg => {
	  	  
    if(msg.author.id != bot.user.id){
      var now = Math.floor(Date.now());
      authors.push({
        "zaman": now,
        "author": msg.author.id
      });
      messagelog.push({
        "message": msg.content,
        "author": msg.author.id
      });
// mesaj kontrolü
      var msgMatch = 0;
      for (var i = 0; i < messagelog.length; i++) {
        if (messagelog[i].message == msg.content && (messagelog[i].author == msg.author.id) && (msg.author.id !== bot.user.id)) {
          msgMatch++;
        }
      }
// mesaj kontrolü 2
      if (msgMatch == maxSpamUyarı && !warned.includes(msg.author.id)) {
        warn(msg, msg.author.id);
      }
      if (msgMatch == maxSpamBan && !banned.includes(msg.author.id)) {
        ban(msg, msg.author.id);
      }

   const matched = 0;

      for (var i = 0; i < authors.length; i++) {
        if (authors[i].zaman > now - aralık) {
          matched++;
          if (matched == uyarmaSınırı && !warned.includes(msg.author.id)) {
            warn(msg, msg.author.id);
          }
          else if (matched == banlamaSınırı) {
            if (!banned.includes(msg.author.id)) {
              ban(msg, msg.author.id);
            }
          }
        }
        else if (authors[i].zaman < now - aralık) {
          authors.splice(i);
          warned.splice(warned.indexOf(authors[i]));
          banned.splice(warned.indexOf(authors[i]));
        }
        if (messagelog.length >= 200) {
          messagelog.shift();
        }
      }
    }
  });

  
  function warn(msg, userid) {
    warned.push(msg.author.id);
    msg.channel.send(msg.author + " " + uyarmaMesajı);
	msg.delete(500);
  }

 
   
   
  async function ban(msg, userid) {
    for (var i = 0; i < messagelog.length; i++) {
      if (messagelog[i].author == msg.author.id) {
        messagelog.splice(i);

      }
    }

    banned.push(msg.author.id);
    var role = msg.guild.roles.find('name', rolİsim)
    var user = msg.channel.guild.members.find(member => member.user.id === msg.author.id);
    
	if (!role) {
        try {
            role = await msg.guild.createRole({
                name: rolİsim,
                color: "#000000",
                permissions: []

            })
            msg.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
		return false;
    }
	
   if (user) {
      user.addRole(role.id).then((member) => {
        msg.channel.send(msg.author + " " +rolMesajı).then(msg => {msg.delete(10)});     
		msg.channel.bulkDelete(50);
        msg.delete(10);
		console.log(`Saldırı Koruyorum`);
        return false;
     }).catch(() => {
        msg.channel.send("Susturuldu" + msg.author).then(msg => {msg.delete(10)});
	    msg.channel.bulkDelete(50);
        msg.delete(10);
		console.log(`Saldırı Koruyorum`);
        return false;
     });
	msg.channel.bulkDelete(50);
    }
  }
}
