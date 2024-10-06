import{i as u,S as d}from"./assets/vendor-5ObWk2rO.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const f="46360280-37ac22277a0bce1d099a81efa",m="https://pixabay.com/api/",p=t=>fetch(`${m}?key=${f}&q=${encodeURIComponent(t)}&image_type=photo&orientation=horizontal&safesearch=true`).then(r=>{if(!r.ok)throw new Error(`Error fetching images: ${r.status} ${r.statusText}`);return r.json()}).then(r=>r.hits),y=t=>{const r=document.querySelector(".gallery");r.innerHTML=t.map(({webformatURL:s,largeImageURL:a,tags:e,likes:o,views:n,comments:l,downloads:c})=>`
            <li class="gallery-item">
                <a href="${a}" class="gallery-link">
                    <img src="${s}" alt="${e}" class="gallery-image" />
                </a>
                <div class="info">
                    <p class="info-item"><span>Likes</span> ${o}</p>
                    <p class="info-item"><span>Views</span> ${n}</p>
                    <p class="info-item"><span>Comments</span> ${l}</p>
                    <p class="info-item"><span>Downloads</span> ${c}</p>
                </div>
            </li>
        `).join("")},i=t=>{u.error({title:"Error",message:t})},h=()=>{const t=document.querySelector(".loader");t.innerHTML='<div class="spinner"></div>',t.style.display="flex"},g=()=>{const t=document.querySelector(".loader");t.style.display="none"},L=document.querySelector(".search-form"),$=document.querySelector(".gallery");let q=new d(".gallery a");L.addEventListener("submit",t=>{t.preventDefault();const r=t.target.elements.query.value.trim();if(!r){i("Please enter a search query.");return}$.innerHTML="",h(),p(r).then(s=>{if(s.length===0){i("Sorry, there are no images matching your search query. Please try again!");return}y(s),q.refresh()}).catch(s=>{i(`Error fetching images: ${s.message}`)}).finally(()=>{g()})});
//# sourceMappingURL=index.js.map
