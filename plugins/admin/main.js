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
    this.daemon = true;
    vk.updates.hear(/евал|eval/i, async context => {
        if(!this.admins.includes(context.senderId.toString())) return context.reply(`${PREFIX}Отказано в доступе`);

        var tok = context.text.split(" ");
        tok.shift();
        var arg = tok.join(" ");

        try {
            context.reply(`${PREFIX}Ответ: ${eval(arg)}`);
        } catch(e) {
            context.reply(`${PREFIX}Ошибка: ${e.toString()}`);
        }
    });
}
