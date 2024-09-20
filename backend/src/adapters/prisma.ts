import { PrismaClient, Prisma } from "@prisma/client"
import * as path from "path"
import { execSync } from "child_process"
import { GenericAdapter } from "./generic"
import { mapPage, Page, PageID } from "../types"
import { env } from "process"

export class PrismaAdapter extends GenericAdapter {
    prisma: PrismaClient
    constructor(private readonly uri: string) {
        super()
        env.DATABASE_URL = uri
        this.initialize()
        this.prisma = new PrismaClient()
    }

    async initialize() {
        // Run Prisma migrations
        const prismaBinary = path.join(__dirname, '..', '..', 'node_modules', '.bin', 'prisma')
        execSync(`${prismaBinary} migrate deploy`, { stdio: 'inherit' })
    }

    async connect(): Promise<boolean> {
        // Connect to the database
        await this.prisma.$connect()
        return true
    }

    async disconnect(): Promise<boolean> {
        await this.prisma.$disconnect()
        return true
    }

    async getAllPages(): Promise<Page[]> {
        return this.prisma.page.findMany().then((pages) => pages.map(mapPage))
    }

    async getPage(id: PageID): Promise<Page> {
        return this.prisma.page.findUnique({ where: { id } }).then(mapPage)
    }

    async createPage(page: Page): Promise<PageID> {
        return this.prisma.page.create({ data: page as Prisma.PageCreateInput }).then(
            (created) => created.id
        )
    }

    async updatePage(id: PageID, page: Page): Promise<boolean> {
        return this.prisma.page.update({ where: { id }, data: page as Prisma.PageUpdateInput }).then(
            (updated) => updated.id !== null
        )
    }

    async deletePage(id: PageID): Promise<boolean> {
        await this.prisma.page.delete({ where: { id } })
        return true
    }
}