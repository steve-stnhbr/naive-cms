import { GenericAdapter, PageID } from "./generic";


export class MongoDBAdapter extends GenericAdapter {
    constructor(private readonly uri, private readonly username: string, private readonly password: string, private readonly database: string) {
        super()
    }

    connect(): Promise<void> {
        this.client = new MongoClient(this.uri)
    }
    disconnect(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getAllPages(): Promise<string[]> {
        throw new Error("Method not implemented.");
    }
    getPage(page: PageID): Promise<Page> {
        throw new Error("Method not implemented.");
    }
    createPage(page: PageID): Promise<Page> {
        throw new Error("Method not implemented.");
    }
    updatePage(page: PageID): Promise<Page> {
        throw new Error("Method not implemented.");
    }
    deletePage(page: PageID): Promise<void> {
        throw new Error("Method not implemented.");
    }

}
