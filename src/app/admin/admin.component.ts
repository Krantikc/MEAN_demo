import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user/user.service';
import { CdkTableModule } from '@angular/cdk/table';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.scss']
})
export class AdminComponent implements OnInit {

  usersList: Array<any> = [];
  dataSource;
      displayedColumns = [];
      @ViewChild(MatSort) sort: MatSort;

      /**
       * Pre-defined columns list for user table
       */
      columnNames = [{
        id: 'fullname',
        value: 'Name'

      }, {
        id: 'email',
        value: 'Email'
      }, {
        id: 'roles',
        value: 'Roles'
      }, {
        id: 'createdAt',
        value: 'Created date'
      }];

  constructor(private userService: UserService) {}

  public ngOnInit() {
    this.userService.getUsers()
      .subscribe(data => {
        this.usersList = data.usersList;

        for(let i=0;i<20;i++) {

          this.usersList.push(data.usersList[0]);
        }
        this.displayedColumns = this.columnNames.map(x => x.id);
      });
  }
}


