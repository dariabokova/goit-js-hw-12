import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */document.querySelector(".form").addEventListener("submit",e=>{e.preventDefault();const s=Number(e.target.elements.delay.value),r=e.target.elements.state.value;i(s,r).then(t=>{iziToast.success({title:"Success",message:`✅ Fulfilled promise in ${t}ms`})}).catch(t=>{iziToast.error({title:"Error",message:`❌ Rejected promise in ${t}ms`})})});function i(e,s){return new Promise((r,t)=>{setTimeout(()=>{s==="fulfilled"?r(e):t(e)},e)})}
//# sourceMappingURL=2-snackbar.js.map
