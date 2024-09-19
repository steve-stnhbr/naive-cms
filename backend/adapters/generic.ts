export abstract class GenericAdapter {
  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;

  abstract getAllPages(): Promise<PageID[]>;
  abstract getPage(page: PageID): Promise<Page>;
  abstract createPage(page: PageID): Promise<Page>;
  abstract updatePage(page: PageID): Promise<Page>;
  abstract deletePage(page: PageID): Promise<void>;
}