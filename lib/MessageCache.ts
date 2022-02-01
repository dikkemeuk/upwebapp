import Collection from "@discordjs/collection"
import { prisma } from "lib/prisma"
import { coloredText } from "./utils/textColor";

export default class MessageCollection extends Collection<number, ChatMessage> {

    private async resolveUser(message: ChatMessage) {
        const user = await prisma.cod2_aliases.findFirst({where: {uid: message.uid}, orderBy: { used: "desc" }, take: 1});
        const name = coloredText(user?.alias || "Could not find user");
        return name
    }

    public firstChunk: ChatMessage[] = []

    public ready: boolean | undefined = undefined;
    private lastMessageID: number = 0

    public async loadMore() {
        if(!this.ready) {
            console.log("Previous messages haven't been cached yet.. returning.")
            return;
        }
        this.ready = false;
        const messages = await prisma.$queryRaw`SELECT * FROM cod2_cmdlog WHERE messageID > ${this.lastMessageID} ORDER BY messageID ASC` as ChatMessage[]


        if(!messages.length || messages[messages.length - 1].messageID === this.lastMessageID) {
            this.ready = true
            return
        }
    
        this.lastMessageID = messages[messages.length - 1].messageID

        for (let i = 0; i < messages.length; i++) {
            
            const message = messages[i]
            const alias = await this.resolveUser(message)
            message.datetime = new Date(message.datetime).toLocaleString('nl-NL', { timeZone: "UTC" })
            message.alias = alias
            this.set(message.messageID, message)
            
            //console.log(`Added new message: ${message.messageID}`)
            
        }

        console.log(`Cached ${messages.length} new messages!`)
        this.ready = true
        return console.log("All messages have been cached!")
    }

    public loadFirst = async () => {
        const messages = await prisma.$queryRaw`SELECT * FROM cod2_cmdlog ORDER BY messageID ASC` as ChatMessage[]
        this.lastMessageID = messages[messages.length - 1].messageID

        for (let i = messages.length - 1; i > 0; i--) {
            
            const message = messages[i]
            const alias = await this.resolveUser(message)
            message.datetime = new Date(message.datetime).toLocaleString('nl-NL', { timeZone: "UTC" })
            message.alias = alias
            this.set(message.messageID, message)
            
            //console.log(`Added new message: ${message.messageID}`)
            
        }
        this.ready = true
        
    }

    public getMany(num: number) {
        const array: ChatMessage[] = []
        const number = this.lastMessageID - num
        for(let i = this.lastMessageID; i > number; i--) {
            const message = this.get(i)
            if(!message) {
                continue
            }
            array.push(message)
        }

        return array
    } 
}

export interface ChatMessage {
    uid: number
    messageID: number
    content: string
    datetime: string
    alias?: string
}