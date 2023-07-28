//     Home

let myHttp = new XMLHttpRequest()
let postslist=[]
myHttp.open("get","https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood")
myHttp.send()
myHttp.addEventListener("readystatechange",function(){
    if(myHttp.readyState == 4 && myHttp.status == 200){
        let res = myHttp.response
        postslist = JSON.parse(res).meals;
      
    //    console.log(res)
       display()
    }
})
function display(){
    let temp = ""
    postslist.forEach(ele => {
        temp+=`<div class="col-md-3 parent " meal-id="${ele.idMeal}" >
        <div class="child">
        <img src="${ele.strMealThumb}" class="w-100 h-100">
        <div class=" h-100 mumm"><p>${ele.strMeal}</p></div>
    </div>
      </div>`
    })
    document.getElementById("myrow").innerHTML=temp
    $(".parent").click(function(){
        console.log(this.getAttribute("meal-id"))
        $("#myrow").css("display","none")
        $(".details").css("display","block")
        displayMeal(this.getAttribute("meal-id"));
    })

}

// ------------------------------------------------------
//                   DisplayMeal

let detailsList=[];
function displayMeal(mealid){
    let mydetails = new XMLHttpRequest()
    mydetails.open("get",`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`)
mydetails.send()
mydetails.addEventListener("readystatechange",function(){
    if(mydetails.readyState == 4 && mydetails.status == 200){
        let del = mydetails.response
        detailsList = JSON.parse(del).meals;
        details()
        console.log(detailsList)
      
    }
})
}
displayMeal();

function details(){
    let mytemp = "";
    for(i=0;i<detailsList.length;i++){
        mytemp+=`<div class="col-md-4">
        <img src="${detailsList[i].strMealThumb}" class="w-100 h-100 sora" >
        <h2>${detailsList[i].strMeal}</h2>
      </div>
      <div class="col-md-8">
        <h2>Instructions</h2>
        <p>${detailsList[i].strInstructions}</p>
        <h3><span class="fw-bolder">Area :</span>${detailsList[i].strArea}</h3>
        <h3><span class="fw-bolder">Category :</span>${detailsList[i].strCategory}</h3>
        <h3 class="fw-bolder">Recipes :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
        <li class="alert alert-info m-2 p-1">${detailsList[i].strMeasure1}</li>
        <li class="alert alert-info m-2 p-1">${detailsList[i].strMeasure2}</li>
        <li class="alert alert-info m-2 p-1">${detailsList[i].strMeasure3}</li>
        <li class="alert alert-info m-2 p-1">${detailsList[i].strMeasure4}</li>
        <li class="alert alert-info m-2 p-1">${detailsList[i].strMeasure5}</li>
        
        </ul>
        <h3 class="fw-bolder">Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
          <li class="alert alert-danger m-2 p-1">${detailsList[i].strTags}</li>
        </ul>
      <a target="_blank" href="https://${detailsList[i].strSource}" class="btn btn-success">Source</a>
      <a target="_blank" href="https://${detailsList[i].strYoutube}" class="btn btn-danger">YouTube</a>
      </div>
`
    }
    
    document.getElementById("mydetails").innerHTML=mytemp
}


// ---------------------------------------------------------------































// function myFunction() {
// var input, filter, ul, li, a, i, txtValue;
//   input = document.getElementById('myInput');
//   filter = input.value.toUpperCase();
//   ul = document.getElementById("myUL");
//   li = ul.getElementsByTagName('li');
//   for (i = 0; i < li.length; i++) {
//     a = li[i].getElementsByTagName("a")[0];
//     txtValue = a.textContent || a.innerText;
//     if (txtValue.toUpperCase().indexOf(filter) > -1) {
//       li[i].style.display = "";
//     } else {
//       li[i].style.display = "none";
//     }
//   }
// }












// ------------------------------------------------
//                                     Category



let mycategory = new XMLHttpRequest()
let categorieslist=[]


