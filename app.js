const STORAGE_KEY='eldyn-project-v3';
const STORAGE_BACKUP_KEY='eldyn-project-v3-safe-backup';
const ex=(id,name,sets,reps,weight,target,instructions,search)=>({id,name,sets,reps,weight,done:false,target,instructions,youtube:'',search});
const weeklyPlan={
  0:{name:'Recovery & Mobility',exercises:[ex('sun-walk','Recovery Walk',1,30,0,'Cardiovascular recovery','Walk at an easy pace. Keep your breathing relaxed.','recovery walk workout'),ex('sun-mobility','Full Body Mobility',1,15,0,'Hips · Shoulders · Spine','Move slowly through a comfortable range. Do not force painful positions.','15 minute full body mobility')]},
  1:{name:'Lower Body + Core',exercises:[ex('mon-squat','Barbell Squat',4,8,40,'Quadriceps · Glutes · Core','Brace your core, keep the whole foot grounded, and drive up with control.','barbell squat proper form'),ex('mon-rdl','Romanian Deadlift',4,10,30,'Hamstrings · Glutes · Back','Push the hips back with a neutral spine and keep the bar close to your legs.','romanian deadlift proper form'),ex('mon-lunge','Reverse Lunge',3,10,0,'Glutes · Quadriceps','Step back softly and keep the front knee tracking over the foot.','reverse lunge proper form'),ex('mon-hip','Hip Thrust',4,12,40,'Glutes · Hamstrings','Tuck the ribs, drive through the heels, and pause at full hip extension.','barbell hip thrust proper form'),ex('mon-plank','Plank',3,45,0,'Core · Shoulders','Keep a straight line from head to heels and breathe steadily.','plank proper form')]},
  2:{name:'Upper Body Push',exercises:[ex('tue-bench','Bench Press',4,8,20,'Chest · Triceps · Shoulders','Keep shoulder blades set, feet planted, and lower the bar with control.','bench press proper form'),ex('tue-press','Dumbbell Shoulder Press',3,10,8,'Shoulders · Triceps','Keep ribs down and press without shrugging.','dumbbell shoulder press form'),ex('tue-incline','Incline Dumbbell Press',3,10,8,'Upper Chest · Triceps','Use a low incline and keep wrists stacked over elbows.','incline dumbbell press form'),ex('tue-raise','Lateral Raise',3,15,4,'Side Deltoids','Lift with soft elbows and stop near shoulder height.','dumbbell lateral raise proper form'),ex('tue-triceps','Cable Triceps Pushdown',3,12,15,'Triceps','Keep elbows beside your torso and fully extend without swinging.','cable triceps pushdown form')]},
  3:{name:'Run + Mobility',exercises:[ex('wed-run','Easy Run',1,30,0,'Cardiovascular endurance','Stay at a conversational pace and finish with easy walking.','easy running form beginner'),ex('wed-strides','Running Strides',6,20,0,'Running technique · Speed','Accelerate smoothly, stay relaxed, and walk back to recover.','running strides technique'),ex('wed-mobility','Hip & Ankle Mobility',1,12,0,'Hips · Ankles','Use controlled movements and stay within a pain-free range.','hip ankle mobility routine')]},
  4:{name:'Lower Body Strength',exercises:[ex('thu-deadlift','Deadlift',4,6,40,'Hamstrings · Glutes · Back','Brace before lifting, keep the bar close, and stand tall without leaning back.','deadlift proper form'),ex('thu-goblet','Goblet Squat',3,12,12,'Quadriceps · Glutes · Core','Hold the weight close and sit down between your hips.','goblet squat proper form'),ex('thu-curl','Leg Curl',3,12,20,'Hamstrings','Keep hips down and control both phases of the movement.','seated leg curl proper form'),ex('thu-calf','Standing Calf Raise',4,15,0,'Calves','Use a full range and pause at the top.','standing calf raise proper form'),ex('thu-deadbug','Dead Bug',3,10,0,'Deep Core','Keep the lower back gently pressed down while extending opposite limbs.','dead bug exercise proper form')]},
  5:{name:'Upper Body Pull',exercises:[ex('fri-pulldown','Lat Pulldown',4,10,25,'Lats · Biceps','Pull elbows toward your ribs without leaning far back.','lat pulldown proper form'),ex('fri-row','Seated Cable Row',3,12,25,'Lats · Rhomboids · Biceps','Keep the torso stable, pull elbows back, and return under control.','seated cable row proper form'),ex('fri-face','Face Pull',3,15,10,'Rear Delts · Upper Back','Pull toward eye level and rotate the hands apart.','cable face pull proper form'),ex('fri-curl','Dumbbell Curl',3,12,6,'Biceps','Keep elbows still and avoid swinging.','dumbbell biceps curl form'),ex('fri-carry','Farmer Carry',4,30,12,'Grip · Core · Traps','Walk tall with short controlled steps and steady breathing.','farmer carry proper form')]},
  6:{name:'HYROX / Full Body',exercises:[ex('sat-row','Row Erg',1,1000,0,'Full Body · Cardio','Drive with the legs first, then lean and pull. Recover in reverse order.','rowing machine proper technique'),ex('sat-burpee','Burpee Broad Jump',4,10,0,'Full Body · Cardio','Land softly, keep a steady rhythm, and scale the jump when needed.','burpee broad jump hyrox technique'),ex('sat-carry','Farmer Carry',4,50,16,'Grip · Core · Legs','Keep shoulders down and walk with controlled steps.','farmer carry hyrox technique'),ex('sat-lunge','Walking Lunge',4,20,0,'Glutes · Quadriceps','Stay tall and let the back knee move toward the floor.','walking lunge proper form'),ex('sat-wallball','Wall Ball',4,15,6,'Legs · Shoulders · Cardio','Squat with the ball at chest height and use leg drive to throw.','wall ball proper form')]}
};
const hyroxPlans={
  full:{name:'HYROX Full Simulation',exercises:[
    ex('hy-full-run1','Run 1 km',1,1,0,'Cardio','Run at a controlled race pace.','hyrox running pace'),
    ex('hy-full-ski','SkiErg 1,000 m',1,1000,0,'Full Body · Cardio','Drive through the lats and hips while keeping a steady rhythm.','hyrox skierg technique'),
    ex('hy-full-run2','Run 1 km',1,1,0,'Cardio','Settle back into your running rhythm.','hyrox running technique'),
    ex('hy-full-push','Sled Push 50 m',4,12.5,0,'Legs · Core','Keep the torso braced and drive through short powerful steps.','hyrox sled push technique'),
    ex('hy-full-run3','Run 1 km',1,1,0,'Cardio','Stay relaxed through the shoulders.','hyrox running pace'),
    ex('hy-full-pull','Sled Pull 50 m',4,12.5,0,'Back · Legs · Grip','Keep tension on the rope and walk back under control.','hyrox sled pull technique'),
    ex('hy-full-run4','Run 1 km',1,1,0,'Cardio','Use even pacing.','hyrox running pace'),
    ex('hy-full-burpee','Burpee Broad Jump 80 m',8,10,0,'Full Body · Cardio','Keep a sustainable rhythm and land softly.','hyrox burpee broad jump technique'),
    ex('hy-full-run5','Run 1 km',1,1,0,'Cardio','Reset posture and breathing.','hyrox running pace'),
    ex('hy-full-row','Row 1,000 m',1,1000,0,'Full Body · Cardio','Drive with the legs first, then finish with the arms.','hyrox rowing technique'),
    ex('hy-full-run6','Run 1 km',1,1,0,'Cardio','Hold a consistent effort.','hyrox running pace'),
    ex('hy-full-carry','Farmers Carry 200 m',4,50,16,'Grip · Core · Legs','Walk tall with short, controlled steps.','hyrox farmers carry technique'),
    ex('hy-full-run7','Run 1 km',1,1,0,'Cardio','Keep cadence steady.','hyrox running pace'),
    ex('hy-full-lunge','Sandbag Lunges 100 m',5,20,10,'Legs · Core','Stay tall and place the knee softly.','hyrox sandbag lunges technique'),
    ex('hy-full-run8','Run 1 km',1,1,0,'Cardio','Build toward the final station.','hyrox running pace'),
    ex('hy-full-wall','Wall Balls 100 reps',10,10,6,'Legs · Shoulders · Cardio','Use the legs to drive the ball and keep a steady set plan.','hyrox wall balls technique')
  ]},
  half:{name:'HYROX Half Session',exercises:[
    ex('hy-half-run1','Run 1 km',1,1,0,'Cardio','Controlled effort.','hyrox running pace'),ex('hy-half-ski','SkiErg 500 m',1,500,0,'Full Body · Cardio','Keep a steady rhythm.','hyrox skierg technique'),
    ex('hy-half-run2','Run 1 km',1,1,0,'Cardio','Relax the shoulders.','hyrox running pace'),ex('hy-half-row','Row 500 m',1,500,0,'Full Body · Cardio','Drive with the legs.','hyrox rowing technique'),
    ex('hy-half-run3','Run 1 km',1,1,0,'Cardio','Even pacing.','hyrox running pace'),ex('hy-half-carry','Farmers Carry 100 m',2,50,16,'Grip · Core','Walk tall.','hyrox farmers carry technique'),
    ex('hy-half-run4','Run 1 km',1,1,0,'Cardio','Finish controlled.','hyrox running pace'),ex('hy-half-wall','Wall Balls 50 reps',5,10,6,'Legs · Shoulders','Break into manageable sets.','hyrox wall balls technique')
  ]},
  beginner:{name:'HYROX Beginner',exercises:[
    ex('hy-beg-run1','Easy Run 800 m',1,800,0,'Cardio','Use a conversational pace.','easy run technique'),ex('hy-beg-ski','SkiErg 400 m',1,400,0,'Full Body · Cardio','Smooth, controlled pulls.','hyrox skierg technique'),
    ex('hy-beg-row','Row 400 m',1,400,0,'Full Body · Cardio','Keep stroke rate comfortable.','rowing technique beginner'),ex('hy-beg-carry','Farmers Carry 60 m',2,30,8,'Grip · Core','Use a manageable load.','farmers carry technique'),
    ex('hy-beg-lunge','Walking Lunges 40 m',2,20,0,'Legs · Core','Bodyweight is fine.','walking lunge technique'),ex('hy-beg-wall','Wall Balls 30 reps',3,10,4,'Legs · Shoulders','Move steadily with full control.','wall balls beginner')
  ]}
};

