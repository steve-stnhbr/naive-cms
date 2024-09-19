import { PageID, Page } from "../types"

export abstract class GenericAdapter {
  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;

  abstract getAllPages(): Promise<Page[]>;
  abstract getPage(id: PageID): Promise<Page>;
  abstract createPage(page: Page): Promise<Page>;
  abstract updatePage(id: PageID, page: Page): Promise<Page>;
  abstract deletePage(id: PageID): Promise<void>;
}