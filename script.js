const vehicles=[
{name:"Sultan",brand:"Karin",category:"Sportive",img:"https://static.wikia.nocookie.net/gta/images/5/58/Sultan_-_GTA_V.png/revision/latest?cb=20200429105942&path-prefix=fr",desc:"Une sportive polyvalente, idéale pour les amateurs de conduite dynamique."},
{name:"Elegy Retro",brand:"Annis",category:"Sportive",price:62500,year:2021,km:"12 850 km",img:"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&q=80",desc:"Un modèle iconique au caractère affirmé et aux performances remarquables."},
{name:"Tailgater",brand:"Obey",category:"Berline",price:32900,year:2023,km:"9 730 km",img:"https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1000&q=80",desc:"Confort, élégance et discrétion pour vos déplacements quotidiens."},
{name:"Cavalcade",brand:"Albany",category:"SUV",price:54700,year:2022,km:"22 110 km",img:"https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1000&q=80",desc:"Un SUV robuste avec un espace généreux pour toute la famille."},
{name:"Baller",brand:"Gallivanter",category:"SUV",price:41900,year:2020,km:"31 200 km",img:"https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80",desc:"Un SUV premium confortable et parfaitement adapté à la ville."},
{name:"Burrito",brand:"Declasse",category:"Utilitaire",price:21900,year:2021,km:"45 600 km",img:"https://images.unsplash.com/photo-1601584115197-04ecc0da31d8?auto=format&fit=crop&w=1000&q=80",desc:"Un utilitaire pratique pour les professionnels et entrepreneurs."}
];

const cars=document.querySelector("#cars");
const search=document.querySelector("#search");
let category="Tous";

function render(){
 const q=search.value.toLowerCase();
 const list=vehicles.filter(v=>(category==="Tous"||v.category===category)&&(`${v.name} ${v.brand}`.toLowerCase().includes(q)));
 cars.innerHTML=list.map((v,i)=>`
 <article class="card">
   <img class="car-img" src="${v.img}" alt="${v.name}">
   <div class="card-body">
    <div class="tag">${v.category.toUpperCase()} • ${v.brand.toUpperCase()}</div>
    <h3>${v.name}</h3>
    <div class="specs"><span>${v.year}</span><span>${v.km}</span></div>
    <div class="price">${v.price.toLocaleString("fr-FR")} €</div>
    <button class="btn" onclick="openCar(${vehicles.indexOf(v)})">Voir le véhicule</button>
   </div>
 </article>`).join("") || "<p>Aucun véhicule ne correspond à votre recherche.</p>";
}
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");category=b.dataset.category;render()});
search.oninput=render;

const modal=document.querySelector("#modal");
function openCar(i){
 const v=vehicles[i];
 document.querySelector("#modalBody").innerHTML=`<img class="car-img" src="${v.img}" alt="${v.name}"><p class="eyebrow">${v.category} • ${v.brand}</p><h2>${v.name}</h2><p>${v.desc}</p><p><strong>Année :</strong> ${v.year}<br><strong>Kilométrage :</strong> ${v.km}<br><strong>Prix :</strong> ${v.price.toLocaleString("fr-FR")} €</p><a class="btn" href="#contact" onclick="closeModal();document.querySelector('[name=vehicle]').value='${v.name}'">Demander ce véhicule</a>`;
 modal.classList.remove("hidden");
}
function closeModal(){modal.classList.add("hidden")}
document.querySelector("#closeModal").onclick=closeModal;
modal.onclick=e=>{if(e.target===modal)closeModal()};

document.querySelector("#contactForm").onsubmit=e=>{
 e.preventDefault();
 document.querySelector("#formStatus").textContent="Demande envoyée ! (simulation RP)";
 e.target.reset();
};
render();
