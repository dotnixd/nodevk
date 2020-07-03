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

var fs = require("fs")
var { Config } = require("./config.js");

module.exports.ModuleSystem = function(moduleDir, vk) {
    this.path = moduleDir;
    this.load = function() {
        fs.readdir(moduleDir, function(err, files) {
            if(err) {
                return console.log(`${PREFIX}Unable to scan directory "${moduleDir}": ${err}`);
            }

            console.log(`${PREFIX}Found modules:`);

            files.forEach(e => {
                let { Plugin } = require(`${moduleDir}/${e}`);
                let p = new Plugin(vk);

                try {
                    p.config = new Config(`${moduleDir}/${e}/plugin.ini`);
                } catch(e) {}

                if(p.daemon) return;

                var regexps = []
                p.commands.forEach(e => {
                    regexps.push(new RegExp(e, "i"));
                });

                vk.updates.hear(regexps, p.handler);

                console.log(`${PREFIX}[${p.commands}] - ${p.description}`);
            });
        })
    }
}
