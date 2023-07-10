import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/sevices/data.service';

@Component({
  selector: 'app-modifier-form',
  templateUrl: './modifier-form.component.html',
  styleUrls: ['./modifier-form.component.css']
})
export class ModifierFormComponent implements OnInit {


  constructor(private dataservice:DataService, private activateRoute: ActivatedRoute){}
  idUser = sessionStorage.getItem('user');
  is_admin = sessionStorage.getItem('is_admin');

  ville: any;
  vehicule: any;
  produit:any;
  probleme:any;
  solution:any;

  curDate=new Date();

  forms: Form[] = [];

  reclamation:any
  newForm: any= {
    vehiculeId:0,user: this.idUser, villeId: 0 , produitId: 0, problemeId: 0 ,refId:0, solutionId: 0 , description:'',file:'',statut:1,dateModification: this.curDate
  }

 

  selectedville: any ={
    id:0,name:''
  }
  selectedvehicule: any ={
    id:0,name:''
  }
  selectedproduit: any ={
    id:0,name:''
  }
  selectedprobleme: any ={
    id:0,name:''
  }
  
  
  ngOnInit() :void {
    
    this.showAll();
    this.showAllProduit();
    //this.showRef()
    
    
    
    this.changeButton()
    //this.valider()
    //this.editReclamation();
    this.getReclamation()
    
    
  }

  selectedFile: any; 
  fileValid: any=0
  onFileSelected(event:any): void {  
    
    this.fileValid=1
    if (this.fileValid==1) {
      if (event && event.target.files.length > 0) { 
        this.selectedFile =  event.target.files[0]; 
        this.newForm.file=this.selectedFile.name
        
      }                                             
    }            
  }

  
  ref: any;

  villeCopy:any=[]
  vehiculeCopy:any=[]
  produitCopy:any=[]
  refCopy:any=[]
  problemeCopy:any=[]
  solutionCopy:any=[]
  fVille(e:any){
    //console.log(e.target.value);
    this.ville=this.villeCopy
    this.ville=this.ville.filter((v:any) => v.name.toLowerCase().indexOf(e.target.value) > -1)
       
  }

  fVehicule(e:any){
    //console.log(e.target.value);
    
    this.vehicule=this.vehiculeCopy

    //console.log("fV",this.vehicule);
    this.vehicule=this.vehicule.filter((v:any) => v.name.toLowerCase().indexOf(e.target.value) > -1)
       
  }

  fProduit(e:any){
    //console.log(e.target.value);
    this.produit=this.produitCopy
    this.produit=this.produit.filter((v:any) => v.name.toLowerCase().indexOf(e.target.value) > -1)
       
  }

  fProbleme(e:any){
    //console.log(e.target.value);
    
    this.probleme=this.problemeCopy

    //console.log("fV",this.vehicule);
    this.probleme=this.probleme.filter((v:any) => v.name.toLowerCase().indexOf(e.target.value) > -1)
       
  }

  fSolution(e:any){
    //console.log(e.target.value);
    
    this.solution=this.solutionCopy

    //console.log("fV",this.vehicule);
    this.solution=this.solution.filter((v:any) => v.name.toLowerCase().indexOf(e.target.value) > -1)
       
  }

  fRef(e:any){
    //console.log(e.target.value);
    this.ref=this.refCopy
    this.ref=this.ref.filter((v:any) => v.name.toLowerCase().indexOf(e.target.value) > -1)
       
  }

  check(){
    this.newForm.refId=0
  }

  

  idForm = this.activateRoute.snapshot.paramMap.get('form')
  selected= new FormControl();
  selectedVehicule= new FormControl();
  selectedProduit= new FormControl();
  selectedProbleme= new FormControl();
  selectedSolution= new FormControl();
  selectedRef= new FormControl();

  disableSelect = new FormControl(true);

