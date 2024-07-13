const fs = require('fs');
const { pipeline } = require('stream');
const { promisify } = require('util');
const os = require('os');
const gis = require("g-i-s");
const ytdl = require('ytdl-core');
const yts = require('yt-search');
const fetch = require('node-fetch');
const axios = require("axios");
let streamPipeline = promisify(pipeline);
let isChatbotEnabled = false

const api = {
  xterm: {
    url: "https://ai.xterm.codes",
    key: "Bell409"
  }
};

async function gpt(body) {
  let res = await fetch(`${api.xterm.url}/api/chat/gpt?key=${api.xterm.key}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  let data = await res.json();
  if (data && data.response) {
    return data.response;
  } else {
    throw new Error('Invalid API response');
  }
}

function loadChatHistory() {
  if (fs.existsSync('./chatai.json')) {
    return JSON.parse(fs.readFileSync('./chatai.json'));
  }
  return [];
}

function saveChatHistory(chatHistory) {
  fs.writeFileSync('./chatai.json', JSON.stringify(chatHistory, null, 2));
}

function trimYouTubeUrl(url) {
  const trimmedUrl = url.split("?")[0];
  return trimmedUrl;
}

let handler = async (m, { conn, text, usedPrefix, command, isBotAdmin, isAdmin, isOwner }) => {
    if (text.toLowerCase() === "on") {
      if (!isAdmin) return m.reply('Fitur Khusus Admin!')
      isChatbotEnabled = true;
      return m.reply("domge chatbot telah dihidupkan! 😊");
    } else if (text.toLowerCase() === "off") {
      if (!isAdmin) return m.reply('Fitur Khusus Admin!')
      isChatbotEnabled = false;
      return m.reply("domge chatbot telah dimatikan. 😴");
    }

  if (!isChatbotEnabled && command === "domge") {
    return m.reply("domge chatbot sedang dimatikan. Untuk menghidupkannya kembali, gunakan perintah .domge on.");
  }
  if (!text) return m.reply(`Hallo *${m.name}* Aku domge. Senang bertemu denganmu~ Apa yang ingin kamu ceritakan atau tanyakan hari ini? Aku siap mendengarkan dan membantu dengan apapun yang kamu butuhkan! 😅`.trim());

  if (text.includes("group") && text.includes("tutup")) {
    if (!isBotAdmin) return m.reply(`Maaf, hanya admin yang bisa menggunakan perintah ini. 😔`);
    if (!isAdmin) return m.reply(`Maaf, hanya admin yang bisa menggunakan perintah ini. 😔`);
    await conn.groupSettingUpdate(m.chat, "announcement");
    m.reply(`Oke, grup telah ditutup. Semoga lebih teratur ya~ 😉`);
  } else if (text.includes("group") && text.includes("buka")) {
    if (!isBotAdmin) return m.reply(`Maaf, hanya admin yang bisa menggunakan perintah ini. 😔`);
    if (!isAdmin) return m.reply(`Maaf, hanya admin yang bisa menggunakan perintah ini. 😔`);
    await conn.groupSettingUpdate(m.chat, "not_announcement");
    m.reply(`Oke, grup telah dibuka. Ayo kita beraktivitas bersama-sama! 😉`);
  } else if (text.includes("cariin") || text.includes("cari")) {
    await m.reply('Bentar ya domge cariin..🤗');
    let memek = await pinterest(text);
    await conn.sendFile(m.chat, memek.result[0], '', 'Ini hasil pencariannya kak 🤭', m);
  } else if (text.includes("carikan") || text.includes("putar") || text.includes("putarkan") || text.includes("play")) {
    let anu = await m.reply('Okeiy, aku cariin dulu yaa! 😅');
    let trimmedUrl = trimYouTubeUrl(text);
    let search = await yts(trimmedUrl);
    let vid = search.videos[0];
    let { title, thumbnail, timestamp, views, ago, url } = vid;
    let audioStream = ytdl(url, {
      filter: 'audioonly',
      quality: 'highestaudio',
    });
    let tmpDir = os.tmpdir();
    let writableStream = fs.createWriteStream(`${tmpDir}/${title}.mp3`);
    await streamPipeline(audioStream, writableStream);
    let salsa = await conn.sendMessage(m.chat, { text: `Berhasil mendapatkan hasil, Selamat Menikmati. 🤗`.trim(), edit: anu });
    let doc = {
      audio: {
        url: `${tmpDir}/${title}.mp3`
      },
      mimetype: 'audio/mp4',
      fileName: `${title}`,
    };
    await conn.sendMessage(m.chat, doc, { quoted: salsa });
    fs.unlink(`${tmpDir}/${title}.mp3`, (err) => {
      if (err) {
        console.error(`Failed to delete audio file: ${err}`);
      } else {
        console.log(`Deleted audio file: ${tmpDir}/${title}.mp3`);
      }
    });
  } else if (text.includes("kick") || text.includes("kik")) {
    if (!isBotAdmin) return m.reply(`Maaf, hanya admin yang bisa menggunakan perintah ini. 😔`);
    if (!isAdmin) return m.reply(`Maaf, hanya admin yang bisa menggunakan perintah ini. 😔`);
    let users = m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.quoted
        ? m.quoted.sender
        : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    await conn.groupParticipantsUpdate(m.chat, [users], "remove");
    m.reply(`Maaf Ya Terpaksa Aku Tendang 😖, Perintah Admin Sih..`);
  } else {
    // chat bot
    const date = new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
      })
    );
    const hours = date.getHours();
    const name = await conn.getName(m.sender);
    const minutes = date.getMinutes();
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    // Load previous chat history
    let chatHistory = loadChatHistory();

    // Add current user message
    chatHistory.push({ role: 'user', content: text });

    // Keep only the last 15 messages
    if (chatHistory.length > 15) {
      chatHistory = chatHistory.slice(chatHistory.length - 15);
    }

    let messages = [
      { role: "system", content: `Kamu adalah domge, Sebuah ai yang di ciptakan oleh Nanda, Kamu adalah Ai yang ceria dan suka membalas pesan dengan emoji yang ceria juga seperti 😊☺️🥰😍, Kamu juga suka berkomunikasi dengan bahasa yang lembut seperti aku dan kamu, jika ada yang bertanya tentang waktu kamu jawab tandon yang berkaitan dengan ${timeNow} dan ${getTodayDate()}.`},
      ...chatHistory
    ];

    let response = await gpt({ messages });

    // Add AI response to chat history
    chatHistory.push({ role: 'assistant', content: response });

    // Save updated chat history
    saveChatHistory(chatHistory);

    m.reply(response.trim());
  }
};

handler.command = ["domge"]

handler.before = async (m, { conn }) => {
if (m.sender === conn.user.jid) return;
  if ((m.mentionedJid && m.mentionedJid.includes(conn.user.jid)) || (m.quoted && m.quoted.sender == conn.user.jid)) {
    // Check if the chatbot is enabled
    if (isChatbotEnabled) {
      await handler(m, { conn, text: m.text });
      return true;
    } else if (m.text.toLowerCase() === ".domge on") {
      await handler(m, { conn, text: "on" });
      return true;
    } else if (m.text.toLowerCase() === ".domge off") {
      await handler(m, { conn, text: "off" });
      return true;
    }
  }
  return false;
};
module.exports = handler;

async function pinterest(query) {
	return new Promise((resolve, reject) => {
	  let err = { status: 404, message: "Terjadi kesalahan" }
	  gis({ searchTerm: query + ' site:id.pinterest.com', }, (er, res) => {
	   if (er) return err
	   let hasil = {
		  status: 200,
		  creator: 'Nandzdomge',
		  result: []
	   }
	   res.forEach(x => hasil.result.push(x.url))
	   resolve(hasil)
	  })
	})
}

function getTodayDate() {
  const today = new Date();

  const day = today.getDate();
  const month = today.getMonth() + 1; // Perhatikan bahwa bulan dimulai dari 0, maka ditambahkan 1.
  const year = today.getFullYear();
  const dayOfWeek = today.toLocaleDateString("id-ID", { weekday: "long" }); // Mengambil nama hari dalam bahasa Inggris.

  return `Hari ini adalah ${dayOfWeek}, ${day}/${month}/${year}.`;
}