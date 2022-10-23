import { ReactElement, ReactNode } from "react";

interface PageMap {
    [pageName: string]: ReactNode;
}

type PageChangeCallback = (page: ReactNode)=>void;

export default class Router {
    private pages: PageMap|null = null;
    public constructor(private onPageChange: PageChangeCallback) {
    }

    public setPageMap(pageMap: PageMap) {
        this.pages = pageMap;
    }

    public changePage(pageName: string) {
        if (!this.pages) {
            throw new Error('Pages not set yet');
        }
    
        if (!(pageName in this.pages)) {
            throw new Error(`Invalid page name: ${pageName}`);
        }

        this.onPageChange(this.pages[pageName]);
    }
}