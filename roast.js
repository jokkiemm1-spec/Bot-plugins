async function roast(m, { text, conn, usedPrefix, command }) {
    try {
        await m.reply("Wait make I load am...");

        let who = m.mentionedJid[0]? m.mentionedJid[0] : m.sender
        let name = who.split('@')[0]
        if (who === m.sender) name = "you"

        const prompt = `You be ruthless Nigerian agbero wey sabi roast well. Roast ${name} for Nigerian pidgin.
        Rules: 1-2 sentences max, very funny, savage but no curse words.
        No mention tribe, religion, disability. Focus on normal things like sense, broke level, confidence.`;

        let res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer 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',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 60,
                temperature: 0.95
            })
        })

        let json = await res.json()
        let roast = json.choices[0].message.content
        m.reply(roast)

    } catch (e) {
        console.log(e)
        m.reply("Omo, roast machine hang. Check your API key.")
    }
}

roast.command = /^roast$/i
roast.help = ['roast @user']
roast.tags = ['fun']

module.exports = roast