mycategory.open("get","https://www.themealdb.com/api/json/v1/1/categories.php")
mycategory.send()
mycategory.addEventListener("readystatechange",function(){
    if(mycategory.readyState == 4 && mycategory.status== 200){
        let cat =mycategory.response
        categorieslist= JSON.parse(cat).categories
        console.log(cat)
        catplay()
    }
})
function catplay(){
    let temp=""
    categorieslist.forEach(element=>{
        temp+=`
        <div class="col-md-3 parent ">
        <div class="child2">
        <img src="${element.strCategoryThumb}" class="w-75 h-75">
        <div class=" h-100 humm text-center"  name-cat="${element.strCategory}"  ><h4>${element.strCategory}</h4>
        <p>${element.strCategoryDescription}</p>
        </div>
    </div>
      </div>`
    })
    document.getElementById("mycat").innerHTML=temp
    $(".humm").click(function(){
        console.log(this.getAttribute("name-cat"))
        CategoryName(this.getAttribute("name-cat"))
        $(".categories").css("display","none")
        $("#types-parent").css("display","block")
    })

}

let NameCategory=[];
function CategoryName(namecat){
    let mynamecat = new XMLHttpRequest()
    mynamecat.open("get",`https://www.themealdb.com/api/json/v1/1/filter.php?c=${namecat}`)
mynamecat.send()
mynamecat.addEventListener("readystatechange",function(){
    if(mynamecat.readyState == 4 && mynamecat.status == 200){
        let del = mynamecat.response
        NameCategory = JSON.parse(del).meals;
        console.log(NameCategory)
        displaycatmame()
      
    }
})
}
CategoryName();

function displaycatmame(){
    temp="";
    NameCategory.forEach(NameCategory=>{
    temp+=`
    <div class="col-md-3 parent " category-id="${NameCategory.idMeal}" >
            <div class="child">
            <img src="${NameCategory.strMealThumb}" class="w-100 h-100">
           
            <div class=" h-100 mumm">
              <h2 class="text-dark">${NameCategory.strMeal}</h2>
              </div>
        </div>
          </div>
    `})
    document.getElementById("types").innerHTML=temp
    $(".parent").click(function(){
        displayMeal(this.getAttribute("category-id"))
        $("#types-parent").css("display","none")
        $(".details").css("display","block")

    })
}

$("#caa").click(function(){
    $(".one").css("display","none")
    $(".categories").css("display","block")
})

// -----------------------------------------------------------------------------------
//                                      Area


$("#area").click(function(){
    $("#myrow").css("display","none")
    $("#homee").css("display","block")
})


let myarea = new XMLHttpRequest()
let areaslist=[]
myarea.open("get","https://www.themealdb.com/api/json/v1/1/list.php?a=list")
myarea.send()
myarea.addEventListener("readystatechange",function(){
    if(myHttp.readyState == 4 && myHttp.status == 200){
        let locate = myarea.response
        areaslist = JSON.parse(locate).meals;
       console.log(areaslist)
       displayarea()
    }
})


function displayarea(){
    let temp = ""
    areaslist.forEach(ele => {
        temp+=`<div class="col-md-3 house" name-area="${ele.strArea}">
        <span >
        <i class="fa-solid fa-house-laptop text-light "></i></span>
        <h2 class="text-light">${ele.strArea}</h2>

      </div>`
    })
    document.getElementById("house").innerHTML=temp
    $(".house").click(function(){
        foods(this.getAttribute("name-area"))
    })

}


let areafoods=[];
function foods(namefoodarea){
    let myarea = new XMLHttpRequest()
    myarea.open("get",`https://www.themealdb.com/api/json/v1/1/filter.php?a=${namefoodarea}`)
myarea.send()
myarea.addEventListener("readystatechange",function(){
    if(myarea.readyState == 4 && myarea.status == 200){
        let area = myarea.response
        areafoods = JSON.parse(area).meals;
        console.log(areafoods)
        displaycountries()
        
    }
})

}



