// import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../services/employee.model';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  empForm : FormGroup | any;
  showModal:boolean = false;
  editMode:boolean = false;
  employees: Employee[] = [];
  


  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.getEmployees();
    this.empForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      position: ['', Validators.required],
      salary:['', Validators.required],
      dept: ['']
    })
  }

  getEmployees(){
    this.dataService.getEmployeeList().subscribe((res: Employee[]) => {
      console.log(res);
      this.employees = res;
    })
  }

  onDeleteEmployee(id: any){
    if(confirm('Do you want to delete this employee?')){
      this.dataService.deleteEmployee(id).subscribe(
        (res) => {
          console.log(res);
          this.getEmployees();
        },
        err => {
          console.log(err);
        })
    }
  }

  onEditEmployee(emp:Employee){
    this.editMode = true;
    this.showModal = true;
    this.empForm.patchValue(emp);
  }

  onEmpSubmit(){
    if(this.empForm.valid){
      if(this.editMode){
        this.dataService.updateEmployee(this.empForm.value).subscribe(
          (res) => {
            this.getEmployees();
            this.onCloseModal();
          },(err) => console.log(err))
      }
      else{
        this.dataService.addEmployee(this.empForm.value).subscribe(
          (res) => {
            this.getEmployees();
            this.onCloseModal();
          },(err) => console.log(err))
      }
    }

  }

  onCloseModal(){
    this.showModal = false;
    this.editMode = false;
  }
  
  onAddEmployee(){
    this.showModal = true;
  }

  Logout(){
    this.router.navigateByUrl('')
    // localStorage.removeItem('Lstatus')
  }

}