const workoutCatalog={
  strength:{label:'Strength',icon:'💪',plans:{
    lower:{name:'Lower Body Strength',meta:'55–70 min · Intermediate · Barbell / Dumbbell',exercises:[ex('wb-l-squat','Back Squat',4,8,35,'Quads · Glutes · Core','Brace, keep feet grounded, and drive up with control.','back squat form'),ex('wb-l-rdl','Romanian Deadlift',4,10,30,'Hamstrings · Glutes','Push hips back and keep the weight close.','romanian deadlift form'),ex('wb-l-lunge','Reverse Lunge',3,10,8,'Glutes · Quads','Step back softly and keep the front knee aligned.','reverse lunge form'),ex('wb-l-hip','Hip Thrust',4,12,35,'Glutes','Pause at full hip extension.','hip thrust form')]},
    upper:{name:'Upper Body Strength',meta:'50–65 min · Intermediate · Bench / Dumbbell',exercises:[ex('wb-u-bench','Bench Press',4,8,20,'Chest · Triceps','Keep shoulder blades set and lower with control.','bench press form'),ex('wb-u-row','Seated Cable Row',4,10,25,'Back · Biceps','Pull elbows toward the ribs.','cable row form'),ex('wb-u-press','Shoulder Press',3,10,8,'Shoulders · Triceps','Keep ribs down while pressing.','shoulder press form'),ex('wb-u-pull','Lat Pulldown',3,12,25,'Lats · Biceps','Avoid leaning too far back.','lat pulldown form')]},
    fullbody:{name:'Full Body Strength',meta:'60 min · Intermediate · Full gym',exercises:[ex('wb-f-dead','Deadlift',4,6,40,'Posterior chain','Brace and keep the bar close.','deadlift form'),ex('wb-f-goblet','Goblet Squat',3,12,12,'Legs · Core','Sit between the hips.','goblet squat form'),ex('wb-f-push','Dumbbell Bench Press',3,10,8,'Chest · Triceps','Control the lowering phase.','dumbbell bench press form'),ex('wb-f-row','One-arm Row',3,10,10,'Back · Biceps','Keep hips square.','one arm dumbbell row form'),ex('wb-f-carry','Farmer Carry',4,30,14,'Grip · Core','Walk tall with controlled steps.','farmer carry form')]},
    glutes:{name:'Glutes & Core',meta:'45–55 min · All levels · Bands / Dumbbell',exercises:[ex('wb-g-hip','Hip Thrust',4,12,30,'Glutes','Pause and squeeze at the top.','hip thrust form'),ex('wb-g-bulgarian','Bulgarian Split Squat',3,10,8,'Glutes · Quads','Keep the front foot grounded.','bulgarian split squat form'),ex('wb-g-abduct','Band Abduction',3,20,0,'Glute medius','Move with control.','band hip abduction'),ex('wb-g-deadbug','Dead Bug',3,10,0,'Core','Keep lower back gently pressed down.','dead bug form')]},
    push:{name:'Push Day',meta:'45–60 min · Intermediate · Chest / Shoulder',exercises:[ex('wb-p-bench','Bench Press',4,8,20,'Chest · Triceps','Stable shoulder blades.','bench press form'),ex('wb-p-incline','Incline Dumbbell Press',3,10,8,'Upper chest','Use a low incline.','incline dumbbell press'),ex('wb-p-shoulder','Shoulder Press',3,10,8,'Shoulders','Avoid shrugging.','shoulder press form'),ex('wb-p-tri','Triceps Pushdown',3,12,15,'Triceps','Keep elbows fixed.','triceps pushdown')]},
    pull:{name:'Pull Day',meta:'45–60 min · Intermediate · Back / Biceps',exercises:[ex('wb-pl-pull','Lat Pulldown',4,10,25,'Lats · Biceps','Pull elbows down.','lat pulldown form'),ex('wb-pl-row','Cable Row',4,10,25,'Back · Biceps','Keep torso stable.','cable row form'),ex('wb-pl-face','Face Pull',3,15,10,'Rear delts','Pull toward eye level.','face pull form'),ex('wb-pl-curl','Dumbbell Curl',3,12,6,'Biceps','Avoid swinging.','dumbbell curl form')]}
  }},
  running:{label:'Running',icon:'🏃',plans:{
    easy:{name:'Easy Run',meta:'30–45 min · Easy · Conversational pace',exercises:[ex('wb-r-easy','Easy Run',1,35,0,'Aerobic base','Run at a conversational pace.','easy run training')]},
    recovery:{name:'Recovery Run',meta:'20–30 min · Very easy · Low impact',exercises:[ex('wb-r-rec','Recovery Run',1,25,0,'Recovery','Keep effort very light and relaxed.','recovery run')]},
    tempo:{name:'Tempo Run',meta:'40–50 min · Hard · Threshold',exercises:[ex('wb-r-warm','Warm-up Jog',1,10,0,'Warm-up','Easy pace.','running warm up'),ex('wb-r-tempo','Tempo Run',1,20,0,'Threshold','Comfortably hard, even pace.','tempo run workout'),ex('wb-r-cool','Cool-down Jog',1,10,0,'Recovery','Slow down gradually.','running cool down')]},
    interval:{name:'Interval Run',meta:'45 min · Hard · Speed',exercises:[ex('wb-r-iwarm','Warm-up',1,12,0,'Warm-up','Easy jog plus drills.','interval warm up'),ex('wb-r-int','400 m Intervals',8,400,0,'Speed','Run fast, then recover 90 seconds.','400m interval workout'),ex('wb-r-icool','Cool-down',1,10,0,'Recovery','Easy jog.','running cool down')]},
    long:{name:'Long Run',meta:'60–90 min · Moderate · Endurance',exercises:[ex('wb-r-long','Long Run',1,75,0,'Endurance','Use a sustainable easy-to-moderate pace.','long run training')]},
    hills:{name:'Hill Run',meta:'40 min · Hard · Strength endurance',exercises:[ex('wb-r-hwarm','Warm-up',1,12,0,'Warm-up','Easy jog.','hill running warmup'),ex('wb-r-hill','Hill Repeats',8,45,0,'Power · Cardio','Run uphill strongly, walk down.','hill repeats workout'),ex('wb-r-hcool','Cool-down',1,10,0,'Recovery','Easy jog.','running cool down')]}
  }},
  hyrox:{label:'HYROX',icon:'🔥',plans:{full:{...hyroxPlans.full,meta:'75–100 min · Advanced · Full simulation'},half:{...hyroxPlans.half,meta:'45–60 min · Intermediate · 4 stations'},beginner:{...hyroxPlans.beginner,meta:'35–45 min · Beginner · Reduced volume'},strength:{name:'HYROX Strength Focus',meta:'50–65 min · Intermediate · Sled / Carry',exercises:[ex('wb-hs-push','Sled Push',5,20,0,'Legs · Core','Short powerful steps.','hyrox sled push'),ex('wb-hs-pull','Sled Pull',5,20,0,'Back · Grip','Maintain rope tension.','hyrox sled pull'),ex('wb-hs-carry','Farmers Carry',4,50,16,'Grip · Core','Walk tall.','hyrox farmers carry'),ex('wb-hs-lunge','Sandbag Lunges',4,20,10,'Legs · Core','Stay upright.','hyrox lunges'),ex('wb-hs-wall','Wall Balls',5,15,6,'Legs · Shoulders','Steady sets.','hyrox wall balls')]},engine:{name:'HYROX Engine Focus',meta:'45–60 min · Hard · Run / Erg',exercises:[ex('wb-he-run','Run 1 km',4,1,0,'Cardio','Steady race pace.','hyrox running'),ex('wb-he-ski','SkiErg 750 m',2,750,0,'Cardio','Smooth rhythm.','hyrox skierg'),ex('wb-he-row','Row 750 m',2,750,0,'Cardio','Strong leg drive.','hyrox rowing')]}}
  },
  conditioning:{label:'Conditioning',icon:'⚡',plans:{
    metcon:{name:'Full Body Metcon',meta:'30–40 min · Hard · Full body',exercises:[ex('wb-c-thr','Dumbbell Thruster',5,10,8,'Full body','Drive through legs.','dumbbell thruster'),ex('wb-c-row','Row',5,250,0,'Cardio','Powerful strokes.','rowing technique'),ex('wb-c-burpee','Burpees',5,10,0,'Full body','Move steadily.','burpee form')]},
    kettlebell:{name:'Kettlebell Conditioning',meta:'30–45 min · Intermediate · Kettlebell',exercises:[ex('wb-k-swing','Kettlebell Swing',5,15,12,'Hips · Cardio','Hinge, do not squat.','kettlebell swing'),ex('wb-k-goblet','Goblet Squat',4,12,12,'Legs · Core','Keep chest tall.','goblet squat'),ex('wb-k-carry','Suitcase Carry',4,30,12,'Core · Grip','Avoid leaning.','suitcase carry')]},
    bodyweight:{name:'Bodyweight Circuit',meta:'25–35 min · All levels · No equipment',exercises:[ex('wb-bw-squat','Air Squat',4,20,0,'Legs','Control depth.','air squat'),ex('wb-bw-push','Push-up',4,10,0,'Chest · Core','Keep body aligned.','push up form'),ex('wb-bw-mount','Mountain Climbers',4,30,0,'Core · Cardio','Keep hips steady.','mountain climber form'),ex('wb-bw-plank','Plank',4,40,0,'Core','Breathe steadily.','plank form')]},
    rowSki:{name:'Row & SkiErg',meta:'35–45 min · Hard · Erg machines',exercises:[ex('wb-rs-row','Row 500 m',5,500,0,'Cardio','Consistent split.','rowing technique'),ex('wb-rs-ski','SkiErg 500 m',5,500,0,'Cardio','Relax the shoulders.','skierg technique')]}
  }},
  recovery:{label:'Recovery',icon:'🧘',plans:{
    mobility:{name:'Full Body Mobility',meta:'20–30 min · Easy · Recovery',exercises:[ex('wb-rec-mob','Full Body Mobility',1,25,0,'Hips · Shoulders · Spine','Move slowly in a pain-free range.','full body mobility')]},
    stretch:{name:'Stretching',meta:'15–25 min · Easy · Flexibility',exercises:[ex('wb-rec-st','Full Body Stretch',1,20,0,'Flexibility','Hold gentle stretches and breathe.','full body stretching')]},
    active:{name:'Active Recovery',meta:'30–40 min · Very easy · Walk / Bike',exercises:[ex('wb-rec-walk','Recovery Walk',1,35,0,'Recovery','Easy conversational effort.','recovery walk')]},
    rest:{name:'Rest Day',meta:'Rest · Hydration · Sleep',exercises:[]}
  }}
};
function workoutPlanByKey(key){const [category,plan]=String(key||'').split(':');return workoutCatalog[category]?.plans?.[plan]||null}
function yesterdayRecommendation(){const y=getLog(shiftDate(activeDate,-1)),name=(y.planName||'').toLowerCase();if(name.includes('hyrox')||name.includes('interval')||name.includes('metcon'))return 'recovery:mobility';if(name.includes('lower'))return 'strength:upper';if(name.includes('upper'))return 'running:easy';return 'strength:fullbody'}
const defaults={runs:[],settings:{name:'Ellen',sex:'female',age:37,height:160,currentWeight:78,currentBodyFat:'',goalWeight:74.5,goalMode:'fatloss',activity:1.55,mealCount:4,theme:'performance',language:'ko',waterGoal:2500,sleepGoal:7.5,proteinGoal:125,calorieGoal:1650,carbGoal:165,fatGoal:55},logs:{},body:[],lastCelebrated:{}};
const APP_TIME_ZONE='Asia/Seoul';
let state=loadState(),runSession=null,runTimer=null,runWatchId=null,runWakeLock=null,activeDate=todayKey(),selectedDate=todayKey(),calendarCursor=new Date(),editingIndex=null,deferredPrompt=null,supabaseClient=null,currentUser=null,cloudHydrated=false;
function zonedDateKey(value=new Date()){
  const parts=new Intl.DateTimeFormat('en-US',{timeZone:APP_TIME_ZONE,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(value);
  const pick=t=>parts.find(x=>x.type===t)?.value;
  return `${pick('year')}-${pick('month')}-${pick('day')}`;
}
function todayKey(){return zonedDateKey(new Date())}
function clone(v){return JSON.parse(JSON.stringify(v))}
function dateFromKey(k){const [y,m,d]=String(k).split('-').map(Number);return new Date(y,m-1,d,12,0,0,0)}
function keyFromDate(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
function shiftDate(k,n){const d=dateFromKey(k);d.setDate(d.getDate()+n);return keyFromDate(d)}
function isFutureDateKey(k){return String(k)>todayKey()}
function hasMeaningfulMealData(plan){return (Array.isArray(plan)?plan:[]).some(m=>m?.done||String(m?.customText||'').trim()||(Array.isArray(m?.foodItems)&&m.foodItems.length>0))}
function isMeaningfulLog(log){
  if(!log||typeof log!=='object')return false;
  if((Array.isArray(log.runs)&&log.runs.length)||hasMeaningfulMealData(log.mealPlan))return true;
  if(String(log.memo||'').trim()||(+log.water||0)>0||(+log.sleep||0)>0||(+log.calories||0)>0||(+log.protein||0)>0||(+log.carbs||0)>0||(+log.fat||0)>0)return true;
  if(Object.values(log.priorities||{}).some(Boolean))return true;
  if((Array.isArray(log.exercises)&&log.exercises.some(x=>x?.done))||(!['weekly',undefined,null].includes(log.planSource)))return true;
  return false;
}
function isFuturePlaceholder(date,log){return isFutureDateKey(date)&&!isMeaningfulLog(log)}
function stateTimestamp(value){const times=Object.values(value?.logs||{}).map(x=>Date.parse(x?.updatedAt||0)||0);return Math.max(0,...times)}
function loadState(){try{const candidates=[localStorage.getItem(STORAGE_KEY),localStorage.getItem(STORAGE_BACKUP_KEY),localStorage.getItem('ellens-project-v2'),localStorage.getItem('ellens-project-v1')].filter(Boolean).map(raw=>JSON.parse(raw));const parsed=candidates.sort((a,b)=>stateTimestamp(b)-stateTimestamp(a))[0]||{};return {...clone(defaults),...parsed,settings:{...clone(defaults).settings,...(parsed.settings||{})}}}catch{return clone(defaults)}}
function saveState(){const serialised=JSON.stringify(state);localStorage.setItem(STORAGE_KEY,serialised);localStorage.setItem(STORAGE_BACKUP_KEY,serialised);scheduleCloudSync()}
function markLogChanged(date=activeDate){const log=getLog(date);log.updatedAt=new Date().toISOString();saveState();return log}
async function saveDailyLogNow(date=activeDate,{verify=true}={}){if(!supabaseClient||!currentUser||!cloudHydrated)return false;const local=state.logs[date];if(!local||isFuturePlaceholder(date,local))return false;syncStatus.textContent='Saving meal…';for(let attempt=0;attempt<2;attempt++){const {data:remoteRows,error:readError}=await supabaseClient.from('daily_logs').select('payload,updated_at').eq('user_id',currentUser.id).eq('date',date).limit(1);if(readError)continue;const remote=remoteRows?.[0];const merged=mergeDailyLog(local,remote?.payload||{},remote?.updated_at);const {error}=await supabaseClient.from('daily_logs').upsert({user_id:currentUser.id,date,payload:merged,updated_at:merged.updatedAt},{onConflict:'user_id,date'});if(error)continue;state.logs[date]=merged;const serialised=JSON.stringify(state);localStorage.setItem(STORAGE_KEY,serialised);localStorage.setItem(STORAGE_BACKUP_KEY,serialised);if(!verify){syncStatus.textContent='Saved to cloud.';return true}const {data:check,error:checkError}=await supabaseClient.from('daily_logs').select('payload').eq('user_id',currentUser.id).eq('date',date).limit(1);const saved=parsePayload(check?.[0]?.payload);if(!checkError&&mealPlansEquivalent(merged.mealPlan,saved.mealPlan)){syncStatus.textContent='✓ Meal saved to cloud';return true}}syncStatus.textContent='Meal save pending — tap Sync';return false}
function mealPlansEquivalent(a,b){const clean=v=>(Array.isArray(v)?v:[]).map(m=>({key:m?.key||'',done:!!m?.done,customText:m?.customText||'',foodItems:(Array.isArray(m?.foodItems)?m.foodItems:[]).map(x=>({name:x?.name||'',amount:+x?.amount||0,unit:x?.unit||'',kcal:+x?.kcal||0,protein:+x?.protein||0,carbs:+x?.carbs||0,fat:+x?.fat||0}))}));return JSON.stringify(clean(a))===JSON.stringify(clean(b))}
function plannedExercises(date){return clone(weeklyPlan[dateFromKey(date).getDay()].exercises).map(x=>({...x,id:x.id+'-'+date,done:false}))}
function isLegacyDefaults(list=[]){const names=list.map(x=>x.name).join('|');return names==='Barbell Squat|Seated Cable Row|Easy Run'}
function getLog(date=activeDate){
  if(!state.logs[date]){
    state.logs[date]={priorities:{workout:false,nutrition:false,water:false,sleep:false},water:0,sleep:0,calories:0,protein:0,memo:'',exercises:plannedExercises(date),planInitialized:true,planSource:'weekly',planName:weeklyPlan[dateFromKey(date).getDay()].name,originalPlan:null,updatedAt:new Date().toISOString()};
  }else{
    const log=state.logs[date];
    log.priorities=log.priorities||{workout:false,nutrition:false,water:false,sleep:false};
    if((!Array.isArray(log.exercises)||log.exercises.length===0||isLegacyDefaults(log.exercises))&&log.planSource!=='custom-empty'){
      log.exercises=plannedExercises(date);log.planInitialized=true;log.planSource='weekly';log.planName=weeklyPlan[dateFromKey(date).getDay()].name;log.originalPlan=null;log.updatedAt=new Date().toISOString();localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
    }
  }
  return state.logs[date]
}
function scoreFor(log){const p=log.priorities||{};const vals=[p.workout,p.nutrition,p.water,p.sleep].map(Boolean);return Math.round(vals.filter(Boolean).length/vals.length*100)}
function mood(s){if(s===0)return{emoji:'😔',line:'You can always restart.',title:"Today wasn't your day."};if(s<50)return{emoji:'🙂',line:'A small step is still a step.',title:'Keep moving.'};if(s<75)return{emoji:'😄',line:"You're building momentum.",title:'Halfway there.'};if(s<100)return{emoji:'🔥',line:"You're getting stronger.",title:'Finish what you started.'};return{emoji:'🤖✨',line:'Smile. Train. Become the Machine.',title:'Perfect Day Complete!'}}
const mealChoices={breakfast:['달걀 2개 · 그릭요거트 · 블루베리','오트밀 · 우유 · 바나나 · 달걀','통밀토스트 · 달걀 · 토마토','현미주먹밥 · 삶은 달걀 · 김치','고구마 · 프로틴 쉐이크 · 사과','두부구이 · 바나나 · 저지방 우유','플레인 베이글 · 그릭요거트'],lunch:['일반식 · 밥 반 공기 · 단백질 반찬 · 채소','현미밥 · 닭다리살 · 구운채소','포케 · 현미밥 · 연어 · 채소','잡곡밥 · 미역국 · 참치 · 김치','비빔밥 · 달걀 · 두부','닭가슴살 샌드위치 · 샐러드','불고기 · 밥 반 공기 · 쌈채소'],snack:['프로틴 음료 · 과일','그릭요거트 · 아몬드 소량','바나나 · 삶은 달걀','고구마 · 무가당 두유','단백질바 · 아메리카노','사과 · 땅콩버터 소량','플레인 요거트 · 블루베리'],dinner:['닭가슴살 또는 두부 · 샐러드 · 고구마','연어 · 구운채소 · 잡곡밥 소량','소고기 우둔살 · 샐러드 · 감자','미역국 · 두부 · 잡곡밥 소량','순두부찌개 · 달걀 · 채소','참치 샐러드 · 현미밥 소량','돼지 안심 · 구운채소 · 고구마']};

const FOOD_DB=[
 ['흰쌀밥',210,150,'g',4,46,0.5,'쌀밥 밥 rice white rice'],['현미밥',218,150,'g',4.5,45,2,'brown rice'],['잡곡밥',225,150,'g',5,46,2,'multigrain rice'],['곤약밥',95,150,'g',2,21,0.3,'저칼로리밥 konjac rice'],['고구마',129,150,'g',2,30,0.2,'sweet potato'],['감자',116,150,'g',3,26,0.2,'potato'],['오트밀',190,50,'g',6.5,34,3.5,'오트 oats oatmeal'],['그래놀라',220,50,'g',5,32,8,'granola'],['통밀빵',150,2,'장',6,28,2,'whole wheat bread'],['식빵',160,2,'장',5,30,2,'toast bread'],
 ['플레인 베이글',270,1,'개',10,54,2,'베이글 bagel plain bagel'],['통밀 베이글',250,1,'개',11,48,3,'베이글 whole wheat bagel'],['블루베리 베이글',285,1,'개',9,58,2.5,'베이글 blueberry bagel'],['어니언 베이글',280,1,'개',10,56,2.5,'베이글 onion bagel'],['크림치즈',100,30,'g',2,2,10,'cream cheese'],['잉글리시 머핀',135,1,'개',5,26,1,'english muffin'],
 ['닭가슴살',165,100,'g',31,0,3.6,'chicken breast'],['닭다리살',190,100,'g',24,0,10,'chicken thigh'],['닭가슴살 소시지',140,100,'g',18,8,4,'chicken sausage'],['소고기 우둔살',170,100,'g',27,0,7,'lean beef'],['돼지 안심',143,100,'g',26,0,4,'pork tenderloin'],['연어',208,100,'g',20,0,13,'salmon'],['흰살생선',120,100,'g',24,0,2,'white fish'],['참치캔(물)',116,100,'g',26,0,1,'참치 tuna canned tuna'],['새우',99,100,'g',24,0.2,0.3,'shrimp'],
 ['삶은 달걀',70,1,'개',6,0.5,5,'계란 egg boiled egg'],['달걀 프라이',90,1,'개',6,0.5,7,'계란 후라이 fried egg'],['두부',80,100,'g',8,2,5,'tofu'],['그릭요거트',120,150,'g',15,8,3,'그릭 요거트 greek yogurt'],['플레인 요거트',95,150,'g',6,11,3,'yogurt'],['우유',125,200,'ml',6.5,10,7,'milk'],['저지방 우유',90,200,'ml',7,10,2,'low fat milk'],['무가당 두유',95,190,'ml',7,4,5,'soy milk'],
 ['프로틴 쉐이크(물)',130,1,'회',25,4,2,'프로틴쉐이크 단백질쉐이크 단백질 쉐이크 protein shake whey shake'],['프로틴 쉐이크(우유)',230,1,'회',31,14,8,'프로틴쉐이크 단백질쉐이크 milk protein shake'],['프로틴 음료',150,1,'병',25,8,2,'단백질 음료 protein drink'],['초코 쉐이크',380,1,'잔',10,58,12,'초코쉐이크 chocolate shake milkshake'],['바닐라 쉐이크',360,1,'잔',9,55,12,'바닐라쉐이크 vanilla shake milkshake'],['딸기 쉐이크',350,1,'잔',9,56,10,'딸기쉐이크 strawberry shake'],['식사대용 쉐이크',210,1,'회',20,25,5,'meal replacement shake'],
 ['바나나',105,1,'개',1.3,27,0.4,'banana'],['사과',95,1,'개',0.5,25,0.3,'apple'],['오렌지',62,1,'개',1.2,15,0.2,'orange'],['키위',46,1,'개',0.8,11,0.4,'kiwi'],['딸기',32,100,'g',0.7,8,0.3,'strawberry'],['블루베리',57,100,'g',0.7,14,0.3,'blueberry'],['포도',69,100,'g',0.7,18,0.2,'grape'],['수박',46,150,'g',0.9,11,0.2,'watermelon'],
 ['아몬드',116,20,'g',4,4,10,'almond'],['호두',131,20,'g',3,3,13,'walnut'],['땅콩버터',118,20,'g',5,4,10,'peanut butter'],['샐러드 채소',35,150,'g',2,7,0.4,'salad vegetables'],['아보카도',160,100,'g',2,9,15,'avocado'],['방울토마토',27,150,'g',1.3,6,0.3,'cherry tomato'],
 ['김치찌개',330,1,'인분',22,18,18,'kimchi stew'],['된장찌개',170,1,'인분',12,18,7,'soybean paste stew'],['순두부찌개',250,1,'인분',18,14,14,'soft tofu stew'],['비빔밥',560,1,'인분',19,88,15,'bibimbap'],['김밥',480,1,'줄',15,75,14,'gimbap kimbap'],['불고기',320,1,'인분',27,20,15,'bulgogi'],['제육볶음',420,1,'인분',30,24,23,'spicy pork'],['떡볶이',430,1,'인분',8,82,8,'tteokbokki'],['라면',500,1,'봉',10,80,16,'ramyeon ramen'],
 ['닭가슴살 포케',520,1,'인분',38,62,14,'포케 poke chicken poke'],['연어 포케',560,1,'인분',32,64,20,'포케 salmon poke'],['샌드위치',420,1,'개',22,48,15,'sandwich'],['닭가슴살 샌드위치',390,1,'개',30,43,11,'chicken sandwich'],['에그 샌드위치',410,1,'개',18,42,18,'egg sandwich'],['햄치즈 샌드위치',450,1,'개',22,40,22,'ham cheese sandwich'],['치킨 샐러드',330,1,'인분',32,20,14,'chicken salad'],['시저 샐러드',420,1,'인분',24,24,25,'caesar salad'],
 ['아메리카노',10,1,'잔',0.3,2,0,'커피 coffee americano'],['카페라떼',180,1,'잔',9,18,8,'라떼 latte cafe latte'],['콜드브루',10,1,'잔',0.3,2,0,'cold brew'],['카푸치노',140,1,'잔',7,13,7,'cappuccino'],['바닐라 라떼',260,1,'잔',8,38,8,'vanilla latte'],['녹차',0,1,'잔',0,0,0,'green tea'],['이온음료',120,500,'ml',0,30,0,'sports drink electrolyte'],
 ['김치',25,100,'g',1.5,4,0.5,'배추김치 kimchi'],['미역국',90,1,'그릇',8,7,3,'소고기미역국 seaweed soup'],['참치',116,100,'g',26,0,1,'튜나 tuna'],['참치마요',210,100,'g',15,5,14,'tuna mayo'],['계란말이',180,1,'인분',12,5,12,'rolled egg'],['멸치볶음',160,50,'g',14,12,7,'stir fried anchovy'],['콩나물국',60,1,'그릇',5,7,1,'bean sprout soup'],['북엇국',110,1,'그릇',15,6,3,'dried pollack soup'],
 ['닭가슴살 도시락',430,1,'개',35,48,10,'chicken lunchbox'],['현미 닭가슴살 도시락',450,1,'개',38,50,10,'brown rice chicken lunchbox'],['단백질바',210,1,'개',20,22,7,'프로틴바 protein bar'],['에너지바',230,1,'개',6,35,8,'energy bar'],['쌀과자',120,30,'g',2,25,1,'rice snack'],['크루아상',270,1,'개',5,31,14,'croissant'],['머핀',360,1,'개',6,52,14,'muffin'],['도넛',300,1,'개',4,36,16,'donut']
].map((x,i)=>({id:'food-'+i,name:x[0],kcal:x[1],serving:x[2],unit:x[3],protein:x[4],carbs:x[5],fat:x[6],aliases:x[7]||''}));
const FOOD_RECENT_KEY='eldyn-food-recents';
const FOOD_FAVORITE_KEY='eldyn-food-favorites';
function normaliseFoodQuery(v=''){return String(v).toLowerCase().replace(/[\s._-]+/g,'').replace(/[()]/g,'')}
function foodSearchText(x){return normaliseFoodQuery(`${x.name} ${x.aliases||''}`)}
function readFoodList(key){try{return JSON.parse(localStorage.getItem(key)||'[]')}catch{return[]}}
function writeFoodList(key,list){localStorage.setItem(key,JSON.stringify([...new Set(list)].slice(0,20)))}
function rememberFood(id){const list=readFoodList(FOOD_RECENT_KEY).filter(x=>x!==id);writeFoodList(FOOD_RECENT_KEY,[id,...list])}
function toggleFoodFavorite(id){const list=readFoodList(FOOD_FAVORITE_KEY);writeFoodList(FOOD_FAVORITE_KEY,list.includes(id)?list.filter(x=>x!==id):[id,...list]);renderFoodResults()}
let editingMealIndex=null,selectedFood=null;

function mealFoodTotals(meal){return (meal.foodItems||[]).reduce((a,x)=>({kcal:a.kcal+(+x.kcal||0),protein:a.protein+(+x.protein||0),carbs:a.carbs+(+x.carbs||0),fat:a.fat+(+x.fat||0)}),{kcal:0,protein:0,carbs:0,fat:0})}
function dailyFoodTotals(meals){return meals.reduce((a,m)=>{const t=mealFoodTotals(m);return{kcal:a.kcal+t.kcal,protein:a.protein+t.protein,carbs:a.carbs+t.carbs,fat:a.fat+t.fat}},{kcal:0,protein:0,carbs:0,fat:0})}
function roundMacro(n){return Math.round((+n||0)*10)/10}
function syncFoodTotals(log,meals){const t=dailyFoodTotals(meals);if(t.kcal>0){log.calories=Math.round(t.kcal);log.protein=Math.round(t.protein);log.carbs=Math.round(t.carbs);log.fat=Math.round(t.fat)}return t}
function ensureFoodDialog(){if(document.getElementById('foodDialog'))return;document.body.insertAdjacentHTML('beforeend',`<dialog id="foodDialog" class="modal food-modal"><button class="close-btn" id="foodDialogClose">×</button><p class="eyebrow">MEAL LOGGER</p><h2 id="foodDialogTitle">음식 검색 및 합계</h2><div class="food-search-row"><input id="foodSearch" placeholder="음식명 검색 (예: 베이글, 프로틴 쉐이크)"><button class="secondary-btn inline-btn" id="customFoodBtn">직접 영양 입력</button></div><div id="foodResults" class="food-results"></div><div id="foodServingPanel" class="food-serving" hidden><h3 id="selectedFoodName"></h3><div class="form-row"><label>섭취량<input id="foodAmount" type="number" min="0" step="0.1"></label><label>단위<input id="foodUnit" readonly></label></div><p id="foodPreview" class="muted"></p><button class="primary-btn" id="addFoodBtn">이 음식 추가</button></div><div class="section-head"><h2>현재 식사</h2></div><div id="mealFoodList" class="meal-food-list"></div><div id="mealFoodTotal" class="meal-total"></div><button class="primary-btn" id="saveMealFoodsBtn">식단 저장</button></dialog>`);
 foodDialogClose.onclick=()=>foodDialog.close();foodSearch.oninput=renderFoodResults;customFoodBtn.onclick=openCustomFoodPrompt;foodAmount.oninput=renderFoodPreview;addFoodBtn.onclick=addSelectedFood;saveMealFoodsBtn.onclick=saveMealFoods;
}
function openFoodEditor(index){ensureFoodDialog();editingMealIndex=index;selectedFood=null;foodSearch.value='';foodServingPanel.hidden=true;foodDialogTitle.textContent=ensureMeals(getLog(activeDate),activeDate)[index].name+' 음식 기록';renderFoodResults();renderMealFoodList();foodDialog.showModal()}
function renderFoodResults(){const q=normaliseFoodQuery(foodSearch?.value||''),fav=readFoodList(FOOD_FAVORITE_KEY),recent=readFoodList(FOOD_RECENT_KEY);let list;if(q){list=FOOD_DB.filter(x=>foodSearchText(x).includes(q)).sort((a,b)=>{const an=normaliseFoodQuery(a.name),bn=normaliseFoodQuery(b.name);return Number(bn.startsWith(q))-Number(an.startsWith(q))||Number(fav.includes(b.id))-Number(fav.includes(a.id))||a.name.localeCompare(b.name,'ko')})}else{const ordered=[...fav,...recent];list=[...ordered.map(id=>FOOD_DB.find(x=>x.id===id)).filter(Boolean),...FOOD_DB].filter((x,i,a)=>a.findIndex(y=>y.id===x.id)===i)}list=list.slice(0,20);foodResults.innerHTML=list.map(x=>`<div class="food-result-row"><button class="food-result" data-food-id="${x.id}"><b>${x.name}</b><span>${x.kcal} kcal / ${x.serving}${x.unit}</span></button><button class="food-favorite ${fav.includes(x.id)?'active':''}" data-food-favorite="${x.id}" aria-label="즐겨찾기">${fav.includes(x.id)?'★':'☆'}</button></div>`).join('')||'<p class="muted">검색 결과가 없습니다. 직접 영양 입력으로 추가해 주세요.</p>';foodResults.querySelectorAll('[data-food-id]').forEach(b=>b.onclick=()=>selectFood(b.dataset.foodId));foodResults.querySelectorAll('[data-food-favorite]').forEach(b=>b.onclick=e=>{e.stopPropagation();toggleFoodFavorite(b.dataset.foodFavorite)})}
function selectFood(id){selectedFood=FOOD_DB.find(x=>x.id===id);if(!selectedFood)return;selectedFoodName.textContent=selectedFood.name;foodAmount.value=selectedFood.serving;foodUnit.value=selectedFood.unit;foodServingPanel.hidden=false;renderFoodPreview()}
function renderFoodPreview(){if(!selectedFood)return;const ratio=(+foodAmount.value||0)/selectedFood.serving;foodPreview.textContent=`약 ${Math.round(selectedFood.kcal*ratio)} kcal · P ${roundMacro(selectedFood.protein*ratio)}g · C ${roundMacro(selectedFood.carbs*ratio)}g · F ${roundMacro(selectedFood.fat*ratio)}g`}
function addSelectedFood(){if(!selectedFood||(+foodAmount.value||0)<=0)return;rememberFood(selectedFood.id);const amount=+foodAmount.value,ratio=amount/selectedFood.serving,m=ensureMeals(getLog(activeDate),activeDate)[editingMealIndex];m.foodItems=m.foodItems||[];m.foodItems.push({name:selectedFood.name,amount,unit:selectedFood.unit,kcal:Math.round(selectedFood.kcal*ratio),protein:roundMacro(selectedFood.protein*ratio),carbs:roundMacro(selectedFood.carbs*ratio),fat:roundMacro(selectedFood.fat*ratio)});renderMealFoodList();selectedFood=null;foodServingPanel.hidden=true}
function openCustomFoodPrompt(){const name=prompt('음식명을 입력하세요.');if(!name)return;const kcal=+prompt('총 칼로리(kcal)를 입력하세요.','0')||0,protein=+prompt('단백질(g)을 입력하세요.','0')||0,carbs=+prompt('탄수화물(g)을 입력하세요.','0')||0,fat=+prompt('지방(g)을 입력하세요.','0')||0,m=ensureMeals(getLog(activeDate),activeDate)[editingMealIndex];m.foodItems=m.foodItems||[];m.foodItems.push({name,amount:1,unit:'회',kcal,protein,carbs,fat});renderMealFoodList()}
function renderMealFoodList(){const m=ensureMeals(getLog(activeDate),activeDate)[editingMealIndex],items=m.foodItems||[];mealFoodList.innerHTML=items.map((x,i)=>`<div class="meal-food-row"><div><b>${escapeHtml(x.name)}</b><small>${x.amount}${escapeHtml(x.unit)} · ${x.kcal} kcal · P ${x.protein}g</small></div><button class="mini-edit" data-remove-food="${i}">삭제</button></div>`).join('')||'<p class="muted">아직 추가한 음식이 없습니다.</p>';mealFoodList.querySelectorAll('[data-remove-food]').forEach(b=>b.onclick=()=>{items.splice(+b.dataset.removeFood,1);renderMealFoodList()});const t=mealFoodTotals(m);mealFoodTotal.innerHTML=`<strong>${Math.round(t.kcal)} kcal</strong><span>P ${roundMacro(t.protein)}g · C ${roundMacro(t.carbs)}g · F ${roundMacro(t.fat)}g</span>`}
function saveMealFoods(){const l=getLog(activeDate),meals=ensureMeals(l,activeDate),m=meals[editingMealIndex];if((m.foodItems||[]).length){m.customText=m.foodItems.map(x=>x.name).join(' · ')}else delete m.customText;syncFoodTotals(l,meals);l.updatedAt=new Date().toISOString();saveState();saveDailyLogNow(activeDate);foodDialog.close();render()}

function calculateNutrition(){const s=state.settings,w=+s.currentWeight||78,h=+s.height||160,age=+s.age||37,sex=s.sex||'female',act=+s.activity||1.55;let bmr=10*w+6.25*h-5*age+(sex==='male'?5:-161),tdee=bmr*act,delta={loss:-500,fatloss:-400,maintain:0,gain:250,hyrox:-150,manual:0}[s.goalMode]??-400;let kcal=s.goalMode==='manual'?(+s.calorieGoal||1800):Math.round((tdee+delta)/50)*50;const floor=sex==='male'?1500:1200;kcal=Math.max(floor,kcal);let protein=Math.round(w*({loss:1.5,fatloss:1.7,maintain:1.5,gain:1.8,hyrox:1.7,manual:(+s.proteinGoal||120)/w}[s.goalMode]||1.6));if(s.goalMode==='manual')protein=+s.proteinGoal||120;let fat=Math.round(w*.7),carb=Math.max(80,Math.round((kcal-protein*4-fat*9)/4));return{bmr:Math.round(bmr),tdee:Math.round(tdee),kcal,protein,carb,fat,water:Math.round(w*30/250)*250}}
function mealRotationIndex(date,key,i=0){const start=new Date('2026-01-01T00:00:00+09:00'),d=dateFromKey(date),days=Math.floor((d-start)/86400000),offset={breakfast:0,lunch:2,snack:4,dinner:6}[key]||0;return Math.abs(days+offset+i)%mealChoices[key].length}function ensureMeals(log,date){if(!log.mealPlan||!Array.isArray(log.mealPlan)){const count=+state.settings.mealCount||4,keys=count===3?['breakfast','lunch','dinner']:['breakfast','lunch','snack','dinner'];log.mealPlan=keys.map((key,i)=>({key,name:{breakfast:'Breakfast',lunch:'Lunch',snack:'Snack',dinner:'Dinner'}[key],choice:mealRotationIndex(date,key,i),done:false}));log.updatedAt=new Date().toISOString()}return log.mealPlan}
function renderMeals(log){const t=calculateNutrition(),meals=ensureMeals(log,activeDate),eaten=syncFoodTotals(log,meals);nutritionTargetCard.innerHTML=`<div><p class="eyebrow">DAILY NUTRITION</p><h3>${Math.round(eaten.kcal).toLocaleString()} / ${t.kcal.toLocaleString()} kcal</h3><p class="muted">섭취 P ${roundMacro(eaten.protein)}g · C ${roundMacro(eaten.carbs)}g · F ${roundMacro(eaten.fat)}g</p><p class="muted">목표 P ${t.protein}g · C ${t.carb}g · F ${t.fat}g · Water ${t.water.toLocaleString()}ml</p></div><span class="goal-pill">${escapeHtml(state.settings.goalMode)}</span>`;mealPlanList.innerHTML=meals.map((m,i)=>{const mt=mealFoodTotals(m),text=m.customText||mealChoices[m.key][m.choice%mealChoices[m.key].length],summary=mt.kcal>0?`${Math.round(mt.kcal)} kcal · P ${roundMacro(mt.protein)}g · C ${roundMacro(mt.carbs)}g · F ${roundMacro(mt.fat)}g`:(m.customText?'직접 입력한 식단':Math.round(t.kcal/meals.length)+' kcal guideline');return `<article class="meal-plan-card ${m.done?'done':''}"><button class="meal-check" data-meal-done="${i}" aria-label="Complete meal">${m.done?'✓':'○'}</button><div><p class="eyebrow">${m.name.toUpperCase()}</p><h3>${escapeHtml(text)}</h3><small>${summary}</small></div><div class="meal-actions"><button class="mini-edit" data-meal-scan="${i}">📷 AI 사진</button><button class="mini-edit" data-meal-food="${i}">음식 검색·합계</button><button class="mini-edit" data-meal-edit="${i}">메모 입력</button><button class="mini-edit" data-meal-change="${i}">추천 변경</button></div></article>`}).join('')}
function updateGreeting(){const h=new Date().getHours(),part=h<12?'morning':h<18?'afternoon':'evening';greeting.textContent=`Good ${part}, ${state.settings.name||'Ellen'}.`}
function applyTheme(theme){const value=['performance','core','paris'].includes(theme)?theme:'performance';document.documentElement.dataset.theme=value;const color=value==='paris'?'#f58fa3':value==='core'?'#ffffff':'#39ff14';document.querySelector('meta[name=theme-color]')?.setAttribute('content','#050605');}
document.addEventListener('change',e=>{if(e.target.matches('input[name="eldynTheme"]')){state.settings.theme=e.target.value;applyTheme(e.target.value);saveState();renderShareCard?.()}});
document.getElementById('languageSetting')?.addEventListener('change',e=>{state.settings.language=e.target.value;saveState();render()});
function render(){applyTheme(state.settings.theme||'performance');applyLanguage(state.settings.language||'ko');updateGreeting();renderToday();renderPlan();renderCalendar();renderProgress();renderSettings()}
function renderPlan(){
  const grid=document.getElementById('weeklyPlanGrid');if(!grid)return;
  const today=new Date(),todayDay=today.getDay(),monday=new Date(today);monday.setDate(today.getDate()-((todayDay+6)%7));
  const order=[1,2,3,4,5,6,0],names=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  grid.innerHTML=order.map((day,idx)=>{const dt=new Date(monday);dt.setDate(monday.getDate()+idx);const key=keyFromDate(dt),plan=weeklyPlan[day],isToday=key===todayKey();return `<article class="plan-day-card ${isToday?'today-plan':''}"><div class="plan-day-head"><div><p class="eyebrow">${isToday?'TODAY':names[day].toUpperCase()}</p><h3>${escapeHtml(plan.name)}</h3><p class="muted">${new Intl.DateTimeFormat('en',{month:'short',day:'numeric'}).format(dt)}</p></div><span class="routine-count">${plan.exercises.length} EXERCISES</span></div><div class="plan-exercises">${plan.exercises.map(x=>`<span class="plan-chip">${escapeHtml(x.name)}</span>`).join('')}</div><button class="secondary-btn plan-open-btn" data-open-plan-date="${key}">Open & customise</button></article>`}).join('');
}
function latestRunsForDashboard(){const runs=(state.runs||[]).slice().sort((a,b)=>new Date(b.endedAt)-new Date(a.endedAt));const today=todayKey(),yesterday=shiftDate(today,-1);return runs.filter(r=>{const k=keyFromDate(new Date(r.endedAt));return k===today||k===yesterday}).slice(0,2)}
function renderDashboardRunCard(){const el=document.getElementById('dashboardRunCard');if(!el)return;const lang=state.settings.language||'ko',runs=latestRunsForDashboard();if(!runs.length){el.innerHTML=`<div><p class="eyebrow">${lang==='ko'?'오늘의 러닝':'TODAY\'S RUN'}</p><h3>${lang==='ko'?'아직 러닝 기록이 없어요.':'No run yet.'}</h3><p class="muted">${lang==='ko'?'러닝 탭에서 시작해 보세요.':'Open Run to get moving.'}</p></div><button class="text-btn" data-open-run>${lang==='ko'?'러닝 시작':'Start run'}</button>`}else{el.innerHTML=runs.map(r=>{const k=keyFromDate(new Date(r.endedAt)),label=k===todayKey()?(lang==='ko'?'오늘':'Today'):(lang==='ko'?'어제':'Yesterday');return `<button class="dashboard-run-item" data-open-run><span><small>${label}</small><b>${r.distanceKm.toFixed(2)} km</b></span><span>${formatClock(r.durationMs)} · ${paceText(r.avgPaceSecKm)}/km</span></button>`}).join('')}el.querySelectorAll('[data-open-run]').forEach(b=>b.onclick=()=>switchView('run'))}
function renderDailyReview(log){const el=document.getElementById('dailyReviewCard');if(!el)return;const lang=state.settings.language||'ko',target=calculateNutrition(),meals=ensureMeals(log,activeDate),food=dailyFoodTotals(meals),exerciseDone=(log.exercises||[]).filter(x=>x.done).length,exerciseTotal=(log.exercises||[]).length||1,nutritionScore=Math.min(100,Math.round((food.kcal||log.calories||0)/Math.max(1,target.kcal)*100)),workoutScore=Math.round(exerciseDone/exerciseTotal*100),waterScore=Math.min(100,Math.round((log.water||0)/Math.max(1,state.settings.waterGoal)*100)),sleepScore=Math.min(100,Math.round((log.sleep||0)/Math.max(1,state.settings.sleepGoal)*100)),total=Math.round(workoutScore*.35+nutritionScore*.35+waterScore*.15+sleepScore*.15);let tip;if(lang==='ko'){tip=food.protein<target.protein*.75?'단백질을 조금 더 보충해 보세요.':log.water<state.settings.waterGoal*.75?'수분 섭취를 더해 주세요.':workoutScore<50?'짧은 운동이라도 완료하면 흐름을 이어갈 수 있어요.':'오늘의 균형이 좋습니다. 회복 스트레칭으로 마무리하세요.'}else{tip=food.protein<target.protein*.75?'Add a little more protein today.':log.water<state.settings.waterGoal*.75?'Drink more water to reach your goal.':workoutScore<50?'A short workout can still keep your momentum.':'Good balance today. Finish with recovery stretching.'}el.innerHTML=`<div class="daily-review-head"><div><p class="eyebrow">${lang==='ko'?'TODAY REVIEW':'TODAY REVIEW'}</p><h3>${total}${lang==='ko'?'점':' / 100'}</h3></div><span>${total>=85?'🔥':total>=65?'🙂':'🌱'}</span></div><div class="review-grid"><div><small>${lang==='ko'?'운동':'Workout'}</small><b>${workoutScore}</b></div><div><small>${lang==='ko'?'식단':'Nutrition'}</small><b>${nutritionScore}</b></div><div><small>${lang==='ko'?'수분':'Water'}</small><b>${waterScore}</b></div><div><small>${lang==='ko'?'수면':'Sleep'}</small><b>${sleepScore}</b></div></div><p>${tip}</p>`}
function renderToday(){const log=getLog(activeDate);renderDashboardRunCard();renderDailyReview(log);autoPriorities(log);const score=scoreFor(log),m=mood(score),d=dateFromKey(activeDate),isToday=activeDate===todayKey();scoreValue.textContent=`${score}%`;scoreEmoji.textContent=m.emoji;coachLine.textContent=m.line;scoreRing.style.setProperty('--score',score);scoreRing.querySelector('span').textContent=score;workoutDayLabel.textContent=isToday?'TODAY':new Intl.DateTimeFormat('en',{weekday:'long'}).format(d).toUpperCase();workoutDateLabel.textContent=new Intl.DateTimeFormat('en',{month:'short',day:'numeric',year:'numeric'}).format(d);routineName.textContent=log.planName||weeklyPlan[d.getDay()].name;workoutHeading.textContent=isToday?"Today's workout":"Day workout";todayWorkoutBtn.hidden=isToday;renderMeals(log);renderLatestRunAnalysis();
 const defs=[['workout','Workout','Complete every exercise','🏋️'],['nutrition','Nutrition','Log calories and protein','🥗'],['water','Water',`${log.water}/${state.settings.waterGoal} ml`,'💧'],['sleep','Sleep',`${log.sleep}/${state.settings.sleepGoal} h`,'🌙']];priorityGrid.innerHTML=defs.map(([k,t,s,e])=>`<button class="priority-card ${log.priorities[k]?'done':''}" data-priority="${k}"><span>${e}</span><b>${t}</b><small>${s}</small></button>`).join('');
 workoutList.innerHTML=log.exercises.length?log.exercises.map((x,i)=>`<article class="exercise-card ${x.done?'done':''}"><input class="check" type="checkbox" data-ex-check="${i}" ${x.done?'checked':''} aria-label="Complete ${escapeHtml(x.name)}"><button class="text-btn exercise-open" data-ex-open="${i}" style="text-align:left"><h3>${escapeHtml(x.name)}</h3><p>${x.sets} sets × ${x.reps} reps${x.weight?` · ${x.weight} kg`:''}</p></button><button class="mini-edit" data-ex-edit="${i}" aria-label="Edit ${escapeHtml(x.name)}">Edit</button></article>`).join(''):'<div class="empty-state"><span>🧘</span><p>No exercises scheduled.</p><button class="text-btn" data-empty-add>+ Add an exercise</button></div>';
 waterInput.value=log.water||'';sleepInput.value=log.sleep||'';calorieInput.value=log.calories||'';proteinInput.value=log.protein||'';memoInput.value=log.memo||'';if(isToday)maybeCelebrate(score)}
function autoPriorities(l){l.priorities=l.priorities||{};l.priorities.workout=l.exercises.length>0&&l.exercises.every(x=>x.done);l.priorities.water=+l.water>=+state.settings.waterGoal;l.priorities.sleep=+l.sleep>=+state.settings.sleepGoal;l.priorities.nutrition=+l.calories>0&&+l.protein>0}
function updateLog(patch,date=activeDate){Object.assign(getLog(date),patch,{updatedAt:new Date().toISOString()});saveState();render()}
function maybeCelebrate(s){const k=todayKey();if(s===100&&state.lastCelebrated[k]!==100){showCelebration(s);state.lastCelebrated[k]=100;saveState()}}
function showCelebration(s){const m=mood(s);celebrationContent.innerHTML=`<div class="big-emoji">${m.emoji}</div><h2>${m.title}</h2><p>${m.line}</p><p class="slogan">Smile. Train. Become the Machine.</p>`;celebrationDialog.showModal();if(s===100)confetti()}
function confetti(){for(let i=0;i<28;i++){const el=document.createElement('i');el.className='confetti';el.style.left=Math.random()*100+'vw';el.style.setProperty('--x',(Math.random()*180-90)+'px');el.style.animationDelay=Math.random()*.5+'s';document.body.appendChild(el);setTimeout(()=>el.remove(),2400)}}
function renderCalendar(){const y=calendarCursor.getFullYear(),m=calendarCursor.getMonth();monthTitle.textContent=new Intl.DateTimeFormat('en',{month:'long',year:'numeric'}).format(calendarCursor);const first=new Date(y,m,1),days=new Date(y,m+1,0).getDate();let html='';for(let i=0;i<first.getDay();i++)html+='<div class="day blank"></div>';for(let d=1;d<=days;d++){const key=`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`,s=state.logs[key]?scoreFor(state.logs[key]):0;html+=`<button class="day ${key===todayKey()?'today':''} ${key===selectedDate?'selected':''}" data-date="${key}"><span>${d}</span><span>${s===100?'🤖':s===0?'':'•'}</span><span class="heat"><i style="width:${s}%"></i></span></button>`}calendarGrid.innerHTML=html;renderDaySummary()}
function renderDaySummary(){const log=state.logs[selectedDate],s=log?scoreFor(log):0,m=mood(s),routine=weeklyPlan[dateFromKey(selectedDate).getDay()];daySummary.innerHTML=`<p class="eyebrow">${selectedDate}</p><h2>${escapeHtml(log?.planName||routine.name)}</h2><p class="muted">${m.emoji} ${s}% complete · ${log?.exercises?.length??routine.exercises.length} exercises</p>${log?`<p>Water ${log.water||0} ml · Sleep ${log.sleep||0} h · Protein ${log.protein||0} g</p>`:'<p>The weekly plan will be created when you open this day.</p>'}<button class="primary-btn" id="openSelectedDay">Open this workout</button>`;document.getElementById('openSelectedDay').onclick=()=>{activeDate=selectedDate;switchView('today');renderToday()}}
function renderProgress(){const keys=[...Array(7)].map((_,i)=>{const d=new Date();d.setDate(d.getDate()-6+i);return keyFromDate(d)});weeklyBars.innerHTML=keys.map(k=>{const s=state.logs[k]?scoreFor(state.logs[k]):0;return`<div class="bar-col"><div class="bar" style="height:${Math.max(s,2)}%"></div><small>${k.slice(8)}</small></div>`}).join('')}
const I18N={
  ko:{today:'오늘',run:'러닝',plan:'계획',calendar:'달력',progress:'기록',settings:'설정',language:'언어',save:'설정 저장',daily:'오늘의 우선순위',meal:'오늘의 식단',workout:'오늘의 운동',quick:'빠른 기록',latest:'최근 러닝 분석',ready:'러닝 준비',start:'▶ 러닝 시작',recent:'최근 러닝',weekly:'주간 계획',body:'신체 변화',data:'데이터',storyNote:'사진 또는 이동할 텍스트·경로·로고를 미리보기에서 직접 드래그하세요. Photo size로 사진을 확대할 수 있어요.'},
  en:{today:'Today',run:'Run',plan:'Plan',calendar:'Calendar',progress:'Progress',settings:'Settings',language:'Language',save:'Save settings',daily:'Daily priorities',meal:"Today's meal plan",workout:"Today's workout",quick:'Quick log',latest:'Latest run analysis',ready:'Ready to run',start:'▶ Start Run',recent:'Recent runs',weekly:'Weekly Plan',body:'Body progress',data:'Data',storyNote:'Drag the photo, text, route or logo directly in the preview. Use Photo size to zoom the photo.'}
};
function applyLanguage(lang=state.settings.language||'ko'){
  state.settings.language=lang;document.documentElement.lang=lang;const t=I18N[lang]||I18N.ko;
  const nav=[['today',t.today],['run',t.run],['plan',t.plan],['calendar',t.calendar],['progress',t.progress],['settings',t.settings]];nav.forEach(([v,label])=>{const b=document.querySelector(`.bottom-nav [data-view="${v}"]`);if(b){const icon=b.querySelector('span')?.outerHTML||'';b.innerHTML=icon+label}});
  const setText=(sel,val)=>{const el=document.querySelector(sel);if(el)el.textContent=val};
  setText('#today .section-head h2',t.daily);setText('#today .section-head:nth-of-type(2) h2',t.meal);setText('#workoutHeading',t.workout);setText('#today .section-head:nth-last-of-type(2) h2',t.quick);setText('#today .section-head:last-of-type h2',t.latest);setText('#runStatusTitle',t.ready);setText('#startRunBtn',t.start);setText('#run .section-head:last-of-type h2',t.recent);setText('#plan .plan-title-row h2',t.weekly);setText('#progress .section-head h2',t.body);setText('#settings .section-head:nth-last-of-type(1) h2',t.data);setText('#saveSettingsBtn',t.save);setText('.story-studio-note',t.storyNote);
  const langLabel=document.querySelector('#languageSetting')?.closest('label')?.querySelector('span');if(langLabel)langLabel.textContent=t.language;
  const pairs=lang==='ko'?{
    '#completeAllBtn':'모두 완료','#regenerateMealsBtn':'식단 새로 만들기','#nutritionLabelBtn':'영양표 분석','#changeWorkoutBtn':'운동 변경','#resetPlanBtn':'계획 초기화','#addExerciseBtn':'+ 운동 추가','#createWorkoutStoryBtn':'운동 인증샷 만들기','#dailyReviewHeading':'AI 하루 평가','#runStatusNote':'실외에서 위치 권한을 허용한 뒤 러닝 시작을 눌러 주세요.','#pauseRunBtn':'Ⅱ 일시정지','#finishRunBtn':'■ 종료','#saveBodyBtn':'오늘 신체 기록 저장','#saveSettingsBtn':'설정 저장','#wearableHeading':'Apple Watch 화면 테스트','#openWatchTestBtn':'화면 테스트'}:{
    '#completeAllBtn':'Complete all','#regenerateMealsBtn':'Regenerate meals','#nutritionLabelBtn':'Scan nutrition label','#changeWorkoutBtn':'Change workout','#resetPlanBtn':'Reset plan','#addExerciseBtn':'+ Add exercise','#createWorkoutStoryBtn':'Create workout story','#dailyReviewHeading':'AI Daily Review','#runStatusNote':'Go outdoors, allow location access, then tap Start Run.','#pauseRunBtn':'Ⅱ Pause','#finishRunBtn':'■ Finish','#saveBodyBtn':"Save today's body record",'#saveSettingsBtn':'Save settings','#wearableHeading':'Apple Watch UI Test','#openWatchTestBtn':'Open preview'};Object.entries(pairs).forEach(([s,v])=>setText(s,v));
  document.querySelectorAll('#mealPlanList .eyebrow').forEach(el=>{const map=lang==='ko'?{BREAKFAST:'아침',LUNCH:'점심',SNACK:'간식',DINNER:'저녁'}:{};if(map[el.textContent])el.textContent=map[el.textContent]});
}
function renderSettings(){const s=state.settings;if(document.getElementById('languageSetting'))document.getElementById('languageSetting').value=s.language||'ko';document.querySelectorAll('input[name="eldynTheme"]').forEach(x=>x.checked=x.value===(s.theme||'performance'));displayName.value=s.name||'Ellen';sexSetting.value=s.sex||'female';ageSetting.value=s.age||37;heightSetting.value=s.height||160;currentWeightSetting.value=s.currentWeight||'';currentBodyFatSetting.value=s.currentBodyFat||'';goalWeightSetting.value=s.goalWeight||'';goalMode.value=s.goalMode||'fatloss';activitySetting.value=String(s.activity||1.55);mealCountSetting.value=String(s.mealCount||4);waterGoal.value=s.waterGoal;sleepGoal.value=s.sleepGoal;proteinGoal.value=s.proteinGoal;calorieGoal.value=s.calorieGoal;const t=calculateNutrition();nutritionCalcNote.textContent=`Estimated BMR ${t.bmr.toLocaleString()} kcal · maintenance ${t.tdee.toLocaleString()} kcal. Adjust targets based on energy, recovery and professional advice.`}
function openExercise(i){const x=getLog().exercises[i],id=extractYoutubeId(x.youtube);exerciseDetail.innerHTML=`<p class="eyebrow">EXERCISE GUIDE</p><h2>${escapeHtml(x.name)}</h2>${id?`<div class="video-wrap"><iframe src="https://www.youtube-nocookie.com/embed/${id}?playsinline=1" title="${escapeHtml(x.name)} guide" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`:`<a class="secondary-btn" style="display:block;text-align:center;text-decoration:none" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=${encodeURIComponent(x.search||x.name+' proper form')}">Find a free YouTube guide</a>`}<h3>Target</h3><p class="muted">${escapeHtml(x.target||'Custom exercise')}</p><h3>How to perform</h3><p>${escapeHtml(x.instructions||'Use controlled form and stop if you feel sharp pain.')}</p><div class="set-grid"><div class="set-box"><b>${x.sets}</b><small>Sets</small></div><div class="set-box"><b>${x.reps}</b><small>Reps</small></div><div class="set-box"><b>${x.weight||0}</b><small>kg</small></div></div><div class="form-row"><button type="button" class="secondary-btn" id="editExerciseBtn">Edit</button><button type="button" class="primary-btn" id="toggleExerciseDone">${x.done?'Mark incomplete':'Complete exercise'}</button></div><button type="button" class="danger-btn" id="deleteExerciseBtn">Delete from this day</button>`;exerciseDialog.showModal();toggleExerciseDone.onclick=()=>{x.done=!x.done;updateLog({exercises:getLog().exercises});exerciseDialog.close()};editExerciseBtn.onclick=()=>{exerciseDialog.close();openExerciseForm(i)};deleteExerciseBtn.onclick=()=>{if(confirm(`Delete ${x.name} from ${activeDate}?`)){getLog().exercises.splice(i,1);updateLog({exercises:getLog().exercises,planSource:getLog().exercises.length?'custom':'custom-empty'});exerciseDialog.close()}}}
function openExerciseForm(i=null){editingIndex=i;const form=addExerciseForm;form.reset();if(i===null){exerciseFormEyebrow.textContent='NEW EXERCISE';exerciseFormTitle.textContent=`Add to ${activeDate}`;exerciseFormSubmit.textContent='Add exercise';form.sets.value=3;form.reps.value=10;form.weight.value=0}else{const x=getLog().exercises[i];exerciseFormEyebrow.textContent='EDIT EXERCISE';exerciseFormTitle.textContent=x.name;exerciseFormSubmit.textContent='Save changes';for(const k of ['name','sets','reps','weight','target','instructions','youtube'])if(form.elements[k])form.elements[k].value=x[k]??''}addExerciseDialog.showModal()}
function extractYoutubeId(v=''){if(/^[\w-]{11}$/.test(v))return v;try{const u=new URL(v);if(u.hostname.includes('youtu.be'))return u.pathname.slice(1,12);if(u.searchParams.get('v'))return u.searchParams.get('v').slice(0,11);return u.pathname.match(/\/embed\/([\w-]{11})/)?.[1]||''}catch{return''}}
function escapeHtml(s=''){return String(s).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]))}
function switchView(id){document.querySelectorAll('.bottom-nav button').forEach(x=>x.classList.toggle('active',x.dataset.view===id));document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id===id));if(id==='run')renderRun()}

