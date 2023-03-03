class CatsApi {
    constructor(apiName){
         this.url = `https://cats.petiteweb.dev/api/single/${apiName}`;
    }

   GetAllCats(){
    return fetch(`${this.url}/show`)
   }

   GetCurrentCat(id){
    return fetch(`${this.url}/show/${id}`)
   }

   DeleteCat(id){
     return fetch(`${this.url}/delete/${id}`,{
     method:"DELETE",
     })
   }
  
  AddNewCat(data) {
     return fetch(`${this.url}/add`, {
     method: 'POST',
     headers: {
     'Content-type': 'application/json'
     },
     body: JSON.stringify(data)
    })
  }

}

const  dbName = "KristiIliushchenko";
const api= new CatsApi(dbName);