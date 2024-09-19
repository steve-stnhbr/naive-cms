import * as fs from "fs"

export type Config = {
    adapter: "mongodb"
    uri: string
    username: string
    password: string
    database: string
} | {
    adapter: "filesystem"
    path: string
} | {
    adapter: "sqlite"
    path: string
}

export function fromFile(path: string): Config {
    const config = fs.readFileSync(path, "utf8")
    return JSON.parse(config)
}