const workoutChangeEls={
  open:document.getElementById('changeWorkoutBtn'),dialog:document.getElementById('changeWorkoutDialog'),options:document.getElementById('workoutPlanOptions'),apply:document.getElementById('applyWorkoutChangeBtn'),restore:document.getElementById('restoreWorkoutPlanBtn')
};
function openWorkoutChange(){
  const l=getLog(activeDate),base=weeklyPlan[dateFromKey(activeDate).getDay()].name,reco=yesterdayRecommendation();
  workoutChangeEls.options.innerHTML=`<div class="ai-workout-recommend"><span>✦ AI PICK</span><b>${escapeHtml(workoutPlanByKey(reco)?.name||'Full Body Strength')}</b><small>어제 기록과 오늘 계획을 기준으로 추천했어요.</small></div>`+Object.entries(workoutCatalog).map(([cat,data])=>`<section class="workout-category"><h3>${data.icon} ${data.label}</h3><div class="workout-category-grid">${Object.entries(data.plans).map(([key,plan])=>{const value=`${cat}:${key}`;return `<label class="workout-option ${value===reco?'recommended':''}"><input type="radio" name="workoutReplacement" value="${value}" ${value===reco?'checked':''}><span><b>${escapeHtml(plan.name)}</b><small>${escapeHtml(plan.meta||'Custom workout')}</small></span>${value===reco?'<em>추천</em>':''}</label>`}).join('')}</div></section>`).join('')+`<p class="muted current-plan-note">현재 계획: ${escapeHtml(l.planName||base)}</p>`;
  workoutChangeEls.restore.hidden=!l.originalPlan;workoutChangeEls.apply.textContent='선택한 운동으로 전체 교체';workoutChangeEls.dialog.showModal();
}
function replaceWorkout(key){
  const l=getLog(activeDate),template=workoutPlanByKey(key);if(!template)return;
  if(!l.originalPlan)l.originalPlan={name:l.planName||weeklyPlan[dateFromKey(activeDate).getDay()].name,source:l.planSource||'weekly',exercises:clone(l.exercises)};
  l.exercises=clone(template.exercises).map((x,i)=>({...x,id:`${x.id}-${activeDate}-${i}`,done:false}));l.planName=template.name;l.planSource=`builder-${key}`;l.planInitialized=true;l.priorities.workout=false;l.updatedAt=new Date().toISOString();saveState();workoutChangeEls.dialog.close();render();
}
workoutChangeEls.open.onclick=openWorkoutChange;
workoutChangeEls.options.onchange=e=>{if(e.target.name==='workoutReplacement'){workoutChangeEls.options.querySelectorAll('.workout-option').forEach(x=>x.classList.toggle('selected',x.contains(e.target)))}};
workoutChangeEls.apply.onclick=()=>replaceWorkout(workoutChangeEls.options.querySelector('input[name="workoutReplacement"]:checked')?.value||yesterdayRecommendation());
workoutChangeEls.restore.onclick=()=>{const l=getLog(activeDate);if(!l.originalPlan)return;const original=l.originalPlan;l.exercises=clone(original.exercises).map(x=>({...x,done:false}));l.planName=original.name;l.planSource=original.source;l.originalPlan=null;l.priorities.workout=false;l.updatedAt=new Date().toISOString();saveState();workoutChangeEls.dialog.close();render()};

