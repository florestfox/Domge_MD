let { MessageType } = require('@whiskeysockets/baileys')
let PhoneNumber = require('awesome-phonenumber')
let handler = async (m, { conn, usedPrefix, text, args, command }) => {
      let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:WhatsApp; Ownerkuh!!\nORG:Nanda-Dev\nTITLE:soft\nitem1.TEL;waid=${nomorown}:${nomorown}\nitem1.X-ABLabel:Ponsel\nitem2.URL:http://github.com/FlorestFox\nitem2.X-ABLabel:💬 More\nitem3.EMAIL;type=INTERNET:bs9999571@gmail.com@gmail.com\nitem3.X-ABLabel:Email\nitem4.ADR:;;PERSIMPANGAN ARAB;;;;\nitem4.X-ABADR:💬 More\nitem4.X-ABLabel:Lokasi\nEND:VCARD`;
      const sentMsg = await conn.sendMessage(
    m.chat,
    {
      contacts: {
        displayName: wm,
        contacts: [{ vcard }],
      },
      contextInfo: {
        externalAdReply: {
          title: "Nanda-Dev",
          body: "Version: 2.0.1",
          thumbnailUrl: 'https://telegra.ph/file/e439a0687b4ce51a3766f.jpg',
          mediaType: 1,
          showAdAttribution: false,
          renderLargerThumbnail: true,
        },
      },
    },
    { quoted: m },
  );
  conn.reply(m.chat, 'Hai kak, Ini owner ku, Kalo ada perlu bilang aja sama dia😊', sentMsg)
}
handler.help = ['owner']
handler.tags = ['info']

handler.command = /^(owner)$/i

module.exports = handler