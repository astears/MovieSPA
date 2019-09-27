import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  public selectedPage: number = 1;

  constructor() { }

  getPageNumber(paginationValue) {
    let pageNumber = -1;

    if (paginationValue === 'Previous') {
      pageNumber = this.selectedPage - 1;
    }
    else if (paginationValue === 'Next') {
      pageNumber = this.selectedPage + 1;
    }
    else if (paginationValue === '...') {
      pageNumber = this.selectedPage;
    }
    else {
      pageNumber = parseInt(paginationValue);
    }

    return pageNumber;
  }

  configurePagination(maxPageNumber: number) {
    let pagination = [];

    if (this.selectedPage >= 1 && this.selectedPage < 7) {
      for (let i: number = 1; i < 8; i++) {
        pagination.push(i.toString());
      }
      pagination.push("...");
      pagination.push((maxPageNumber - 1).toString());
      pagination.push((maxPageNumber).toString());
      pagination.push("Next");
    }
    else if (this.selectedPage >= 7 && this.selectedPage <= maxPageNumber - 8) {
      pagination.push("Previous");
      pagination.push("1");
      pagination.push("2");
      pagination.push("...");
      for (let i: number = 3; i > 0; i--) {
        pagination.push((this.selectedPage - i).toString());
      }
      pagination.push(this.selectedPage.toString());
      for (let i: number = 1; i < 4; i++) {
        pagination.push((this.selectedPage + i).toString());
      }
      pagination.push("...");
      pagination.push((maxPageNumber - 1).toString());
      pagination.push((maxPageNumber).toString());
      pagination.push("Next");
    }
    else {
      pagination.push("Previous");
      pagination.push("1");
      pagination.push("2");
      pagination.push("...");
      for (let i:number = 7; i > 0; i--) {
        pagination.push((maxPageNumber - i).toString());
      }
    }

    return pagination;
  }
}
