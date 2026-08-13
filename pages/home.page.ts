// pages/home.page.ts
import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { ProductGridComponent } from './components/product-grid.component';
import { FilterSidebarComponent } from './components/filter-sidebar.component';
import { PaginationComponent } from './components/pagination.component';

export class HomePage extends BasePage {
  readonly grid: ProductGridComponent;
  readonly sidebar: FilterSidebarComponent;
  readonly pagination: PaginationComponent;

  constructor(page: Page) {
    super(page);
    this.grid = new ProductGridComponent(page);
    this.sidebar = new FilterSidebarComponent(page);
    this.pagination = new PaginationComponent(page);
  }

  async open() {
    await this.navigateTo('');
  }
}