priorityGrid.onclick=e=>{const b=e.target.closest('[data-priority]');if(!b)return;const l=getLog(),k=b.dataset.priority;if(k==='workout')l.exercises.forEach(x=>x.done=!l.priorities.workout);else l.priorities[k]=!l.priorities[k];saveState();render()};
workoutList.onclick=e=>{const edit=e.target.closest('[data-ex-edit]'),open=e.target.closest('[data-ex-open]');if(edit)openExerciseForm(+edit.dataset.exEdit);else if(open)openExercise(+open.dataset.exOpen);else if(e.target.closest('[data-empty-add]'))openExerciseForm()};workoutList.onchange=e=>{if(e.target.matches('[data-ex-check]')){getLog().exercises[+e.target.dataset.exCheck].done=e.target.checked;updateLog({exercises:getLog().exercises})}};
[['waterInput','water'],['sleepInput','sleep'],['calorieInput','calories'],['proteinInput','protein']].forEach(([id,k])=>document.getElementById(id).addEventListener('change',e=>updateLog({[k]:+e.target.value||0})));memoInput.addEventListener('change',e=>updateLog({memo:e.target.value}));
completeAllBtn.onclick=()=>{const l=getLog();l.exercises.forEach(x=>x.done=true);l.water=state.settings.waterGoal;l.sleep=state.settings.sleepGoal;l.calories=l.calories||state.settings.calorieGoal;l.protein=l.protein||state.settings.proteinGoal;saveState();render()};addExerciseBtn.onclick=()=>openExerciseForm();prevDayBtn.onclick=()=>{activeDate=shiftDate(activeDate,-1);renderToday()};nextDayBtn.onclick=()=>{activeDate=shiftDate(activeDate,1);renderToday()};todayWorkoutBtn.onclick=()=>{activeDate=todayKey();renderToday()};resetPlanBtn.onclick=()=>{if(confirm(`Reset ${activeDate} to the ${weeklyPlan[dateFromKey(activeDate).getDay()].name} plan?`)){const l=getLog();l.exercises=plannedExercises(activeDate);updateLog({exercises:l.exercises,planInitialized:true,planSource:'weekly',planName:weeklyPlan[dateFromKey(activeDate).getDay()].name,originalPlan:null})}};
addExerciseForm.onsubmit=e=>{e.preventDefault();const f=new FormData(e.target),item={id:editingIndex===null?crypto.randomUUID():getLog().exercises[editingIndex].id,name:f.get('name'),sets:+f.get('sets'),reps:+f.get('reps'),weight:+f.get('weight'),target:f.get('target'),instructions:f.get('instructions'),youtube:f.get('youtube'),search:f.get('name')+' proper form',done:editingIndex===null?false:getLog().exercises[editingIndex].done};if(editingIndex===null)getLog().exercises.push(item);else getLog().exercises[editingIndex]=item;updateLog({exercises:getLog().exercises,planInitialized:true,planSource:'custom'});addExerciseDialog.close()};
weeklyPlanGrid.onclick=e=>{const b=e.target.closest('[data-open-plan-date]');if(!b)return;activeDate=b.dataset.openPlanDate;switchView('today');renderToday();};document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>document.getElementById(b.dataset.close).close());document.querySelectorAll('.bottom-nav button').forEach(b=>b.onclick=()=>switchView(b.dataset.view));prevMonth.onclick=()=>{calendarCursor=new Date(calendarCursor.getFullYear(),calendarCursor.getMonth()-1,1);renderCalendar()};nextMonth.onclick=()=>{calendarCursor=new Date(calendarCursor.getFullYear(),calendarCursor.getMonth()+1,1);renderCalendar()};calendarGrid.onclick=e=>{const d=e.target.closest('[data-date]');if(d){selectedDate=d.dataset.date;renderCalendar()}};
function saveProfileFromForm(){Object.assign(state.settings,{name:displayName.value.trim()||'Ellen',sex:sexSetting.value,age:+ageSetting.value||37,height:+heightSetting.value||160,currentWeight:+currentWeightSetting.value||78,currentBodyFat:+currentBodyFatSetting.value||'',goalWeight:+goalWeightSetting.value||'',goalMode:goalMode.value,activity:+activitySetting.value||1.55,mealCount:+mealCountSetting.value||4});saveState();render()}
saveProfileBtn.onclick=()=>{saveProfileFromForm();alert('Profile saved.')}
autoNutritionBtn.onclick=()=>{saveProfileFromForm();const t=calculateNutrition();Object.assign(state.settings,{calorieGoal:t.kcal,proteinGoal:t.protein,carbGoal:t.carb,fatGoal:t.fat,waterGoal:t.water});delete getLog(activeDate).mealPlan;saveState();render();alert('Nutrition targets and today\'s meal plan were created.')}
regenerateMealsBtn.onclick=()=>{delete getLog(activeDate).mealPlan;saveState();renderMeals(getLog(activeDate))};
mealPlanList.onclick=e=>{const c=e.target.closest('[data-meal-change]'),d=e.target.closest('[data-meal-done]'),edit=e.target.closest('[data-meal-edit]'),food=e.target.closest('[data-meal-food]'),scan=e.target.closest('[data-meal-scan]'),l=getLog(activeDate),meals=ensureMeals(l,activeDate);if(scan){openFoodScan(+scan.dataset.mealScan);return}else if(food){openFoodEditor(+food.dataset.mealFood);return}else if(edit){const m=meals[+edit.dataset.mealEdit],current=m.customText||mealChoices[m.key][m.choice%mealChoices[m.key].length],value=prompt(`${m.name} 식단 메모를 입력하세요.`,current);if(value===null)return;m.customText=value.trim();if(!m.customText)delete m.customText}else if(c){const m=meals[+c.dataset.mealChange];delete m.customText;m.foodItems=[];m.choice=(m.choice+1)%mealChoices[m.key].length}else if(d){meals[+d.dataset.mealDone].done=!meals[+d.dataset.mealDone].done}else return;syncFoodTotals(l,meals);l.priorities.nutrition=meals.every(x=>x.done);l.updatedAt=new Date().toISOString();saveState();saveDailyLogNow(activeDate);render()}
saveSettingsBtn.onclick=()=>{const theme=document.querySelector('input[name="eldynTheme"]:checked')?.value||'performance';Object.assign(state.settings,{theme,language:document.getElementById('languageSetting')?.value||'ko',waterGoal:+waterGoal.value||2000,sleepGoal:+sleepGoal.value||7.5,proteinGoal:+proteinGoal.value||120,calorieGoal:+calorieGoal.value||1800});applyTheme(theme);saveState();render();alert(state.settings.language==='en'?'Settings saved.':'설정을 저장했어요.')};saveBodyBtn.onclick=()=>{state.body=state.body.filter(x=>x.date!==todayKey());state.body.push({date:todayKey(),weight:+weightInput.value||null,bodyFat:+bodyFatInput.value||null,waist:+waistInput.value||null,muscle:+muscleInput.value||null});saveState();alert('Body record saved.')};exportBtn.onclick=()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`eldyn-backup-${todayKey()}.json`;a.click();URL.revokeObjectURL(a.href)};importInput.onchange=async e=>{try{state={...clone(defaults),...JSON.parse(await e.target.files[0].text())};saveState();render();alert('Backup imported.')}catch{alert('That backup file could not be read.')}};celebrationClose.onclick=()=>celebrationDialog.close();profileBtn.onclick=()=>accountDialog.showModal();
async function initSupabase(){const c=window.ELLEN_CONFIG||{},badge=document.getElementById('connectionBadge');if(!c.SUPABASE_URL||!c.SUPABASE_ANON_KEY){syncNowBtn.disabled=true;syncStatus.textContent='Supabase configuration is missing.';return}if(!window.supabase){syncStatus.textContent='Internet connection required.';return}try{supabaseClient=window.supabase.createClient(c.SUPABASE_URL,c.SUPABASE_ANON_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});const{data,error}=await supabaseClient.auth.getSession();if(error)throw error;setUser(data.session?.user||null);supabaseClient.auth.onAuthStateChange((_e,s)=>setUser(s?.user||null))}catch(e){syncStatus.textContent='Cloud connection failed: '+e.message}}
function setUser(user){currentUser=user;cloudHydrated=false;authTitle.textContent=user?user.email:'Cloud ready';syncStatus.textContent=user?'Loading cloud data…':'Supabase is connected. Create an account or sign in.';authFields.hidden=!!user;signOutBtn.hidden=!user;syncNowBtn.disabled=!user;if(user)cloudPull();}
signInBtn.onclick=()=>authAction('signin');signUpBtn.onclick=()=>authAction('signup');signOutBtn.onclick=async()=>{await supabaseClient?.auth.signOut();setUser(null)};syncNowBtn.onclick=()=>cloudSync(true);async function authAction(mode){if(!supabaseClient)return alert('Cloud connection is not ready.');const email=emailInput.value.trim(),password=passwordInput.value;if(!email||password.length<6)return alert('Enter an email and a password with at least 6 characters.');const fn=mode==='signup'?'signUp':'signInWithPassword',r=await supabaseClient.auth[fn]({email,password});if(r.error)alert(r.error.message);else alert(mode==='signup'?'Account created. You can sign in now if email confirmation is disabled.':'Signed in. Cloud sync is active.')}
function parsePayload(payload){if(!payload)return{};if(typeof payload==='string'){try{return JSON.parse(payload)}catch{return{}}}return payload}
function mealHasUserData(meal){return !!(meal?.done||String(meal?.customText||'').trim()||(Array.isArray(meal?.foodItems)&&meal.foodItems.length))}
function mealHasFoodItems(meal){return Array.isArray(meal?.foodItems)&&meal.foodItems.length>0}
function mergeMealPlans(localPlan,remotePlan,preferLocal){
  const local=Array.isArray(localPlan)?localPlan:[],remote=Array.isArray(remotePlan)?remotePlan:[];
  const keys=[...new Set([...local,...remote].map(x=>x?.key).filter(Boolean))];
  if(!keys.length)return clone(preferLocal?local:remote);
  return keys.map(key=>{
    const l=local.find(x=>x?.key===key),r=remote.find(x=>x?.key===key);
    if(!l)return clone(r);if(!r)return clone(l);
    const lUser=mealHasUserData(l),rUser=mealHasUserData(r);
    // A blank/default meal must never overwrite a meal containing actual user input.
    let primary,secondary;
    if(lUser&&!rUser){primary=l;secondary=r}
    else if(rUser&&!lUser){primary=r;secondary=l}
    else{primary=preferLocal?l:r;secondary=preferLocal?r:l}
    const merged={...secondary,...primary};
    const lf=Array.isArray(l.foodItems)?l.foodItems:[],rf=Array.isArray(r.foodItems)?r.foodItems:[];
    if(lf.length||rf.length){
      if(lf.length&&!rf.length)merged.foodItems=clone(lf);
      else if(rf.length&&!lf.length)merged.foodItems=clone(rf);
      else merged.foodItems=clone(preferLocal?lf:rf);
    }
    const lc=String(l.customText||'').trim(),rc=String(r.customText||'').trim();
    if(lc||rc)merged.customText=(primary===l?(lc||rc):(rc||lc));
    return merged;
  })
}
function mergeRuns(localRuns,remoteRuns){const map=new Map();for(const run of [...(Array.isArray(remoteRuns)?remoteRuns:[]),...(Array.isArray(localRuns)?localRuns:[])]){const key=run?.id||`${run?.startedAt||''}-${run?.endedAt||''}-${run?.distanceKm||0}`;if(key)map.set(key,run)}return [...map.values()].sort((a,b)=>Date.parse(a?.startedAt||0)-Date.parse(b?.startedAt||0))}
function restoreRunsFromDailyLogs(){let merged=Array.isArray(state.runs)?state.runs:[];for(const log of Object.values(state.logs||{}))merged=mergeRuns(merged,log?.runs);state.runs=merged}
function mergeDailyLog(localRaw,remoteRaw,remoteUpdatedAt){
  const local=parsePayload(localRaw),remote=parsePayload(remoteRaw),lt=Date.parse(local.updatedAt||0)||0,rt=Date.parse(remote.updatedAt||remoteUpdatedAt||0)||0,preferLocal=lt>=rt;
  const base=preferLocal?{...remote,...local}:{...local,...remote};
  base.mealPlan=mergeMealPlans(local.mealPlan,remote.mealPlan,preferLocal);
  base.runs=mergeRuns(local.runs,remote.runs);
  // Recalculate nutrition only when detailed foods exist. Legacy aggregate values must not be zeroed.
  if((base.mealPlan||[]).some(mealHasFoodItems)){
    const totals=dailyFoodTotals(base.mealPlan||[]);
    base.calories=Math.round(totals.kcal||0);base.protein=Math.round(totals.protein||0);base.carbs=Math.round(totals.carbs||0);base.fat=Math.round(totals.fat||0);
  }else{
    const preferred=preferLocal?local:remote,secondary=preferLocal?remote:local;
    for(const key of ['calories','protein','carbs','fat'])base[key]=Number(preferred[key]??secondary[key]??0)||0;
  }
  const latest=Math.max(lt,rt);base.updatedAt=new Date(latest||Date.now()).toISOString();return base
}
let syncTimer;function scheduleCloudSync(){clearTimeout(syncTimer);syncTimer=setTimeout(()=>cloudSync(false),500)}
async function cloudSync(show=false){
  if(!supabaseClient||!currentUser||!cloudHydrated)return;
  syncStatus.textContent='Syncing…';
  const{data:remoteRows,error:readError}=await supabaseClient.from('daily_logs').select('date,payload,updated_at').eq('user_id',currentUser.id);
  if(readError){syncStatus.textContent='Sync failed: '+readError.message;if(show)alert(readError.message);return}
  const remoteMap=new Map((remoteRows||[]).map(row=>[row.date,row])),dates=new Set([...Object.keys(state.logs),...remoteMap.keys()]),rows=[],futurePlaceholders=[];
  for(const date of dates){
    const remote=remoteMap.get(date),merged=mergeDailyLog(state.logs[date]||{},remote?.payload||{},remote?.updated_at);
    if(isFuturePlaceholder(date,merged)){delete state.logs[date];if(remote)futurePlaceholders.push(date);continue}
    state.logs[date]=merged;rows.push({user_id:currentUser.id,date,payload:merged,updated_at:merged.updatedAt});
  }
  let error=null;
  if(rows.length)({error}=await supabaseClient.from('daily_logs').upsert(rows,{onConflict:'user_id,date'}));
  if(!error&&futurePlaceholders.length)await supabaseClient.from('daily_logs').delete().eq('user_id',currentUser.id).in('date',futurePlaceholders);
  restoreRunsFromDailyLogs();
  const serialised=JSON.stringify(state);localStorage.setItem(STORAGE_KEY,serialised);localStorage.setItem(STORAGE_BACKUP_KEY,serialised);
  syncStatus.textContent=error?'Sync failed: '+error.message:'Synced just now.';if(show)alert(error?error.message:'Sync complete.');
}
async function cloudPull(){
  if(!supabaseClient||!currentUser)return;
  syncStatus.textContent='Loading cloud data…';
  const{data,error}=await supabaseClient.from('daily_logs').select('date,payload,updated_at').eq('user_id',currentUser.id);
  if(error){syncStatus.textContent='Could not load cloud data.';return}
  const futurePlaceholders=[];
  for(const row of data||[]){
    if(!row?.date||!row?.payload)continue;
    const merged=mergeDailyLog(state.logs[row.date]||{},row.payload,row.updated_at);
    if(isFuturePlaceholder(row.date,merged)){delete state.logs[row.date];futurePlaceholders.push(row.date);continue}
    state.logs[row.date]=merged;
  }
  for(const date of Object.keys(state.logs))if(isFuturePlaceholder(date,state.logs[date]))delete state.logs[date];
  if(futurePlaceholders.length)await supabaseClient.from('daily_logs').delete().eq('user_id',currentUser.id).in('date',futurePlaceholders);
  restoreRunsFromDailyLogs();
  activeDate=todayKey();selectedDate=todayKey();
  const serialised=JSON.stringify(state);localStorage.setItem(STORAGE_KEY,serialised);localStorage.setItem(STORAGE_BACKUP_KEY,serialised);
  cloudHydrated=true;render();syncStatus.textContent=futurePlaceholders.length?'Cloud restored · future placeholder removed.':'Cloud data restored.';
}