function displaycountries(){
    let temp = ""
    areafoods.forEach(ele => {
        temp+=`<div class="col-md-3 parent " meal-id-count="${ele.idMeal}" >
        <div class="child">
        <img src="${ele.strMealThumb}" class="w-100 h-100">
        <div class=" h-100 mumm"><p>${ele.strMeal}</p></div>
    </div>
      </div>`
    })
    document.getElementById("house").innerHTML=temp
    $(".parent").click(function(){
        displayMeal(this.getAttribute("meal-id-count"))
        $("#countrylist").css("display","none")
        $(".details").css("display","block")
        $("#homee").css("display","none")

    })

}
// ----------------------------------------------------------------------------
//                                       ingrideants


$("#ingredients").click(function(){
    $("#myrow").css("display","none")
    $("#chicken").css("display","block")
})


let mying = new XMLHttpRequest()
let ingslist=[]
mying.open("get","https://www.themealdb.com/api/json/v1/1/list.php?i=list")
mying.send()
mying.addEventListener("readystatechange",function(){
    if(mying.readyState == 4 && mying.status == 200){
        let locate = mying.response
        ingslist = JSON.parse(locate).meals;
       console.log(ingslist)
       displyingredients()
    }
})


function displyingredients(){
    let tempp = ""
    ingslist.forEach(ele => {
        tempp+=`<div class="col-md-3 text-center  oneonefood " myfood-name="${ele.strIngredient}">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h3>${ele.strIngredient}</h3>
        <p>${ele.strDescription}</p>
      </div>`
    })
    document.getElementById("ingrediants").innerHTML=tempp
    $(".oneonefood").click(function(){
        
            $("#chicken").css("display","none")
            $(".final-gredient").css("display","block")
        final(this.getAttribute("myfood-name"))
        
    })
   
}


let gredientlist=[];
function final(protien){
    let protiens = new XMLHttpRequest()
    protiens.open("get",`https://www.themealdb.com/api/json/v1/1/filter.php?i=${protien}`)
protiens.send()
protiens.addEventListener("readystatechange",function(){
    if(protiens.readyState == 4 && protiens.status == 200){
        let ingredients = protiens.response
        gredientlist = JSON.parse(ingredients).meals;
        console.log(gredientlist)
        
        displayeee()
    }
})

}



function displayeee(){
    let temp = ""
    gredientlist.forEach(ele => {
        temp+=`<div class="col-md-3 imageleyar" my-id-soup="${ele.idMeal}">
        <img src="${ele.strMealThumb}" width="100%">
        <div class="layer"><h3>${ele.strMeal}</h3></div>
       </div>`
    })
    document.getElementById("final-gredient").innerHTML=temp
    $(".imageleyar").click(function(){
        displayMeal(this.getAttribute("my-id-soup"))
        $(".final-gredient").css("display","none")
        $(".details").css("display","block")
        $("#chicken").css("display","none")
        $("#homee").css("display","none")

    })
}
// --------------------------------------------------------------------------------
//                            Search
$("#search").click(function(){
    $("#myrow").css("display","none")
    $("#searching").css("display","block")
})

