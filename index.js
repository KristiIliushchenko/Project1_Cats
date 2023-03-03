const $wrapper = document.querySelector(".cards_box");
const $addBtn = document.querySelector(".btn_add_cat");
const $modal = document.querySelector(".modal_window");
const $modal2 = document.querySelector(".modal_window2");
const $errMsgForm = document.querySelector(".err_msg");
const $btn_close = document.querySelector(".form__close");
const $btn_close2 = document.querySelector(".modal2_close");


const GenerateCatCard = (cat) => {

    return (`<div id=${cat.id} class="card">
            <img class = "cats_img" src= ${cat.image}/>
            <div class = "cats_info">
                 <h2>${cat.name}</h2>
                 <div class = "cards_buttons">
                 <button class = "btn_show_info">Просмотр</button>
                 <button class = "btn_refresh_info"><img class = "pencil_img" src="https://e7.pngegg.com/pngimages/456/1005/png-clipart-web-development-animation-pencil-angle-pencil.png"/></button>
                 <button class = "btn_delete_cat"><img class = "basket_img" src="https://e7.pngegg.com/pngimages/971/961/png-clipart-computer-icons-x-icon-text-rectangle.png"/></button>
                </div>
            </div>
        </div>`)
}

const GetCatsDescription = (cat) => {

  return (`<h1>${cat.name}</h1>
               <div class="cat_description2"
                 <p>Возраст кота:  ${cat.age}</p>
                 <p>Рейтинг кота:  ${cat.rate}</p>
                 <p>Любимчик?:     ${cat.favorite}</p>
                 <p>Описание кота: ${cat.description}</p>
               </div>`)
}


$wrapper.addEventListener("click", async (event) =>{
  const action = event.target.className;

  switch (action) {
    case "btn_delete_cat":
      const $currentCard = event.target.parentElement.parentElement.parentElement;
      const catId = $currentCard.id;
      try {
        const res = await api.DeleteCat(catId);
        const responce = await res.json();
        if (!res.ok) throw Error (responce.massage)
        $currentCard.remove(); 
      } catch (error) {
        console.log(error);
      }
      
    break;

    case "btn_show_info":
      const $currentCard_show_info = event.target.parentElement.parentElement.parentElement;
      const catId_for_show = $currentCard_show_info.id;
      try {
        const res = await api.GetCurrentCat(catId_for_show);
        const responce = await res.json();
        $modal2.classList.remove("hidden");
        $modal2.firstElementChild.firstElementChild.insertAdjacentHTML("afterbegin",GetCatsDescription(responce));
      } catch (error) {
        console.log(error);
      }
    break;

    /*case "refresh":
     
    break;*/

  }

})

$addBtn.addEventListener("click", (event) =>{
  //console.log($modal); 
  $modal.classList.remove("hidden");
})

$btn_close.addEventListener("click", (event) =>{
  $modal.classList.add("hidden");
  document.forms.add_cats_form.reset();
})

$btn_close2.addEventListener("click", (event) =>{
  $modal2.firstElementChild.firstElementChild.innerHTML = "";
  $modal2.classList.add("hidden");

})

document.forms.add_cats_form.addEventListener("submit", async (event) =>{
  event.preventDefault();
  $errMsgForm.innerHTML = "";
  const data = Object.fromEntries(new FormData(event.target
    ).entries());
    
  data.id=Number(data.id);
  data.age=Number(data.age);
  data.rate=Number(data.rate);
  data.favorite=!!data.favorite;
  
  const res = await api.AddNewCat(data);
  console.log(res);
  if (res.ok){
     $wrapper.replaceChildren();
     ShowAllCats();
     $modal.classList.add("hidden");
     return event.target.reset();
  }else{
    const responce = await res.json();
    //console.log(responce.message);
    $errMsgForm.innerHTML = responce.message;
    return;
  }
  //$wrapper.append.createElement(GenerateCatCard(responce));

})

const ShowAllCats = async() => { 
   const res = await api.GetAllCats();
   if (res.status !== 200){
    const $errorMessage = document.createElement("p");
    $$errorMessage.innerHTML= "В данный момент невозможно выполнить запрос,попробуйте позже";
    return $wrapper.append($errorMessage);
   }

   const data = await res.json();
   if (!data.length===0){
    const $notificationMessage = document.createElement("p");
    $notificationMessage.innerHTML= "Сейчас список котов пуст, добавьте животное";
    return $wrapper.append($notificationMessage);
   }

   data.forEach(cat => {
    //$wrapper.insertAdjacentHTML("afterbegin",GenerateCatCard(cat))
    const currentHTML = $wrapper.innerHTML;
    $wrapper.innerHTML = currentHTML + GenerateCatCard(cat);
});
}

ShowAllCats();