// ELDYN live running + privacy + share card
const runEls={
  title:document.getElementById('runStatusTitle'),note:document.getElementById('runStatusNote'),gps:document.getElementById('gpsBadge'),
  time:document.getElementById('runTime'),distance:document.getElementById('runDistance'),currentPace:document.getElementById('runCurrentPace'),
  averagePace:document.getElementById('runAveragePace'),calories:document.getElementById('runCalories'),accuracy:document.getElementById('runAccuracy'),
  splits:document.getElementById('runSplits'),history:document.getElementById('runHistory'),start:document.getElementById('startRunBtn'),
  pause:document.getElementById('pauseRunBtn'),finish:document.getElementById('finishRunBtn'),gpsToggle:document.getElementById('gpsEnabledToggle'),
  autoPause:document.getElementById('autoPauseToggle'),movingTime:document.getElementById('runMovingTime'),topSpeed:document.getElementById('runTopSpeed'),
  quality:document.getElementById('gpsQuality'),map:document.getElementById('liveRunMap')
};
const shareEls={
  dialog:document.getElementById('shareRunDialog'),photo:document.getElementById('sharePhotoInput'),ratio:document.getElementById('shareRatioSelect'),style:document.getElementById('shareStyleSelect'),
  caption:document.getElementById('shareCaptionInput'),canvas:document.getElementById('shareCanvas'),render:document.getElementById('renderShareBtn'),
  download:document.getElementById('downloadShareBtn'),nativeShare:document.getElementById('nativeShareBtn'),textSize:document.getElementById('shareTextSize'),routeSize:document.getElementById('shareRouteSize'),logoSize:document.getElementById('shareLogoSize'),photoSize:document.getElementById('sharePhotoSize'),editTarget:document.getElementById('shareEditTarget'),textSizeValue:document.getElementById('shareTextSizeValue'),routeSizeValue:document.getElementById('shareRouteSizeValue'),logoSizeValue:document.getElementById('shareLogoSizeValue'),photoSizeValue:document.getElementById('sharePhotoSizeValue'),resetLayout:document.getElementById('resetStoryLayoutBtn'),saveLayout:document.getElementById('saveStoryLayoutBtn')
};
let shareRunRecord=null,sharePhotoImage=null,sharePhotoTransform={x:0,y:0,zoom:1},shareDrag=null,shareBounds={};
const defaultStoryLayout={logo:{x:.50,y:.085},route:{x:.20,y:.49},metrics:{x:.075,y:.72},caption:{x:.075,y:.826},footer:{x:.925,y:.955}};
function storyLayout(){const saved=state.settings.storyLayout||{};return Object.fromEntries(Object.entries(defaultStoryLayout).map(([k,v])=>[k,{...v,...(saved[k]||{})}]))}
function clamp01(n,min=.03,max=.97){return Math.max(min,Math.min(max,n))}
function pointInBounds(x,y,b){return b&&x>=b.x&&x<=b.x+b.w&&y>=b.y&&y<=b.y+b.h}
function sharePointerPoint(e){const r=shareEls.canvas.getBoundingClientRect();return{x:(e.clientX-r.left)*shareEls.canvas.width/r.width,y:(e.clientY-r.top)*shareEls.canvas.height/r.height}}
const ACTIVE_RUN_KEY='eldyn-active-run-v4';
function saveActiveRun(){if(!runSession){localStorage.removeItem(ACTIVE_RUN_KEY);return}const snap={...runSession,savedAt:Date.now()};localStorage.setItem(ACTIVE_RUN_KEY,JSON.stringify(snap))}
function restoreActiveRun(){try{const r=JSON.parse(localStorage.getItem(ACTIVE_RUN_KEY)||'null');if(!r||Date.now()-(r.savedAt||0)>12*3600e3)return localStorage.removeItem(ACTIVE_RUN_KEY);runSession=r;if(r.status==='running'){runSession.elapsedBefore=(r.elapsedBefore||0)+Math.max(0,Date.now()-(r.segmentStartedAt||Date.now()));runSession.segmentStartedAt=Date.now();runSession.lastPoint=null;runSession.status='paused';runSession.autoPaused=false}runEls.gpsToggle.checked=!!runSession.gpsEnabled;runEls.autoPause.checked=runSession.autoPauseEnabled!==false;runTimer=setInterval(()=>{renderRun();saveActiveRun()},1000)}catch{localStorage.removeItem(ACTIVE_RUN_KEY)}}
function gpsQualityLabel(acc){if(!Number.isFinite(acc))return 'WAITING';if(acc<=10)return 'EXCELLENT';if(acc<=25)return 'GOOD';if(acc<=50)return 'FAIR';return 'LOW'}
let liveRunMap=null,liveRunPath=null,liveRunMarker=null,liveRunStartMarker=null,liveMapHasFit=false;
function ensureLiveRunMap(){
  if(liveRunMap||!runEls.map||!window.L)return;
  liveRunMap=L.map(runEls.map,{zoomControl:true,attributionControl:true}).setView([37.5665,126.9780],13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap contributors'}).addTo(liveRunMap);
  liveRunPath=L.polyline([],{color:'#b9ff3f',weight:6,opacity:1,lineCap:'round',lineJoin:'round'}).addTo(liveRunMap);
  setTimeout(()=>liveRunMap.invalidateSize(),120);
}
function updateLiveRunMap(){
  ensureLiveRunMap();if(!liveRunMap)return;
  const pts=(runSession?.route||[]).filter(p=>Number.isFinite(+p.lat)&&Number.isFinite(+p.lon)).map(p=>[+p.lat,+p.lon]);
  liveRunPath.setLatLngs(pts);
  if(pts.length){
    if(!liveRunStartMarker)liveRunStartMarker=L.circleMarker(pts[0],{radius:7,color:'#fff',weight:3,fillColor:'#b9ff3f',fillOpacity:1}).addTo(liveRunMap).bindTooltip('S',{permanent:true,direction:'center',className:'run-marker-label'});
    else liveRunStartMarker.setLatLng(pts[0]);
    const last=pts[pts.length-1];
    if(!liveRunMarker)liveRunMarker=L.circleMarker(last,{radius:9,color:'#fff',weight:3,fillColor:'#b9ff3f',fillOpacity:1}).addTo(liveRunMap).bindTooltip('●',{permanent:true,direction:'center',className:'run-marker-label current'});
    else liveRunMarker.setLatLng(last);
    if(!liveMapHasFit&&pts.length>1){liveRunMap.fitBounds(L.latLngBounds(pts),{padding:[36,36],maxZoom:17});liveMapHasFit=true}
    else if(runSession?.status==='running')liveRunMap.panTo(last,{animate:true,duration:.35});
  }else{
    liveMapHasFit=false;
    if(liveRunMarker){liveRunMap.removeLayer(liveRunMarker);liveRunMarker=null}
    if(liveRunStartMarker){liveRunMap.removeLayer(liveRunStartMarker);liveRunStartMarker=null}
  }
}
function drawLiveRoute(){updateLiveRunMap()}

function haversine(a,b){const R=6371000,toRad=x=>x*Math.PI/180,dLat=toRad(b.lat-a.lat),dLon=toRad(b.lon-a.lon),la1=toRad(a.lat),la2=toRad(b.lat);const q=Math.sin(dLat/2)**2+Math.cos(la1)*Math.cos(la2)*Math.sin(dLon/2)**2;return 2*R*Math.asin(Math.sqrt(q))}
function elapsedMs(){if(!runSession)return 0;return runSession.elapsedBefore+(runSession.status==='running'?Date.now()-runSession.segmentStartedAt:0)}
function movingMs(){if(!runSession)return 0;return (runSession.movingMs||0)+(runSession.status==='running'&&!runSession.autoPaused&&runSession.movingSegmentAt?Date.now()-runSession.movingSegmentAt:0)}
function formatClock(ms){const sec=Math.max(0,Math.floor(ms/1000)),h=Math.floor(sec/3600),m=Math.floor(sec%3600/60),s=sec%60;return [h,m,s].map(x=>String(x).padStart(2,'0')).join(':')}
function paceText(secPerKm){if(!Number.isFinite(secPerKm)||secPerKm<=0||secPerKm>3600)return `--'--"`;const m=Math.floor(secPerKm/60),s=Math.round(secPerKm%60);return `${m}'${String(s).padStart(2,'0')}"`}
function runningScore(run){if(!run||!run.distanceKm)return 0;const pace=run.avgPaceSecKm||3600,distance=Math.min(run.distanceKm,10),pacePoints=Math.max(0,Math.min(65,(900-pace)/7)),distancePoints=Math.min(25,distance*3),finishPoints=run.durationMs>0?10:0;return Math.round(Math.max(0,Math.min(100,pacePoints+distancePoints+finishPoints)))}
function renderLatestRunAnalysis(){const el=document.getElementById('latestRunAnalysis');if(!el)return;const runs=(state.runs||[]).slice().sort((a,b)=>new Date(b.endedAt)-new Date(a.endedAt));const r=runs[0];if(!r){el.innerHTML='<div class="empty-state"><span>🏃</span><p>Complete a run to see pace, speed and performance insights here.</p></div>';return}const previous=runs[1],bestSplit=(r.splits||[]).map(x=>+x.seconds).filter(Number.isFinite).sort((a,b)=>a-b)[0],bestPace=bestSplit||r.avgPaceSecKm,avgSpeed=Number.isFinite(r.avgPaceSecKm)&&r.avgPaceSecKm>0?3600/r.avgPaceSecKm:0,delta=previous&&Number.isFinite(previous.avgPaceSecKm)?Math.round(previous.avgPaceSecKm-r.avgPaceSecKm):null,trend=delta===null?'첫 기록이 저장되었습니다.':delta>0?`이전 기록보다 ${delta}초/km 빨라졌어요.`:delta<0?`이전 기록보다 ${Math.abs(delta)}초/km 느려졌어요.`:'이전 기록과 같은 평균 페이스예요.';el.innerHTML=`<div class="latest-run-head"><div><p class="eyebrow">${new Date(r.endedAt).toLocaleDateString()}</p><h3>${r.distanceKm.toFixed(2)} km run</h3></div><span class="run-score-pill">${runningScore(r)} SCORE</span></div><div class="run-analysis-grid"><div><span>AVERAGE PACE</span><strong>${paceText(r.avgPaceSecKm)}</strong><small>/km</small></div><div><span>BEST PACE</span><strong>${paceText(bestPace)}</strong><small>/km</small></div><div><span>AVERAGE SPEED</span><strong>${avgSpeed.toFixed(1)}</strong><small>km/h</small></div><div><span>CALORIES</span><strong>${r.calories||0}</strong><small>kcal</small></div></div><p class="run-trend">${trend}</p>`}
function runCalories(distanceKm){const weight=+state.settings.currentWeight||78;return Math.round(distanceKm*weight)}
function renderRun(){
  const r=runSession,d=r?r.distanceM/1000:0,ms=r?elapsedMs():0,avg=d>0?(ms/1000)/d:Infinity;updateRunDocumentTitle();
  runEls.time.textContent=formatClock(ms);runEls.distance.textContent=d.toFixed(2);runEls.averagePace.textContent=paceText(avg);
  runEls.movingTime.textContent=formatClock(r?movingMs():0);runEls.topSpeed.textContent=((r?.topSpeedMps||0)*3.6).toFixed(1);runEls.quality.textContent=r?.gpsEnabled?gpsQualityLabel(r?.accuracy):'GPS OFF';drawLiveRoute();
  runEls.currentPace.textContent=paceText(r?.currentPace||Infinity);runEls.calories.textContent=runCalories(d);
  runEls.accuracy.textContent=r?.gpsEnabled?(r?.accuracy?Math.round(r.accuracy):'--'):'OFF';
  runEls.gpsToggle.disabled=!!r;runEls.gpsToggle.checked=r?r.gpsEnabled:runEls.gpsToggle.checked;
  if(!r){
    runEls.title.textContent='Ready to run';
    runEls.note.textContent=runEls.gpsToggle.checked?'GPS will map your route after you tap Start Run.':'Private timer mode. No location will be collected.';
    runEls.gps.textContent=runEls.gpsToggle.checked?'GPS waiting':'GPS off';runEls.gps.className='gps-badge';
    runEls.start.hidden=false;runEls.pause.hidden=true;runEls.finish.hidden=true
  } else if(r.status==='running'){
    runEls.title.textContent=r.autoPaused?'Auto paused':'Run in progress';
    runEls.note.textContent=r.autoPaused?'Movement stopped. ELDYN will resume automatically.':(r.gpsEnabled?'Route tracking is active. Stay aware of your surroundings.':'Timer-only private run. You can enter distance when finishing.');
    runEls.gps.textContent=r.gpsEnabled?(r.hasFix?'GPS live':'Finding GPS…'):'GPS off';runEls.gps.className=r.gpsEnabled?'gps-badge live':'gps-badge';
    runEls.start.hidden=true;runEls.pause.hidden=false;runEls.pause.textContent='Ⅱ Pause';runEls.finish.hidden=false
  } else {
    runEls.title.textContent='Run paused';runEls.note.textContent='Resume when you are ready.';
    runEls.gps.textContent=r.gpsEnabled?'GPS paused':'GPS off';runEls.gps.className='gps-badge';
    runEls.start.hidden=true;runEls.pause.hidden=false;runEls.pause.textContent='▶ Resume';runEls.finish.hidden=false
  }
  const splits=r?.splits||[];
  runEls.splits.innerHTML=splits.length?splits.map((x,i)=>`<div class="split-row"><span>KM ${i+1}</span><strong>${paceText(x.seconds)}</strong></div>`).join(''):'<div class="empty-state"><span>🏃</span><p>Your 1 km splits will appear here.</p></div>';
  const history=(state.runs||[]).slice().sort((a,b)=>new Date(b.endedAt)-new Date(a.endedAt)).slice(0,10);
  runEls.history.innerHTML=history.length?history.map(x=>`<div class="run-history-card"><div><h3>${new Date(x.endedAt).toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'})}</h3><p>${formatClock(x.durationMs)} · ${paceText(x.avgPaceSecKm)}/km · ${x.calories} kcal ${x.gpsEnabled===false?'· GPS OFF':''}</p></div><div class="run-history-actions"><strong class="history-distance">${x.distanceKm.toFixed(2)} km</strong><button class="mini-edit share-run-btn" data-run-id="${x.id}">Share card</button></div></div>`).join(''):'<div class="empty-state"><span>👟</span><p>No completed runs yet.</p></div>';
  runEls.history.querySelectorAll('.share-run-btn').forEach(btn=>btn.addEventListener('click',()=>openShareCard(btn.dataset.runId)));
}
async function requestWakeLock(){try{if('wakeLock'in navigator&&document.visibilityState==='visible')runWakeLock=await navigator.wakeLock.request('screen')}catch{}}
function releaseWakeLock(){try{runWakeLock?.release()}catch{}runWakeLock=null}
const RUN_NOTICE_TAG='eldyn-active-run';
function runNoticeBody(){
  if(!runSession)return 'ELDYN running session';
  const km=((runSession.distanceM||0)/1000).toFixed(2),time=formatClock(elapsedMs()),pace=paceText(km>0?(elapsedMs()/1000)/(+km):Infinity);
  return `${km} km · ${time} · ${pace}/km`;
}
async function requestRunNoticePermission(){
  try{
    if(!('Notification'in window))return false;
    if(Notification.permission==='granted')return true;
    if(Notification.permission==='default')return (await Notification.requestPermission())==='granted';
  }catch{}
  return false;
}
async function showRunCompanionNotification(force=false){
  if(!runSession||runSession.status!=='running')return;
  try{
    if(!force&&document.visibilityState==='visible')return;
    if(!('serviceWorker'in navigator)||!('Notification'in window)||Notification.permission!=='granted')return;
    const reg=await navigator.serviceWorker.ready;
    const payload={type:'ELDYN_RUN_STATUS',title:'ELDYN · Run in progress',body:runNoticeBody(),url:location.href};
    if(reg.active)reg.active.postMessage(payload);
    else await reg.showNotification(payload.title,{body:payload.body,tag:RUN_NOTICE_TAG,icon:'./icons/icon-192.png',badge:'./icons/icon-192.png',silent:true,renotify:false,requireInteraction:true,data:{url:payload.url}});
    if('setAppBadge'in navigator)await navigator.setAppBadge(1);
  }catch{}
}
async function clearRunCompanionNotification(){
  try{
    if('serviceWorker'in navigator){const reg=await navigator.serviceWorker.ready;(await reg.getNotifications({tag:RUN_NOTICE_TAG})).forEach(n=>n.close())}
    if('clearAppBadge'in navigator)await navigator.clearAppBadge();
  }catch{}
}
function updateRunDocumentTitle(){
  if(runSession?.status==='running')document.title=`${((runSession.distanceM||0)/1000).toFixed(2)} km · ${formatClock(elapsedMs())} · ELDYN`;
  else document.title='ELDYN — Move Forward';
}
function startGps(){if(!runSession?.gpsEnabled)return;if(!navigator.geolocation){return gpsError({message:'This browser does not support GPS.'})}runWatchId=navigator.geolocation.watchPosition(onGps,gpsError,{enableHighAccuracy:true,maximumAge:500,timeout:15000})}
function stopGps(){if(runWatchId!==null)navigator.geolocation.clearWatch(runWatchId);runWatchId=null}
function onGps(pos){
  if(!runSession||runSession.status!=='running'||!runSession.gpsEnabled)return;
  const c=pos.coords,p={lat:c.latitude,lon:c.longitude,t:pos.timestamp||Date.now(),accuracy:c.accuracy};
  runSession.accuracy=c.accuracy;runSession.hasFix=true;if(c.accuracy>65){renderRun();return}
  const prev=runSession.lastPoint;
  if(prev){
    const delta=haversine(prev,p),seconds=(p.t-prev.t)/1000,speed=seconds>0?delta/seconds:0;
    runSession.speedSamples=(runSession.speedSamples||[]).concat(speed).slice(-5);
    const sorted=[...runSession.speedSamples].sort((x,y)=>x-y),smooth=sorted[Math.floor(sorted.length/2)]||0;
    if(runSession.autoPauseEnabled){
      if(smooth<.45){
        runSession.stillSince=runSession.stillSince||Date.now();
        if(!runSession.autoPaused&&Date.now()-runSession.stillSince>6000){
          runSession.autoPaused=true;
          if(runSession.movingSegmentAt){runSession.movingMs+=Date.now()-runSession.movingSegmentAt;runSession.movingSegmentAt=null}
        }
      }else{
        runSession.stillSince=null;
        if(runSession.autoPaused){runSession.autoPaused=false;runSession.movingSegmentAt=Date.now();runSession.lastPoint=p;saveActiveRun();renderRun();return}
      }
    }
    if(delta>=1.5&&delta<100&&speed<12&&!runSession.autoPaused){
      runSession.distanceM+=delta;runSession.currentPace=smooth>.5?1000/smooth:Infinity;runSession.topSpeedMps=Math.max(runSession.topSpeedMps||0,smooth);runSession.route.push({lat:p.lat,lon:p.lon});
      const completed=Math.floor(runSession.distanceM/1000);
      while(runSession.splits.length<completed){const totalSec=movingMs()/1000,previous=runSession.splits.reduce((n,x)=>n+x.seconds,0);runSession.splits.push({km:runSession.splits.length+1,seconds:Math.max(1,totalSec-previous)})}
    }
  } else runSession.route.push({lat:p.lat,lon:p.lon});
  runSession.lastPoint=p;saveActiveRun();renderRun()
}
function gpsError(err){runEls.gps.textContent=err?.code===1?'Location denied':'GPS unavailable';runEls.gps.className='gps-badge error';runEls.note.textContent=err?.code===1?'Allow location access or finish and restart with GPS switched off.':'Move outdoors, or restart with GPS switched off.'}
function beginRun(){
  const gpsEnabled=runEls.gpsToggle.checked;
  if(gpsEnabled&&!window.isSecureContext)return alert('GPS requires HTTPS. Open the Vercel URL, or switch GPS off.');
  runSession={status:'running',gpsEnabled,autoPauseEnabled:runEls.autoPause.checked,autoPaused:false,startedAt:new Date().toISOString(),segmentStartedAt:Date.now(),elapsedBefore:0,movingMs:0,movingSegmentAt:Date.now(),distanceM:0,lastPoint:null,currentPace:Infinity,topSpeedMps:0,accuracy:null,hasFix:false,speedSamples:[],splits:[],route:[]};saveActiveRun();
  if(gpsEnabled)startGps();requestWakeLock();requestRunNoticePermission().then(ok=>{if(ok)showRunCompanionNotification(true)});runTimer=setInterval(()=>{renderRun();saveActiveRun()},1000);renderRun()
}
function togglePause(){
  if(!runSession)return;
  if(runSession.status==='running'){runSession.elapsedBefore=elapsedMs();if(runSession.movingSegmentAt){runSession.movingMs=movingMs();runSession.movingSegmentAt=null}runSession.status='paused';runSession.autoPaused=false;runSession.lastPoint=null;stopGps();releaseWakeLock();clearRunCompanionNotification();saveActiveRun()}
  else{runSession.status='running';runSession.segmentStartedAt=Date.now();runSession.movingSegmentAt=Date.now();if(runSession.gpsEnabled)startGps();requestWakeLock();showRunCompanionNotification(true);saveActiveRun()}
  renderRun()
}
function finishRun(){
  if(!runSession)return;
  const durationMs=elapsedMs(),movingDurationMs=movingMs();let distanceKm=runSession.distanceM/1000;
  if(durationMs<10000&&!confirm('This run is under 10 seconds. Finish without saving?'))return;
  if(!runSession.gpsEnabled){
    const manual=prompt('GPS was off. Enter your distance in kilometres (example: 3.5).','');
    if(manual===null)return;
    distanceKm=Math.max(0,Number(String(manual).replace(',','.'))||0);
  }
  stopGps();releaseWakeLock();clearRunCompanionNotification();clearInterval(runTimer);runTimer=null;
  if(distanceKm>=.02){
    const record={id:crypto.randomUUID(),startedAt:runSession.startedAt,endedAt:new Date().toISOString(),durationMs,distanceKm,
      avgPaceSecKm:((movingDurationMs||durationMs)/1000)/distanceKm,calories:runCalories(distanceKm),splits:runSession.splits,
      movingDurationMs,topSpeedKmh:(runSession.topSpeedMps||0)*3.6,route:runSession.route||[],gpsEnabled:runSession.gpsEnabled,autoPauseEnabled:runSession.autoPauseEnabled};
    state.runs=state.runs||[];state.runs.push(record);
    const runDate=todayKey();const log=getLog(runDate);log.runs=mergeRuns(log.runs,[record]);log.priorities.workout=true;log.updatedAt=new Date().toISOString();saveState();
    saveDailyLogNow(runDate,{verify:false}).catch(()=>{});
    const savedId=record.id;runSession=null;saveActiveRun();renderRun();renderToday();openShareCard(savedId)
  } else {runSession=null;saveActiveRun();renderRun()}
}
function coverImage(ctx,img,w,h){const zoom=Math.max(1,sharePhotoTransform.zoom||1),scale=Math.max(w/img.width,h/img.height)*zoom,sw=w/scale,sh=h/scale,maxX=Math.max(0,(img.width-sw)/2),maxY=Math.max(0,(img.height-sh)/2),sx=Math.max(0,Math.min(img.width-sw,(img.width-sw)/2-(sharePhotoTransform.x||0)*maxX)),sy=Math.max(0,Math.min(img.height-sh,(img.height-sh)/2-(sharePhotoTransform.y||0)*maxY));ctx.drawImage(img,sx,sy,sw,sh,0,0,w,h)}
function mercatorWorld(lat,lon,zoom){
  const scale=256*Math.pow(2,zoom),clamped=Math.max(-85.0511,Math.min(85.0511,lat)),sin=Math.sin(clamped*Math.PI/180);
  return{x:(lon+180)/360*scale,y:(.5-Math.log((1+sin)/(1-sin))/(4*Math.PI))*scale}
}
function routeViewport(route,w,h){
  const clean=(route||[]).filter(p=>Number.isFinite(+p.lat)&&Number.isFinite(+(p.lon??p.lng))).map(p=>({lat:+p.lat,lon:+(p.lon??p.lng)}));
  if(clean.length<2)return null;
  let minLat=Math.min(...clean.map(p=>p.lat)),maxLat=Math.max(...clean.map(p=>p.lat)),minLon=Math.min(...clean.map(p=>p.lon)),maxLon=Math.max(...clean.map(p=>p.lon));
  const latPad=Math.max((maxLat-minLat)*.22,.00035),lonPad=Math.max((maxLon-minLon)*.22,.00035);minLat-=latPad;maxLat+=latPad;minLon-=lonPad;maxLon+=lonPad;
  let zoom=17;for(;zoom>=3;zoom--){const a=mercatorWorld(maxLat,minLon,zoom),b=mercatorWorld(minLat,maxLon,zoom);if((b.x-a.x)<=w&&(b.y-a.y)<=h)break}
  const center=mercatorWorld((minLat+maxLat)/2,(minLon+maxLon)/2,zoom);return{clean,zoom,center,originX:center.x-w/2,originY:center.y-h/2}
}
function loadMapTile(z,x,y){return new Promise(resolve=>{const img=new Image();img.crossOrigin='anonymous';img.onload=()=>resolve(img);img.onerror=()=>resolve(null);img.src=`https://tile.openstreetmap.org/${z}/${x}/${y}.png`})}
function drawMapFallback(ctx,x,y,w,h){
  ctx.fillStyle='#18201b';ctx.fillRect(x,y,w,h);ctx.strokeStyle='rgba(255,255,255,.10)';ctx.lineWidth=3;
  for(let i=-2;i<9;i++){ctx.beginPath();ctx.moveTo(x+i*w/7,y);ctx.lineTo(x+(i+3)*w/7,y+h);ctx.stroke()}
  for(let i=1;i<7;i++){ctx.beginPath();ctx.moveTo(x,y+i*h/7);ctx.bezierCurveTo(x+w*.3,y+(i-.8)*h/7,x+w*.68,y+(i+.7)*h/7,x+w,y+i*h/7);ctx.stroke()}
}
async function drawRouteMap(ctx,route,x,y,w,h,radius=28){
  const view=routeViewport(route,w-36,h-36);ctx.save();ctx.beginPath();ctx.roundRect(x,y,w,h,radius);ctx.clip();drawMapFallback(ctx,x,y,w,h);
  if(!view){ctx.restore();return false}
  const z=view.zoom,tile=256,minTX=Math.floor(view.originX/tile),maxTX=Math.floor((view.originX+w)/tile),minTY=Math.floor(view.originY/tile),maxTY=Math.floor((view.originY+h)/tile),jobs=[];
  for(let ty=minTY;ty<=maxTY;ty++)for(let tx=minTX;tx<=maxTX;tx++)jobs.push({tx,ty,p:loadMapTile(z,tx,ty)});
  const tiles=await Promise.all(jobs.map(j=>j.p));tiles.forEach((img,i)=>{if(!img)return;const j=jobs[i];ctx.drawImage(img,x+j.tx*tile-view.originX,y+j.ty*tile-view.originY,tile,tile)});
  ctx.fillStyle='rgba(4,8,6,.20)';ctx.fillRect(x,y,w,h);
  const points=view.clean.map(p=>{const q=mercatorWorld(p.lat,p.lon,z);return{x:x+q.x-view.originX,y:y+q.y-view.originY}});
  ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.lineWidth=Math.max(8,w*.012);ctx.lineCap='round';ctx.lineJoin='round';ctx.strokeStyle='#b9ff3f';ctx.shadowColor='rgba(185,255,63,.48)';ctx.shadowBlur=14;ctx.stroke();ctx.shadowBlur=0;
  const marker=(p,label,fill)=>{ctx.beginPath();ctx.arc(p.x,p.y,15,0,Math.PI*2);ctx.fillStyle=fill;ctx.fill();ctx.lineWidth=5;ctx.strokeStyle='#fff';ctx.stroke();ctx.fillStyle='#071007';ctx.font='900 16px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(label,p.x,p.y+1)};
  marker(points[0],'S','#b9ff3f');marker(points[points.length-1],'F','#ffffff');ctx.textAlign='left';ctx.textBaseline='alphabetic';ctx.restore();return true
}

function routeOverlayPoints(route,x,y,w,h){
  const clean=(route||[]).filter(p=>Number.isFinite(+p.lat)&&Number.isFinite(+p.lon));if(clean.length<2)return null;
  let minLat=Math.min(...clean.map(p=>+p.lat)),maxLat=Math.max(...clean.map(p=>+p.lat)),minLon=Math.min(...clean.map(p=>+p.lon)),maxLon=Math.max(...clean.map(p=>+p.lon));
  const latRange=Math.max(maxLat-minLat,.0001),lonRange=Math.max(maxLon-minLon,.0001),pad=Math.min(w,h)*.10,scale=Math.min((w-pad*2)/lonRange,(h-pad*2)/latRange);
  return clean.map(p=>({x:x+w/2+((+p.lon-(minLon+maxLon)/2)*scale),y:y+h/2-((+p.lat-(minLat+maxLat)/2)*scale)}));
}
function drawRouteOverlay(ctx,route,x,y,w,h,transparent=false){
  const pts=routeOverlayPoints(route,x,y,w,h);if(!pts)return false;ctx.save();ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));if(!transparent){ctx.strokeStyle='rgba(0,0,0,.58)';ctx.lineWidth=Math.max(14,w*.018);ctx.stroke()}ctx.strokeStyle='#b9ff3f';ctx.lineWidth=Math.max(5,w*.012);ctx.shadowBlur=0;ctx.stroke();
  const marker=(p,label,finish=false)=>{const radius=Math.max(12,w*.037);ctx.beginPath();ctx.arc(p.x,p.y,radius,0,Math.PI*2);ctx.fillStyle=finish?'rgba(255,255,255,.96)':'#b9ff3f';ctx.fill();ctx.lineWidth=transparent?2:4;ctx.strokeStyle=transparent?'rgba(255,255,255,.92)':'rgba(0,0,0,.75)';ctx.stroke();ctx.fillStyle='#071007';ctx.font=`900 ${Math.max(12,Math.round(w*.038))}px system-ui`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(label,p.x,p.y+1)};marker(pts[0],'S');marker(pts[pts.length-1],'F',true);ctx.restore();return true;
}
let shareRenderToken=0;
async function renderShareCard(){
  if(!shareRunRecord)return;const token=++shareRenderToken;
  const ratio=shareEls.ratio.value,style=shareEls.style?.value||'photo',textScale=(+shareEls.textSize?.value||88)/100,routeScale=(+shareEls.routeSize?.value||80)/100,logoScale=(+shareEls.logoSize?.value||88)/100,sizes={story:[1080,1920],feed:[1080,1350],square:[1080,1080]},[w,h]=sizes[ratio];
  const c=shareEls.canvas,ctx=c.getContext('2d');c.width=w;c.height=h;const r=shareRunRecord,pad=w*.075,L=storyLayout();shareBounds={};
  const base=()=>{if(sharePhotoImage)coverImage(ctx,sharePhotoImage,w,h);else{const g=ctx.createLinearGradient(0,0,w,h);g.addColorStop(0,'#121a14');g.addColorStop(1,'#050706');ctx.fillStyle=g;ctx.fillRect(0,0,w,h)}};base();
  if(style==='map'){ctx.fillStyle='#071007';ctx.fillRect(0,0,w,h);await drawRouteMap(ctx,r.route,pad,h*.16,w-pad*2,h*.49,34)}
  else if(style==='split'){ctx.fillStyle='#071007';ctx.fillRect(w*.54,0,w*.46,h);await drawRouteMap(ctx,r.route,w*.56,h*.15,w*.39,h*.47,30);if(sharePhotoImage){ctx.save();ctx.beginPath();ctx.rect(0,0,w*.54,h);ctx.clip();coverImage(ctx,sharePhotoImage,w*.54,h);ctx.restore()}}
  if(token!==shareRenderToken)return;
  if(style!=='photo'){const shade=ctx.createLinearGradient(0,0,0,h);shade.addColorStop(0,'rgba(0,0,0,.18)');shade.addColorStop(.48,'rgba(0,0,0,.08)');shade.addColorStop(1,'rgba(0,0,0,.88)');ctx.fillStyle=shade;ctx.fillRect(0,0,w,h)}
  if(style==='photo'){const routeW=w*.32*routeScale,routeH=h*.18*routeScale,routeX=L.route.x*w-routeW/2,routeY=L.route.y*h-routeH/2;drawRouteOverlay(ctx,r.route,routeX,routeY,routeW,routeH,true);shareBounds.route={x:routeX,y:routeY,w:routeW,h:routeH}}
  const logoX=L.logo.x*w,logoY=L.logo.y*h;ctx.textAlign='center';ctx.fillStyle='#b9ff3f';ctx.font=`900 ${Math.round(w*.046*logoScale)}px system-ui`;ctx.fillText('ELDYN',logoX,logoY);ctx.font=`700 ${Math.round(w*.015*logoScale)}px system-ui`;ctx.fillStyle='rgba(255,255,255,.84)';ctx.fillText('MOVE FORWARD',logoX,logoY+w*.030*logoScale);shareBounds.logo={x:logoX-w*.13*logoScale,y:logoY-w*.05*logoScale,w:w*.26*logoScale,h:w*.09*logoScale};
  const metricsX=L.metrics.x*w,metricsY=L.metrics.y*h;ctx.textAlign='left';ctx.fillStyle='#fff';ctx.shadowColor='rgba(0,0,0,.38)';ctx.shadowBlur=4;ctx.font=`900 ${Math.round(w*.100*textScale)}px system-ui`;ctx.fillText(`${r.distanceKm.toFixed(2)} KM`,metricsX,metricsY);ctx.font=`750 ${Math.round(w*.035*textScale)}px system-ui`;ctx.fillText(`${formatClock(r.durationMs)}   ·   AVG ${paceText(r.avgPaceSecKm)}/KM`,metricsX,metricsY+h*.050);shareBounds.metrics={x:metricsX-w*.02,y:metricsY-w*.11*textScale,w:w*.82,h:h*.09};
  const caption=(shareEls.caption.value||'Today, I showed up. (ง •̀_•́)ง').trim(),captionX=L.caption.x*w,captionY=L.caption.y*h;ctx.font=`550 ${Math.round(w*.028*textScale)}px system-ui`;ctx.fillStyle='rgba(255,255,255,.96)';ctx.fillText(caption.slice(0,64),captionX,captionY);shareBounds.caption={x:captionX-w*.02,y:captionY-w*.04,w:w*.82,h:w*.06};
  ctx.font=`650 ${Math.round(w*.019*textScale)}px system-ui`;ctx.fillStyle='rgba(255,255,255,.82)';ctx.fillText(`${new Date(r.endedAt).toLocaleDateString()}  ·  ${r.calories} KCAL`,pad,h-pad*.92);const footerX=L.footer.x*w,footerY=L.footer.y*h;ctx.textAlign='right';ctx.fillStyle='rgba(255,255,255,.88)';ctx.font=`800 ${Math.round(w*.018*logoScale)}px system-ui`;ctx.fillText('ELDYN',footerX,footerY);shareBounds.footer={x:footerX-w*.14*logoScale,y:footerY-w*.030*logoScale,w:w*.15*logoScale,h:w*.045*logoScale};ctx.shadowBlur=0;ctx.textAlign='left';if(style!=='photo'){ctx.font=`500 ${Math.round(w*.016)}px system-ui`;ctx.fillStyle='rgba(255,255,255,.45)';ctx.fillText('Map © OpenStreetMap contributors',pad,h-pad*.48)}
}
function openShareCard(id){
  shareRunRecord=(state.runs||[]).find(r=>r.id===id);if(!shareRunRecord)return;
  shareEls.caption.value=state.settings.language==='en'?'Today, I showed up. (ง •̀_•́)ง':'오늘도 해냈다. (ง •̀_•́)ง';sharePhotoImage=null;sharePhotoTransform={x:0,y:0,zoom:1};if(shareEls.photoSize)shareEls.photoSize.value='100';shareEls.photo.value='';updateStoryRangeLabels();renderShareCard();shareEls.dialog.showModal()
}
shareEls.photo.addEventListener('change',()=>{const file=shareEls.photo.files?.[0];if(!file)return;const img=new Image();img.onload=()=>{sharePhotoImage=img;sharePhotoTransform={x:0,y:0,zoom:(+shareEls.photoSize?.value||100)/100};renderShareCard();URL.revokeObjectURL(img.src)};img.src=URL.createObjectURL(file)});
shareEls.ratio.addEventListener('change',()=>renderShareCard());shareEls.style?.addEventListener('change',()=>renderShareCard());shareEls.caption.addEventListener('input',()=>renderShareCard());
function updateStoryRangeLabels(){if(shareEls.textSizeValue)shareEls.textSizeValue.textContent=`${shareEls.textSize.value}%`;if(shareEls.routeSizeValue)shareEls.routeSizeValue.textContent=`${shareEls.routeSize.value}%`;if(shareEls.logoSizeValue)shareEls.logoSizeValue.textContent=`${shareEls.logoSize.value}%`;if(shareEls.photoSizeValue)shareEls.photoSizeValue.textContent=`${shareEls.photoSize.value}%`}
[shareEls.textSize,shareEls.routeSize,shareEls.logoSize].forEach(el=>el?.addEventListener('input',()=>{updateStoryRangeLabels();renderShareCard()}));shareEls.photoSize?.addEventListener('input',()=>{sharePhotoTransform.zoom=(+shareEls.photoSize.value||100)/100;updateStoryRangeLabels();renderShareCard()});updateStoryRangeLabels();shareEls.render.addEventListener('click',()=>renderShareCard());
shareEls.canvas.addEventListener('pointerdown',e=>{const p=sharePointerPoint(e),target=shareEls.editTarget?.value||'auto',order=['caption','metrics','logo','route','footer'];let key=null;if(target==='auto')key=order.find(k=>pointInBounds(p.x,p.y,shareBounds[k]));else if(target!=='photo')key=target;if(key&&shareBounds[key]){shareDrag={type:'element',key,start:p,origin:{...storyLayout()[key]}}}else if(sharePhotoImage&&(target==='photo'||target==='auto')){shareDrag={type:'photo',x:e.clientX,y:e.clientY,startX:sharePhotoTransform.x,startY:sharePhotoTransform.y,w:shareEls.canvas.getBoundingClientRect().width,h:shareEls.canvas.getBoundingClientRect().height}}else return;shareEls.canvas.setPointerCapture?.(e.pointerId);shareEls.canvas.classList.add('dragging');e.preventDefault()});
shareEls.canvas.addEventListener('pointermove',e=>{if(!shareDrag)return;if(shareDrag.type==='photo'){const dx=(e.clientX-shareDrag.x)/Math.max(1,shareDrag.w),dy=(e.clientY-shareDrag.y)/Math.max(1,shareDrag.h);sharePhotoTransform.x=Math.max(-1,Math.min(1,shareDrag.startX+dx*2));sharePhotoTransform.y=Math.max(-1,Math.min(1,shareDrag.startY+dy*2))}else{const p=sharePointerPoint(e),dx=(p.x-shareDrag.start.x)/shareEls.canvas.width,dy=(p.y-shareDrag.start.y)/shareEls.canvas.height;let x=clamp01(shareDrag.origin.x+dx),y=clamp01(shareDrag.origin.y+dy);for(const g of [.075,.5,.925]){if(Math.abs(x-g)<.018)x=g;if(Math.abs(y-g)<.018)y=g}state.settings.storyLayout=state.settings.storyLayout||{};state.settings.storyLayout[shareDrag.key]={x,y}}renderShareCard();e.preventDefault()});
function stopShareDrag(){if(!shareDrag)return;shareDrag=null;shareEls.canvas.classList.remove('dragging');saveState()}
shareEls.canvas.addEventListener('pointerup',stopShareDrag);shareEls.canvas.addEventListener('pointercancel',stopShareDrag);
shareEls.resetLayout?.addEventListener('click',()=>{state.settings.storyLayout=JSON.parse(JSON.stringify(defaultStoryLayout));sharePhotoTransform={x:0,y:0,zoom:(+shareEls.photoSize?.value||100)/100};saveState();renderShareCard()});
shareEls.saveLayout?.addEventListener('click',()=>{saveState();alert(state.settings.language==='en'?'Layout saved.':'현재 배치를 저장했어요.')});
function canvasBlob(){return new Promise(resolve=>shareEls.canvas.toBlob(resolve,'image/png',.95))}
shareEls.download.addEventListener('click',async()=>{const blob=await canvasBlob(),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`ELDYN-${shareRunRecord.distanceKm.toFixed(2)}KM.png`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)});
shareEls.nativeShare.addEventListener('click',async()=>{const blob=await canvasBlob(),file=new File([blob],`ELDYN-${shareRunRecord.distanceKm.toFixed(2)}KM.png`,{type:'image/png'});if(navigator.canShare?.({files:[file]})){await navigator.share({title:'ELDYN Run',text:'ELDYN Run Certified',files:[file]})}else{alert('Direct sharing is not supported here. Use Save image, then share it from your gallery.')}});
runEls.start.onclick=beginRun;runEls.pause.onclick=togglePause;runEls.finish.onclick=finishRun;runEls.gpsToggle.addEventListener('change',renderRun);runEls.autoPause.addEventListener('change',renderRun);
document.addEventListener('visibilitychange',()=>{
  if(document.visibilityState==='visible'){
    if(runSession?.status==='running'){requestWakeLock();if(runSession.gpsEnabled&&runWatchId===null)startGps()}
    clearRunCompanionNotification();
  }else{
    releaseWakeLock();
    if(runSession?.status==='running')showRunCompanionNotification(true);
  }
  saveActiveRun();
});
window.addEventListener('pagehide',()=>{saveActiveRun();if(runSession?.status==='running')showRunCompanionNotification(true)});
window.addEventListener('beforeunload',saveActiveRun);
setInterval(()=>{if(runSession){saveActiveRun();if(document.visibilityState==='hidden')showRunCompanionNotification()}},30000);restoreActiveRun();

