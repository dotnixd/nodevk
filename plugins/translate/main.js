// Copyright (c) 2020 OverPie (email: itsoverpie@gmail.com, GitHub: @OverPie)

// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.

// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:

// 1. The origin of this software must not be misrepresented; you must not
//    claim that you wrote the original software. If you use this software
//    in a product, an acknowledgement in the product documentation would be
//    appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

module.exports.Plugin = function(vk) {
    this.vk = vk;
    this.commands = [/перевод/i, /переводчик/i, /переведи/i];
    this.description = "проверить работоспособность бота";
    this.handler = (async context => {
        var words = context.text.split(" ");
        words.shift();
        if(!words.length) return context.reply(`${PREFIX}Недостаточно аргументов`);

        var text = words.join(" ");
        const fetch = require("node-fetch");
        const query = require("querystring");

        var tok = this.config.cfg.token;

        var post = async (uri, data) => {
            let response = await fetch(uri, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: query.encode(data)
            });

            return await response.json();
        };

        try {
            var response = await post("https://translate.yandex.net/api/v1.5/tr.json/detect", {
                key: tok,
                text: text
            });

            if(response.code != 200) throw new UserException();
        } catch(e) {
            context.reply(`${PREFIX}Произошла ошибка`);
        }

        var lang = "";
        if(response.lang == "ru") {
            lang = "en";
        } else {
            lang = "ru";
        }

        try {
            var resp = await post("https://translate.yandex.net/api/v1.5/tr.json/translate", {
                key: tok,
                lang: lang,
                text: text
            });

            if(resp.code != 200) throw new UserException();
        } catch(e) {
            context.reply(`${PREFIX}Произошла ошибка`);
        }

        context.reply(`${PREFIX}Перевод: ${resp.text[0]}`);
    });
}
