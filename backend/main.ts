import { GenericAdapter } from "./adapters/generic"
import { MongoDBAdapter } from "./adapters/mongodb"
import { Config, fromFile } from "./config"
import { PageID } from "./types"
import * as path from "path"

let initialized = false
let adapter: GenericAdapter

process.nextTick(init)

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

function checkInitialized() {
    if (!initialized) {
        throw new Error("Not initialized")
    }
}

export function getAllPages() {
    checkInitialized()

    return adapter.getAllPages()
}

export function getPage(page: PageID) {
    checkInitialized()
    return adapter.getPage(page)
}

export function createPage(page: PageID) {
    checkInitialized()
    return adapter.createPage(page)
}

export function updatePage(page: PageID) {
    checkInitialized()
    return adapter.updatePage(page)
}

export function deletePage(page: PageID) {
    checkInitialized()
    return adapter.deletePage(page)
}