const workoutStory={dialog:document.getElementById('workoutStoryDialog'),canvas:document.getElementById('workoutStoryCanvas'),photo:document.getElementById('workoutStoryPhoto'),type:document.getElementById('workoutStoryType'),duration:document.getElementById('workoutStoryDuration'),caption:document.getElementById('workoutStoryCaption')};let workoutStoryImage=null;function drawWorkoutStory(){const c=workoutStory.canvas;if(!c)return;const ctx=c.getContext('2d'),w=c.width,h=c.height;if(workoutStoryImage)coverImage(ctx,workoutStoryImage,w,h);else{ctx.fillStyle='#0a0d0b';ctx.fillRect(0,0,w,h)}const g=ctx.createLinearGradient(0,h*.45,0,h);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.82)');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);ctx.fillStyle='#39ff14';ctx.font='900 56px system-ui';ctx.fillText('ELDYN',70,95);ctx.fillStyle='#fff';ctx.font='900 92px system-ui';ctx.fillText(workoutStory.type.value.toUpperCase(),70,h-250);ctx.font='800 46px system-ui';ctx.fillText(`${workoutStory.duration.value||45} MIN`,70,h-180);ctx.font='500 34px system-ui';ctx.fillText((workoutStory.caption.value||'Today, I showed up.').slice(0,46),70,h-112)}document.getElementById('createWorkoutStoryBtn')?.addEventListener('click',()=>{drawWorkoutStory();workoutStory.dialog.showModal()});workoutStory.photo?.addEventListener('change',()=>{const f=workoutStory.photo.files?.[0];if(!f)return;const img=new Image();img.onload=()=>{workoutStoryImage=img;drawWorkoutStory();URL.revokeObjectURL(img.src)};img.src=URL.createObjectURL(f)});document.getElementById('renderWorkoutStoryBtn')?.addEventListener('click',drawWorkoutStory);document.getElementById('downloadWorkoutStoryBtn')?.addEventListener('click',()=>{drawWorkoutStory();const a=document.createElement('a');a.href=workoutStory.canvas.toDataURL('image/png');a.download='ELDYN-WORKOUT-STORY.png';a.click()});
let watchTimer=null,watchSeconds=0;function renderWatchPreview(){const latest=(state.runs||[]).slice().sort((a,b)=>new Date(b.endedAt)-new Date(a.endedAt))[0],km=watchTimer?watchSeconds/360:latest?.distanceKm||0,sec=watchTimer?watchSeconds:Math.round((latest?.durationMs||0)/1000),pace=km>0?sec/km:NaN;document.getElementById('watchTestDistance').textContent=`${km.toFixed(2)} km`;document.getElementById('watchTestTime').textContent=`${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`;document.getElementById('watchTestPace').textContent=`${paceText(pace)} /km`}document.getElementById('openWatchTestBtn')?.addEventListener('click',()=>{renderWatchPreview();document.getElementById('watchTestDialog').showModal()});document.getElementById('watchTestStart')?.addEventListener('click',()=>{if(watchTimer){clearInterval(watchTimer);watchTimer=null;watchTestStart.textContent='Start test'}else{watchTestStart.textContent='Pause';watchTimer=setInterval(()=>{watchSeconds++;renderWatchPreview()},1000)}});document.getElementById('watchTestReset')?.addEventListener('click',()=>{clearInterval(watchTimer);watchTimer=null;watchSeconds=0;watchTestStart.textContent='Start test';renderWatchPreview()});
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;installBtn.hidden=false});installBtn.onclick=async()=>{if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;installBtn.hidden=true}};if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));initSupabase();render();renderRun();


