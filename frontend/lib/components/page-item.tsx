import Link from "next/link";
import { Page } from "../../../backend/src/types";
import { Button } from "./shadcn/ui/button";

export default function PageItem({page}: { page: Page}) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="flex flex-col sm:flex-row sm:items-center">
                <h2 className="mr-4">{page.title}</h2>
                <p className="text-sm text-gray-500">{page.content.length} sections</p>
                {/* <p>{page.id}</p> */}
            </div>
            <div className="mt-2 sm:mt-0">
                <Link href={`/pages/${page.id}/edit`}>
                    <Button className="float-right">Edit</Button>
                </Link>
            </div>
        </div>
    )
}