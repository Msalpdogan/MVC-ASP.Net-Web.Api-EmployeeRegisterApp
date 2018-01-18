import { Component, OnInit } from '@angular/core';

import {NgForm} from '@angular/forms'
import {EmployeeService} from '../shared/employee.service'
import {ToastrService} from 'ngx-toastr'
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService : EmployeeService, private toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }
 resetForm(form? : NgForm)
 {
   if(form !=null)
   form.reset();
   this.employeeService.selectedEmployee={
     EmployeeID:0,
     FirstName :'',
     LastName:'',
     EmpCode:'',
     Position:'',
     Office:'',

   }
 }
 onSubmit(form : NgForm)
 {
   if (form.value.EmployeeID != 0){
   //update
     this.employeeService.putEmployee(form.value.EmployeeID , form.value)
     .subscribe(data => {
       this.employeeService.getEmployeeList(),
       this.resetForm(form),
       this.toastr.info('recor updated successfully!','Employee Register')
 })}
   else
   {
     
   this.employeeService.postEmployee(form.value)
   .subscribe(data=>{
     this.resetForm(form),
     this.employeeService.getEmployeeList(),
       this.resetForm(form),
     this.toastr.success('New record Added Successfully','Employee Register-')
   }) 

   }
 }
}
