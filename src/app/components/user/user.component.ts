import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/sevices/data.service';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatInputModule} from '@angular/material/input';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Vehicule } from 'src/app/models/vehicule';
import { every } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  userSelected: any={
    username:'',password:'',appRoles: [{ id: 2}],name:'',
    adress:'',
    phone:'',
    email:''
  }
  

  hideAdd:boolean=true
  addButton:boolean=true
  data: any=[]
  add(){
    this.addButton=true
    this.userSelected = {
      username:'',password:'',appRoles: [{ id: 2}],name:'',
      adress:'',
      phone:'',
      email:''
    }

   
    this.hideAdd=!this.hideAdd
    
  }

  constructor(private dataservice:DataService, private activateRoute: ActivatedRoute){}
  users:any=[]
  ngOnInit(): void {
    this.showAll()
    
    

  }


  
  showAll() {
    this.dataservice.getUser().subscribe((res:any)=>{
      this.users=res
        res.forEach((l:any) => {
          l.role=l.appRoles[0].roleName
          
        });
      this.dataSource = new MatTableDataSource<Element>(this.users)
        
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      //console.log(this.users[6]);
      //console.log('------',this.userSelected);
    })
    

  }

  filter(event:any){
    this.dataSource.filter = event.value
  }

  addUser = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required]),
    adress: new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required,Validators.pattern('[0-9]*'),Validators.maxLength(10),Validators.minLength(10)]),
    email: new FormControl('',[Validators.required,Validators.email]),
    admin: new FormControl()
  })

  get username() {
    return this.addUser.controls['username'];
  }

  get password() {
    return this.addUser.controls['password'];
  }

  get name() {
    return this.addUser.controls['name'];
  }

  get adress() {
    return this.addUser.controls['adress'];
  }

  get phone() {
    return this.addUser.controls['phone'];
  }

  get email() {
    return this.addUser.controls['email'];
  }


 


  displayedColumns = ['id','role','name','username','email','phone','mod','supp'];
  dataSource:any = [];
  //name = this.activateRoute.snapshot.paramMap.get('name')
  idUser = sessionStorage.getItem('user');
  is_admin:any = sessionStorage.getItem('is_admin');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  addNew(){
    
    this.dataservice.addUser( this.userSelected).subscribe(
      (data:any) => {
        this.ngOnInit()
        
      }
    )
    this.hideAdd=!this.hideAdd
    console.log('done****');
    
  }



  onMod(user:any){
    this.addButton=false
    this.hideAdd=false
    
    this.userSelected = {
      id:user.id,
      username:user.username,
      password:user.password,
      appRoles: [{ id: user.appRoles[0].id}],
      name:user.name,
      adress:user.adress,
      phone:user.phone,
      email:user.email
    }


  }

  modUser(){
   
    this.dataservice.addUser( this.userSelected).subscribe(
      (data:any) => {
        this.ngOnInit()
      }
    )
    
    this.hideAdd=!this.hideAdd
    
    console.log('done****');
    
  }

  onDelete(id:any){
    this.dataservice.deleteUser(id).subscribe(
      ()=>{this.showAll()}
    )
    
  }

  
}
