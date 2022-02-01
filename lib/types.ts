import { cod2_players } from "@prisma/client"

export interface NonAdminData {
    id: number
    rights: number
    username: string
    experience: number
    kills: number
    assists: number
    deaths: number
    rank: number
    killstreak: number
    time: Date
    register_time: Date
    time_played: number
    melee_kills: number
    headshots: number
    class1: number
    class2: number
    class3: number
    class4: number
    class5: number
    class6: number
    class7: number
    class8: number
    auth: string | null
    class1_name: string
    class2_name: string
    class3_name: string
    class4_name: string
    class5_name: string
    class6_name: string
    class7_name: string
    class8_name: string
    prestige: number
    zom_kills: number
    email: string | null
    points: number
    hat: number
    times_joined: number
    last_visit: Date
}

export interface ClassInterface {
    class: number,
    className: string
}

export interface GenericStats {
    id: number
    rights: number
    experience: number
    kills: number
    KDRatio: string
    deaths: number
    assists: number
    rank: number
    killstreak: number
    melee_kills: number
    headshots: number
    prestige: number
    zom_kills: number
    isRegistered: boolean
}

export interface AdminData {
    ip?: string
    username?: string
    email: string | null
}