  getReclamation(){
    this.dataservice.getIdReclamation(this.idForm).subscribe(
      (res:any)=>{
        //console.log(res.product.problemes);
        this.showVehicule(res.device.ville.id)
        this.showProbleme(res.product.id,res.probleme.id)
        //this.showSolution(res.probleme.id)
        this.newForm.dateCreation=res.date_creation
        this.newForm.description=res.description
        //console.log("reclamation ",this.newForm)
        //if (res.refId==0) {
        this.disableSelect.setValue(false)
        //}
 
        this.selected.setValue(res.device.ville.id)
        this.selectedVehicule.setValue(res.device.id)
        this.selectedProduit.setValue(res.product.id)
        this.selectedProbleme.setValue(res.probleme.id)
        this.newForm.description=res.description

        
        
        //this.selectedRef.setValue(res.refId)
        
       
        
        
         
        if (res.statut=='traite') {
          // console.log("===",res.solution.id);
          this.selectedSolution.setValue(res.solution.id)
          
        }else{
          this.newForm.statut=0
          this.newForm.solutionId=0
          //this.solution=res.product.problemes[0].solutions
        }
      }
    )
  }
  
  showVehicule(id:any) {
    
    this.dataservice.getVehicule().subscribe((result:any)=>{
      
      
      this.vehiculeCopy=this.vehicule = result.filter(
        (res:any)=>res.ville.id == id,
        
        
        )
        
      })
    

  }

  showProbleme(id:any,pr:any) {
    
    this.dataservice.getProbleme().subscribe((res:any)=>{
     
      
      this.produit.forEach((p:any) => {
        if (p.id==id) {
          p.problemes.forEach((pr:any) => {
            res.forEach((r:any) => {
              if (r.id==pr.id) {
                this.problemeCopy.push(r)
              }
            });
            
            
            
          })
        }
        
        
      })
      this.probleme=this.problemeCopy
      this.showSolution(pr)
    })
    

  }

  showSolution(id:any) {
    
    this.dataservice.getSolution().subscribe((res:any)=>{
      
      this.problemeCopy.forEach((p:any) => {
       // console.log("888",p);
        if (p.id==id) {
          
          p.solutions.forEach((sol:any) => {
            res.forEach((r:any) => {
              if (r.id==sol.id) {
                
                
                this.solutionCopy.push(r)
              }
            });
            
            
            
          })
        }
        
        
      })

      this.solution=this.solutionCopy
      //console.log("++",this.solutionCopy);
      
    })
    

  }

  
  showAll() {
    
    this.dataservice.getVille().subscribe(
      (data:any) => {
        this.ville = data,
        this.villeCopy=data
        //console.log(this.ville)
      }
    )
    this.dataservice.getUser().subscribe((res:any)=>{
      this.user= res.filter((item:any)=>item.username==this.idUser)
    })

  }
  showAllProduit() {
    this.dataservice.getProduit().subscribe(
      (data:any) => {
        this.produit = data,
        this.produitCopy=data
        //console.log(this.produit)
      }
    )

  }

  showRef() {
    this.dataservice.getReference().subscribe(
      (data:any) => {
        this.ref = data,
        this.refCopy=data
        //console.log(this.ref)
      }
    )

  }

 
 

  changeProduit:boolean=false
  onSelectVille(ville_id:any){
    this.allValid=false
    this.newForm.vehiculeId=0
    this.selectedvehicule.id=0
    this.dataservice.getVehicule().subscribe((result:any)=>{
      
      
      this.vehiculeCopy=this.vehicule = result.filter(
        (res:any)=>res.ville.id == ville_id,
        
        
        )
        
      })
      //console.log("////",this.vehicule)
   
  }

  onSelectProduit(id:any){
    this.changeProduit=true
    this.dataservice.getProbleme().subscribe((res:any)=>{
      this.newForm.problemeId=0
      this.probleme.id=0
      this.newForm.solutionId=0
      this.newForm.refId=0
      this.solution.id=0
      
      
      this.Traite=false

      this.problemeCopy=[]
      this.produit.forEach((p:any) => {
        if (p.id==id) {
          p.problemes.forEach((pr:any) => {
            res.forEach((r:any) => {
              if (r.id==pr.id) {
                this.problemeCopy.push(r)
              }
            });
            
            
            
          })
        }
        
        
      })
      this.probleme=this.problemeCopy
      //console.log("++",this.problemeCopy);
      
    })
   
  }

