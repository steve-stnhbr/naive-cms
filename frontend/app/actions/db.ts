"use server"

import { revalidatePath } from "next/cache";
import { init } from "../../../backend/src/main";
import { Page } from "../../../backend/src/types";

let adapter: Awaited<ReturnType<typeof init>> | null = null;

async function getAdapter() {
  if (!adapter) {
    adapter = await init(undefined);
  }
  return adapter;
}

export async function createPageAction(page: Page) {
  const adapterInstance = await getAdapter();
  revalidatePath('/pages')
  return adapterInstance.createPage(page);
}

export async function updatePageAction(page: Page) {
  const adapterInstance = await getAdapter();
  revalidatePath('/pages')
  return adapterInstance.updatePage(page.id, page);
}

export async function getPageAction(id: string) {
  const adapterInstance = await getAdapter();
  revalidatePath('/pages')
  return adapterInstance.getPage(id);
}
