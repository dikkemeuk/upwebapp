import { PrismaClient } from '@prisma/client'
import AliasCache from './utils/AliasCache';
import MessageCache from './utils/MessageCache';

declare global {
    var prisma: PrismaClient | undefined;
    var aliascache: AliasCache | undefined
    var messagecache: MessageCache | undefined
}

export const aliascache = global.aliascache || new AliasCache()
export const prisma = global.prisma || new PrismaClient();
export const messagecache = global.messagecache || new MessageCache()

if(process.env.NODE_ENV !== "production") {
    global.prisma = prisma;
    global.aliascache = aliascache;
    global.messagecache = messagecache;
}

