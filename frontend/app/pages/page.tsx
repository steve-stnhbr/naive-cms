"use server"

import { init } from "@/../backend/src/main" // TODO: change to package import
import PageTitle from "@/lib/components/page-title"
import PageItem from "@/lib/components/page-item"
import { Button } from "@/lib/components/shadcn/ui/button"
import PageDialog from "@/lib/components/page-dialog"
import { Page } from "../../../backend/src/types"


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
                <PageDialog 
                        title="Add Page" 
                        description="Add a new page to the website" 
                        confirmText="Add" 
                        confirmAction={handleAddPage}
                        pageObj={undefined}>
                    <Button>Add</Button>
                </PageDialog>
            </div>
            <div className="pages-list">
                {(await adapter.getAllPages()).map((page) => (
                    <PageItem page={page} />
                ))}
            </div>
        </div>
    )
}