let Searchlist=[];
function search(search){
    let protiens = new XMLHttpRequest()
    protiens.open("get",`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
protiens.send()
protiens.addEventListener("readystatechange",function(){
    if(protiens.readyState == 4 && protiens.status == 200){
        let searchs = protiens.response
        Searchlist = JSON.parse(searchs).meals;
        console.log(Searchlist)
        displaySearch()
    }
})
}
$("#searchinput").keyup(function(){
   let searchresult= document.getElementById("searchinput").value;
    search(searchresult)
})
function displaySearch(){
    temp="";
    Searchlist.forEach(ele => {
        temp+=`<div class="col-md-3 imageleyar"  id-search="${ele.idMeal}" >
        <img src="${ele.strMealThumb}" width="100%">
        <div class="layer"><h3>${ele.strMeal}</h3></div>
       </div>`
    })
    document.getElementById("disearch").innerHTML=temp
    $(".imageleyar").click(function(){
        displayMeal(this.getAttribute("id-search"))
        $("#searching").css("display","none")
        $(".details").css("display","block")
    })
}





let Searchletter=[];
function searchletter(searchletter){
    let protiens = new XMLHttpRequest()
    protiens.open("get",`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchletter}`)
protiens.send()
protiens.addEventListener("readystatechange",function(){
    if(protiens.readyState == 4 && protiens.status == 200){
        let searchsletter = protiens.response
        Searchletter = JSON.parse(searchsletter).meals;
        console.log(Searchletter)
        displaySearchletter()
    }
})
}
$("#searchinputt").keyup(function(){
   let searchresultletter= document.getElementById("searchinputt").value;
    searchletter(searchresultletter)
})
function displaySearchletter(){
    temp="";
    Searchletter.forEach(ele => {
        temp+=`<div class="col-md-3 imageleyar" id-search="${ele.idMeal}" >
        <img src="${ele.strMealThumb}" width="100%">
        <div class="layer"><h3>${ele.strMeal}</h3></div>
       </div>`
    })
    document.getElementById("disearch").innerHTML=temp
    $(".imageleyar").click(function(){
        displayMeal(this.getAttribute("id-search"))
        $("#searching").css("display","none")
        $(".details").css("display","block")
    })
}
// -------------------------------------------------------------------------------------------
//                                 Validation


let nameinput =document.getElementById("name")
$("#name").keyup(function(){
    let regexname = /[A-Za-z]+$/
    if(regexname.test(nameinput.value)==true){
        $(".name-valid").css("display","none")
        $("#name").addClass("is-valid")
        $("#name").removeClass("is-invalid")

    }else{
        $(".name-valid").css("display","block")
        $("#name").addClass("is-invalid")
        $("#name").removeClass("is-valid")
    }
})



let emailinput =document.getElementById("email")
$("#email").keyup(function(){
    let regexemail = /[A-Za-z0-9_.-]+@[A-Za-z0-9_.-]+[a-z]{2,3}$/
    if(regexemail.test(emailinput.value)==true){
        $(".email-valid").css("display","none")
        $("#email").addClass("is-valid")
        $("#email").removeClass("is-invalid")

    }else{
        $(".email-valid").css("display","block")
        $("#email").addClass("is-invalid")
        $("#email").removeClass("is-valid")
    }
})




let phoneinput =document.getElementById("phone")
$("#phone").keyup(function(){
    let regexphone = /[0]+[0-9]{10}$/
    if(regexphone.test(phoneinput.value)==true){
        $(".phone-valid").css("display","none")
        $("#phone").addClass("is-valid")
        $("#phone").removeClass("is-invalid")

    }else{
        $(".phone-valid").css("display","block")
        $("#phone").addClass("is-invalid")
        $("#phone").removeClass("is-valid")
    }
})



let ageinput =document.getElementById("age")
$("#age").keyup(function(){
    let regexage = /(1[89]|[2-9]\d)$/
    if(regexage.test(ageinput.value)==true){
        $(".age-valid").css("display","none")
        $("#age").addClass("is-valid")
        $("#age").removeClass("is-invalid")

    }else{
        $(".age-valid").css("display","block")
        $("#age").addClass("is-invalid")
        $("#age").removeClass("is-valid")
    }
    if(ageinput.value>99){
        $(".age-valid").css("display","block")
        $("#age").addClass("is-invalid")
        $("#age").removeClass("is-valid")
    }
})
let passwordinput =document.getElementById("password")
$("#password").keyup(function(){
    let regexpassword = /[A-Za-z]$/
    if(regexpassword.test(passwordinput.value)==true){
        $(".password-valid").css("display","none")
        $("#password").addClass("is-valid")
        $("#password").removeClass("is-invalid")

    }else{
        $(".password-valid").css("display","block")
        $("#password").addClass("is-invalid")
        $("#password").removeClass("is-valid")
    }
})
let repasswordinput =document.getElementById("repassword")
$("#repassword").keyup(function(){
   
    if(repasswordinput.value==passwordinput.value){
        $(".repassword-valid").css("display","none")
        $("#repassword").addClass("is-valid")
        $("#repassword").removeClass("is-invalid")

    }else{
        $(".repassword-valid").css("display","block")
        $("#repassword").addClass("is-invalid")
        $("#repassword").removeClass("is-valid")
    }
})




$("#contact-us").click(function(){
    $("#myrow").css("display","none")
    $(".formm").css("display","block")
})
