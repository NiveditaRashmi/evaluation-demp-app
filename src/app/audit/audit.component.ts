import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import * as moment from 'moment';

import { Audit, User } from '@/_models';
import { AuditService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'audit.component.html'})
export class AuditComponent implements OnInit
{
    currentUser: User;
    audits = [];
    rowData: any;

    constructor(
        private authenticationService: AuthenticationService,
        private auditService: AuditService
    )
    {
        this.currentUser = this.authenticationService.currentUserValue;
        console.log(this.currentUser);
    }

    ngOnInit()
    {
        this.loadAllAudits();
    }

    private loadAllAudits()
    {
        this.auditService.getAll()
            .pipe(first())
            .subscribe((audits) => {
                this.audits = audits;
                console.log(this.audits);
                this.rowData = audits;
            });
            
            console.log("outside" + this.audits);
    }

    columnDefs = [
        { headerName: 'ID', field: 'id', sortable: true, filter: true, width: '250px'},
        { headerName: 'LOGIN TIME', field: 'loginTime', 
         sortable: true, filter: true, width: '200px', cellRenderer: (data) => {
            return moment(data.createdAt).format('MM/DD/YYYY HH:mm')
        }},
        { headerName: 'LOGOUT TIME', field: 'logoutTime', sortable: true, filter: true, width: '200px',
            cellRenderer: (data) => {
                return moment(data.createdAt).format('MM/DD/YYYY HH:mm')
            }
        },
        { headerName: 'USER', field: 'user', sortable: true, filter: true, width: '250px'},
        { headerName: 'IP', field: 'ip', sortable: true, filter:true, width: '250px'}
    ]

    // dateFormatter(params) {

    // }

    // rowData = [

    // ]

    // columnDefs = [
    //     { field: 'make', sortable: true, filter: true },
    //     { field: 'model' , sortable: true, filter: true },
    //     { field: 'price'}
    // ];

    // rowData = [
    //     { make: 'Toyota', model: 'Celica', price: 35000 },
    //     { make: 'Ford', model: 'Mondeo', price: 32000 },
    //     { make: 'Porsche', model: 'Boxter', price: 72000 }
    // ];
}