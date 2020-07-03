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
    this.commands = [/пуш/i];
    this.description = "упомянуть всех участников беседы";
    this.handler = (async context => {
        vk.api.messages.getConversationMembers({
            peer_id: context.peerId
        }).then(function(user) {
            var suffix = "";

            user.profiles.forEach(u => {
                suffix += `[id${u.id}|&#7;]`;
            });

            context.reply(`${PREFIX}Объявление: ${context.text.substr(context.text.indexOf(" ") + 1)}${suffix}`);
        }).catch(e => {
            if(e.code == 917) {
                context.reply(`${PREFIX}Произошла ошибка: невозможно получить участников беседы\n${PREFIX}Решение:\n - Выдайте права администратора боту`);
            } else {
                context.reply(`${PREFIX}Произошла неизвестная ошибка:\n${e.toString()}`);
            }
        });
    });
}
