// chrome://extensions/
const inputBtn=document.getElementById('input-btn');
const deleteBtn=document.getElementById('delete-btn');
const inputEl=document.getElementById('input-el');
const tabBtn=document.getElementById('tab-btn');
let myleads=[];
const ulEl=document.getElementById('ul-el');
const leadsFromLocalStorage=JSON.parse(localStorage.getItem('myleads'));


if(leadsFromLocalStorage){
    myleads=leadsFromLocalStorage;
    render(myleads);
}

function render(leads){
    let listItems="";
    for(let i=0; i< leads.length; i++){ 
    listItems +=`<li><a href="${leads[i]}" target="_blank">${leads[i]}</a></li>`;
    }
    ulEl.innerHTML=listItems;
} 

tabBtn.addEventListener('click',function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myleads.push(tabs[0].url);
        localStorage.setItem('myleads',JSON.stringify(myleads));
        render(myleads);
    });
    
})
inputBtn.addEventListener('click',function(){
    myleads.push(inputEl.value);
    inputEl.value="";
    localStorage.setItem('myleads',JSON.stringify(myleads));
    render(myleads);
    console.log(localStorage.getItem('myleads'));

})
deleteBtn.addEventListener('dblclick',function(){
    localStorage.clear();
    myleads=[];
    render(myleads);
})

