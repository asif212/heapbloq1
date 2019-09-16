import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { CardComponent } from './../card/card.component';
import {HttpService} from '../services/http.service';
import { CookieService } from 'ngx-cookie';


@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {
  @ViewChild("container", { read: ViewContainerRef }) container: ViewContainerRef;
  cmpRef: ComponentRef<any>;
  isEmptyState = false;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private _httpService : HttpService,
    private _cookieService:CookieService
  ) {

  }

  ngOnInit() {
    this.getConfigurationFxn();
    this.getAllBlogFxn(0);
  }

  getConfigurationFxn() {
    var url = "http://localhost:3000/master/getConf";
    var body = {};
    
    this._httpService.executePostService(url,body).then(responseData=> {
      console.log(responseData);
      this._cookieService.putObject('configuration', responseData);
    })
    .catch(err=>{
      console.log(err);
    });
  }

  getCookies(){
    console.log(this._cookieService.getObject('configuration'));
  }

  getAllBlogFxn(pageIndex) {
    var url = "http://localhost:3000/blog/getBlogFlow";
    var body = {
      "page": pageIndex,
    };
    
    this._httpService.executePostService(url,body).then(responseData=> {
      console.log(responseData);
      if(responseData['BLOGS'].length == 0 && pageIndex == 0){
        this.isEmptyState = true;
      }else{
        for(let blog of responseData['BLOGS']){
            this.blogBuilder(blog);
        }
      }
    })
    .catch(err=>{
      console.log(err);
    });
  }

  blogBuilder(blog) {
    let blogComponent = this.componentFactoryResolver.resolveComponentFactory(CardComponent);
    this.cmpRef = this.container.createComponent(blogComponent);
    this.cmpRef.instance.params = blog;
  }

}
