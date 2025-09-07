let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function saveTasks() { localStorage.setItem("tasks", JSON.stringify(tasks)); }

const app = document.getElementById("app");

// Render List
function renderList() {
  app.innerHTML = `<h1>📋 Daftar Tugas</h1><div id="task-list"></div>`;
  const list = document.getElementById("task-list");
  tasks.forEach((t,i) => {
    const tpl = document.getElementById("ta").content.cloneNode(true);
    const el = tpl.querySelector(".task");
    tpl.querySelector(".title").textContent = t.title;
    tpl.querySelector(".note").textContent = t.note;
    tpl.querySelector(".chk-done").checked = t.done;
    if(t.done) el.classList.add("done");

    // badges
    const badges = tpl.querySelector(".badges");
    if(t.priority) {
      const b=document.createElement("span");
      b.className=`badge ${t.priority}`;
      b.textContent=t.priority;
      badges.appendChild(b);
    }

    // events
    tpl.querySelector(".chk-done").addEventListener("change", e=>{
      tasks[i].done=e.target.checked; saveTasks(); renderList();
    });
    tpl.querySelector(".edit").addEventListener("click",()=>renderForm(i));
    tpl.querySelector(".del").addEventListener("click",()=>{
      el.style.transform="translateX(60px)"; el.style.opacity="0";
      setTimeout(()=>{tasks.splice(i,1); saveTasks(); renderList();},300);
    });

    list.appendChild(el);
  });
}

// Render Form
function renderForm(idx=null) {
  const t= idx!==null? tasks[idx]:{title:"",note:"",priority:""};
  app.innerHTML=`
    <h1>➕ Tambah / Edit Tugas</h1>
    <form id="task-form" class="task-form">
      <div>
        <label>Judul</label>
        <input id="title" value="${t.title}" required />
      </div>
      <div>
        <label>Catatan</label>
        <textarea id="note">${t.note||""}</textarea>
      </div>
      <div>
        <label>Prioritas</label>
        <select id="priority">
          <option value="">-</option>
          <option value="high" ${t.priority==="high"?"selected":""}>High</option>
          <option value="medium" ${t.priority==="medium"?"selected":""}>Medium</option>
          <option value="low" ${t.priority==="low"?"selected":""}>Low</option>
        </select>
      </div>
      <button class="btn primary">💾 Simpan</button>
    </form>
  `;
  document.getElementById("task-form").addEventListener("submit", e=>{
    e.preventDefault();
    const newTask={title:title.value,
                   note:note.value,
                   priority:priority.value,
                   done:false};
    if(idx!==null) tasks[idx]=newTask; else tasks.push(newTask);
    saveTasks(); renderList();
  });
}

// Render AI
function renderAI() {
  app.innerHTML=`
    <h1>🤖 Granite AI Helper</h1>
    <div class="ai-box">
      <textarea id="ai-prompt" placeholder="Minta saran Granite..."></textarea>
      <button id="ask-ai" class="btn primary">Kirim</button>
      <div id="ai-output" class="ai-output"></div>
    </div>
  `;
  document.getElementById("ask-ai").addEventListener("click", async ()=>{
    const prompt=document.getElementById("ai-prompt").value.trim();
    if(!prompt) return;
    const out=document.getElementById("ai-output");
    out.textContent="⏳ Meminta Granite...";
    try{
      const res=await fetch("/api/ai",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({prompt})
      });
      const data=await res.json();
      if (Array.isArray(data.output)) {
        out.textContent=data.output.join(" ");
      } else {
        out.textContent=data.output || JSON.stringify(data,null,2);
      }
    }catch(err){
      out.textContent="❌ Error: "+err.message;
    }
  });
}

// Navigation
document.getElementById("nav-list").addEventListener("click",renderList);
document.getElementById("nav-add").addEventListener("click",()=>renderForm());
document.getElementById("nav-ai").addEventListener("click",renderAI);

// Dark mode toggle
document.getElementById("toggle-theme").addEventListener("click",()=>{
  document.body.classList.toggle("dark");
  document.getElementById("toggle-theme").textContent=document.body.classList.contains("dark")?"☀️ Light":"🌙 Dark";
});

// Init
renderList();