// --- ELDYN AI FOOD SCAN v4.1 ---
let foodScanImageData='',foodScanItems=[],foodScanMealIndex=0;
const foodScanEls={
  dialog:document.getElementById('foodScanDialog'),cameraInput:document.getElementById('foodScanCameraInput'),galleryInput:document.getElementById('foodScanGalleryInput'),cameraBtn:document.getElementById('foodScanCameraBtn'),galleryBtn:document.getElementById('foodScanGalleryBtn'),preview:document.getElementById('foodScanPreview'),placeholder:document.getElementById('foodScanPlaceholder'),meal:document.getElementById('foodScanMealSelect'),analyze:document.getElementById('analyzeFoodBtn'),status:document.getElementById('foodScanStatus'),results:document.getElementById('foodScanResults'),summary:document.getElementById('foodScanSummary'),add:document.getElementById('addFoodScanItemBtn'),save:document.getElementById('saveFoodScanBtn')
};
function openFoodScan(index=0){
  const meals=ensureMeals(getLog(activeDate),activeDate);foodScanMealIndex=Math.max(0,Math.min(index,meals.length-1));
  foodScanEls.meal.innerHTML=meals.map((m,i)=>`<option value="${i}" ${i===foodScanMealIndex?'selected':''}>${escapeHtml(m.name)}</option>`).join('');
  foodScanImageData='';foodScanItems=[];foodScanEls.cameraInput.value='';foodScanEls.galleryInput.value='';foodScanEls.preview.hidden=true;foodScanEls.placeholder.hidden=false;foodScanEls.analyze.disabled=true;foodScanEls.status.textContent='사진을 선택해 주세요.';foodScanEls.results.innerHTML='';foodScanEls.summary.hidden=true;foodScanEls.add.hidden=true;foodScanEls.save.hidden=true;foodScanEls.dialog.showModal();
}
async function imageFileToDataUrl(file,max=1800,quality=.9){
  if(!file||!file.type.startsWith('image/'))throw new Error('이미지 파일을 선택해 주세요.');
  if(file.size>20*1024*1024)throw new Error('사진 용량은 20MB 이하로 선택해 주세요.');
  const raw=await new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=()=>reject(new Error('사진을 읽지 못했습니다.'));r.readAsDataURL(file)});
  const img=await new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=()=>reject(new Error('사진을 열지 못했습니다.'));i.src=raw});
  const scale=Math.min(1,max/Math.max(img.naturalWidth||img.width,img.naturalHeight||img.height)),canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round((img.naturalWidth||img.width)*scale));canvas.height=Math.max(1,Math.round((img.naturalHeight||img.height)*scale));const ctx=canvas.getContext('2d',{alpha:false});ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);return canvas.toDataURL('image/jpeg',quality)
}
async function handleFoodScanFile(file){try{foodScanImageData=await imageFileToDataUrl(file);foodScanEls.preview.src=foodScanImageData;foodScanEls.preview.hidden=false;foodScanEls.placeholder.hidden=true;foodScanEls.analyze.disabled=false;foodScanEls.status.textContent='사진이 준비됐어요. AI 분석하기를 눌러 주세요.'}catch(err){alert(err.message)}}
foodScanEls.cameraBtn.onclick=()=>foodScanEls.cameraInput.click();foodScanEls.galleryBtn.onclick=()=>foodScanEls.galleryInput.click();foodScanEls.cameraInput.onchange=e=>handleFoodScanFile(e.target.files?.[0]);foodScanEls.galleryInput.onchange=e=>handleFoodScanFile(e.target.files?.[0]);
foodScanEls.meal.onchange=()=>foodScanMealIndex=+foodScanEls.meal.value||0;
function normaliseScanItem(x={}){return{name:String(x.name||'음식'),amount:Math.max(0,+x.amount||100),unit:String(x.unit||'g'),kcal:Math.max(0,Math.round(+x.kcal||0)),protein:Math.max(0,roundMacro(+x.protein||0)),carbs:Math.max(0,roundMacro(+x.carbs||0)),fat:Math.max(0,roundMacro(+x.fat||0)),confidence:Math.max(0,Math.min(100,Math.round(+x.confidence||60)))}}
function renderFoodScanItems(){
  foodScanEls.results.innerHTML=foodScanItems.map((x,i)=>`<div class="food-scan-item" data-scan-index="${i}"><label class="food-name-field">음식명<input data-scan-field="name" value="${escapeHtml(x.name)}"></label><label>양<input data-scan-field="amount" type="number" min="0" step="0.1" value="${x.amount}"></label><label>kcal<input data-scan-field="kcal" type="number" min="0" step="1" value="${x.kcal}"></label><label>단백질<input data-scan-field="protein" type="number" min="0" step="0.1" value="${x.protein}"></label><label>탄수화물<input data-scan-field="carbs" type="number" min="0" step="0.1" value="${x.carbs}"></label><label>지방<input data-scan-field="fat" type="number" min="0" step="0.1" value="${x.fat}"></label><button type="button" class="mini-edit remove-scan-item" data-remove-scan="${i}">삭제</button><div class="food-scan-confidence">AI 확신도 ${x.confidence}% · 단위 ${escapeHtml(x.unit)}</div></div>`).join('')||'<div class="empty-state"><span>🍽️</span><p>분석된 음식이 없습니다. 직접 음식을 추가할 수 있어요.</p></div>';
  const t=foodScanItems.reduce((a,x)=>({kcal:a.kcal+(+x.kcal||0),protein:a.protein+(+x.protein||0),carbs:a.carbs+(+x.carbs||0),fat:a.fat+(+x.fat||0)}),{kcal:0,protein:0,carbs:0,fat:0});
  foodScanEls.summary.innerHTML=`<strong>${Math.round(t.kcal)} kcal</strong><span>P ${roundMacro(t.protein)}g · C ${roundMacro(t.carbs)}g · F ${roundMacro(t.fat)}g</span>`;foodScanEls.summary.hidden=false;foodScanEls.add.hidden=false;foodScanEls.save.hidden=false;
}
foodScanEls.results.oninput=e=>{const row=e.target.closest('[data-scan-index]'),field=e.target.dataset.scanField;if(!row||!field)return;const i=+row.dataset.scanIndex;foodScanItems[i][field]=field==='name'?e.target.value:Math.max(0,+e.target.value||0);renderFoodScanSummaryOnly()};
function renderFoodScanSummaryOnly(){const t=foodScanItems.reduce((a,x)=>({kcal:a.kcal+(+x.kcal||0),protein:a.protein+(+x.protein||0),carbs:a.carbs+(+x.carbs||0),fat:a.fat+(+x.fat||0)}),{kcal:0,protein:0,carbs:0,fat:0});foodScanEls.summary.innerHTML=`<strong>${Math.round(t.kcal)} kcal</strong><span>P ${roundMacro(t.protein)}g · C ${roundMacro(t.carbs)}g · F ${roundMacro(t.fat)}g</span>`}
foodScanEls.results.onclick=e=>{const b=e.target.closest('[data-remove-scan]');if(!b)return;foodScanItems.splice(+b.dataset.removeScan,1);renderFoodScanItems()};
foodScanEls.add.onclick=()=>{foodScanItems.push(normaliseScanItem({name:'직접 입력',amount:100,confidence:100}));renderFoodScanItems()};
foodScanEls.analyze.onclick=async()=>{
  if(!foodScanImageData)return;foodScanEls.analyze.disabled=true;foodScanEls.status.textContent='AI가 음식과 양을 분석하고 있어요…';
  try{
    if(!supabaseClient||!currentUser)throw new Error('AI 음식 분석은 로그인 후 사용할 수 있어요. ◎ 버튼에서 로그인해 주세요.');
    const {data,error}=await supabaseClient.functions.invoke('analyze-food',{body:{imageDataUrl:foodScanImageData,locale:'ko-KR',mode:'food'}});if(error)throw error;
    if(!data?.items?.length)throw new Error(data?.error||'음식을 인식하지 못했습니다. 다른 각도의 사진을 사용해 주세요.');
    foodScanItems=data.items.map(normaliseScanItem);foodScanEls.status.textContent=`${foodScanItems.length}개 음식을 찾았어요. 양과 영양성분을 확인한 뒤 저장해 주세요.`;renderFoodScanItems();
  }catch(err){foodScanEls.status.textContent='분석 실패: '+(err.message||'알 수 없는 오류');foodScanEls.add.hidden=false;foodScanEls.save.hidden=foodScanItems.length===0}
  finally{foodScanEls.analyze.disabled=false}
};
foodScanEls.save.onclick=()=>{
  if(!foodScanItems.length)return alert('저장할 음식이 없습니다.');const log=getLog(activeDate),meals=ensureMeals(log,activeDate),meal=meals[foodScanMealIndex];meal.foodItems=meal.foodItems||[];
  meal.foodItems.push(...foodScanItems.map(x=>({...normaliseScanItem(x),source:'ai-photo',scannedAt:new Date().toISOString()})));meal.customText=meal.foodItems.map(x=>x.name).join(' · ');meal.done=true;syncFoodTotals(log,meals);log.priorities.nutrition=meals.every(x=>x.done);log.updatedAt=new Date().toISOString();saveState();saveDailyLogNow(activeDate);foodScanEls.dialog.close();render();alert('AI 식단 분석 결과를 저장했어요.')
};

