// Single source of truth for themes, scenarios, gaps. Used across pages.
window.WG3 = {
 themes: [
  {code:"T1",  name:"Communicating about AI", cluster:"Communicating",
   def:"Competencies for documenting AI involvement and discussing AI with patients, families, and colleagues."},
  {code:"T1a", name:"Documentation of AI", cluster:"Communicating", short:"Documenting",
   def:"How and when to document AI involvement in a patient encounter — what to attest to, what to disclose, what the note should make legible to future clinicians and auditors."},
  {code:"T1b", name:"Risks/benefits with patients", cluster:"Communicating", short:"Patient talk",
   def:"Explaining AI's role, limitations, and benefits to patients, families, and consulting colleagues during real encounters."},

  {code:"T2",  name:"Understanding appropriate use cases", cluster:"Use cases",
   def:"Knowing when AI is beneficial, when it fails, and enough of the mechanism to reason about both."},
  {code:"T2a", name:"When AI is beneficial", cluster:"Use cases", short:"When useful",
   def:"Recognizing the clinical situations, populations, and workflows where a given AI tool adds value."},
  {code:"T2b", name:"Limitations & weaknesses", cluster:"Use cases", short:"Limitations",
   def:"Understanding failure modes — distribution shift, training-data bias, known blind spots, false positives/negatives — and anticipating them at the point of care."},
  {code:"T2c", name:"Under-the-hood mechanisms", cluster:"Use cases", short:"Mechanism",
   def:"Enough conceptual understanding of how the model was built (data, task, outputs, calibration) to reason about when to trust it."},

  {code:"T3",  name:"Interacting with AI clinically", cluster:"Interaction",
   def:"The moment-to-moment skills of using AI tools inside a shift without derailing clinical reasoning."},
  {code:"T3a", name:"Workflow & gestalt synthesis", cluster:"Interaction", short:"Gestalt use",
   def:"Integrating AI output into clinical gestalt and workflow without losing situational awareness or over-anchoring."},
  {code:"T3b", name:"Iterative improvement", cluster:"Interaction", short:"Feedback loop",
   def:"Giving feedback to tools, reporting failures, and contributing to post-deployment monitoring loops."},
  {code:"T3c", name:"Evaluating evidence/output", cluster:"Interaction", short:"Appraising output",
   def:"Critically appraising AI output against the evidence base, the patient in front of you, and the local validation data."},
  {code:"T3d", name:"Prompt engineering", cluster:"Interaction", short:"Prompting",
   def:"For generative tools, crafting inputs that produce reliable, clinically usable output."},

  {code:"T4",  name:"Medico-legal risk & governance", cluster:"Medico-legal", short:"Governance",
   def:"Liability, consent, governance, and the regulatory surface around using AI in patient care."}
 ],
 // the 10 subtheme columns used in the matrix (leaves only)
 matrixThemes: ["T1a","T1b","T2a","T2b","T2c","T3a","T3b","T3c","T3d","T4"],

 scenarios: [
  {id:1, name:"AI HPI Summarization", vig:"EHR auto-summarizes PMH when opening chart on critically ill patient.", scores:[2,1,2,3,1,3,0,3,0,2]},
  {id:2, name:"AI Autocompletion", vig:"AI suggests sentence completions while writing notes.", scores:[3,0,2,3,1,3,1,2,1,3]},
  {id:3, name:"Insurance AI text extraction", vig:"Claim denied because insurance AI didn't extract level-5 keywords from your note.", scores:[3,0,1,2,1,1,0,1,0,3]},
  {id:4, name:"EKG reads 'Brugada'", vig:"AI EKG interpretation flags Brugada syndrome mid-shift.", scores:[1,1,2,3,2,3,0,3,0,2]},
  {id:5, name:"Transcriptome PE risk alert", vig:"Stroke alert; AI flags high PE risk based on transcriptomic data.", scores:[2,2,1,3,3,2,0,3,0,3]},
  {id:6, name:"Stroke MCA localization", vig:"AI predicts right MCA involvement on stroke alert.", scores:[1,2,3,2,2,3,0,3,0,1]},
  {id:7, name:"Delirium risk popup", vig:"EMR warns elderly UTI admit is high risk for hospital delirium.", scores:[2,2,2,3,1,3,0,2,0,2]},
  {id:8, name:"Paracentesis harm prediction", vig:"EHR flags paracentesis as likely to harm this patient.", scores:[2,3,2,3,1,3,0,3,0,3]},
  {id:9, name:"Apple Watch palpitations data", vig:"AI surfaces wearable HR data during palpitations workup.", scores:[1,2,3,2,1,2,0,2,0,1]},
  {id:10,name:"CXR PE highlight", vig:"AI highlights region of CXR associated with PE.", scores:[1,1,3,2,2,3,0,3,0,1]},
  {id:11,name:"EHR PE differential prompt", vig:"EHR unobtrusively suggests PE on differential while writing HPI.", scores:[1,1,3,2,1,3,1,2,1,1]},
  {id:12,name:"Mortality prediction alert", vig:"AI predicts patient likely to die this admission.", scores:[2,3,1,3,2,3,0,3,0,3]},
  {id:13,name:"Prehospital surgical prediction", vig:"EMS asks to divert +30 min based on AI surgical-need prediction.", scores:[2,2,2,3,1,2,0,2,0,3]},
  {id:14,name:"AI ESI triage scoring", vig:"ESI prediction model assists triage; you choose between L2 vs L3 patient.", scores:[2,1,2,3,2,3,0,3,0,3]}
 ],

 gaps: [
  {name:"Alert fatigue & cognitive burden", scenarios:[2,7,11], why:"Volume and timing of AI prompts; when nudges become noise and the clinician stops attending to them."},
  {name:"Patient-generated data & wearables", scenarios:[9], why:"Integrating consumer biometrics into clinical reasoning and deciding what to act on."},
  {name:"Goals-of-care & end-of-life ethics", scenarios:[12], why:"How AI mortality predictions inform GOC conversations — and when they shouldn't."},
  {name:"Systems-level routing & network effects", scenarios:[13], why:"Prehospital and network-level AI changing patient flow and destination decisions."},
  {name:"Interprofessional team-based AI", scenarios:[14], why:"Nurse-clinician shared use of AI tools (triage, handoff) as a team competency, not an individual one."},
  {name:"Cognitive autonomy & anchoring bias", scenarios:[2,11], why:"Avoiding deskilling, automation complacency, and AI-induced anchoring."},
  {name:"Novel data modalities (genomics, omics)", scenarios:[5], why:"Trusting AI on data modalities clinicians cannot directly inspect or interpret."}
 ],

 milestones: [
  {date:'2025-05-15', done:true,
   label:'May 2025', title:'SAEM25 nominal group session',
   desc:'One-hour nominal group exercise produced four themes and ten subthemes on what EM physicians need to know about AI.'},
  {date:'2026-04-06', done:true,
   label:'Apr 6', title:'WG3 leadership kickoff',
   desc:'Scenarios-first approach endorsed. 14 clinical scenarios mapped against SAEM25 themes.'},
  {date:'2026-04-08', done:true,
   label:'Apr 8', title:'Straw-man framework published',
   desc:'Scenarios × themes matrix and working site shared with the group for review.'},
  {date:'2026-04-15',
   label:'Apr 15', title:'Full group meeting',
   desc:'All five working groups. Conference-wide alignment. WG3 reviews proposed consensus process.',
   process:true},
  {date:'2026-04-16', end:'2026-04-23',
   label:'Apr 16–23', title:'Asynchronous consensus survey',
   desc:'Structured survey: scenario validation, theme assessment, persona differentiation, open contribution. ~30 min per participant.',
   process:true},
  {date:'2026-04-18',
   label:'Apr 18', title:'Evidence briefs due · recruitment complete',
   desc:'Literature briefs finalized. WG3 membership finalized.'},
  {date:'2026-04-19', end:'2026-04-20',
   label:'Apr 19–20', title:'WG kickoff meetings',
   desc:'Individual working group kickoff sessions.'},
  {date:'2026-04-24', end:'2026-04-25',
   label:'Apr 24–25', title:'Synchronous survey debrief',
   desc:'WG3-only call. Review survey results, resolve disagreements, finalize framework structure.',
   process:true},
  {date:'2026-04-26', end:'2026-05-05',
   label:'Apr 26 – May 5', title:'Revised framework',
   desc:'Updated framework reflecting validated themes, scores, and persona weighting. 2-page summary drafted.',
   process:true},
  {date:'2026-05-12',
   label:'May 12', title:'2-page summaries due',
   desc:'WG3 deliverable for the conference program book.',
   process:true},
  {date:'2026-05-21',
   label:'May 21', title:'Conference day — Atlanta',
   desc:'Carl Preiksaitis leads WG3 in person. Live refinement of a pre-validated framework.',
   process:true},
  {date:'2026-06-01', end:'2026-07-31',
   label:'Jun–Jul', title:'Manuscript drafting',
   desc:'AEM Education & Training manuscript on AI competency gaps and AEM main proceedings contribution.'},
  {date:'2026-08-31',
   label:'Aug 31', title:'Proceedings submitted',
   desc:'AEM main proceedings and AEM E&T educational gaps manuscript due.'}
 ],

 // helper: build a lookup for tooltips on theme codes
 themeTip: function(code){
  const t = this.themes.find(x=>x.code===code);
  return t ? `${t.name} — ${t.def}` : code;
 }
};
