import { Injectable } from '@angular/core';
import { Http, Headers, Response, ResponseContentType } from '@angular/http';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

    constructor(private http: Http, private httpClient: HttpClient, private router: Router, ) { }
    headers = new Headers({
        'Content-Type': 'application/json' });
     options = { headers: this.headers };

    executePostService(url, params) {
        
        
        return new Promise((resolve, reject) => {
           
            this.http.post(url, params,this.options).toPromise().then(response => {
            
                var res = response.json();
                if (res.STATUS == "success") {
                    return resolve(res);
                } else {
                    if (res.statusCode == 401) {
                        /** Invalid session **/
                    } else if (res.MESSAGE) {
                        
                        /** Server side validation messages **/
                        return reject(res.MESSAGE);
                    } else {
                        // console.log("In reject block3");
                        
                        /** Unexcepted error **/
                        return reject(res);
                    }
                }
            }).catch(error => {
                /** Unexcepted error **/
                if (error.message != undefined) {
                    alert(error.message);
                } else {
                    alert("Some error occured");
                }
            });
        });
    }
    


}
