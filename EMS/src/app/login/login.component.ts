import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  adminId: string = 'admin@123'
  adminPswd: String = 'admin@123'

  loginObj: any ={
    adminId : '',
    pswd : ''
  };


  constructor(private router:Router) { }

  ngOnInit(): void {

  }

  login(){
    var Lstatus = localStorage.getItem('Lstatus');
    console.log(Lstatus);
    // if(localStorage)
    if(this.adminId == this.loginObj.adminId){
      if(this.adminPswd == this.loginObj.pswd){
        localStorage.setItem('Lstatus', 'true')
        console.log(JSON.stringify(localStorage['Lstatus']));
        
        alert('login successfull');
        this.router.navigateByUrl('home');
        return
      }
      else{
        alert('incorrect password')
      }
    }
    else{
      alert('invalid username')
    }
  }

  forgot(){
    alert('feature will be added soon!')
  }

}
