// --- Animated Constellation Background --- (no dependency)
const canvas = document.getElementById('constellation-bg');
function resizeConstellation() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeConstellation(); window.addEventListener('resize', resizeConstellation);

const NODES = 42, POINT_RADIUS = 1.8, LINE_DIST = 150;
const points = [];
for (let i=0; i<NODES; i++)
  points.push({
    x: Math.random()*window.innerWidth,
    y: Math.random()*window.innerHeight,
    vx: (Math.random()-0.5)*.26,
    vy: (Math.random()-0.5)*.26
  });

function drawConstellation() {
  const ctx = canvas.getContext('2d');
  const w = window.innerWidth, h = window.innerHeight;
  ctx.clearRect(0,0,w,h);

  // move points
  for (const p of points) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x<0||p.x>w)  p.vx*=-1, p.x=Math.max(1,Math.min(p.x,w-2));
    if (p.y<0||p.y>h)  p.vy*=-1, p.y=Math.max(1,Math.min(p.y,h-2));
  }

  // draw lines
  for (let i=0; i<NODES; i++) {
    for (let j=i+1; j<NODES; j++) {
      const dx=points[i].x-points[j].x, dy=points[i].y-points[j].y;
      const dist = Math.sqrt(dx*dx+dy*dy);
      if (dist < LINE_DIST) {
        ctx.globalAlpha = (LINE_DIST-dist)/LINE_DIST*0.28 + 0.04;
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[j].x, points[j].y);
        ctx.strokeStyle = ['#10e7e7','#fc50b2','#ffc53a','#43cfff'][(i+j)%4]+"ee";
        ctx.lineWidth = .9;
        ctx.stroke();
      }
    }
  }

  // draw points
  for (const p of points) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, POINT_RADIUS, 0, 2*Math.PI);
    ctx.globalAlpha = .45;
    ctx.fillStyle = "#fff";
    ctx.shadowBlur = 7;
    ctx.shadowColor = "#43cfff";
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  ctx.globalAlpha = 1;
  requestAnimationFrame(drawConstellation);
}
drawConstellation();

// --- Typewriter animated tagline ---
const introLines = [
  "Java developer & problem-solver.",
  "Built with MERN, Python, SQL.",
  "Open source, open mind.",
  "Learning & building daily."
];
let tlIdx=0, tlPos=0, tlDel=false;
function typeIntro(){
  const el=document.getElementById("type-text");
  const str=introLines[tlIdx];
  el.textContent=str.substr(0,tlPos)+(tlPos%2===0?"|":"");
  if(!tlDel){
    if(tlPos<str.length){tlPos++;setTimeout(typeIntro,66);}
    else{tlDel=true;setTimeout(typeIntro,900);}
  }else{
    if(tlPos>0){tlPos--;setTimeout(typeIntro,34);}
    else{tlDel=false;tlIdx=(tlIdx+1)%introLines.length;setTimeout(typeIntro,320);}
  }
}
typeIntro();

// Section fade-ins
function fadeInOnScroll(){document.querySelectorAll(".fade-up").forEach(el=>{const r=el.getBoundingClientRect();if(r.top<window.innerHeight-70)el.classList.add("in-view");});}
window.addEventListener("scroll",fadeInOnScroll);fadeInOnScroll();

// Modals
document.querySelectorAll(".proj-card").forEach(card=>{
  card.addEventListener("click",()=>openModal(card.getAttribute("data-modal")));
  card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openModal(card.getAttribute("data-modal"));}});
});
document.querySelectorAll(".close-modal").forEach(btn=>{btn.onclick=()=>btn.closest(".modal-bg").classList.remove("active");});
window.addEventListener("keydown",e=>{if(e.key==="Escape")document.querySelectorAll(".modal-bg.active").forEach(m=>m.classList.remove("active"));});
document.querySelectorAll(".modal-bg").forEach(modal=>{modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.remove("active");});});
function openModal(id){const m=document.getElementById(id);if(m){m.classList.add("active");m.focus();}}

// Dark mode
document.getElementById("mode-toggle").onclick=()=>document.body.classList.toggle("dark-mode");

// Smooth scroll
document.querySelectorAll('.main-nav .nav-link').forEach(link=>
  link.addEventListener('click',function(e){
    e.preventDefault();
    const t=document.querySelector(this.getAttribute('href'));
    if(t){t.scrollIntoView({behavior:'smooth'});}
  })
);

// Suggestion form

const suggForm = document.getElementById("suggestionForm");

if (suggForm) {
  suggForm.addEventListener("submit", function(e) {
    e.preventDefault(); // prevent page reload
    const formMessage = suggForm.querySelector(".form-message");

    emailjs.sendForm("service_b2wy3gt", "template_18lytao", this)
      .then(() => {
        formMessage.textContent = "Your feedback is appreciated! 🚀";
        suggForm.reset();
      })
      .catch((error) => {
        formMessage.textContent = "Failed to send, please try again!";
        console.error("EmailJS error:", error);
      });
  });
}
