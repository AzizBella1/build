import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DataService } from '../../sevices/data.service'
import { Form } from 'src/app/models/form';
import { Ville } from 'src/app/models/ville';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, ReplaySubject, Subject, interval, map, min, take, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelect } from '@angular/material/select';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  



  disableSelect = new FormControl(false);


  ville: any;
  vehicule: any;
  produit:any;
  probleme:any;
  solution:any;

 
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


  curDate=new Date();
  idUser = sessionStorage.getItem('user');
  is_admin:any = sessionStorage.getItem('is_admin');

  forms: Form[] = [];
  newForm: any= {
    vehiculeId:0,user: this.idUser, villeId: 0 , produitId: 0, problemeId: 0 ,refId:0, solutionId: 0 , description:'',file:'',statut:1,dateCreation: this.curDate,dateModification: null
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
  selectedFile: any; 
  constructor(private dataservice:DataService, private activateRoute: ActivatedRoute,
    private http: HttpClient
    ){}

  ngOnInit() :void {
    
    this.showAll();
    this.showAllProduit();
    //this.showAllSolution();
    //this.showAllProbleme();
    //this.showProbleme()
    //this.showSolution()
    //this.showRef()
    //this.editReclamation();
    this.changeButton()
    this.valider()
    

  }
  cnt:any
  
testerTanger:any=[]
testerMarrakech:any=[]
  showAll() {
   /* this.dataservice.getTanger().subscribe(
      (data:any) => {
        //this.testerTanger = data
        let i=0
        data.forEach((l:any) => {
          var val={name:l.name,id:i+1,disabled:l.disabled,ville:{id:16}}
          this.testerTanger[i]=val
          i++
        });
        
        console.log(this.testerTanger[0])
      }
    )
    this.dataservice.getMarrakech().subscribe(
      (data:any) => {
        //this.testerTanger = data
        let i=0
        data.forEach((l:any) => {
          var val={name:l.name,id:i+1,disabled:l.disabled,ville:{id:10}}
          this.testerMarrakech[i]=val
          i++
        });
        
        console.log(this.testerMarrakech[0])
      }
    )*/
    this.dataservice.getVille().subscribe(
      (data:any) => {
        this.ville = data,
        this.villeCopy=data
        //console.log()
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
       // console.log(this.produit)
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

 
 
  ttttt:any=[]
  changeVille:boolean=false
  selVille = new FormControl()
  onSelectVille(ville_id:any){
    /*this.ttttt=[]
      switch (ville_id) {
        case 10:
          console.log(this.testerMarrakech);
          
          this.ttttt=this.testerMarrakech
          break;
      
        case 16:
          console.log(this.testerTanger);
          
          this.ttttt=this.testerTanger
          break;
        
      }*/
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
    
    this.dataservice.getProbleme().subscribe((res:any)=>{
      this.newForm.problemeId=0
      //this.probleme.id=0
      this.newForm.solutionId=0
      this.newForm.refId=0
      //this.solution.id=0
      
      
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
      //console.log("++",this.solutionCopy);
      
    })
   
  }
  

  check(){
    this.newForm.refId=0
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
  user:any
  statut:any
  lastFormId:any
  addReclamation(){
    // reclamation => response.id
    if (this.allValid) {
      switch (this.newForm.statut) {
        case 0:
           this.statut='en cours'
          break;
        case 1:
           this.statut='traite'
          break;
      }
      let data:any={}
      if (this.newForm.solutionId==0) {
        data = {
          device: { id: this.newForm.vehiculeId },
          product: { id: this.newForm.produitId },
          probleme: { id:this.newForm.problemeId },
          solution: { id:4 },
          statut: this.statut,
          description: this.newForm.description,
          date_creation: this.newForm.dateCreation,
          client: { id: this.user[0].id }
        };
      } else {
        data = {
          device: { id: this.newForm.vehiculeId },
          product: { id: this.newForm.produitId },
          probleme: { id:this.newForm.problemeId },
          solution: { id:this.newForm.solutionId },
          statut: this.statut,
          description: this.newForm.description,
          date_creation: this.newForm.dateCreation,
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
      //console.log(data);
      this.dataservice.addForm(data).subscribe(
        response  => {
          //this.uploadFile(response.id)
          //console.log('Reclamation created successfully', response);
          //alert('Reclamation created successfully'+ response);
           // Handle the response here
         })
        
        
      
      
        
        
//        this.uploadFile()
    }
    

    
  }
  addReclamationTest(){
    // reclamation => response.id
    /*let formData:FormData= new FormData()
    formData.append('status', this.newForm.statut);
    formData.append('date_creation', this.newForm.dateCreation);
    formData.append('data_modification', this.newForm.dateModification);
    formData.append('discription', this.newForm.discription);
    let villeData:FormData = new FormData();
    villeData.append('id', this.newForm.villeId);
    formData.append('ville', villeData);    
    */
    const url = 'http://localhost:4242/Api/reclamations';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    const data = {
      device: { id: 1 },
      product: { id: 1 },
      probleme: { id: 1 },
      solution: { id: 2 },
      statut: 'en cours',
      description: 'Issue with the device 15',
      dateCreation: '2023-06-13T10:00:00',
      dateModification: '2023-06-13T10:00:00',
      client: { id: 26 }
    };
  
    this.http.post(url, data, { headers })
      .subscribe(
        response  => {
         console.log('Reclamation created successfully'+ response);
         alert('Reclamation created successfully'+ response);
          // Handle the response here
        },
        error => {
          console.log('Error creating reclamation'+ error);
          alert('Error creating reclamation'+ error);
          // Handle the error here
        }
      );
    //this.uploadFile()
        alert("fin")
//        this.uploadFile()
  }



  fileValid:boolean=true
  onFileSelected(event:any) {  
    if (event && event.target.files.length > 0) { 
      this.selectedFile =  event.target.files[0]; 
      this.newForm.file=this.selectedFile.name
      this.fileValid=true
      
      this.elem.first.nativeElement.setAttribute("style", "visibility:hidden;")
      
    } 
    
                                        
  }
  @ViewChildren('loading') elem!:  QueryList<ElementRef>;
  cancel(){
    this.newForm.file=''
    alert(1)
    this.elem.first.nativeElement.setAttribute("style", "visibility:hidden;")
  }
  charge(){
    this.fileValid=!this.fileValid
    //alert(this.fileValid)
    if (!this.fileValid && this.newForm.file=='' ) {
      this.elem.first.nativeElement.setAttribute("style", "visibility:visible;")
    } 
    
  }
  

  uploadFile(id:any): void {
    if (this.selectedFile) {
      let formData: FormData = new FormData();
      alert('????????????'+this.selectedFile)
      formData.append('file', this.selectedFile);
      formData.append('recid', '1');
      
      this.dataservice.uploadImg(formData)
    }
  }

 
  idForm = this.activateRoute.snapshot.paramMap.get('id')
  issetId:boolean = true

  


  changeButton(){
    if (this.idForm == null) {
      this.issetId = false
    }
    
  }

  


 
}