// v4.3 — packaged nutrition label scan and optional meal save
const nutritionLabelEls={
  open:document.getElementById('nutritionLabelBtn'),dialog:document.getElementById('nutritionLabelDialog'),cameraInput:document.getElementById('nutritionLabelCameraInput'),galleryInput:document.getElementById('nutritionLabelGalleryInput'),cameraBtn:document.getElementById('nutritionLabelCameraBtn'),galleryBtn:document.getElementById('nutritionLabelGalleryBtn'),preview:document.getElementById('nutritionLabelPreview'),placeholder:document.getElementById('nutritionLabelPlaceholder'),analyze:document.getElementById('analyzeNutritionLabelBtn'),status:document.getElementById('nutritionLabelStatus'),result:document.getElementById('nutritionLabelResult'),savePanel:document.getElementById('nutritionLabelSavePanel'),meal:document.getElementById('nutritionLabelMealSelect'),save:document.getElementById('saveNutritionLabelBtn')
};
let nutritionLabelImageData='',nutritionLabelData=null;
function openNutritionLabelScan(){
  const meals=ensureMeals(getLog(activeDate),activeDate);
  nutritionLabelEls.meal.innerHTML=meals.map((m,i)=>({m,i})).filter(x=>['breakfast','lunch','dinner'].includes(x.m.key)).map(x=>`<option value="${x.i}">${escapeHtml(x.m.name)}</option>`).join('');
  nutritionLabelImageData='';nutritionLabelData=null;nutritionLabelEls.cameraInput.value='';nutritionLabelEls.galleryInput.value='';nutritionLabelEls.preview.hidden=true;nutritionLabelEls.placeholder.hidden=false;nutritionLabelEls.analyze.disabled=true;nutritionLabelEls.status.textContent='사진을 선택해 주세요.';nutritionLabelEls.result.innerHTML='';nutritionLabelEls.savePanel.hidden=true;nutritionLabelEls.dialog.showModal();
}
function safeLabelNumber(v){return Math.max(0,+v||0)}
function renderNutritionLabelResult(note=''){
  const x=nutritionLabelData;if(!x)return;
  const eaten=x.eatenAmount||x.basisAmount||x.totalAmount||0;
  nutritionLabelEls.result.innerHTML=`<div class="nutrition-label-card"><div class="section-head"><div><p class="eyebrow">ANALYSIS RESULT</p><h3>${escapeHtml(x.productName||'제품명 미확인')}</h3></div><span class="label-confidence">AI 확신도 ${Math.round(x.confidence||0)}%</span></div><div class="nutrition-label-grid">
  <label>제품명<input data-label-field="productName" value="${escapeHtml(x.productName||'')}"></label>
  <label>총 내용량<input data-label-field="totalAmount" type="number" min="0" step="0.1" value="${x.totalAmount||0}"></label>
  <label>영양표 기준량<input data-label-field="basisAmount" type="number" min="0" step="0.1" value="${x.basisAmount||0}"></label>
  <label>단위<input data-label-field="basisUnit" value="${escapeHtml(x.basisUnit||'g')}"></label>
  <label>내가 먹은 양<input data-label-field="eatenAmount" type="number" min="0" step="0.1" value="${eaten}"></label>
  <label>열량 (기준량당)<input data-label-field="kcal" type="number" min="0" step="1" value="${x.kcal||0}"></label>
  <label>탄수화물 g<input data-label-field="carbs" type="number" min="0" step="0.1" value="${x.carbs||0}"></label>
  <label>단백질 g<input data-label-field="protein" type="number" min="0" step="0.1" value="${x.protein||0}"></label>
  <label>지방 g<input data-label-field="fat" type="number" min="0" step="0.1" value="${x.fat||0}"></label>
  <label>당류 g<input data-label-field="sugars" type="number" min="0" step="0.1" value="${x.sugars||0}"></label>
  <label>나트륨 mg<input data-label-field="sodium" type="number" min="0" step="1" value="${x.sodium||0}"></label>
  </div><p id="nutritionLabelCalculated" class="nutrition-label-note"></p>${note?`<p class="nutrition-label-note">${escapeHtml(note)}</p>`:''}</div>`;
  updateNutritionLabelCalculated();nutritionLabelEls.savePanel.hidden=false;
}
function nutritionLabelScaled(){
  const x=nutritionLabelData||{},basis=safeLabelNumber(x.basisAmount)||1,eaten=safeLabelNumber(x.eatenAmount)||basis,ratio=eaten/basis;
  return {amount:eaten,unit:x.basisUnit||'g',kcal:safeLabelNumber(x.kcal)*ratio,protein:safeLabelNumber(x.protein)*ratio,carbs:safeLabelNumber(x.carbs)*ratio,fat:safeLabelNumber(x.fat)*ratio,sugars:safeLabelNumber(x.sugars)*ratio,sodium:safeLabelNumber(x.sodium)*ratio};
}
function updateNutritionLabelCalculated(){const y=nutritionLabelScaled(),el=document.getElementById('nutritionLabelCalculated');if(el)el.textContent=`섭취량 환산: ${Math.round(y.kcal)} kcal · P ${roundMacro(y.protein)}g · C ${roundMacro(y.carbs)}g · F ${roundMacro(y.fat)}g · 당류 ${roundMacro(y.sugars)}g · 나트륨 ${Math.round(y.sodium)}mg`}
if(nutritionLabelEls.open)nutritionLabelEls.open.onclick=openNutritionLabelScan;
async function handleNutritionLabelFile(file){try{nutritionLabelImageData=await imageFileToDataUrl(file,2200,.94);nutritionLabelEls.preview.src=nutritionLabelImageData;nutritionLabelEls.preview.hidden=false;nutritionLabelEls.placeholder.hidden=true;nutritionLabelEls.analyze.disabled=false;nutritionLabelEls.status.textContent='사진이 준비됐어요. 영양정보 분석하기를 눌러 주세요.'}catch(err){alert(err.message)}}
nutritionLabelEls.cameraBtn.onclick=()=>nutritionLabelEls.cameraInput.click();nutritionLabelEls.galleryBtn.onclick=()=>nutritionLabelEls.galleryInput.click();nutritionLabelEls.cameraInput.onchange=e=>handleNutritionLabelFile(e.target.files?.[0]);nutritionLabelEls.galleryInput.onchange=e=>handleNutritionLabelFile(e.target.files?.[0]);
nutritionLabelEls.analyze.onclick=async()=>{
  if(!nutritionLabelImageData)return;if(!supabaseClient||!currentUser){alert('AI 분석을 사용하려면 ◎ 버튼에서 로그인해 주세요.');return}
  nutritionLabelEls.analyze.disabled=true;nutritionLabelEls.status.textContent='AI가 영양정보표의 숫자와 기준량을 읽고 있어요…';
  try{const {data,error}=await supabaseClient.functions.invoke('analyze-food',{body:{imageDataUrl:nutritionLabelImageData,locale:'ko-KR',mode:'label'}});if(error)throw error;if(!data?.label)throw new Error(data?.error||'영양정보를 찾지 못했습니다.');nutritionLabelData={...data.label,eatenAmount:data.label.basisAmount||data.label.totalAmount||0};nutritionLabelEls.status.textContent='분석을 완료했어요. 숫자를 확인하거나 수정한 뒤 필요하면 식단에 저장하세요.';renderNutritionLabelResult(data.note||'')}
  catch(err){nutritionLabelEls.status.textContent='분석 실패: '+(err.message||'알 수 없는 오류')}
  finally{nutritionLabelEls.analyze.disabled=false}
};
nutritionLabelEls.result.oninput=e=>{const f=e.target.dataset.labelField;if(!f||!nutritionLabelData)return;nutritionLabelData[f]=f==='productName'||f==='basisUnit'?e.target.value:safeLabelNumber(e.target.value);updateNutritionLabelCalculated()};
nutritionLabelEls.save.onclick=()=>{
  if(!nutritionLabelData)return;const idx=+nutritionLabelEls.meal.value,log=getLog(activeDate),meals=ensureMeals(log,activeDate),meal=meals[idx];if(!meal)return alert('저장할 식사를 선택해 주세요.');const y=nutritionLabelScaled();meal.foodItems=meal.foodItems||[];meal.foodItems.push({name:nutritionLabelData.productName||'영양정보표 제품',amount:y.amount,unit:y.unit,kcal:y.kcal,protein:y.protein,carbs:y.carbs,fat:y.fat,sugars:y.sugars,sodium:y.sodium,source:'nutrition-label',confidence:nutritionLabelData.confidence||0,scannedAt:new Date().toISOString()});meal.customText=meal.foodItems.map(z=>z.name).join(' · ');meal.done=true;syncFoodTotals(log,meals);log.priorities.nutrition=meals.every(z=>z.done);log.updatedAt=new Date().toISOString();saveState();saveDailyLogNow(activeDate);nutritionLabelEls.dialog.close();render();alert(`${meal.name} 식단에 영양정보를 저장했어요.`)
};

setTimeout(()=>{ensureLiveRunMap();liveRunMap?.invalidateSize()},250);document.querySelectorAll('[data-view="run"]').forEach(b=>b.addEventListener('click',()=>setTimeout(()=>{ensureLiveRunMap();liveRunMap?.invalidateSize();updateLiveRunMap()},120)));