  onSelectProbleme(id:any){
   
    this.allValid=false
    this.dataservice.getSolution().subscribe((res:any)=>{
      this.newForm.solutionId=0
      
      this.Traite=false
      //console.log(this.vehicule)
      this.solutionCopy=[]
      this.probleme.forEach((p:any) => {
        
        
        if (p.id==id) {
          p.solutions.forEach((sol:any) => {
            res.forEach((r:any) => {
              if (r.id==sol.id) {
                this.solutionCopy.push(r)
              }
            });
            
            
            
          })
        }
        
        
      })
      this.solution=this.solutionCopy
      //console.log("/////////////",this.solutionCopy);
      
    })
   
  }
  



  

 

 

  

 


  allValid:boolean=true
  Traite:boolean=true
  clearSol(){
    this.newForm.solutionId=0
    this.valider()
  } 
  valider(){
    
    
    switch (this.newForm.statut) {
      case 0:
        if (this.newForm.vehiculeId==0  || this.newForm.villeId==0 || this.newForm.produitId==0  ||this.newForm.problemeId==0 || (this.disableSelect.value==true && this.newForm.refId==0 )) {
          this.Traite=true
          this.allValid=false
            
          
        }else{
          
            
            this.allValid=true
          
          this.Traite=true
          
        }
        
        break;
      case 1:
        if (this.newForm.vehiculeId==0  || this.newForm.villeId==0 || this.newForm.produitId==0  ||this.newForm.problemeId==0 ||  (this.disableSelect.value==true && this.newForm.refId==0 ) ) {
      
          
          this.allValid=false
          if (this.newForm.solutionId==0) {
            this.Traite=false
          }else{
            this.Traite=true
          }
          
            
          
        }else{
          if (this.newForm.solutionId==0) {
            this.Traite=false
            this.allValid=false
          }else{
            this.Traite=true
            this.allValid=true
          }
          
          
          
        }
        break;
    
      
    }
    
    
    
    
    
  }


 
  
  issetId:boolean = true

  


  changeButton(){
    if (this.idForm == null) {
      this.issetId = false
    }
    
  }
  user:any
  statut:any
  mod(form:any){
    
    if (this.allValid) {
      switch (this.newForm.statut) {
        case 0:
           this.statut='en cours'
          break;
        case 1:
           this.statut='traite'
          break;
      }

      let data
      if (this.newForm.solutionId==0) {
        data = {
          id:this.idForm,
          device: { id: this.newForm.vehiculeId },
          product: { id: this.newForm.produitId },
          probleme: { id:this.newForm.problemeId },
          solution: { id:4 },
          statut: this.statut,
          description: this.newForm.description,
          date_creation: this.newForm.dateCreation,
          date_modification: this.newForm.dateModification,
          client: { id: this.user[0].id }
        };
      } else {
        data = {
          id:this.idForm,
          device: { id: this.newForm.vehiculeId },
          product: { id: this.newForm.produitId },
          probleme: { id:this.newForm.problemeId },
          solution: { id:this.newForm.solutionId },
          statut: this.statut,
          description: this.newForm.description,
          date_creation: this.newForm.dateCreation,
          date_modification: this.newForm.dateModification,
          client: { id: this.user[0].id }
        };
      }
      
      const test = {
        
        device: { id: 1 },
        product: { id: 4 },
        probleme: { id: 1 },
        solution: { id: 1 },
        statut: "traite",
        description: "Issue with the device ",
        date_creation: "2023-06-13T10:00:00",
        date_modification: null,
        client: { id: 12 }
          
      
      };
      console.log("555555",data);
      
      
      this.dataservice.editReclamation(data).subscribe(()=>{
        
      })
      
      
      
        
//        this.uploadFile()
    }
    
  }


  editReclamation(){
   
    this.dataservice.getIdReclamation(this.idForm).subscribe((res:any)=>{
      
        this.newForm = res
        
        
      }),
      console.log(this.newForm)
      
    
    
  }
}
