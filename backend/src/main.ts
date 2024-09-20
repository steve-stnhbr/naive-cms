import { GenericAdapter } from "./adapters/generic"
import { MongoDBAdapter } from "./adapters/mongodb"
import { PrismaAdapter } from "./adapters/prisma"
import { Config, fromFile } from "./config"
import * as path from "path"

var adapter: GenericAdapter | undefined

export async function init(config: Config | string | undefined): Promise<GenericAdapter> {
    if (adapter) {
        return adapter
    }

    if (typeof config === "string") {
        config = fromFile(config)
    } else if (config === undefined) {
        const defaultPath = path.resolve(process.cwd(), "naive.config.json");
        config = fromFile(defaultPath)
    }

    switch (config.adapter) {
        case "mongodb":
            adapter = new MongoDBAdapter(config.uri, config.username, config.password, config.database)
            break
        case "prisma":
            adapter = new PrismaAdapter(config.uri)
            break
        default:
            throw new Error("Invalid adapter")
    }

    await adapter.connect()
    return adapter
}