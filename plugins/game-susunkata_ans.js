const similarity = require('similarity');
const threshold = 0.72;


let handler = m => m
handler.before = async function (m) {  
     let id = m.chat;
    if (!m.quoted) {
        return true;
    }
    if (!m.quoted.fromMe) {
        return true;
    }
    if (!m.quoted.text) {
        return true;
    }
    if (m.sender === conn.user.jid) {
     return false
    }

    this.susunkata = this.susunkata ? this.susunkata : {};
    if (!(id in this.susunkata)) {
        return
    }

    if (m.quoted.id == this.susunkata[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.susunkata[id][1]));
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.susunkata[id][2];
            await this.reply(m.chat, `*Benar!*\n+${this.susunkata[id][2]} XP`, m);
            clearTimeout(this.susunkata[id][3]);
            delete this.susunkata[id];
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) {
            m.reply(`*Dikit Lagi!*`);
        } else {
            m.reply(`*Salah!*`);
        }
    } else {
        console.log('Quoted message ID does not match the question');
    }
    return true;
};

module.exports = handler;