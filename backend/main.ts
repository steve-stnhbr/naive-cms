import { GenericAdapter } from "./adapters/generic"
import { MongoDBAdapter } from "./adapters/mongodb"
import { Config, fromFile } from "./config"
import * as path from "path"

let initialized = false
let adapter: GenericAdapter | undefined

export function init(config: Config | string | undefined) {
    if (initialized) {
        throw new Error("Already initialized")
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
        default:
            throw new Error("Invalid adapter")
    }

    initialized = true
}

export const {
    getAllPages,
    getPage,
    createPage,
    updatePage,
    deletePage
} = (() => {
    init(undefined);
    return adapter!;
})();