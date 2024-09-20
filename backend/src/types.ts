export type PageID = string
export type Page = {
    id: PageID
    path: string
    content: PageContent[]
    title: string
}

export type PageContent = {
    id: PageContentID
    pageId: PageID
    name: string
    content: string
}

export type PageContentID = string

export function mapPage(obj: any): Page {
    return {
      id: obj.id,
      path: obj.path,
      content: obj.content.map((content: any) => ({
        id: content.id,
        pageId: content.pageId,
        name: content.name,
        content: content.content
      })),
      title: obj.title
    };
  }