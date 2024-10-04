import { getPageAction, updatePageAction } from "@/app/actions/db";
import Pages from "../../page";
import PageDialog from "@/lib/components/page-dialog";

export default async function EditPage({ id }: { id: string }) {
    const page = await getPageAction(id)

    return (
        <>
            <PageDialog
                title="Edit Page"
                description="Edit a page that already exists"
                confirmText="Edit"
                confirmAction={updatePageAction}
                pageObj={page!}
                initiallyOpen={true}
                >
                    <></>
            </PageDialog>
            <Pages></Pages>
        </>
    )
}