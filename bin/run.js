#!/usr/bin/env node
import mc from 'minecraft-api'
import tI from "terminal-image";
import got from 'got';
import dashes from "add-dashes-to-uuid"
import { validate as isValidUUID } from 'uuid';


const args = process.argv.splice(process.execArgv.length + 2)
let input = args[0]

if(isValidUUID(input)){
    input = input.replaceAll("-", "")
    mc.nameForUuid(input).then(async name => {
        console.log("\nMETHOD: UUID")
        const buff = await got(`https://cravatar.eu/helmavatar/${name}/32.png`).buffer()
        const img = await tI.buffer(buff, {width: 8});
        console.log(`UUID: ${dashes(input)}\nUSERNAME: ${name}\n\n${img}\n`);
    })
    
}else{
    mc.uuidForName(input).then(async uuid => {
        console.log("\nMETHOD: USERNAME")
        const buff = await got(`https://cravatar.eu/helmavatar/${input}/32.png`).buffer()
        const img = await tI.buffer(buff, {width: 8});
        console.log(`UUID: ${dashes(uuid)}\nUSERNAME: ${input}\n\n${img}\n`);
    })
    
}


