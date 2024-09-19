import { GenericAdapter } from "./generic";
import { PageID, Page } from "../types"
import { MongoClient, Db } from "mongodb"


export class MongoDBAdapter extends GenericAdapter {
    client: MongoClient
    db: Db

    constructor(private readonly uri, 
        private readonly username: string, 
        private readonly password: string, 
        private readonly database: string) {
        super()
        this.client = new MongoClient(this.uri)
    }

    async connect(): Promise<void> {
        this.client =  await this.client.connect()
        this.db = this.client.db(this.database)
        return void
    }

    async disconnect(): Promise<void> {
        await this.client.close()
        return void
    }

    async getAllPages(): Promise<string[]> {
        const pages = await this.db.collection("pages").find({}).toArray()
        return pages
    }

    async getPage(id: PageID): Promise<Page> {
        const queried = await this.db.collection("pages").findOne({ id: id })
        return queried as Page
    }

    async createPage(page: Page): Promise<Page> {
        const created = await this.db.collection("pages").insertOne(page)
        return created as Page
    }

    async updatePage(id: PageID, page: Page): Promise<Page> {
        const updated = await this.db.collection("pages").updateOne({ id: id }, { $set: page })
        return updated as Page
    }

    async deletePage(id: PageID): Promise<void> {
        await this.db.collection("pages").deleteOne({ id: id })
        return void
    }

}
