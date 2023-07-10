import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/sevices/data.service';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatInputModule} from '@angular/material/input';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Vehicule } from 'src/app/models/vehicule';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit{
  
  newForm: any= {
    vehiculeId:0,user: 0, villeId: 0 , produitId: 0, problemeId: 0 , solutionId: 0 , description:'',file:'',statut:1,dateCreation: '',dateModification: null
  }
  

 
  

  constructor(private dataservice:DataService, private activateRoute: ActivatedRoute,private router: Router){}
 
  ngOnInit(): void {
    //this.router.navigate(['/forms'])
    this.showAll()
    
  }


  data:any=[]
  async showAll() {
    this.dataservice.getReclamation().subscribe(
      (data:any) => {
        
       
        let i=0
        data.forEach((l:any) => {
          var val={id:l.id,statut:l.statut,ville:l.device.ville.name,vehicule:l.device.name,user:l.client.username,dateCreation:l.date_creation,dateModification:l.date_modification}
          this.data[i]=val
          i++
        });
        //console.log(data);
        
        this.dataSource = new MatTableDataSource<Element>(this.data)
        
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      }
    )

  }

  filter(event:any){
    this.dataSource.filter = event.value
  }

  


  displayedColumns = ['id','user','ville','vehicule','dateCreation','dateModification','statut','mod'];
  dataSource:any = [];
  //name = this.activateRoute.snapshot.paramMap.get('name')
  idUser = sessionStorage.getItem('user');
  is_admin:any = sessionStorage.getItem('is_admin');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  valider(id:any){
    this.dataservice.validStatut(id,2).subscribe(()=>{
      this.dataSource.data[id-1].statut=2
    })
    //this.router.navigate(['/acceuil'])

  }
  invalider(id:any){
    this.dataservice.validStatut(id,0).subscribe(()=>{
      this.dataSource.data[id-1].statut=0
    })

  }
 

  
  
  
}
