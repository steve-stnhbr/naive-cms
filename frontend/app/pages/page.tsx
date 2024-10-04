"use server"

import { init } from "@/../backend/src/main" // TODO: change to package import
import PageTitle from "@/lib/components/page-title"
import PageItem from "@/lib/components/page-item"
import { Button } from "@/lib/components/shadcn/ui/button"
import { Page } from "../../../backend/src/types"
import { Separator } from "@/lib/components/shadcn/ui/separator"
import Link from "next/link"


export const handleAddPage = async (page: Page) => {
    "use server"
    const adapter = await init(undefined)
    await adapter.createPage(page)
}

export default async function Pages() {
    const adapter = await init(undefined)

    return (
        <div>
            <div className="flex justify-between items-center">
                <PageTitle>Pages</PageTitle>
                <Link href="/pages/create">
                    <Button>Add</Button>
                </Link>
            </div>
            <div className="pages-list w-100 mt-8">
                {(await adapter.getAllPages()).map((page, index) => (
                    <>
                        {index > 0 && <Separator className="mb-2 mt-2" />}
                        <PageItem page={page} />
                    </>
                ))}
            </div>
        </div>
    )
}

