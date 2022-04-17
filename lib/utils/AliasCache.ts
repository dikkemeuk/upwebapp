import { Collection } from "@discordjs/collection";
import { PrismaClient } from "@prisma/client";
import { coloredText } from "./textColor";

const prisma = new PrismaClient()

export default class AliasCache extends Collection<number, {alias: string, used: number}[]> {
    
        private async getAliases() {
            const aliases = await prisma.cod2_aliases.findMany({orderBy: { used: "desc" }});
           
            return aliases
        }

        public async load() {
            const aliases = await this.getAliases()
            for (let i = 0; i < aliases.length; i++) {
                const alias = aliases[i]
                const entry = this.get(alias.uid)
                if (entry) {
                    entry.push({alias: coloredText(alias.alias), used: alias.used})
                } else {
                    this.set(alias.uid, [{alias: coloredText(alias.alias), used: alias.used}])
                }
            }
        }

        public count() {
            let num = 0
            for (const key of this.keys()) {
                num += this.get(key)!.length
            }
            return num
        }
    
        public constructor() {
            super()
            this.load()
        }
}