import { GenericAdapter } from "./generic";
import { PageID, Page } from "../types"
import { MongoClient, Db } from "mongodb"
import { mapPage } from "../types"

export class MongoDBAdapter extends GenericAdapter {
    client: MongoClient
    db: Db | undefined
    loginURI: string

    constructor(private readonly uri: string, 
        private readonly username: string, 
        private readonly password: string, 
        private readonly database: string) {
        super()
        this.loginURI = `mongodb://${this.username}:${this.password}@${this.uri}`
        this.client = new MongoClient(this.loginURI)
    }

    async connect(): Promise<boolean> {
        this.client =  await this.client.connect()
        this.db = this.client.db(this.database)
        if (!this.db) {
            throw new Error("Failed to connect to database")
        }
        return true
    }

    async disconnect(): Promise<boolean> {
        await this.client.close()
        return true
    }

    async getAllPages(): Promise<Page[]> {
        const pages = await this.db!.collection("pages").find({}).toArray()
        //const pages = await (await new MongoClient("mongodb://naivecms:naivecms@localhost:27017").connect()).db("naive").collection("pages").find({}).toArray()
        return pages.map(mapPage)
    }

    async getPage(id: PageID): Promise<Page | null> {
        const queried = await this.db!.collection("pages").findOne({ id: id })
        return queried ? mapPage(queried) : null
    }

    async createPage(page: Page): Promise<PageID> {
        const created = await this.db!.collection("pages").insertOne(page)
        return created.insertedId.toString()
    }

    async updatePage(id: PageID, page: Page): Promise<boolean> {
        const updated = await this.db!.collection("pages").updateOne({ id: id }, { $set: page })
        return updated.acknowledged
    }

    async deletePage(id: PageID): Promise<boolean> {
        const deleted = await this.db!.collection("pages").deleteOne({ id: id })
        return deleted.acknowledged
    }

}
