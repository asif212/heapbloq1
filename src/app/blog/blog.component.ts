import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { blog } from './../model/blog.model';
import {HttpService} from '../services/http.service'
import { Router } from '@angular/router';
declare var Quill;
import { CookieService, safeJsonParse } from 'ngx-cookie';
// import { Http, Headers} from '@angular/http';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})

export class BlogComponent implements OnInit {
  isEditable: boolean = true;
  ckeConfig: any;
  mycontent: string;
  isCategoryEditable: boolean = false;
  isBrowser: boolean = false;
  tagLength:number = 0;
  @ViewChild("myckeditor") ckeditor: any;
  @ViewChild('editor') myckeditorElmnt: ElementRef;
  @ViewChild("title") title: ElementRef;
  @ViewChild("subtitle") subtitle: ElementRef;
  isShowEdit:boolean = true;
  quillEditor;
  blogTags ;
  interests;
  categoryId;
  blogUrl="";
  headers = new Headers({
    'Content-Type': 'application/json' });
 options = { headers: this.headers };
configuration;
  toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image'],
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
  ];
  constructor(@Inject(PLATFORM_ID) private platformId, 
    private _httpService : HttpService, 
    private router: Router,
    private _cookieService:CookieService) {
    this.mycontent = `<p>My html content</p>`;
    this.isBrowser = isPlatformBrowser(platformId);
  }
  blog= new blog();

  ngOnInit() {
    this.blogTags = [];
    this.configuration = this._cookieService.getObject('configuration');
    console.log(this.configuration);
    this.interests = this.configuration['CONFIGURATION'];
    console.log(this.interests);
    this.interests = this.interests['topicList'];
    console.log(this.interests);
  }
  setInterest(interest){
    this.categoryId =  interest.id;
  }
  enableEditorQuill() {
    if(!this.quillEditor){
      this.quillEditor = new Quill('#editor', {
        modules: {
          toolbar: this.toolbarOptions
        },
        placeholder: 'Compose an epic...',
        theme: 'snow'
      });
    }
  }
  

  saveBlogToDb() {
    console.log(this.title.nativeElement.innerText);
    var url = "http://localhost:3000/blog/addBlog";
    var body = {
      "blogUrl": this.blogUrl,
      "title": this.title.nativeElement.innerText,
      "subtitle": this.subtitle.nativeElement.innerText,
      "blogBody": this.quillEditor.root.innerHTML,
      "userType": "1",
      "timestamp": new Date().getTime(),
      "categoryID": this.categoryId,
      "blogTags": this.blogTags
    };
    console.log(body);

    // this.http.post(url, body,this.options).subscribe(response => {
    //   console.log(response);
    // })

    this._httpService.executePostService(url,body).then(response=> {
      console.log(response);
      var data  = response['data']
      if(response['STATUS'] == 'success'){
        console.log("redirect");
        this.blogUrl = data.blogUrl;
        this.router.navigate(['/blog/'+this.blogUrl]);
      }
    });
  }

  async editToggleButton() {
    this.isEditable = !this.isEditable;
    if(!this.isEditable){
      this.saveBlogToDb();
    }else{
     await this.enableEditorQuill();
    }
  }
  categoryDropdown() {
    this.isCategoryEditable = !this.isCategoryEditable
  }

  displayCounter(){
    this.isShowEdit = false;
    console.log("end");
    setTimeout(() => {
      this.enableEditorQuill();
    }, 500);
    
  }

  deleteTags(tag){
    document.getElementById(tag).remove();
  }

  creteTags(event){
    if(event.keyCode == 13){
      event.preventDefault();
    console.log(event);
    var tag = document.createElement("div");
    tag.className = "editableDiv titlle";
    // tag.classList.add("title");
    tag.innerText = event.target.innerText;
    tag.id = event.target.innerText +"_"+ this.tagLength.toString();
    this.tagLength++;
    var image = document.createElement("img");
    image.setAttribute("src", "./assets/cross.svg");
    image.setAttribute("alt", "heapBloq");
    
    image.addEventListener('click',()=> {
      this.deleteTags(tag.id);

    });
    tag.appendChild(image);
    document.getElementById("tagContainer").appendChild(tag);
    if(this.blogTags.length == 0){
    this.blogTags.push(event.target.innerText);
    }else{
      this.blogTags.push(event.target.innerText);
    }

    event.target.innerText = "";
  }
}
}
