// Shared site helpers. Pages call what they need.
(function(){
 // mark active nav link
 document.addEventListener('DOMContentLoaded',()=>{
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('header.site nav a').forEach(a=>{
   if((a.getAttribute('href')||'')===here) a.classList.add('active');
  });
 });

 // Build a theme legend strip. Pass container selector.
 window.renderThemeLegend = function(sel){
  const el = document.querySelector(sel); if(!el || !window.WG3) return;
  const clusters = {};
  WG3.themes.forEach(t=>{
   if(t.code.length===2) return; // parent rows skipped in strip
   (clusters[t.cluster] = clusters[t.cluster]||[]).push(t);
  });
  // T4 has no leaf, add manually
  let h = '<h3>Theme legend — hover any code for the full definition</h3><div class="rows">';
  Object.keys(clusters).forEach(cl=>{
   clusters[cl].forEach(t=>{
    h += `<div class="row"><b><span data-tip="${esc(t.def)}">${t.code}</span></b><div>${t.name} <small>· ${t.cluster}</small></div></div>`;
   });
  });
  h += '</div>';
  el.innerHTML = h;
 };

 // Build the matrix table
 window.renderMatrix = function(sel){
  const el = document.querySelector(sel); if(!el) return;
  const gapByS = {};
  WG3.gaps.forEach(g=>g.scenarios.forEach(s=>(gapByS[s]=gapByS[s]||[]).push(g.name)));

  // Cluster name -> short CSS key used in class names (c-comm-hd, c-use-sub, etc.)
  const clusterKey = {
   "Communicating":"comm",
   "Use cases":"use",
   "Interaction":"int",
   "Medico-legal":"med"
  };

  // Walk matrixThemes once to build (a) cluster header groups for the top row
  // and (b) the set of column indices that begin a new cluster (for div-left).
  const groups = []; // [{name, key, count}, ...]
  const firstInCluster = new Set();
  let prevCluster = null;
  WG3.matrixThemes.forEach((code,i)=>{
   const t = WG3.themes.find(x=>x.code===code);
   if(t.cluster !== prevCluster){
    groups.push({name:t.cluster, key:clusterKey[t.cluster], count:1});
    firstInCluster.add(i);
    prevCluster = t.cluster;
   } else {
    groups[groups.length-1].count++;
   }
  });

  // THEAD — two rows. Row 1: corners with rowspan=2, cluster names with colspan.
  let h = '<table class="matrix"><thead><tr>';
  h += '<th rowspan="2" class="corner">#</th>';
  h += '<th rowspan="2" class="corner">Scenario</th>';
  groups.forEach(g=>{
   h += `<th colspan="${g.count}" class="c-${g.key}-hd">${g.name}</th>`;
  });
  h += '<th rowspan="2" class="corner">Σ</th>';
  h += '<th rowspan="2" class="corner">Gap?</th>';
  h += '</tr><tr>';

  // Row 2: sub-theme cells with T-code + short label, pale cluster background
  WG3.matrixThemes.forEach((code,i)=>{
   const t = WG3.themes.find(x=>x.code===code);
   const key = clusterKey[t.cluster];
   const divL = (i>0 && firstInCluster.has(i)) ? ' div-left' : '';
   h += `<th class="sub c-${key}-sub${divL}">`;
   h += `<span class="code" data-tip="${esc(WG3.themeTip(code))}">${code}</span>`;
   h += `<span class="lbl">${esc(t.short||'')}</span>`;
   h += '</th>';
  });
  h += '</tr></thead><tbody>';

  // TBODY — score cells pick up the same div-left on cluster boundaries
  WG3.scenarios.forEach(s=>{
   const sum = s.scores.reduce((a,b)=>a+b,0);
   h += `<tr class="row" onclick="showScenarioDetail(${s.id})"><td>${s.id}</td><td><b>${s.name}</b><br><small style="color:#64748b">${s.vig}</small></td>`;
   s.scores.forEach((v,i)=>{
    const divL = (i>0 && firstInCluster.has(i)) ? ' div-left' : '';
    h += `<td class="score s${v}${divL}" data-tip="${esc(WG3.themeTip(WG3.matrixThemes[i]))}">${v||''}</td>`;
   });
   const g = (gapByS[s.id]||[]).map(x=>`<span class="chip gap" data-tip="${esc(x)}">gap</span>`).join('');
   h += `<td><b>${sum}</b></td><td>${g}</td></tr>`;
  });
  h += '</tbody></table>';
  el.innerHTML = h;
 };

 window.showScenarioDetail = function(id){
  const s = WG3.scenarios.find(x=>x.id===id); if(!s) return;
  const rows = s.scores.map((v,i)=>{
   const t = WG3.themes.find(x=>x.code===WG3.matrixThemes[i]);
   return `<div style="display:flex;gap:8px;padding:6px 0;border-bottom:1px solid #e2e8f0"><b style="min-width:36px;color:#1f4e79">${t.code}</b><div style="flex:1"><b>${t.name}</b><br><small style="color:#64748b">${t.def}</small></div><b class="s${v}" style="padding:2px 8px;border-radius:4px">${v}</b></div>`;
  }).join('');
  const dlg = document.getElementById('scnDlg') || (()=>{
   const d = document.createElement('div'); d.id='scnDlg';
   d.style.cssText='position:fixed;inset:0;background:rgba(15,23,42,.5);display:flex;align-items:center;justify-content:center;z-index:100;padding:20px';
   d.onclick=e=>{if(e.target===d)d.remove()};
   document.body.appendChild(d); return d;
  })();
  dlg.innerHTML = `<div style="background:#fff;border-radius:10px;max-width:620px;width:100%;max-height:85vh;overflow:auto;padding:24px;box-shadow:0 20px 40px rgba(0,0,0,.2)">
   <div style="float:right;cursor:pointer;font-size:22px;color:#64748b" onclick="document.getElementById('scnDlg').remove()">×</div>
   <div style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:.06em">Scenario ${s.id}</div>
   <h2 style="margin:4px 0 8px">${s.name}</h2>
   <p style="color:#64748b">${s.vig}</p>
   <h3 style="margin-top:16px;font-size:13px;text-transform:uppercase;color:#64748b;letter-spacing:.06em">Theme mapping</h3>
   ${rows}
  </div>`;
 };

 function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
})();
