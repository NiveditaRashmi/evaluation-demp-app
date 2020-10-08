import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    currentUser: User;
    users = [];
    rowData: any;

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }

    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe((users) => {
                this.users = users;
                console.log(this.users);
                this.rowData = users;
            });
    }

    columnDefs = [
        { headerName: 'ID', field: 'id', sortable:true, filter: true, width: '250px'},
        { headerName: 'ROLE', field: 'role', sortable: true, filter: true, width: '150px'},
        { headerName: 'USERNAME', field: 'username', sortable: true, filter: true, width: '150px'},
        { headerName: 'FIRSTNAME', field: 'firstName', sortable: true, filter: true, width: '150px'},
        { headerName: 'LASTNAME', field: 'lastName', sortable: true, filter: true, width : '150px'},
        { headerName: 'CREATED ON', field: 'createdDate', sortable: true, filter: true, width: '250px' }

    ]
}