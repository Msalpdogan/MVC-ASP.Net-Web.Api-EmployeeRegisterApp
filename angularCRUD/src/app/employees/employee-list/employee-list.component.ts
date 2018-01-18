import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../shared/employee.service';
import {Employee} from '../shared/employee.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

constructor(private employeeService : EmployeeService , private toastr : ToastrService) { }

  ngOnInit() {
    this.employeeService.getEmployeeList();
  }

  showForEdit(emp : Employee)
  {
    this.employeeService.selectedEmployee= Object.assign({},emp) ;;
  }
  deleteEmployee( id : number)
  {
    if(confirm('Are you sure?')==true){
    this.employeeService.deleteEmployee(id)
    .subscribe(x=> {
      this.employeeService.getEmployeeList();
      this.toastr.error("Deleted succesfully" ,"Employee Register")
    })
    }
  }
}
