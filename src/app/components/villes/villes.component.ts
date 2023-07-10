import { Component } from '@angular/core';
import { Ville } from 'src/app/models/ville';
import { DataService } from 'src/app/sevices/data.service';

@Component({
  selector: 'app-villes',
  templateUrl: './villes.component.html',
  styleUrls: ['./villes.component.css']
})
export class VillesComponent {
  constructor(private villeService:DataService){}
  ville:any
  testVille:Ville={
    name:''
  }
  editVille:Ville={
    id:5,
    name:'paris'
  }
  villes: Ville[] = []

  ngOnInit() :void {
    this.showAll();
    
  }

  showAll() {
    this.villeService.getVille().subscribe(
      (data:any) => {
        this.ville = data,
        console.log(this.ville)
      }
    )

  }


  tet(){
    if (this.testVille.name=="nice") {
      this.villeService.addVille(this.testVille).subscribe((ville:any)=> {
        this.villes = [ville , ...this.villes],
        console.log(this.testVille)
      })
    }
    
   
  }
  persistVille(){
    
   
  }


  
  vehicule: any;
  selectedville: any ={
    id:0,name:''
  }

 

  forms:any;
  form: any = {
    vehiculeId:'',user: '', villeId: '' , produitId: '', problemeId: '' , solutionId: ''
  }

  

 

  onSelect(ville_id:any){
    this.villeService.getVehicule().subscribe((res:any)=>{
      this.vehicule = res.filter(
        (res:any)=>res.villeId == ville_id!.value
      ),
      console.log(this.vehicule)
    })
  }


  getForm(){
    this.villeService.getReclamation().subscribe(
      (data:any) => {
        this.forms = data,
        console.log(this.forms)
      }
    )
  }

  edite(ville:any){
    this.testVille = ville
  }



}
