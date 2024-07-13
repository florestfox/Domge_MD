let levelling = require('../lib/levelling')
let fs = require('fs')
let path = require('path')
let fetch = require('node-fetch')
let axios = require('axios')
let os = require('os')
let { platform } = require('node:process')
let { generateWAMessageFromContent, proto, prepareWAMessageMedia } = require("@whiskeysockets/baileys") 
let moment = require('moment-timezone')
let { sizeFormatter } = require('human-readable')
let format = sizeFormatter({
  std: 'JEDEC', // 'SI' (default) | 'IEC' | 'JEDEC'
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
})
Styles = (text, style = 1) => {
  var xStr = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
  var yStr = Object.freeze({
    1: 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ1234567890'
  });
  var replacer = [];
  xStr.map((v, i) => replacer.push({
    original: v,
    convert: yStr[style].split('')[i]
  }));
  var str = text.toLowerCase().split('');
  var output = [];
  str.map(v => {
    const find = replacer.find(x => x.original == v);
    find ? output.push(find.convert) : output.push(v);
  });
  return output.join('');
};
const defaultMenu = {
  before: ``.trimStart(),
  header: '',
  body: '◦ %cmd',
  footer: '',
  after: ``,
}
let handler = async (m, { conn, usedPrefix: _p, args, command }) => {
 await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
await conn.sendMessage(m.chat, { react: { text: '☑️', key: m.key }})
  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['anonymous', 'main', 'fun', 'islami', 'info', 'ai', 'bug', 'jadibot', 'atlantic', 'store', 'ephoto', 'ssh', 'life', 'search', 'downloader', 'textprome', 'convert', 'premium', 'music', 'simulator', 'game', 'judi', 'group', 'panel', 'internet', 'hengker', 'owner', 'rpg', 'diffusion', 'sticker', 'tools', 'anime', 'smm']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'anonymous') tags = {
    anonymous: 'ANONYMOUS'
  }
  if (teks == 'downloader') tags = {
    downloader: 'DOWNLOADER'
  }
  if (teks == 'ai') tags = {
    ai: 'AI'
  }
  if (teks == 'convert') tags = {
    convert: 'convert'
  }
  if (teks == 'main') tags = {
    main: 'MAIN'
  }
  if (teks == 'diffusion') tags = {
    diffusion: 'DIFFUSION'
  }
  if (teks == 'premium') tags = {
    premium: 'PREMIUM'
  }
  if (teks == 'game') tags = {
    game: 'GAME'
  }
  if (teks == 'smm') tags = {
    smm: 'SMM'
  }
  if (teks == 'simulator') tags = {
    simulator: 'SIMULATOR'
  }
  if (teks == 'group') tags = {
    group: 'GROUP'
  }
  if (teks == 'panel') tags = {
    panel: 'PANEL'
  }
  if (teks == 'ssh') tags = {
    ssh: 'SSH'
  }
  if (teks == 'music') tags = {
    music: 'MUSIC'
  }
  if (teks == 'anonymous') tags = {
    anonymous: 'ANONYMOUS'
  }
  if (teks == 'atlantic') tags = {
    atlantic: 'ATLANTIC'
  }
  if (teks == 'fun') tags = {
    fun: 'FUN'
  }
  if (teks == 'islami') tags = {
    islami: 'ISLAMI'
  }
  if (teks == 'textprome') tags = {
    textprome: 'TEXTPROME'
  }
  if (teks == 'store') tags = {
    store: 'STORE'
  }
  if (teks == 'jadibot') tags = {
    jadibot: 'JADIBOT'
  }
  if (teks == 'internet') tags = {
    internet: 'INTERNET'
  }
  if (teks == 'judi') tags = {
    judi: 'JUDI'
  }
  if (teks == 'hengker') tags = {
    hengker: 'HENGKER'
  }
  if (teks == 'ephoto') tags = {
    ephoto: 'EPHOTO'
  }
  if (teks == 'search') tags = {
    search: 'SEARCH'
  }
  if (teks == 'owner') tags = {
    owner: 'OWNER'
  }
  if (teks == 'rpg') tags = {
    rpg: 'RPG'
  }
  if (teks == 'info') tags = {
    info: 'INFO'
  }
  if (teks == 'sticker') tags = {
    sticker: 'STICKER'
  }
  if (teks == 'tools') tags = {
    tools: 'TOOLS'
  }
  if (teks == 'life') tags = {
    life: 'LIFE'
  }
  if (teks == 'anime') tags = {
    anime: 'ANIME'
  }
  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { exp, limit, level, role, registered } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let user = global.db.data.users[m.sender];
    let curr = user.exp - min
    let name = registered ? global.db.data.users[m.sender].name : conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let waktu = moment.tz('Asia/Jakarta').format('HH:mm');
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let ucap = ucapan()
    let module = package.module
    let totalreg = Object.keys(global.db.data.users).length
    let fkontak = {
    "key": {
      "participants": "0@s.whatsapp.net",
      "remoteJid": "status@broadcast",
      "fromMe": false,
      "id": "Powered By NANDA-DEV"
    },
    "message": {
      "contactMessage": {
        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    "participant": "0@s.whatsapp.net"
    };     
    let payment = {"key":{"remoteJid":"0@s.whatsapp.net","fromMe":false},"message":{"requestPaymentMessage":{"currencyCodeIso4217":"USD","amount1000":"99999999999","requestFrom":"0@s.whatsapp.net","noteMessage":{"extendedTextMessage":{"text":`${name}-san 🐼`,"contextInfo":{"mentionedJid":[`${m.sender}`]}}},"expiryTimestamp":"0","amount":{"value":"99999999999","offset":1000,"currencyCode":"USD"}}}}
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let group = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0])
    let isPremium = user.premium ? "Premium" : "Free User"
    let lim = user.premium ? '∞' : user.limit;
    let leve = user.level > 9999 ? '4̶0̶4̶ N̶o̶t̶ F̶o̶u̶n̶d̶' : user.level; 
    let rank = user.owner ? 'Immortality' : user.premium ? 'Sepuh' : 'Kroco Biasa'
    let ppUrl = await conn.profilePictureUrl(m.sender, 'image').catch((_) => "https://telegra.ph/file/1dff1788814dd281170f8.jpg");
    let tum = await getBuffer(ppUrl)
    let today = new Date();
    let tanggal = today.toLocaleDateString("id-ID", { 
       day: 'numeric', 
       month: 'long', 
       year: 'numeric' 
      })
    let day = today.toLocaleDateString("id-ID", { weekday: "long" });
    let more = String.fromCharCode(8206)
    let readMore = more.repeat(4001)
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    if (teks == '404') {
      let capt = `Hello, @${m.sender.replace(/@.+/g, '')} 🪸\n`
      capt += `I am an automated system (WhatsApp Bot) that can help to do something, search and get data / information only through WhatsApp.\n\n`
      capt += ` –   *BOT INFORMATION*\n`
      capt += `┌  ◦ Database : Mongodb\n`
      capt += `│  ◦ Library : ${module}\n`
      capt += `│  ◦ Author : ${global.author}\n`
      capt += `└  ◦ Source : closed-source\n\n`
      capt += ` –   *BOT LIST MENU*\n`      
      capt += `┌  ◦  ${_p + command} main\n`
      capt += `│  ◦  ${_p + command} info\n`
      capt += `│  ◦  ${_p + command} downloader\n`
      capt += `│  ◦  ${_p + command} ai\n`
      capt += `│  ◦  ${_p + command} diffusion\n`
      capt += `│  ◦  ${_p + command} convert\n`
      capt += `│  ◦  ${_p + command} premium\n`
      capt += `│  ◦  ${_p + command} judi\n`
      capt += `│  ◦  ${_p + command} game\n`
      capt += `│  ◦  ${_p + command} fun\n`
      capt += `│  ◦  ${_p + command} music\n`
      capt += `│  ◦  ${_p + command} group\n`
      capt += `│  ◦  ${_p + command} panel\n`
      capt += `│  ◦  ${_p + command} jadibot\n`
      capt += `│  ◦  ${_p + command} internet\n`
      capt += `│  ◦  ${_p + command} search\n`
      capt += `│  ◦  ${_p + command} islami\n`
      capt += `│  ◦  ${_p + command} ephoto\n`
      capt += `│  ◦  ${_p + command} textprome\n`
      capt += `│  ◦  ${_p + command} owner\n`
      capt += `│  ◦  ${_p + command} sticker\n`
      capt += `│  ◦  ${_p + command} anonymous\n`
      capt += `│  ◦  ${_p + command} tools\n`
      capt += `└  ◦  ${_p + command} anime\n\n`
      capt += `> Don't Spam Bot`
      conn.menubot = conn.menubot ? conn.menubot : {
      id: 1
      }
      if (conn.menubot.id === 1) {
      let id = "0@s.whatsapp.net"
      let tekss = `┏━⊜  Bot Information\n`
      tekss += `父 Name Bot : DOMGE-MD\n`
      tekss += `父 Uptime : ${uptime}\n`
      tekss += `父 Date : ${tanggal}\n`
      tekss += `父 Pengguna : ${totalreg} Users\n`
      tekss += `父 Groups : ${group.length} Groups\n`
      tekss += `父 Platform : ${platform}\n`
      tekss += `父 Memory : ${format(os.totalmem() - os.freemem())} / ${format(os.totalmem())}\n`
      tekss += `┗━━━━━━━━━━⬣\n\n`
      tekss += `┏━⊜User Information\n`
      tekss += `父 Name : ${name}\n`
      tekss += `父 Limit : ${lim}\n`
      tekss += `父 Status : ${isPremium}\n`
      tekss += `父 Role :  ${role}\n`
      tekss += `父 Rank : ${rank}\n`
      tekss += `父 Level : ${leve}\n`
      tekss += `父 Saldo: Rp ${toRupiah(user.saldo)}\n`
      tekss += `┗━━━━━━━━━━⬣\n`
      tekss += `Powered By *@${id.replace(/@.+/g, '')}*`
      let sections = [{
      title: 'Features',
      highlight_label: 'Get Detail Features',
      rows: [{
      header: 'Get All Menu, Click Here',
      title: 'All Menu',
      description: 'Show me detailed menu',
      id: `.bpe123`
      },
      {
      header: 'Get Detailed Rare Feature, Click Here',
      title: 'List Menu Rare',
      description: 'Show me list menu of rare Features',
      id: `listfeatures`
      }]
      },
      {
      title: 'List Menu Features',
      highlight_label: 'Get List Menu Of The One',
      rows: [{
      header: 'Ai Menu, Click Here',
      title: 'Ai Menu ( Creating Images Or Chat AI )',
      description: 'Show me AI menu',
      id: `.menu ai`
      },
      {
      header: 'Diffusion Menu, Click Here',
      title: 'Diffusion Menu ( Transform Photo Using AI )',
      description: 'Show me diffusion menu',
      id: `.menu diffusion`
      },
      {
      header: 'Downloader menu, Click Here',
      title: 'Downloader Menu ( Download Media Menu )',
      description: 'Show me downloader menu',
      id: `.menu downloader`
      },
      {
      header: 'Music Menu, Click Here',
      title: 'Music Menu ( Music Features )',
      description: 'Show me music menu',
      id: `.menu music`
      },
      {
      header: 'Ephoto Menu, Click Here',
      title: 'Ephoto Menu ( Create Photo Logo, From Text )',
      description: 'Show me Ephoto menu',
      id: `.menu ephoto`
      },
      {
      header: 'Fun Menu, Click Here',
      title: 'Fun Menu ( Games Menu )',
      description: 'Show me Fun menu',
      id: `.menu fun`
      },
      {
      header: 'Internet Menu, Click Here',
      title: 'Internet Menu ( Search Anything On Internet )',
      description: 'Show me Internet menu',
      id: `.menu internet`
      },
      {
      header: 'Anime Menu, Click Here',
      title: 'Anime Menu ( Looking for something Like anime titles )',
      description: 'Show me anime menu',
      id: `.menu anime`
      },
      {
      header: 'Converter Menu, Click Here',
      title: 'Convert Menu ( Convert Media Extension )',
      description: 'Show me convert menu',
      id: `.menu convert`
      },
      {
      header: 'Group Menu, Click Here',
      title: 'Group Menu ( Features which can only be used in groups )',
      description: 'Show me Group menu',
      id: `.menu group`
      },
      {
      header: 'Search Menu, Click Here',
      title: 'Search Menu ( Searching Something On Google Server )',
      description: 'Show me search menu',
      id: `.menu search`
      }]
      },
      {
      title: 'Meta AI Chat & Get Contacts',
      highlight_label: 'Try the upcoming AI Features!',
      rows: [{
      header: 'Meta AI Contacts, Click Here',
      title: 'Meta Contacts ( Get Meta AI Contacts )',
      description: 'Give Me Meta AI Contacts',
      id: `.metacontacts`
      }]
      },
      {
      title: 'Anonymous Menfess',
      rows: [{
      header: 'Sampaikan Perasaan mu, Click Here',
      title: 'Menfess ( I want to express my feelings... )',
      description: 'I want menfess',
      id: `.menfess`
      }]
      },
      {
      title: 'System & Information Owner',
      highlight_label: 'Get Information Owner & System',
      rows: [{
      header: 'Owner Information',
      title: 'Owner Information ( Get Information Owner )',
      description: 'Show Me Owner Contacts',
      id: `.owner`
      },
      {
      header: 'Test Internet Bot',
      title: 'System Internet Testing ( See how quickly the bot responds )',
      description: 'This Time To Ping!',
      id: `.ping`
      },
      {
      header: 'OS & RAM',
      title: 'OS System ( View information on where the bot OS is running )',
      description: 'Look At That OS',
      id: `.os`
      },
      {
      header: 'Total Features',
      title: 'Info Features ( Get Detailed Features completed )',
      description: 'Info How Much Features All Bot',
      id: `.totalfitur`
      },
      {
      header: 'Script Information',
      title: 'Script Info ( How to Get DOMGE-MD-BOTZ script? )',
      description: 'I want Script!',
      id: `.shop`
      },
      {
      header: 'Donation',
      title: 'Donate ( Get information donate to be more up to date )',
      description: 'I want donation',
      id: `.donasi`
      }]
     }]
let listMessage = {
    title: 'List Menu', 
    sections
};
//throw listMessage.sections[0].rows
let msg = generateWAMessageFromContent(m.chat, {
  viewOnceMessage: {
    message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
         contextInfo: {
        	mentionedJid: [m.sender, id], 
        	isForwarded: true, 
	        forwardedNewsletterMessageInfo: {
			newsletterJid: newsletterJid,
			newsletterName: ucapan(), 
			serverMessageId: -1
			},
			externalAdReply: {
            title: global.namebot, 
            body: global.botversi,
            thumbnailUrl: global.thumb,
            sourceUrl: global.syt,
            mediaType: 1,
            renderLargerThumbnail: true
            },
		},
          body: proto.Message.InteractiveMessage.Body.create({
            text: Styles(tekss)
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: 'Powered By _*Dev. Nanda*_'
          }), 
          header: proto.Message.InteractiveMessage.Header.create({
            title: `*Halo Kak @${m.sender.replace(/@.+/g, '')}!*`,
            subtitle: "NANDA-DEV",
            hasMediaAttachment: true,...(await prepareWAMessageMedia({ document: { url: 'https://wa.me/' }, mimetype: minety, fileName: `DOMGE-MD`, jpegThumbnail: await conn.resize(global.docthumb, 300, 100), fileLength: 100000000000 }, { upload: conn.waUploadToServer }))
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [              
              {
                "name": "single_select",
                "buttonParamsJson": JSON.stringify(listMessage) 
              },
              {
                 "name": "cta_reminder",
                 "buttonParamsJson": "{\"display_text\":\"Pengingat Hari Kiamat\",\"id\":\".owner\"}"
              }
           ],
          })
        })
    }
  }
}, { userJid: m.chat, quoted: payment })
conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id })
      } else if (conn.menubot.id === 2) {
      await conn.reply(m.chat, 
      capt,
      m)           
      } else if (conn.menubot.id === 3) {
      await conn.sendMessage(m.chat, {
      text: Styles(capt), 
      contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
      showAdAttribution: true,
      title: namebot,
      thumbnailUrl: ppUrl,
      sourceUrl: sgc,
      mediaType: 1,
      renderLargerThumbnail: true
      }}}, {quoted: m})
      } else if (conn.menubot.id === 4) {
      let call = {
      scheduledCallCreationMessage: {
      callType: 2,
      scheduledTimestampMs:  Date.now(),
      title: capt
      }}
      await conn.relayMessage(m.chat, call, {})
      } else if (conn.menubot.id === 5) {
      await conn.relayMessage(m.chat, {
      requestPaymentMessage: {
      currencyCodeIso4217: 'INR',
      amount1000: fsizedoc,
      requestFrom: '0@s.whatsapp.net',
      noteMessage: {
      extendedTextMessage: {
      text: capt,
      contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
      showAdAttribution: true
      }
      }
      }
      }
      }
      }, {}); 
      } else if (conn.menubot.id === 6) {
      await conn.sendMessage(m.chat, {
      video: {
      url: 'https://telegra.ph/file/10231647dc62b912e9f24.mp4'
      },
      caption: capt,
      gifPlayback: true,
      gifAttribution: 1,
      contextInfo: {
      mentionedJid: [m.sender]
      }}, {quoted: m})
      } else if (conn.menubot.id === 7) {
      conn.sendMessage(m.chat, {
      document: {
      url: "https://wa.me/"
      },
      mimetype: minety, 
      pageCount: 2024,
      fileName: `Selamat ${ucap} ${name}`,
      fileLength: 100000000000000,
      jpegThumbnail: await conn.resize(global.docthumb, 300, 100),
      caption: Styles(capt),
      contextInfo: {
      mentionedJid: [m.sender],      
      isForwarded: true,      
      businessMessageForwardInfo: { businessOwnerJid: '085812273035@s.whatsapp.net' }, 
      forwardedNewsletterMessageInfo: {
      newsletterJid: '120363279875321922@newsletter',
      newsletterName: 'CLICK BUTTON HERE',
      serverMessageId: -1
      },      
      forwardingScore: 2023,      
      }}, { quoted: fkontak })
      }
      return
    }
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
      // for (let tag of plugin.tags)
      //   if (!(tag in tags)) tags[tag] = tag
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Dipersembahkan oleh https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limit)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p,
      uptime,
      muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp <= 0 ? `Siap untuk *${_p}levelup*` : `${max - exp} XP lagi untuk levelup`,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      level,
      limit,
      name,
      weton,
      week,
      date,
      dateIslamic,
      time,
      module,
      totalreg,
      rtotalreg,
      role
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    await conn.reply(m.chat, Styles(text).trim(), m)
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}

handler.help = ['help']
handler.tags = ['main']
handler.command = /^(menu|help|menunya|menuall|allmenu)$/i

handler.register = false;
handler.limit = true;
handler.register = true

module.exports = handler;

async function getBuffer(url, options) {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return err
	}
}

function toRupiah(angka) {
var saldo = '';
var angkarev = angka.toString().split('').reverse().join('');
for (var i = 0; i < angkarev.length; i++)
if (i % 3 == 0) saldo += angkarev.substr(i, 3) + '.';
return '' + saldo.split('', saldo.length - 1).reverse().join('');
}

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function ucapan() {
    const time = moment.tz('Asia/Jakarta').format('HH');
    let res = "Malam";
    if (time >= 4) {
        res = "Pagi";
    }
    if (time > 10) {
        res = "Siang";
    }
    if (time >= 15) {
        res = "Sore";
    }
    if (time >= 18) {
        res = "Malam";
    }
    return res;
}