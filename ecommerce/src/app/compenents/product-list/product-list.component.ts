import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-list',
  //templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
products : Product[];
currentCategoryName: string;
currentCategoryId :number;
searchMode:boolean;
  constructor(private productService: ProductService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
    this.listProducts();})
  }

  listProducts(){
    this.searchMode=this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProducts();
    }else{
   this.handleListProducts();}

  }
  handleListProducts(){
    //check id is valid
    const  hasCategoryId:boolean=this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      //get id param and convert to number
      this.currentCategoryId= +this.route.snapshot.paramMap.get('id');
      // get the "name" param string
      this.currentCategoryName ='Category : '+ this.route.snapshot.paramMap.get('name');
    }else {
      //cat id invalide
      this.currentCategoryId=1;
      this.currentCategoryName = 'Category : Books';
    }

    this.productService.getProductList(this.currentCategoryId).subscribe(
      data=>{
        this.products=data;
      }
    )
  }

   handleSearchProducts() {
    const theKeyWord:string=this.route.snapshot.paramMap.get('keyword');
    //search for product
     this.currentCategoryName = 'search';
     this.productService.searchProducts(theKeyWord).subscribe(
       data=>{
         this.products=data;
       }
     );
  }
}
