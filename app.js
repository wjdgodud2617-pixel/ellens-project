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
  activity:{label:'Running / Walking',icon:'🏃',plans:{
    running:{name:'Running',meta:'GPS run · Outdoor / Indoor',exercises:[ex('wb-act-run','Running',1,30,0,'Cardio · Endurance','Run at a comfortable pace. GPS runs completed in the Run tab are checked automatically.','running workout')]},
    walking:{name:'Walking',meta:'GPS walk · Outdoor / Indoor',exercises:[ex('wb-act-walk','Walking',1,30,0,'Cardio · Recovery','Walk at a comfortable pace. GPS walks completed in the Run tab are checked automatically.','walking workout')]}
  }},
  strength:{label:'Strength',icon:'💪',plans:{
    lower:{name:'Lower Body Strength',meta:'55–70 min · Intermediate · Barbell / Dumbbell',exercises:[ex('wb-l-squat','Back Squat',4,8,35,'Quads · Glutes · Core','Brace, keep feet grounded, and drive up with control.','back squat form'),ex('wb-l-rdl','Romanian Deadlift',4,10,30,'Hamstrings · Glutes','Push hips back and keep the weight close.','romanian deadlift form'),ex('wb-l-lunge','Reverse Lunge',3,10,8,'Glutes · Quads','Step back softly and keep the front knee aligned.','reverse lunge form'),ex('wb-l-hip','Hip Thrust',4,12,35,'Glutes','Pause at full hip extension.','hip thrust form')]},
    upper:{name:'Upper Body Strength',meta:'50–65 min · Intermediate · Bench / Dumbbell',exercises:[ex('wb-u-bench','Bench Press',4,8,20,'Chest · Triceps','Keep shoulder blades set and lower with control.','bench press form'),ex('wb-u-row','Seated Cable Row',4,10,25,'Back · Biceps','Pull elbows toward the ribs.','cable row form'),ex('wb-u-press','Shoulder Press',3,10,8,'Shoulders · Triceps','Keep ribs down while pressing.','shoulder press form'),ex('wb-u-pull','Lat Pulldown',3,12,25,'Lats · Biceps','Avoid leaning too far back.','lat pulldown form')]},
    fullbody:{name:'Full Body Strength',meta:'60 min · Intermediate · Full gym',exercises:[ex('wb-f-dead','Deadlift',4,6,40,'Posterior chain','Brace and keep the bar close.','deadlift form'),ex('wb-f-goblet','Goblet Squat',3,12,12,'Legs · Core','Sit between the hips.','goblet squat form'),ex('wb-f-push','Dumbbell Bench Press',3,10,8,'Chest · Triceps','Control the lowering phase.','dumbbell bench press form'),ex('wb-f-row','One-arm Row',3,10,10,'Back · Biceps','Keep hips square.','one arm dumbbell row form'),ex('wb-f-carry','Farmer Carry',4,30,14,'Grip · Core','Walk tall with controlled steps.','farmer carry form')]},
    glutes:{name:'Glutes & Core',meta:'45–55 min · All levels · Bands / Dumbbell',exercises:[ex('wb-g-hip','Hip Thrust',4,12,30,'Glutes','Pause and squeeze at the top.','hip thrust form'),ex('wb-g-bulgarian','Bulgarian Split Squat',3,10,8,'Glutes · Quads','Keep the front foot grounded.','bulgarian split squat form'),ex('wb-g-abduct','Band Abduction',3,20,0,'Glute medius','Move with control.','band hip abduction'),ex('wb-g-deadbug','Dead Bug',3,10,0,'Core','Keep lower back gently pressed down.','dead bug form')]},
    push:{name:'Push Day',meta:'45–60 min · Intermediate · Chest / Shoulder',exercises:[ex('wb-p-bench','Bench Press',4,8,20,'Chest · Triceps','Stable shoulder blades.','bench press form'),ex('wb-p-incline','Incline Dumbbell Press',3,10,8,'Upper chest','Use a low incline.','incline dumbbell press'),ex('wb-p-shoulder','Shoulder Press',3,10,8,'Shoulders','Avoid shrugging.','shoulder press form'),ex('wb-p-tri','Triceps Pushdown',3,12,15,'Triceps','Keep elbows fixed.','triceps pushdown')]},
    pull:{name:'Pull Day',meta:'45–60 min · Intermediate · Back / Biceps',exercises:[ex('wb-pl-pull','Lat Pulldown',4,10,25,'Lats · Biceps','Pull elbows down.','lat pulldown form'),ex('wb-pl-row','Cable Row',4,10,25,'Back · Biceps','Keep torso stable.','cable row form'),ex('wb-pl-face','Face Pull',3,15,10,'Rear delts','Pull toward eye level.','face pull form'),ex('wb-pl-curl','Dumbbell Curl',3,12,6,'Biceps','Avoid swinging.','dumbbell curl form')]}
  }},
  cardio:{label:'Cardio',icon:'❤️',plans:{
    treadmill:{name:'Treadmill',meta:'30–45 min · Adjustable · Indoor run',exercises:[ex('wb-ca-tread','Treadmill',1,35,0,'Cardio','Choose a sustainable pace and incline.','treadmill workout')]},
    stair:{name:'Stair Climber',meta:'20–35 min · Moderate · Lower body cardio',exercises:[ex('wb-ca-stair','Stair Climber',1,25,0,'Cardio · Legs','Keep a steady rhythm without leaning heavily on the handles.','stair climber workout')]},
    stepmill:{name:'Stepmill',meta:'20–35 min · Hard · Lower body cardio',exercises:[ex('wb-ca-step','Stepmill',1,25,0,'Cardio · Legs','Use controlled steps and upright posture.','stepmill workout')]},
    indoorBike:{name:'Indoor Cycling',meta:'30–50 min · Moderate · Bike',exercises:[ex('wb-ca-ibike','Indoor Cycling',1,40,0,'Cardio · Legs','Maintain smooth cadence and controlled resistance.','indoor cycling workout')]},
    outdoorBike:{name:'Outdoor Cycling',meta:'45–90 min · Moderate · Bike',exercises:[ex('wb-ca-obike','Outdoor Cycling',1,60,0,'Cardio · Legs','Ride safely and maintain an even effort.','outdoor cycling workout')]},
    elliptical:{name:'Elliptical',meta:'30–45 min · Easy–Moderate · Low impact',exercises:[ex('wb-ca-ellip','Elliptical',1,35,0,'Cardio · Full body','Keep the motion smooth and resistance manageable.','elliptical workout')]},
    rowing:{name:'Rowing Machine',meta:'20–40 min · Moderate–Hard · Full body',exercises:[ex('wb-ca-row','Rowing Machine',1,30,0,'Cardio · Full body','Drive with the legs first and recover in reverse order.','rowing machine technique')]},
    jumpRope:{name:'Jump Rope',meta:'15–30 min · Hard · Coordination',exercises:[ex('wb-ca-rope','Jump Rope',10,60,0,'Cardio · Calves','Use light contacts and relaxed wrists.','jump rope workout')]},
    swimming:{name:'Swimming',meta:'30–60 min · Moderate · Pool',exercises:[ex('wb-ca-swim','Swimming',1,40,0,'Cardio · Full body','Use a comfortable stroke and steady breathing.','swimming workout')]},
    hiking:{name:'Hiking',meta:'60–120 min · Moderate · Outdoor',exercises:[ex('wb-ca-hike','Hiking',1,90,0,'Cardio · Legs','Choose a safe route and carry water.','hiking workout')]}
  }},
  hyrox:{label:'HYROX',icon:'🔥',plans:{full:{...hyroxPlans.full,meta:'75–100 min · Advanced · Full simulation'},half:{...hyroxPlans.half,meta:'45–60 min · Intermediate · 4 stations'},beginner:{...hyroxPlans.beginner,meta:'35–45 min · Beginner · Reduced volume'},strength:{name:'HYROX Strength Focus',meta:'50–65 min · Intermediate · Sled / Carry',exercises:[ex('wb-hs-push','Sled Push',5,20,0,'Legs · Core','Short powerful steps.','hyrox sled push'),ex('wb-hs-pull','Sled Pull',5,20,0,'Back · Grip','Maintain rope tension.','hyrox sled pull'),ex('wb-hs-carry','Farmers Carry',4,50,16,'Grip · Core','Walk tall.','hyrox farmers carry'),ex('wb-hs-lunge','Sandbag Lunges',4,20,10,'Legs · Core','Stay upright.','hyrox lunges'),ex('wb-hs-wall','Wall Balls',5,15,6,'Legs · Shoulders','Steady sets.','hyrox wall balls')]},engine:{name:'HYROX Engine Focus',meta:'45–60 min · Hard · Run / Erg',exercises:[ex('wb-he-run','Run 1 km',4,1,0,'Cardio','Steady race pace.','hyrox running'),ex('wb-he-ski','SkiErg 750 m',2,750,0,'Cardio','Smooth rhythm.','hyrox skierg'),ex('wb-he-row','Row 750 m',2,750,0,'Cardio','Strong leg drive.','hyrox rowing')]}}
  },
  conditioning:{label:'CrossFit',icon:'🏋️',plans:{
    metcon:{name:'CrossFit Metcon',meta:'30–40 min · Hard · Full body',exercises:[ex('wb-c-thr','Dumbbell Thruster',5,10,8,'Full body','Drive through legs.','dumbbell thruster'),ex('wb-c-row','Row',5,250,0,'Cardio','Powerful strokes.','rowing technique'),ex('wb-c-burpee','Burpees',5,10,0,'Full body','Move steadily.','burpee form')]},
    kettlebell:{name:'CrossFit Kettlebell',meta:'30–45 min · Intermediate · Kettlebell',exercises:[ex('wb-k-swing','Kettlebell Swing',5,15,12,'Hips · Cardio','Hinge, do not squat.','kettlebell swing'),ex('wb-k-goblet','Goblet Squat',4,12,12,'Legs · Core','Keep chest tall.','goblet squat'),ex('wb-k-carry','Suitcase Carry',4,30,12,'Core · Grip','Avoid leaning.','suitcase carry')]},
    bodyweight:{name:'CrossFit Bodyweight WOD',meta:'25–35 min · All levels · No equipment',exercises:[ex('wb-bw-squat','Air Squat',4,20,0,'Legs','Control depth.','air squat'),ex('wb-bw-push','Push-up',4,10,0,'Chest · Core','Keep body aligned.','push up form'),ex('wb-bw-mount','Mountain Climbers',4,30,0,'Core · Cardio','Keep hips steady.','mountain climber form'),ex('wb-bw-plank','Plank',4,40,0,'Core','Breathe steadily.','plank form')]},
    rowSki:{name:'CrossFit Row & SkiErg',meta:'35–45 min · Hard · Erg machines',exercises:[ex('wb-rs-row','Row 500 m',5,500,0,'Cardio','Consistent split.','rowing technique'),ex('wb-rs-ski','SkiErg 500 m',5,500,0,'Cardio','Relax the shoulders.','skierg technique')]}
  }},
  recovery:{label:'Recovery',icon:'🧘',plans:{
    mobility:{name:'Full Body Mobility',meta:'20–30 min · Easy · Recovery',exercises:[ex('wb-rec-mob','Full Body Mobility',1,25,0,'Hips · Shoulders · Spine','Move slowly in a pain-free range.','full body mobility')]},
    stretch:{name:'Stretching',meta:'15–25 min · Easy · Flexibility',exercises:[ex('wb-rec-st','Full Body Stretch',1,20,0,'Flexibility','Hold gentle stretches and breathe.','full body stretching')]},
    active:{name:'Active Recovery',meta:'30–40 min · Very easy · Walk / Bike',exercises:[ex('wb-rec-walk','Recovery Walk',1,35,0,'Recovery','Easy conversational effort.','recovery walk')]},
    rest:{name:'Rest Day',meta:'Rest · Hydration · Sleep',exercises:[]}
  }}
};
function workoutPlanByKey(key){const [category,plan]=String(key||'').split(':');return workoutCatalog[category]?.plans?.[plan]||null}
function yesterdayRecommendation(){const y=getLog(shiftDate(activeDate,-1)),name=(y.planName||'').toLowerCase();if(name.includes('hyrox')||name.includes('interval')||name.includes('metcon'))return 'recovery:mobility';if(name.includes('lower'))return 'strength:upper';if(name.includes('upper'))return 'cardio:indoorBike';return 'strength:fullbody'}
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
function hasMeaningfulMealData(plan){return (Array.isArray(plan)?plan:[]).some(m=>String(m?.customText||'').trim()||(Array.isArray(m?.foodItems)&&m.foodItems.length>0)||mealHasNutritionLog(m))}
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
,
 ['돈까스',650,1,'인분',25,55,35,'돈가스 pork cutlet tonkatsu'],['경양식 돈까스',720,1,'인분',27,68,38,'경양식돈까스 pork cutlet'],['등심 돈까스',680,1,'인분',30,52,36,'등심돈까스 loin pork cutlet'],['치즈 돈까스',820,1,'인분',34,58,48,'치즈돈까스 cheese pork cutlet'],['돈까스 정식',900,1,'인분',32,95,43,'돈까스정식 pork cutlet set'],['미니 돈까스',360,5,'개',15,32,20,'미니돈까스 frozen pork cutlet'],
 ['삼겹살',520,150,'g',24,0,46,'pork belly'],['갈비구이',480,1,'인분',32,28,28,'갈비 korean ribs'],['닭볶음탕',430,1,'인분',35,24,21,'dakbokkeumtang spicy chicken stew'],['후라이드 치킨',620,4,'조각',34,32,39,'치킨 fried chicken'],['양념 치킨',720,4,'조각',33,55,42,'양념치킨 korean fried chicken'],['햄버거',520,1,'개',25,48,25,'burger hamburger'],['치즈버거',610,1,'개',30,50,31,'cheeseburger'],['피자',300,2,'조각',14,34,13,'pizza'],
 ['김치볶음밥',550,1,'인분',15,82,18,'kimchi fried rice'],['볶음밥',580,1,'인분',16,88,18,'fried rice'],['오므라이스',650,1,'인분',20,85,25,'omelet rice omurice'],['돌솥비빔밥',650,1,'인분',20,95,20,'dolsot bibimbap'],['주먹밥',260,2,'개',6,48,5,'rice ball'],
 ['부대찌개',420,1,'인분',22,28,25,'army stew budae jjigae'],['소고기무국',120,1,'그릇',12,8,5,'beef radish soup'],['된장국',90,1,'그릇',7,10,3,'soybean soup'],['어묵국',150,1,'그릇',10,20,4,'fish cake soup'],
 ['짜장면',720,1,'그릇',22,110,22,'jajangmyeon black bean noodles'],['짬뽕',680,1,'그릇',28,92,20,'jjamppong spicy noodles'],['칼국수',600,1,'그릇',20,105,12,'kalguksu'],['잔치국수',500,1,'그릇',16,88,10,'banquet noodles'],['비빔국수',590,1,'그릇',14,100,16,'spicy noodles'],['냉면',520,1,'그릇',18,96,8,'naengmyeon'],['우동',520,1,'그릇',16,90,10,'udon'],
 ['순대',410,1,'인분',13,65,11,'sundae korean sausage'],['튀김 모둠',450,1,'인분',10,55,22,'korean fried snack'],['어묵',160,3,'개',10,19,5,'오뎅 fish cake'],
 ['계란찜',160,1,'인분',12,5,10,'steamed egg'],['두부조림',180,1,'인분',13,10,11,'braised tofu'],['감자조림',190,1,'인분',4,34,5,'braised potato'],['콩나물무침',65,1,'인분',5,7,2,'seasoned bean sprouts'],['시금치나물',70,1,'인분',4,8,3,'seasoned spinach'],['오이무침',60,1,'인분',2,10,1,'seasoned cucumber'],
 ['복숭아',60,1,'개',1,15,0.2,'peach'],['귤',45,1,'개',0.7,11,0.2,'tangerine mandarin'],['제로콜라',0,355,'ml',0,0,0,'zero coke diet cola'],['콜라',150,355,'ml',0,39,0,'coke cola'],['사이다',155,355,'ml',0,40,0,'soda cider'],['막걸리',190,300,'ml',3,25,2,'makgeolli'],['소주',400,1,'병',0,0,0,'soju'],['맥주',210,500,'ml',2,18,0,'beer']].map((x,i)=>({id:'food-'+i,name:x[0],kcal:x[1],serving:x[2],unit:x[3],protein:x[4],carbs:x[5],fat:x[6],aliases:x[7]||''}));
const FOOD_RECENT_KEY='eldyn-food-recents';
const FOOD_FAVORITE_KEY='eldyn-food-favorites';
function normaliseFoodQuery(v=''){return String(v).toLowerCase().replace(/[\s._-]+/g,'').replace(/[()]/g,'')}
function foodSearchText(x){return normaliseFoodQuery(`${x.name} ${x.aliases||''}`)}
function readFoodList(key){try{return JSON.parse(localStorage.getItem(key)||'[]')}catch{return[]}}
function writeFoodList(key,list){localStorage.setItem(key,JSON.stringify([...new Set(list)].slice(0,20)))}
function rememberFood(id){const list=readFoodList(FOOD_RECENT_KEY).filter(x=>x!==id);writeFoodList(FOOD_RECENT_KEY,[id,...list])}
function toggleFoodFavorite(id){const list=readFoodList(FOOD_FAVORITE_KEY);writeFoodList(FOOD_FAVORITE_KEY,list.includes(id)?list.filter(x=>x!==id):[id,...list]);renderFoodResults()}
let editingMealIndex=null,selectedFood=null;

function nutritionNumber(obj,keys){for(const key of keys){const v=obj?.[key];if(v!==undefined&&v!==null&&v!==''&&Number.isFinite(+v))return +v}return 0}
function nutritionFromObject(obj={}){const n=(obj&&typeof obj.nutrition==='object')?obj.nutrition:{},mac=(obj&&typeof obj.macros==='object')?obj.macros:{};return{kcal:nutritionNumber(obj,['kcal','calories','calorie'])||nutritionNumber(n,['kcal','calories','calorie','energyKcal'])||nutritionNumber(mac,['kcal','calories']),protein:nutritionNumber(obj,['protein','proteinG'])||nutritionNumber(n,['protein','proteinG'])||nutritionNumber(mac,['protein','proteinG']),carbs:nutritionNumber(obj,['carbs','carb','carbohydrates','carbohydrate','carbsG'])||nutritionNumber(n,['carbs','carb','carbohydrates','carbohydrate','carbsG'])||nutritionNumber(mac,['carbs','carb','carbohydrates','carbsG']),fat:nutritionNumber(obj,['fat','fatG'])||nutritionNumber(n,['fat','fatG'])||nutritionNumber(mac,['fat','fatG'])}}
function validMealFoodItems(meal){return (Array.isArray(meal?.foodItems)?meal.foodItems:[]).filter(x=>{if(!x)return false;if(x.source!=='recommended-plan')return true;return x.mealKey===meal?.key&&x.date===activeDate})}
function mealFoodTotals(meal){const items=validMealFoodItems(meal);if(items.length)return items.reduce((a,x)=>{const t=nutritionFromObject(x);return{kcal:a.kcal+t.kcal,protein:a.protein+t.protein,carbs:a.carbs+t.carbs,fat:a.fat+t.fat}},{kcal:0,protein:0,carbs:0,fat:0});return nutritionFromObject(meal)}
function mealHasNutritionLog(meal){const items=validMealFoodItems(meal);if(items.length)return true;const raw=Array.isArray(meal?.foodItems)?meal.foodItems:[];if(raw.some(x=>x?.source==='recommended-plan'))return false;const t=nutritionFromObject(meal);return t.kcal>0||t.protein>0||t.carbs>0||t.fat>0}
function normaliseMealCompletion(meals){let changed=false;for(const m of (Array.isArray(meals)?meals:[])){const shouldBeDone=mealHasNutritionLog(m);if(!!m.done!==shouldBeDone){m.done=shouldBeDone;changed=true}}return changed}
function dailyFoodTotals(meals){return (Array.isArray(meals)?meals:[]).reduce((a,m)=>{if(!mealHasNutritionLog(m))return a;const t=mealFoodTotals(m);return{kcal:a.kcal+t.kcal,protein:a.protein+t.protein,carbs:a.carbs+t.carbs,fat:a.fat+t.fat}},{kcal:0,protein:0,carbs:0,fat:0})}
function roundMacro(n){return Math.round((+n||0)*10)/10}
function hasStructuredNutrition(meals){return (Array.isArray(meals)?meals:[]).some(mealHasNutritionLog)}
function syncFoodTotals(log,meals){normaliseMealCompletion(meals);const t=dailyFoodTotals(meals);log.calories=Math.round(t.kcal);log.protein=roundMacro(t.protein);log.carbs=roundMacro(t.carbs);log.fat=roundMacro(t.fat);return t}
function ensureFoodDialog(){if(document.getElementById('foodDialog'))return;document.body.insertAdjacentHTML('beforeend',`<dialog id="foodDialog" class="modal food-modal"><button class="close-btn" id="foodDialogClose">×</button><p class="eyebrow">MEAL LOGGER</p><h2 id="foodDialogTitle">음식 검색 및 합계</h2><div class="food-search-row"><input id="foodSearch" placeholder="음식명 검색 (예: 돈까스, 김치, 미역국)"><button class="secondary-btn inline-btn" id="customFoodBtn">직접 영양 입력</button></div><div id="foodResults" class="food-results"></div><div id="foodServingPanel" class="food-serving" hidden><h3 id="selectedFoodName"></h3><div class="form-row"><label>섭취량<input id="foodAmount" type="number" min="0" step="0.1"></label><label>단위<input id="foodUnit" readonly></label></div><p id="foodPreview" class="muted"></p><button class="primary-btn" id="addFoodBtn">이 음식 추가</button></div><div class="section-head"><h2>현재 식사</h2></div><div id="mealFoodList" class="meal-food-list"></div><div id="mealFoodTotal" class="meal-total"></div><button class="primary-btn" id="saveMealFoodsBtn">식단 저장</button></dialog>`);
 foodDialogClose.onclick=()=>foodDialog.close();foodSearch.oninput=renderFoodResults;customFoodBtn.onclick=openCustomFoodPrompt;foodAmount.oninput=renderFoodPreview;addFoodBtn.onclick=addSelectedFood;saveMealFoodsBtn.onclick=saveMealFoods;
}
function openFoodEditor(index){ensureFoodDialog();editingMealIndex=index;selectedFood=null;foodSearch.value='';foodServingPanel.hidden=true;foodDialogTitle.textContent=ensureMeals(getLog(activeDate),activeDate)[index].name+' 음식 기록';renderFoodResults();renderMealFoodList();foodDialog.showModal()}
function renderFoodResults(){const q=normaliseFoodQuery(foodSearch?.value||''),fav=readFoodList(FOOD_FAVORITE_KEY),recent=readFoodList(FOOD_RECENT_KEY);let list;if(q){list=FOOD_DB.filter(x=>foodSearchText(x).includes(q)).sort((a,b)=>{const an=normaliseFoodQuery(a.name),bn=normaliseFoodQuery(b.name);return Number(bn.startsWith(q))-Number(an.startsWith(q))||Number(fav.includes(b.id))-Number(fav.includes(a.id))||a.name.localeCompare(b.name,'ko')})}else{const ordered=[...fav,...recent];list=[...ordered.map(id=>FOOD_DB.find(x=>x.id===id)).filter(Boolean),...FOOD_DB].filter((x,i,a)=>a.findIndex(y=>y.id===x.id)===i)}list=list.slice(0,20);foodResults.innerHTML=list.map(x=>`<div class="food-result-row"><button class="food-result" data-food-id="${x.id}"><b>${x.name}</b><span>${x.kcal} kcal / ${x.serving}${x.unit}</span></button><button class="food-favorite ${fav.includes(x.id)?'active':''}" data-food-favorite="${x.id}" aria-label="즐겨찾기">${fav.includes(x.id)?'★':'☆'}</button></div>`).join('')||'<p class="muted">검색 결과가 없습니다. 직접 영양 입력으로 추가해 주세요.</p>';foodResults.querySelectorAll('[data-food-id]').forEach(b=>b.onclick=()=>selectFood(b.dataset.foodId));foodResults.querySelectorAll('[data-food-favorite]').forEach(b=>b.onclick=e=>{e.stopPropagation();toggleFoodFavorite(b.dataset.foodFavorite)})}
function selectFood(id){selectedFood=FOOD_DB.find(x=>x.id===id);if(!selectedFood)return;selectedFoodName.textContent=selectedFood.name;foodAmount.value=selectedFood.serving;foodUnit.value=selectedFood.unit;foodServingPanel.hidden=false;renderFoodPreview()}
function renderFoodPreview(){if(!selectedFood)return;const ratio=(+foodAmount.value||0)/selectedFood.serving;foodPreview.textContent=`약 ${Math.round(selectedFood.kcal*ratio)} kcal · P ${roundMacro(selectedFood.protein*ratio)}g · C ${roundMacro(selectedFood.carbs*ratio)}g · F ${roundMacro(selectedFood.fat*ratio)}g`}
function addSelectedFood(){if(!selectedFood||(+foodAmount.value||0)<=0)return;rememberFood(selectedFood.id);const amount=+foodAmount.value,ratio=amount/selectedFood.serving,m=ensureMeals(getLog(activeDate),activeDate)[editingMealIndex];m.foodItems=m.foodItems||[];m.foodItems.push({name:selectedFood.name,amount,unit:selectedFood.unit,kcal:Math.round(selectedFood.kcal*ratio),protein:roundMacro(selectedFood.protein*ratio),carbs:roundMacro(selectedFood.carbs*ratio),fat:roundMacro(selectedFood.fat*ratio)});renderMealFoodList();selectedFood=null;foodServingPanel.hidden=true}
function openCustomFoodPrompt(){const name=prompt('음식명을 입력하세요.');if(!name)return;const kcal=+prompt('총 칼로리(kcal)를 입력하세요.','0')||0,protein=+prompt('단백질(g)을 입력하세요.','0')||0,carbs=+prompt('탄수화물(g)을 입력하세요.','0')||0,fat=+prompt('지방(g)을 입력하세요.','0')||0,m=ensureMeals(getLog(activeDate),activeDate)[editingMealIndex];m.foodItems=m.foodItems||[];m.foodItems.push({name,amount:1,unit:'회',kcal,protein,carbs,fat});renderMealFoodList()}
function renderMealFoodList(){const m=ensureMeals(getLog(activeDate),activeDate)[editingMealIndex],items=m.foodItems||[];mealFoodList.innerHTML=items.map((x,i)=>`<div class="meal-food-row"><div><b>${escapeHtml(x.name)}</b><small>${x.amount}${escapeHtml(x.unit)} · ${x.kcal} kcal · P ${x.protein}g</small></div><button class="mini-edit" data-remove-food="${i}">삭제</button></div>`).join('')||'<p class="muted">아직 추가한 음식이 없습니다.</p>';mealFoodList.querySelectorAll('[data-remove-food]').forEach(b=>b.onclick=()=>{items.splice(+b.dataset.removeFood,1);renderMealFoodList()});const t=mealFoodTotals(m);mealFoodTotal.innerHTML=`<strong>${Math.round(t.kcal)} kcal</strong><span>P ${roundMacro(t.protein)}g · C ${roundMacro(t.carbs)}g · F ${roundMacro(t.fat)}g</span>`}
function saveMealFoods(){const l=getLog(activeDate),meals=ensureMeals(l,activeDate),m=meals[editingMealIndex];if((m.foodItems||[]).length){m.customText=m.foodItems.map(x=>x.name).join(' · ')}else delete m.customText;m.done=mealHasNutritionLog(m);syncFoodTotals(l,meals);l.priorities.nutrition=meals.every(mealHasNutritionLog);l.updatedAt=new Date().toISOString();saveState();saveDailyLogNow(activeDate);foodDialog.close();render()}

function calculateNutrition(){const s=state.settings,w=+s.currentWeight||78,h=+s.height||160,age=+s.age||37,sex=s.sex||'female',act=+s.activity||1.55;let bmr=10*w+6.25*h-5*age+(sex==='male'?5:-161),tdee=bmr*act,delta={loss:-500,fatloss:-400,maintain:0,gain:250,hyrox:-150,manual:0}[s.goalMode]??-400;let kcal=s.goalMode==='manual'?(+s.calorieGoal||1800):Math.round((tdee+delta)/50)*50;const floor=sex==='male'?1500:1200;kcal=Math.max(floor,kcal);let protein=Math.round(w*({loss:1.5,fatloss:1.7,maintain:1.5,gain:1.8,hyrox:1.7,manual:(+s.proteinGoal||120)/w}[s.goalMode]||1.6));if(s.goalMode==='manual')protein=+s.proteinGoal||120;let fat=Math.round(w*.7),carb=Math.max(80,Math.round((kcal-protein*4-fat*9)/4));return{bmr:Math.round(bmr),tdee:Math.round(tdee),kcal,protein,carb,fat,water:Math.round(w*30/250)*250}}
function mealRotationIndex(date,key,i=0){const start=new Date('2026-01-01T00:00:00+09:00'),d=dateFromKey(date),days=Math.floor((d-start)/86400000),offset={breakfast:0,lunch:2,snack:4,dinner:6}[key]||0;return Math.abs(days+offset+i)%mealChoices[key].length}function ensureMeals(log,date){if(!log.mealPlan||!Array.isArray(log.mealPlan)){const count=+state.settings.mealCount||4,keys=count===3?['breakfast','lunch','dinner']:['breakfast','lunch','snack','dinner'];log.mealPlan=keys.map((key,i)=>({key,name:{breakfast:'Breakfast',lunch:'Lunch',snack:'Snack',dinner:'Dinner'}[key],choice:mealRotationIndex(date,key,i),done:false}));log.updatedAt=new Date().toISOString()}return log.mealPlan}
function renderMeals(log){const t=calculateNutrition(),meals=ensureMeals(log,activeDate),completionChanged=normaliseMealCompletion(meals),eaten=syncFoodTotals(log,meals);if(completionChanged){log.priorities.nutrition=meals.every(mealHasNutritionLog);log.updatedAt=new Date().toISOString();saveState()}nutritionTargetCard.innerHTML=`<div><p class="eyebrow">DAILY NUTRITION</p><h3>${Math.round(eaten.kcal).toLocaleString()} / ${t.kcal.toLocaleString()} kcal</h3><p class="muted">섭취 P ${roundMacro(eaten.protein)}g · C ${roundMacro(eaten.carbs)}g · F ${roundMacro(eaten.fat)}g</p><p class="muted">목표 P ${t.protein}g · C ${t.carb}g · F ${t.fat}g · Water ${t.water.toLocaleString()}ml</p></div><span class="goal-pill">${escapeHtml(state.settings.goalMode)}</span>`;mealPlanList.innerHTML=meals.map((m,i)=>{const mt=mealFoodTotals(m),logged=mealHasNutritionLog(m),text=m.customText||mealChoices[m.key][m.choice%mealChoices[m.key].length],summary=logged?`${Math.round(mt.kcal)} kcal · P ${roundMacro(mt.protein)}g · C ${roundMacro(mt.carbs)}g · F ${roundMacro(mt.fat)}g`:(m.customText?'메모만 입력됨 · 음식 기록 필요':Math.round(t.kcal/meals.length)+' kcal guideline');return `<article class="meal-plan-card ${logged?'done':''}"><button class="meal-check" data-meal-done="${i}" aria-label="${logged?'Logged meal':'Log meal'}">${logged?'✓':'○'}</button><div><p class="eyebrow">${escapeHtml(localizeMealName(m.key,m.name).toUpperCase())}</p><h3>${escapeHtml(text)}</h3><small>${summary}</small></div><div class="meal-actions"><button class="mini-edit" data-meal-scan="${i}">📷 AI 사진</button><button class="mini-edit" data-meal-food="${i}">음식 검색·합계</button><button class="mini-edit" data-meal-edit="${i}">메모 입력</button><button class="mini-edit" data-meal-change="${i}">추천 변경</button></div></article>`}).join('')}
function updateGreeting(){const h=new Date().getHours(),name=state.settings.name||'Ellen';if((state.settings.language||'ko')==='ko'){const part=h<12?'좋은 아침이에요':h<18?'좋은 오후예요':'좋은 저녁이에요';greeting.textContent=`${part}, ${name}.`}else{const part=h<12?'morning':h<18?'afternoon':'evening';greeting.textContent=`Good ${part}, ${name}.`}}
function applyTheme(theme){const value=['performance','core','paris'].includes(theme)?theme:'performance';document.documentElement.dataset.theme=value;const color=value==='paris'?'#f58fa3':value==='core'?'#ffffff':'#39ff14';document.querySelector('meta[name=theme-color]')?.setAttribute('content','#050605');}
document.addEventListener('change',e=>{if(e.target.matches('input[name="eldynTheme"]')){state.settings.theme=e.target.value;applyTheme(e.target.value);saveState();renderShareCard?.()}});
document.getElementById('languageSetting')?.addEventListener('change',e=>{state.settings.language=e.target.value;saveState();render()});
function render(){applyTheme(state.settings.theme||'performance');applyLanguage(state.settings.language||'ko');updateGreeting();renderToday();renderPlan();renderCalendar();renderProgress();renderSettings()}
function renderPlan(){
  const grid=document.getElementById('weeklyPlanGrid');if(!grid)return;
  const today=new Date(),todayDay=today.getDay(),monday=new Date(today);monday.setDate(today.getDate()-((todayDay+6)%7));
  const order=[1,2,3,4,5,6,0],names=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  grid.innerHTML=order.map((day,idx)=>{const dt=new Date(monday);dt.setDate(monday.getDate()+idx);const key=keyFromDate(dt),plan=weeklyPlan[day],isToday=key===todayKey();return `<article class="plan-day-card ${isToday?'today-plan':''}"><div class="plan-day-head"><div><p class="eyebrow">${isToday?'TODAY':names[day].toUpperCase()}</p><h3>${escapeHtml(localizeWorkoutName(plan.name))}</h3><p class="muted">${new Intl.DateTimeFormat('en',{month:'short',day:'numeric'}).format(dt)}</p></div><span class="routine-count">${plan.exercises.length} ${state.settings.language==='ko'?'개 운동':'EXERCISES'}</span></div><div class="plan-exercises">${plan.exercises.map(x=>`<span class="plan-chip">${escapeHtml(localizeWorkoutName(x.name))}</span>`).join('')}</div><button class="secondary-btn plan-open-btn" data-open-plan-date="${key}">${state.settings.language==='ko'?'열기·수정':'Open & customise'}</button></article>`}).join('');
}
function latestRunsForDashboard(){const runs=(state.runs||[]).slice().sort((a,b)=>new Date(b.endedAt)-new Date(a.endedAt));const today=todayKey(),yesterday=shiftDate(today,-1);return runs.filter(r=>{const k=keyFromDate(new Date(r.endedAt));return k===today||k===yesterday}).slice(0,2)}
function renderDashboardRunCard(){
  const el=document.getElementById('dashboardRunCard');
  if(!el)return;
  const lang=state.settings.language||'ko',runs=latestRunsForDashboard();
  if(!runs.length){
    el.innerHTML=`<div><p class="eyebrow">${lang==='ko'?'오늘의 러닝':"TODAY'S RUN"}</p><h3>${lang==='ko'?'아직 러닝 기록이 없어요.':'No run yet.'}</h3><p class="muted">${lang==='ko'?'러닝 탭에서 시작해 보세요.':'Open Run to get moving.'}</p></div><button class="text-btn" data-open-run-tab>${lang==='ko'?'러닝 시작':'Start run'}</button>`;
    el.querySelector('[data-open-run-tab]')?.addEventListener('click',()=>switchView('run'));
  }else{
    el.innerHTML=runs.map(r=>{
      const k=keyFromDate(new Date(r.endedAt)),label=k===todayKey()?(lang==='ko'?'오늘':'Today'):(lang==='ko'?'직전':'Previous');
      const activity=r.activityType==='walk'?(lang==='ko'?'걷기':'Walk'):(lang==='ko'?'러닝':'Run');
      return `<div class="dashboard-run-item-wrap"><button class="dashboard-run-item" type="button" data-open-run-story="${r.id}"><span><small>${label}</small><b>${activity} ${formatDistance(r.distanceKm)}</b></span><span>${formatClock(r.durationMs)} · ${paceText(r.avgPaceSecKm)}/km</span></button><button class="mini-edit dashboard-story-btn" type="button" data-open-run-story="${r.id}">${lang==='ko'?'인증샷 만들기':'Create story'}</button></div>`
    }).join('');
    el.querySelectorAll('[data-open-run-story]').forEach(btn=>btn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();openShareCard(btn.dataset.openRunStory)}));
  }
  const allBtn=document.getElementById('dashboardViewRunsBtn');
  if(allBtn)allBtn.onclick=()=>{switchView('progress');document.getElementById('runTrendSection')?.scrollIntoView({behavior:'smooth',block:'start'})};
};


function renderDailyReview(log){
  const el=document.getElementById('dailyReviewCard');if(!el)return;
  const lang=state.settings.language||'ko';
  const target=calculateNutrition();
  const meals=ensureMeals(log,activeDate);
  const food=dailyFoodTotals(meals);
  const kcalNow=(food.kcal||+log.calories||0);
  const proteinNow=(food.protein||+log.protein||0);
  const kcalScore=Math.min(100,Math.round(kcalNow/Math.max(1,target.kcal)*100));
  const proteinScore=Math.min(100,Math.round(proteinNow/Math.max(1,target.protein)*100));
  // Nutrition represents both total intake and protein, not calories alone.
  const nutritionScore=Math.round(kcalScore*.5+proteinScore*.5);

  const exercises=Array.isArray(log.exercises)?log.exercises:[];
  const exerciseDone=exercises.filter(x=>x.done).length;
  const planWorkoutScore=exercises.length?Math.round(exerciseDone/exercises.length*100):0;
  const hasCompletedRun=(log.runs||[]).some(r=>(+r.distanceKm||0)>=.1||(+r.movingDurationMs||+r.durationMs||0)>=300000);
  // A meaningful completed run/walk counts as today's workout as well.
  const workoutScore=Math.max(planWorkoutScore,hasCompletedRun?100:0);
  const waterScore=Math.min(100,Math.round((+log.water||0)/Math.max(1,state.settings.waterGoal)*100));
  const sleepScore=Math.min(100,Math.round((+log.sleep||0)/Math.max(1,state.settings.sleepGoal)*100));
  const total=Math.round(workoutScore*.35+nutritionScore*.35+waterScore*.15+sleepScore*.15);

  const hasFood=kcalNow>0||proteinNow>0;
  const hasWater=(+log.water||0)>0;
  const hasSleep=(+log.sleep||0)>0;
  const hasWorkout=exerciseDone>0||hasCompletedRun;
  const hasAny=hasFood||hasWater||hasSleep||hasWorkout;

  let tip;
  if(!hasAny){
    tip=lang==='ko'?'오늘도 화이팅!':'You’ve got this today!';
  }else{
    const categories=[
      {key:'workout',score:workoutScore,order:0},
      {key:'water',score:waterScore,order:1},
      {key:'nutrition',score:nutritionScore,order:2},
      {key:'sleep',score:sleepScore,order:3}
    ].sort((a,b)=>a.score-b.score||a.order-b.order);
    const lowest=categories[0];

    if(lowest.score>=85){
      tip=lang==='ko'?'오늘의 균형이 좋습니다. 잘하고 있어요!':'Your balance looks good today. Keep it going!';
    }else if(lowest.key==='workout'){
      tip=lang==='ko'?'오늘은 가볍게라도 몸을 움직여보세요!':'A little movement would be great today!';
    }else if(lowest.key==='water'){
      tip=lang==='ko'?'수분 섭취가 부족해요. 물을 조금 더 마셔주세요.':'You’re a little low on water. Have some more today.';
    }else if(lowest.key==='sleep'){
      tip=lang==='ko'?'수면 시간이 목표보다 부족해요. 오늘은 회복도 챙겨주세요.':'Your sleep is below target. Give recovery some attention today.';
    }else{
      const proteinGap=Math.max(0,1-proteinNow/Math.max(1,target.protein));
      const kcalGap=Math.max(0,1-kcalNow/Math.max(1,target.kcal));
      if(proteinGap>kcalGap+.05){
        tip=lang==='ko'?'단백질 섭취가 부족해요. 다음 식사에서 조금 보충해보세요.':'Protein is running low. Add a little more at your next meal.';
      }else{
        tip=lang==='ko'?'오늘의 식사량이 목표보다 부족해요. 균형 있게 조금 더 채워보세요.':'Your food intake is still below target. Add a little more balanced nutrition.';
      }
    }
  }

  const reviewLabel=lang==='ko'?'오늘 평가':'TODAY REVIEW';
  const totalLabel=lang==='ko'?`${total}점`:`${total} / 100`;
  el.innerHTML=`<div class="daily-review-head"><div><p class="eyebrow">${reviewLabel}</p><h3>${totalLabel}</h3></div><span>${total>=85?'🔥':total>=65?'🙂':'🌱'}</span></div><div class="review-grid"><div><small>${lang==='ko'?'운동':'Workout'}</small><b>${workoutScore}</b></div><div><small>${lang==='ko'?'식단':'Nutrition'}</small><b>${nutritionScore}</b></div><div><small>${lang==='ko'?'수분':'Water'}</small><b>${waterScore}</b></div><div><small>${lang==='ko'?'수면':'Sleep'}</small><b>${sleepScore}</b></div></div><p>${tip}</p>`
}
function renderToday(){const log=getLog(activeDate);renderDashboardRunCard();renderDailyReview(log);autoPriorities(log);const score=scoreFor(log),m=mood(score),d=dateFromKey(activeDate),isToday=activeDate===todayKey();scoreValue.textContent=`${score}%`;scoreEmoji.textContent=m.emoji;coachLine.textContent=m.line;scoreRing.style.setProperty('--score',score);scoreRing.querySelector('span').textContent=score;workoutDayLabel.textContent=isToday?(state.settings.language==='ko'?'오늘':'TODAY'):new Intl.DateTimeFormat(state.settings.language==='ko'?'ko-KR':'en',{weekday:'long'}).format(d).toUpperCase();workoutDateLabel.textContent=new Intl.DateTimeFormat('en',{month:'short',day:'numeric',year:'numeric'}).format(d);routineName.textContent=localizeWorkoutName(log.planName||weeklyPlan[d.getDay()].name);workoutHeading.textContent=state.settings.language==='ko'?(isToday?'오늘의 운동':'선택한 날짜의 운동'):(isToday?"Today's workout":"Day workout");todayWorkoutBtn.hidden=isToday;renderMeals(log);renderLatestRunAnalysis();
 const defs=[['workout','Workout','Complete every exercise','🏋️'],['nutrition','Nutrition','Log calories and protein','🥗'],['water','Water',`${log.water}/${state.settings.waterGoal} ml`,'💧'],['sleep','Sleep',`${log.sleep}/${state.settings.sleepGoal} h`,'🌙']];priorityGrid.innerHTML=defs.map(([k,t,s,e])=>`<button class="priority-card ${log.priorities[k]?'done':''}" data-priority="${k}"><span>${e}</span><b>${t}</b><small>${s}</small></button>`).join('');
 workoutList.innerHTML=log.exercises.length?log.exercises.map((x,i)=>`<article class="exercise-card ${x.done?'done':''}"><input class="check" type="checkbox" data-ex-check="${i}" ${x.done?'checked':''} aria-label="Complete ${escapeHtml(x.name)}"><button class="text-btn exercise-open" data-ex-open="${i}" style="text-align:left"><h3>${escapeHtml(localizeWorkoutName(x.name))}</h3><p>${x.sets}${state.settings.language==='ko'?'세트':' sets'} × ${x.reps}${state.settings.language==='ko'?'회':' reps'}${x.weight?` · ${x.weight} kg`:''}</p></button><button class="mini-edit" data-ex-edit="${i}" aria-label="${state.settings.language==='ko'?'수정':'Edit'} ${escapeHtml(localizeWorkoutName(x.name))}">${state.settings.language==='ko'?'수정':'Edit'}</button></article>`).join(''):'<div class="empty-state"><span>🧘</span><p>No exercises scheduled.</p><button class="text-btn" data-empty-add>+ Add an exercise</button></div>';
 waterInput.value=log.water||'';sleepInput.value=log.sleep||'';calorieInput.value=log.calories||'';proteinInput.value=log.protein||'';memoInput.value=log.memo||'';if(isToday)maybeCelebrate(score)}
function autoPriorities(l){l.priorities=l.priorities||{};const hasCompletedRun=Array.isArray(l.runs)&&l.runs.some(r=>(+r.distanceKm||0)>=.02&&(+r.durationMs||0)>0);l.priorities.workout=hasCompletedRun||(l.exercises.length>0&&l.exercises.every(x=>x.done));l.priorities.water=+l.water>=+state.settings.waterGoal;l.priorities.sleep=+l.sleep>=+state.settings.sleepGoal;l.priorities.nutrition=+l.calories>0&&+l.protein>0}
function updateLog(patch,date=activeDate){Object.assign(getLog(date),patch,{updatedAt:new Date().toISOString()});saveState();render()}
function maybeCelebrate(s){const k=todayKey();if(s===100&&state.lastCelebrated[k]!==100){showCelebration(s);state.lastCelebrated[k]=100;saveState()}}
function showCelebration(s){const m=mood(s);celebrationContent.innerHTML=`<div class="big-emoji">${m.emoji}</div><h2>${m.title}</h2><p>${m.line}</p><p class="slogan">Smile. Train. Become the Machine.</p>`;celebrationDialog.showModal();if(s===100)confetti()}
function confetti(){for(let i=0;i<28;i++){const el=document.createElement('i');el.className='confetti';el.style.left=Math.random()*100+'vw';el.style.setProperty('--x',(Math.random()*180-90)+'px');el.style.animationDelay=Math.random()*.5+'s';document.body.appendChild(el);setTimeout(()=>el.remove(),2400)}}
function renderCalendar(){const y=calendarCursor.getFullYear(),m=calendarCursor.getMonth();monthTitle.textContent=new Intl.DateTimeFormat('en',{month:'long',year:'numeric'}).format(calendarCursor);const first=new Date(y,m,1),days=new Date(y,m+1,0).getDate();let html='';for(let i=0;i<first.getDay();i++)html+='<div class="day blank"></div>';for(let d=1;d<=days;d++){const key=`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`,s=state.logs[key]?scoreFor(state.logs[key]):0;html+=`<button class="day ${key===todayKey()?'today':''} ${key===selectedDate?'selected':''}" data-date="${key}"><span>${d}</span><span>${s===100?'🤖':s===0?'':'•'}</span><span class="heat"><i style="width:${s}%"></i></span></button>`}calendarGrid.innerHTML=html;renderDaySummary()}
function renderDaySummary(){const log=state.logs[selectedDate],s=log?scoreFor(log):0,m=mood(s),routine=weeklyPlan[dateFromKey(selectedDate).getDay()];daySummary.innerHTML=`<p class="eyebrow">${selectedDate}</p><h2>${escapeHtml(localizeWorkoutName(log?.planName||routine.name))}</h2><p class="muted">${m.emoji} ${s}% complete · ${log?.exercises?.length??routine.exercises.length} exercises</p>${log?`<p>Water ${log.water||0} ml · Sleep ${log.sleep||0} h · Protein ${log.protein||0} g</p>`:'<p>The weekly plan will be created when you open this day.</p>'}<button class="primary-btn" id="openSelectedDay">Open this workout</button>`;document.getElementById('openSelectedDay').onclick=()=>{activeDate=selectedDate;switchView('today');renderToday()}}
let bodyTrendDays=7,runTrendDays=7,runTrendMetric='distance';
function trendDateLabel(value){const d=new Date(value);return `${d.getMonth()+1}/${d.getDate()}`}
function trendSvg(rows,{valueKey,formatValue,paceMode=false}){
  if(!rows.length)return `<div class="trend-empty">${state.settings.language==='ko'?'표시할 기록이 아직 없어요.':'No records to chart yet.'}</div>`;
  const W=720,H=230,pad={l:42,r:18,t:28,b:38},vals=rows.map(x=>+x[valueKey]).filter(Number.isFinite);if(!vals.length)return '';
  let lo=Math.min(...vals),hi=Math.max(...vals);if(lo===hi){lo=Math.max(0,lo-(lo*.08||1));hi=hi+(hi*.08||1)}const gap=(hi-lo)*.14;lo=Math.max(0,lo-gap);hi+=gap;
  const x=i=>rows.length===1?(pad.l+(W-pad.l-pad.r)/2):pad.l+i*(W-pad.l-pad.r)/(rows.length-1),y=v=>pad.t+(hi-v)*(H-pad.t-pad.b)/(hi-lo||1);
  const ticks=[0,.5,1].map(t=>lo+(hi-lo)*t);let out=`<svg viewBox="0 0 ${W} ${H}" role="img">`;
  ticks.forEach(v=>{const yy=y(v);out+=`<line class="trend-grid" x1="${pad.l}" x2="${W-pad.r}" y1="${yy}" y2="${yy}"/><text class="trend-axis-label" x="${pad.l-7}" y="${yy+4}" text-anchor="end">${formatValue(v,true)}</text>`});
  if(rows.length>1)out+=`<polyline class="trend-line" points="${rows.map((r,i)=>`${x(i)},${y(+r[valueKey])}`).join(' ')}"/>`;
  rows.forEach((r,i)=>{const xx=x(i),yy=y(+r[valueKey]);out+=`<circle class="trend-dot" cx="${xx}" cy="${yy}" r="5"/><text class="trend-value" x="${xx}" y="${Math.max(14,yy-11)}" text-anchor="middle">${formatValue(+r[valueKey],false)}</text>`;if(rows.length<=8||i===0||i===rows.length-1||i%Math.ceil(rows.length/6)===0)out+=`<text class="trend-axis-label" x="${xx}" y="${H-12}" text-anchor="middle">${trendDateLabel(r.date)}</text>`});
  return out+'</svg>';
}
function periodRows(rows,days){if(!days)return rows;const cutoff=Date.now()-(days-1)*86400000;return rows.filter(x=>new Date(x.date).getTime()>=cutoff)}
function renderTrendControls(){
  document.querySelectorAll('#bodyTrendPeriod button').forEach(b=>b.classList.toggle('active',+b.dataset.days===bodyTrendDays));
  document.querySelectorAll('#runTrendPeriod button').forEach(b=>b.classList.toggle('active',+b.dataset.days===runTrendDays));
  document.querySelectorAll('#runTrendMetric button').forEach(b=>b.classList.toggle('active',b.dataset.metric===runTrendMetric));
}
function renderBodyTrend(){const el=document.getElementById('bodyTrendChart');if(!el)return;const rows=periodRows((state.body||[]).filter(x=>Number.isFinite(+x.weight)&&+x.weight>0).map(x=>({date:x.date,weight:+x.weight})).sort((a,b)=>new Date(a.date)-new Date(b.date)),bodyTrendDays);el.innerHTML=trendSvg(rows,{valueKey:'weight',formatValue:(v)=>`${v.toFixed(1)}kg`})}
function renderRunTrend(){const el=document.getElementById('runTrendChart');if(!el)return;const rows=periodRows((state.runs||[]).filter(r=>(r.activityType||'run')==='run'&&r.endedAt&&+r.distanceKm>0).map(r=>({date:r.endedAt,distance:+r.distanceKm,pace:+r.avgPaceSecKm||0,time:(+r.durationMs||0)/60000})).sort((a,b)=>new Date(a.date)-new Date(b.date)),runTrendDays);const cfg=runTrendMetric==='pace'?{valueKey:'pace',formatValue:(v)=>paceText(Math.max(0,Math.round(v)))}:runTrendMetric==='time'?{valueKey:'time',formatValue:(v)=>`${Math.round(v)}m`}:{valueKey:'distance',formatValue:(v)=>`${v.toFixed(2)}km`};el.innerHTML=trendSvg(rows,cfg)}
function renderProgressRunHistory(){const el=document.getElementById('progressRunHistory');if(!el)return;const lang=state.settings.language||'ko',runs=(state.runs||[]).filter(r=>(r.activityType||'run')==='run').slice().sort((a,b)=>new Date(b.endedAt)-new Date(a.endedAt));el.innerHTML=runs.length?runs.map(r=>`<div class="progress-run-row"><span><b>${new Date(r.endedAt).toLocaleDateString()}</b><small>${formatClock(r.durationMs)} · ${paceText(r.avgPaceSecKm)}/km</small></span><strong>${formatDistance(r.distanceKm)}</strong></div>`).join(''):`<div class="trend-empty">${lang==='ko'?'아직 러닝 기록이 없어요.':'No running records yet.'}</div>`}
function renderProgress(){const keys=[...Array(7)].map((_,i)=>{const d=new Date();d.setDate(d.getDate()-6+i);return keyFromDate(d)});weeklyBars.innerHTML=keys.map(k=>{const s=state.logs[k]?scoreFor(state.logs[k]):0;return`<div class="bar-col"><div class="bar" style="height:${Math.max(s,2)}%"></div><small>${k.slice(8)}</small></div>`}).join('');renderTrendControls();renderBodyTrend();renderRunTrend();renderProgressRunHistory()}
document.getElementById('bodyTrendPeriod')?.addEventListener('click',e=>{const b=e.target.closest('button[data-days]');if(!b)return;bodyTrendDays=+b.dataset.days;renderTrendControls();renderBodyTrend()});
document.getElementById('runTrendPeriod')?.addEventListener('click',e=>{const b=e.target.closest('button[data-days]');if(!b)return;runTrendDays=+b.dataset.days;renderTrendControls();renderRunTrend()});
document.getElementById('runTrendMetric')?.addEventListener('click',e=>{const b=e.target.closest('button[data-metric]');if(!b)return;runTrendMetric=b.dataset.metric;renderTrendControls();renderRunTrend()});
const KO_WORKOUT_NAMES={
 'Lower Body Strength':'하체 근력','Upper Body Strength':'상체 근력','Full Body Strength':'전신 근력','Glutes & Core':'둔근·코어','Push Day':'상체 밀기','Pull Day':'상체 당기기',
 'Easy Run':'이지 러닝','Recovery Run':'회복 러닝','Tempo Run':'템포 러닝','Interval Run':'인터벌 러닝','Long Run':'롱 러닝','Hill Run':'언덕 러닝',
 'HYROX Full Simulation':'하이록스 풀 시뮬레이션','HYROX Half Session':'하이록스 하프 세션','HYROX Beginner':'하이록스 입문','HYROX Strength Focus':'하이록스 근력 집중','HYROX Engine Focus':'하이록스 엔진 집중','HYROX / Full Body':'하이록스·전신',
 'Full Body Metcon':'전신 메트콘','Kettlebell Conditioning':'케틀벨 컨디셔닝','Bodyweight Circuit':'맨몸 서킷','Row & SkiErg':'로잉·스키에르그',
 'Full Body Mobility':'전신 모빌리티','Stretching':'스트레칭','Active Recovery':'액티브 리커버리','Rest Day':'휴식',
 'Running':'러닝','Treadmill':'트레드밀','Stair Climber':'계단 오르기','Stepmill':'스텝밀','Indoor Cycling':'실내 사이클','Outdoor Cycling':'실외 사이클','Elliptical':'일립티컬','Rowing Machine':'로잉머신','Jump Rope':'줄넘기','Swimming':'수영','Hiking':'등산','Walking':'걷기',
 'Deadlift':'데드리프트','Goblet Squat':'고블릿 스쿼트','Leg Curl':'레그 컬','Standing Calf Raise':'스탠딩 카프 레이즈','Dead Bug':'데드버그','Back Squat':'백 스쿼트','Romanian Deadlift':'루마니안 데드리프트','Reverse Lunge':'리버스 런지','Hip Thrust':'힙 쓰러스트','Bench Press':'벤치프레스','Seated Cable Row':'시티드 케이블 로우','Shoulder Press':'숄더 프레스','Lat Pulldown':'랫 풀다운','Dumbbell Bench Press':'덤벨 벤치프레스','One-arm Row':'원암 로우','Farmer Carry':'파머스 캐리','Farmers Carry':'파머스 캐리','Bulgarian Split Squat':'불가리안 스플릿 스쿼트','Band Abduction':'밴드 어브덕션','Incline Dumbbell Press':'인클라인 덤벨프레스','Triceps Pushdown':'트라이셉스 푸시다운','Cable Row':'케이블 로우','Face Pull':'페이스 풀','Dumbbell Curl':'덤벨 컬','Warm-up Jog':'워밍업 조깅','Tempo Run':'템포 러닝','Cool-down Jog':'쿨다운 조깅','Warm-up':'워밍업','400 m Intervals':'400m 인터벌','Cool-down':'쿨다운','Hill Repeats':'언덕 반복주','Row Erg':'로잉 에르그','Burpee Broad Jump':'버피 브로드 점프','Walking Lunge':'워킹 런지','Wall Ball':'월볼','Sled Push':'슬레드 푸시','Sled Pull':'슬레드 풀','Sandbag Lunges':'샌드백 런지','Wall Balls':'월볼','SkiErg 750 m':'스키에르그 750m','Row 750 m':'로잉 750m','Dumbbell Thruster':'덤벨 스러스터','Row':'로잉','Burpees':'버피','Kettlebell Swing':'케틀벨 스윙','Suitcase Carry':'수트케이스 캐리','Air Squat':'에어 스쿼트','Push-up':'푸시업','Mountain Climbers':'마운틴 클라이머','Plank':'플랭크','Row 500 m':'로잉 500m','SkiErg 500 m':'스키에르그 500m','Full Body Stretch':'전신 스트레칭','Recovery Walk':'회복 걷기'
};

const KO_CATEGORY_NAMES={'Running / Walking':'러닝·걷기',Strength:'근력',Running:'러닝',Cardio:'유산소',HYROX:'하이록스',CrossFit:'크로스핏',Conditioning:'크로스핏',Recovery:'회복'};
function localizeWorkoutName(name){return (state.settings.language||'ko')==='ko'?(KO_WORKOUT_NAMES[name]||name):name}
function localizeCategoryName(name){return (state.settings.language||'ko')==='ko'?(KO_CATEGORY_NAMES[name]||name):name}
function localizeMealName(key,fallback=''){if((state.settings.language||'ko')!=='ko')return fallback||key;return({breakfast:'아침',lunch:'점심',snack:'간식',dinner:'저녁'}[key]||fallback||key)}

const I18N={
  ko:{today:'오늘',run:'러닝',plan:'계획',calendar:'달력',progress:'기록',settings:'설정',language:'언어',save:'설정 저장',daily:'오늘의 우선순위',meal:'오늘의 식단',workout:'오늘의 운동',quick:'빠른 기록',latest:'최근 러닝 분석',ready:'러닝 준비',start:'▶ 러닝 시작',recent:'최근 러닝',weekly:'주간 계획',body:'신체 변화',data:'데이터',storyNote:'사진 또는 이동할 텍스트·경로·로고를 미리보기에서 직접 드래그하세요. Photo size로 사진을 확대할 수 있어요.'},
  en:{today:'Today',run:'Run',plan:'Plan',calendar:'Calendar',progress:'Progress',settings:'Settings',language:'Language',save:'Save settings',daily:'Daily priorities',meal:"Today's meal plan",workout:"Today's workout",quick:'Quick log',latest:'Latest run analysis',ready:'Ready to run',start:'▶ Start Run',recent:'Recent runs',weekly:'Weekly Plan',body:'Body progress',data:'Data',storyNote:'Drag the photo, text, route or logo directly in the preview. Use Photo size to zoom the photo.'}
};

const STATIC_KO={
"TODAY'S SCORE":"오늘의 점수","Daily priorities":"오늘의 우선순위","Quick log":"빠른 기록","Latest run analysis":"최근 러닝 분석","Live splits":"1km 구간 기록","LIVE GPS RUN":"실시간 GPS 운동","Ready to run":"러닝 준비","GPS waiting":"GPS 대기 중","ACTIVITY":"운동 종류","GPS route tracking":"GPS 경로 기록","Auto Pause":"자동 일시정지","LIVE ROUTE":"실시간 경로","WAITING":"대기 중","TIME":"시간","DISTANCE":"거리","CURRENT PACE":"현재 페이스","AVG PACE":"평균 페이스","CALORIES":"칼로리","GPS ACCURACY":"GPS 정확도","MOVING TIME":"이동 시간","TOP SPEED":"최고 속도","For safety, check traffic and surroundings. 러닝 중 기록은 자동 저장됩니다. 화면 잠금 중에는 iOS 상태에 따라 GPS가 일시 중단될 수 있으며, 앱을 다시 열면 저장된 세션을 복구합니다.":"안전을 위해 교통과 주변을 확인하세요. 운동 기록은 자동 저장됩니다. iOS에서 화면을 잠그면 GPS가 일시 중단될 수 있으며, 앱을 다시 열면 저장된 세션을 복구합니다.","Weekly Plan":"주간 계획","REPEATING ROUTINE":"반복 루틴","Body progress":"신체 변화","Data":"데이터","Water (ml)":"수분(ml)","Sleep (hours)":"수면(시간)","Protein (g)":"단백질(g)","Daily memo":"오늘의 메모","How did today feel?":"오늘 하루는 어땠나요?","Running":"러닝","Walking":"걷기","Complete a run to see pace, speed and performance insights here.":"운동을 완료하면 페이스, 속도와 분석 결과가 표시됩니다.","Your 1 km splits will appear here.":"1km 구간 기록이 여기에 표시됩니다.","No completed runs yet.":"완료된 운동 기록이 없습니다.","Start Run":"러닝 시작","Start run":"러닝 시작","View all":"전체 보기","Complete all":"모두 완료","Reset plan":"계획 초기화","Return to today":"오늘로 돌아가기","Regenerate":"식단 새로 만들기","Today":"오늘","Run":"러닝","Plan":"계획","Calendar":"달력","Progress":"기록","Settings":"설정","Workout":"운동","Nutrition":"영양","Water":"수분","Sleep":"수면"
};
const STATIC_EN=Object.fromEntries(Object.entries(STATIC_KO).map(([en,ko])=>[ko,en]));
function translateStaticKo(){
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  nodes.forEach(n=>{const raw=n.nodeValue,trim=raw.trim();if(!trim)return;const ko=STATIC_KO[trim];if(ko)n.nodeValue=raw.replace(trim,ko)});
  document.querySelectorAll('[placeholder]').forEach(el=>{const ko=STATIC_KO[el.placeholder];if(ko)el.placeholder=ko});
  document.querySelectorAll('[aria-label]').forEach(el=>{const ko=STATIC_KO[el.getAttribute('aria-label')];if(ko)el.setAttribute('aria-label',ko)});
}

function translateStaticEn(){
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  nodes.forEach(n=>{const raw=n.nodeValue,trim=raw.trim();if(!trim)return;const en=STATIC_EN[trim];if(en)n.nodeValue=raw.replace(trim,en)});
  document.querySelectorAll('[placeholder]').forEach(el=>{const en=STATIC_EN[el.placeholder];if(en)el.placeholder=en});
  document.querySelectorAll('[aria-label]').forEach(el=>{const en=STATIC_EN[el.getAttribute('aria-label')];if(en)el.setAttribute('aria-label',en)});
}
function applyLanguage(lang=state.settings.language||'ko'){
  state.settings.language=lang;document.documentElement.lang=lang;const t=I18N[lang]||I18N.ko;
  const nav=[['today',t.today],['run',t.run],['plan',t.plan],['calendar',t.calendar],['progress',t.progress],['settings',t.settings]];nav.forEach(([v,label])=>{const b=document.querySelector(`.bottom-nav [data-view="${v}"]`);if(b){const icon=b.querySelector('span')?.outerHTML||'';b.innerHTML=icon+label}});
  const setText=(sel,val)=>{const el=document.querySelector(sel);if(el)el.textContent=val};
  setText('#today .section-head h2',t.daily);setText('#mealPlanHeading',t.meal);setText('#dashboardRecentRunsHeading',t.recent);setText('#workoutHeading',t.workout);setText('#today .section-head:nth-last-of-type(2) h2',t.quick);setText('#today .section-head:last-of-type h2',t.latest);setText('#runStatusTitle',t.ready);setText('#startRunBtn',t.start);setText('#plan .plan-title-row h2',t.weekly);setText('#progress .section-head h2',t.body);setText('#settings .section-head:nth-last-of-type(1) h2',t.data);setText('#saveSettingsBtn',t.save);setText('.story-studio-note',t.storyNote);
  const langLabel=document.querySelector('#languageSetting')?.closest('label')?.querySelector('span');if(langLabel)langLabel.textContent=t.language;
  const pairs=lang==='ko'?{
    '#completeAllBtn':'모두 완료','#regenerateMealsBtn':'식단 새로 만들기','#nutritionLabelBtn':'영양표 분석','#changeWorkoutBtn':'운동 변경','#resetPlanBtn':'계획 초기화','#addExerciseBtn':'+ 운동 추가','#createWorkoutStoryBtn':'운동 인증샷 만들기','#dailyReviewHeading':'AI 하루 평가','#runStatusNote':'실외에서 위치 권한을 허용한 뒤 러닝 시작을 눌러 주세요.','#pauseRunBtn':'Ⅱ 일시정지','#finishRunBtn':'■ 종료','#saveBodyBtn':'오늘 신체 기록 저장','#saveSettingsBtn':'설정 저장','#wearableHeading':'Apple Watch 화면 테스트','#openWatchTestBtn':'화면 테스트','#dashboardRecentRunsHeading':'최근 러닝','#dashboardViewRunsBtn':'전체 보기','#mealPlanHeading':'오늘의 식단'}:{
    '#completeAllBtn':'Complete all','#regenerateMealsBtn':'Regenerate meals','#nutritionLabelBtn':'Scan nutrition label','#changeWorkoutBtn':'Change workout','#resetPlanBtn':'Reset plan','#addExerciseBtn':'+ Add exercise','#createWorkoutStoryBtn':'Create workout story','#dailyReviewHeading':'AI Daily Review','#runStatusNote':'Go outdoors, allow location access, then tap Start Run.','#pauseRunBtn':(state.settings.language==='ko'?'Ⅱ 일시정지':'Ⅱ Pause'),'#finishRunBtn':'■ Finish','#saveBodyBtn':"Save today's body record",'#saveSettingsBtn':'Save settings','#wearableHeading':'Apple Watch UI Test','#openWatchTestBtn':'Open preview','#dashboardRecentRunsHeading':'Recent Runs','#dashboardViewRunsBtn':'View all','#mealPlanHeading':"Today's meal plan"};Object.entries(pairs).forEach(([s,v])=>setText(s,v));
  const activitySelect=document.getElementById('runActivityType');if(activitySelect){activitySelect.options[0].text=lang==='ko'?'러닝':'Running';activitySelect.options[1].text=lang==='ko'?'걷기':'Walking'};document.querySelectorAll('#mealPlanList .eyebrow').forEach(el=>{const map=lang==='ko'?{BREAKFAST:'아침',LUNCH:'점심',SNACK:'간식',DINNER:'저녁'}:{};if(map[el.textContent])el.textContent=map[el.textContent]});  if(lang==='ko')translateStaticKo();else translateStaticEn();
}
function renderSettings(){const s=state.settings;if(document.getElementById('languageSetting'))document.getElementById('languageSetting').value=s.language||'ko';document.querySelectorAll('input[name="eldynTheme"]').forEach(x=>x.checked=x.value===(s.theme||'performance'));displayName.value=s.name||'Ellen';sexSetting.value=s.sex||'female';ageSetting.value=s.age||37;heightSetting.value=s.height||160;currentWeightSetting.value=s.currentWeight||'';currentBodyFatSetting.value=s.currentBodyFat||'';goalWeightSetting.value=s.goalWeight||'';goalMode.value=s.goalMode||'fatloss';activitySetting.value=String(s.activity||1.55);mealCountSetting.value=String(s.mealCount||4);waterGoal.value=s.waterGoal;sleepGoal.value=s.sleepGoal;proteinGoal.value=s.proteinGoal;calorieGoal.value=s.calorieGoal;const t=calculateNutrition();nutritionCalcNote.textContent=(state.settings.language==='ko'?`예상 기초대사량 ${t.bmr.toLocaleString()} kcal · 유지 칼로리 ${t.tdee.toLocaleString()} kcal. 컨디션과 회복 상태에 따라 목표를 조정하세요.`:`Estimated BMR ${t.bmr.toLocaleString()} kcal · maintenance ${t.tdee.toLocaleString()} kcal. Adjust targets based on energy, recovery and professional advice.`)}
function openExercise(i){const x=getLog().exercises[i],id=extractYoutubeId(x.youtube);exerciseDetail.innerHTML=`<p class="eyebrow">EXERCISE GUIDE</p><h2>${escapeHtml(localizeWorkoutName(x.name))}</h2>${id?`<div class="video-wrap"><iframe src="https://www.youtube-nocookie.com/embed/${id}?playsinline=1" title="${escapeHtml(x.name)} guide" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`:`<a class="secondary-btn" style="display:block;text-align:center;text-decoration:none" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=${encodeURIComponent(x.search||x.name+' proper form')}">Find a free YouTube guide</a>`}<h3>Target</h3><p class="muted">${escapeHtml(x.target||'Custom exercise')}</p><h3>How to perform</h3><p>${escapeHtml(x.instructions||'Use controlled form and stop if you feel sharp pain.')}</p><div class="set-grid"><div class="set-box"><b>${x.sets}</b><small>Sets</small></div><div class="set-box"><b>${x.reps}</b><small>Reps</small></div><div class="set-box"><b>${x.weight||0}</b><small>kg</small></div></div><div class="form-row"><button type="button" class="secondary-btn" id="editExerciseBtn">Edit</button><button type="button" class="primary-btn" id="toggleExerciseDone">${x.done?'Mark incomplete':'Complete exercise'}</button></div><button type="button" class="danger-btn" id="deleteExerciseBtn">Delete from this day</button>`;exerciseDialog.showModal();toggleExerciseDone.onclick=()=>{x.done=!x.done;updateLog({exercises:getLog().exercises});exerciseDialog.close()};editExerciseBtn.onclick=()=>{exerciseDialog.close();openExerciseForm(i)};deleteExerciseBtn.onclick=()=>{if(confirm(`Delete ${x.name} from ${activeDate}?`)){getLog().exercises.splice(i,1);updateLog({exercises:getLog().exercises,planSource:getLog().exercises.length?'custom':'custom-empty'});exerciseDialog.close()}}}
function openExerciseForm(i=null){editingIndex=i;const form=addExerciseForm;form.reset();if(i===null){exerciseFormEyebrow.textContent='NEW EXERCISE';exerciseFormTitle.textContent=`Add to ${activeDate}`;exerciseFormSubmit.textContent='Add exercise';form.sets.value=3;form.reps.value=10;form.weight.value=0}else{const x=getLog().exercises[i];exerciseFormEyebrow.textContent='EDIT EXERCISE';exerciseFormTitle.textContent=localizeWorkoutName(x.name);exerciseFormSubmit.textContent='Save changes';for(const k of ['name','sets','reps','weight','target','instructions','youtube'])if(form.elements[k])form.elements[k].value=x[k]??''}addExerciseDialog.showModal()}
function extractYoutubeId(v=''){if(/^[\w-]{11}$/.test(v))return v;try{const u=new URL(v);if(u.hostname.includes('youtu.be'))return u.pathname.slice(1,12);if(u.searchParams.get('v'))return u.searchParams.get('v').slice(0,11);return u.pathname.match(/\/embed\/([\w-]{11})/)?.[1]||''}catch{return''}}
function escapeHtml(s=''){return String(s).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]))}
function switchView(id){document.querySelectorAll('.bottom-nav button').forEach(x=>x.classList.toggle('active',x.dataset.view===id));document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id===id));if(id==='run')renderRun()}

const workoutChangeEls={
  open:document.getElementById('changeWorkoutBtn'),dialog:document.getElementById('changeWorkoutDialog'),options:document.getElementById('workoutPlanOptions'),apply:document.getElementById('applyWorkoutChangeBtn'),restore:document.getElementById('restoreWorkoutPlanBtn')
};
function openWorkoutChange(){
  const l=getLog(activeDate),base=weeklyPlan[dateFromKey(activeDate).getDay()].name,reco=yesterdayRecommendation();
  const previous=Array.isArray(l.selectedWorkoutKeys)?l.selectedWorkoutKeys:[];
  workoutChangeEls.options.innerHTML=`<div class="ai-workout-recommend"><span>✦ AI PICK</span><b>${escapeHtml(workoutPlanByKey(reco)?.name||'Full Body Strength')}</b><small>어제 기록과 오늘 계획을 기준으로 추천했어요. 여러 운동을 함께 선택할 수 있어요.</small></div>`+Object.entries(workoutCatalog).map(([cat,data])=>`<section class="workout-category"><h3>${data.icon} ${localizeCategoryName(data.label)}</h3><div class="workout-category-grid">${Object.entries(data.plans).map(([key,plan])=>{const value=`${cat}:${key}`,checked=previous.includes(value)||(!previous.length&&value===reco);return `<label class="workout-option ${value===reco?'recommended':''} ${checked?'selected':''}"><input type="checkbox" name="workoutReplacement" value="${value}" ${checked?'checked':''}><span><b>${escapeHtml(localizeWorkoutName(plan.name))}</b><small>${escapeHtml(plan.meta||'Custom workout')}</small></span>${value===reco?'<em>추천</em>':''}</label>`}).join('')}</div></section>`).join('')+`<p class="muted current-plan-note">${state.settings.language==='ko'?'현재 계획':'Current plan'}: ${escapeHtml(localizeWorkoutName(l.planName||base))}</p>`;
  workoutChangeEls.restore.hidden=!l.originalPlan;workoutChangeEls.apply.textContent=state.settings.language==='ko'?'선택한 운동 적용':'Apply selected workouts';workoutChangeEls.dialog.showModal();
}
function replaceWorkouts(keys){
  const l=getLog(activeDate),selected=(keys||[]).filter(Boolean),templates=selected.map(k=>({key:k,plan:workoutPlanByKey(k)})).filter(x=>x.plan);if(!templates.length)return alert(state.settings.language==='ko'?'운동을 하나 이상 선택해 주세요.':'Select at least one workout.');
  if(!l.originalPlan)l.originalPlan={name:l.planName||weeklyPlan[dateFromKey(activeDate).getDay()].name,source:l.planSource||'weekly',exercises:clone(l.exercises)};
  l.exercises=templates.flatMap(({key,plan},groupIndex)=>clone(plan.exercises).map((x,i)=>({...x,id:`${x.id}-${activeDate}-${groupIndex}-${i}`,done:false,workoutGroup:key})));
  l.planName=templates.map(x=>x.plan.name).join(' + ');l.planSource='builder-multi';l.selectedWorkoutKeys=selected;l.planInitialized=true;l.priorities.workout=false;l.updatedAt=new Date().toISOString();saveState();workoutChangeEls.dialog.close();render();
}
workoutChangeEls.open.onclick=openWorkoutChange;
workoutChangeEls.options.onchange=e=>{if(e.target.name==='workoutReplacement'){e.target.closest('.workout-option')?.classList.toggle('selected',e.target.checked)}};
workoutChangeEls.apply.onclick=()=>replaceWorkouts([...workoutChangeEls.options.querySelectorAll('input[name="workoutReplacement"]:checked')].map(x=>x.value));
workoutChangeEls.restore.onclick=()=>{const l=getLog(activeDate);if(!l.originalPlan)return;const original=l.originalPlan;l.exercises=clone(original.exercises).map(x=>({...x,done:false}));l.planName=original.name;l.planSource=original.source;l.originalPlan=null;l.selectedWorkoutKeys=[];l.priorities.workout=false;l.updatedAt=new Date().toISOString();saveState();workoutChangeEls.dialog.close();render()};

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
mealPlanList.onclick=e=>{const c=e.target.closest('[data-meal-change]'),d=e.target.closest('[data-meal-done]'),edit=e.target.closest('[data-meal-edit]'),food=e.target.closest('[data-meal-food]'),scan=e.target.closest('[data-meal-scan]'),l=getLog(activeDate),meals=ensureMeals(l,activeDate);if(scan){openFoodScan(+scan.dataset.mealScan);return}else if(food){openFoodEditor(+food.dataset.mealFood);return}else if(edit){const m=meals[+edit.dataset.mealEdit],current=m.customText||mealChoices[m.key][m.choice%mealChoices[m.key].length],value=prompt(`${m.name} 식단 메모를 입력하세요.`,current);if(value===null)return;m.customText=value.trim();if(!m.customText)delete m.customText}else if(c){const m=meals[+c.dataset.mealChange];delete m.customText;m.foodItems=[];m.done=false;m.choice=(m.choice+1)%mealChoices[m.key].length}else if(d){const idx=+d.dataset.mealDone,m=meals[idx],items=Array.isArray(m.foodItems)?m.foodItems:[],validRecommended=items.findIndex(x=>x?.source==='recommended-plan'&&x.mealKey===m.key&&x.date===activeDate),hasActual=items.some(x=>x?.source!=='recommended-plan');if(validRecommended>=0){m.foodItems=items.filter((_,i)=>i!==validRecommended)}else if(!hasActual){const t=calculateNutrition(),count=Math.max(1,meals.length),recommendation=mealChoices[m.key][m.choice%mealChoices[m.key].length];m.foodItems=items.filter(x=>x?.source!=='recommended-plan');m.foodItems.push({name:recommendation,amount:1,unit:'meal',kcal:Math.round(t.kcal/count),protein:roundMacro(t.protein/count),carbs:roundMacro(t.carb/count),fat:roundMacro(t.fat/count),source:'recommended-plan',mealKey:m.key,date:activeDate,loggedAt:new Date().toISOString()})}else{return}}else return;syncFoodTotals(l,meals);l.priorities.nutrition=meals.every(mealHasNutritionLog);l.updatedAt=new Date().toISOString();saveState();render()}
saveSettingsBtn.onclick=()=>{const theme=document.querySelector('input[name="eldynTheme"]:checked')?.value||'performance';Object.assign(state.settings,{theme,language:document.getElementById('languageSetting')?.value||'ko',waterGoal:+waterGoal.value||2000,sleepGoal:+sleepGoal.value||7.5,proteinGoal:+proteinGoal.value||120,calorieGoal:+calorieGoal.value||1800});applyTheme(theme);saveState();render();alert(state.settings.language==='en'?'Settings saved.':'설정을 저장했어요.')};saveBodyBtn.onclick=()=>{state.body=state.body.filter(x=>x.date!==todayKey());state.body.push({date:todayKey(),weight:+weightInput.value||null,bodyFat:+bodyFatInput.value||null,waist:+waistInput.value||null,muscle:+muscleInput.value||null});saveState();alert('Body record saved.')};exportBtn.onclick=()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`eldyn-backup-${todayKey()}.json`;a.click();URL.revokeObjectURL(a.href)};importInput.onchange=async e=>{try{state={...clone(defaults),...JSON.parse(await e.target.files[0].text())};saveState();render();alert('Backup imported.')}catch{alert('That backup file could not be read.')}};celebrationClose.onclick=()=>celebrationDialog.close();profileBtn.onclick=()=>accountDialog.showModal();
async function initSupabase(){const c=window.ELLEN_CONFIG||{},badge=document.getElementById('connectionBadge');if(!c.SUPABASE_URL||!c.SUPABASE_ANON_KEY){syncNowBtn.disabled=true;syncStatus.textContent='Supabase configuration is missing.';return}if(!window.supabase){syncStatus.textContent='Internet connection required.';return}try{supabaseClient=window.supabase.createClient(c.SUPABASE_URL,c.SUPABASE_ANON_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});const{data,error}=await supabaseClient.auth.getSession();if(error)throw error;setUser(data.session?.user||null);supabaseClient.auth.onAuthStateChange((_e,s)=>setUser(s?.user||null))}catch(e){syncStatus.textContent='Cloud connection failed: '+e.message}}
function setUser(user){currentUser=user;cloudHydrated=false;authTitle.textContent=user?user.email:'Cloud ready';syncStatus.textContent=user?'Loading cloud data…':'Supabase is connected. Create an account or sign in.';authFields.hidden=!!user;signOutBtn.hidden=!user;syncNowBtn.disabled=!user;if(user)cloudPull();}
signInBtn.onclick=()=>authAction('signin');signUpBtn.onclick=()=>authAction('signup');signOutBtn.onclick=async()=>{await supabaseClient?.auth.signOut();setUser(null)};syncNowBtn.onclick=()=>cloudSync(true);async function authAction(mode){if(!supabaseClient)return alert('Cloud connection is not ready.');const email=emailInput.value.trim(),password=passwordInput.value;if(!email||password.length<6)return alert('Enter an email and a password with at least 6 characters.');const fn=mode==='signup'?'signUp':'signInWithPassword',r=await supabaseClient.auth[fn]({email,password});if(r.error)alert(r.error.message);else alert(mode==='signup'?'Account created. You can sign in now if email confirmation is disabled.':'Signed in. Cloud sync is active.')}
function parsePayload(payload){if(!payload)return{};if(typeof payload==='string'){try{return JSON.parse(payload)}catch{return{}}}return payload}
function mealHasUserData(meal){return !!(String(meal?.customText||'').trim()||(Array.isArray(meal?.foodItems)&&meal.foodItems.length)||mealHasNutritionLog(meal))}
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
  // Meal completion and Daily Nutrition share the same source of truth: actual nutrition logs.
  normaliseMealCompletion(base.mealPlan||[]);
  const totals=dailyFoodTotals(base.mealPlan||[]);
  base.calories=Math.round(totals.kcal||0);base.protein=roundMacro(totals.protein);base.carbs=roundMacro(totals.carbs);base.fat=roundMacro(totals.fat);
  if(base.priorities)base.priorities.nutrition=(base.mealPlan||[]).length>0&&(base.mealPlan||[]).every(mealHasNutritionLog);
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
  autoPause:document.getElementById('autoPauseToggle'),activityType:document.getElementById('runActivityType'),movingTime:document.getElementById('runMovingTime'),topSpeed:document.getElementById('runTopSpeed'),
  quality:document.getElementById('gpsQuality'),map:document.getElementById('liveRunMap'),openMode:document.getElementById('openRunModeBtn'),
  historyToggle:document.getElementById('toggleRunHistoryBtn'),latestStory:document.getElementById('latestRunStoryBtn')
};
const runModeEls={overlay:document.getElementById('runModeOverlay'),distance:document.getElementById('runModeDistance'),time:document.getElementById('runModeTime'),pace:document.getElementById('runModePace'),gps:document.getElementById('runModeGps'),accuracy:document.getElementById('runModeAccuracy'),status:document.getElementById('runModeStatus'),controls:document.getElementById('runModeControls'),locked:document.getElementById('runModeLocked'),pause:document.getElementById('runModePause'),finish:document.getElementById('runModeFinish'),lock:document.getElementById('runModeLock'),unlock:document.getElementById('runModeUnlock'),exit:document.getElementById('runModeExit')};
let runModeUnlockTimer=null;
function setRunModeLocked(locked){if(!runModeEls.overlay)return;runModeEls.overlay.classList.toggle('is-locked',!!locked);runModeEls.controls.hidden=!!locked;runModeEls.locked.hidden=!locked}
async function enterRunMode(){if(!runModeEls.overlay||!runSession)return;runModeEls.overlay.hidden=false;document.body.classList.add('run-mode-active');setRunModeLocked(false);requestWakeLock();try{await document.documentElement.requestFullscreen?.()}catch{}renderRunMode()}
function exitRunMode(){if(!runModeEls.overlay)return;runModeEls.overlay.hidden=true;document.body.classList.remove('run-mode-active');setRunModeLocked(false);try{if(document.fullscreenElement)document.exitFullscreen?.()}catch{}}
function renderRunMode(){if(!runModeEls.overlay)return;const r=runSession,d=r?r.distanceM/1000:0,ms=r?elapsedMs():0,avg=d>0?(ms/1000)/d:Infinity;runModeEls.distance.textContent=d<1?Math.round(d*1000):d.toFixed(2);const modeUnit=document.getElementById('runModeDistanceUnit');if(modeUnit)modeUnit.textContent=d<1?'M':'KM';runModeEls.time.textContent=formatClock(ms);runModeEls.pace.textContent=paceText(avg);runModeEls.gps.textContent=!r?.gpsEnabled?(state.settings.language==='ko'?'GPS 꺼짐':'GPS OFF'):r?.hasFix?(state.settings.language==='ko'?'GPS 연결':'GPS LIVE'):(state.settings.language==='ko'?'GPS 대기':'GPS WAITING');runModeEls.gps.className='run-mode-gps '+(r?.hasFix?'live':'');runModeEls.accuracy.textContent=`정확도 ${r?.accuracy?Math.round(r.accuracy):'--'}m`;runModeEls.status.textContent=r?.autoPaused?'자동 일시정지 중':r?.status==='paused'?'러닝 일시정지':r?.hasFix?'GPS 경로 기록 중':'GPS 신호를 찾는 중';runModeEls.pause.textContent=r?.status==='paused'?'▶ 다시 시작':'Ⅱ 일시정지'}
const shareEls={
  dialog:document.getElementById('shareRunDialog'),photo:document.getElementById('sharePhotoInput'),ratio:document.getElementById('shareRatioSelect'),style:document.getElementById('shareStyleSelect'),
  caption:document.getElementById('shareCaptionInput'),canvas:document.getElementById('shareCanvas'),render:document.getElementById('renderShareBtn'),
  download:document.getElementById('downloadShareBtn'),nativeShare:document.getElementById('nativeShareBtn'),routeSize:document.getElementById('shareRouteSize'),logoSize:document.getElementById('shareLogoSize'),photoSize:document.getElementById('sharePhotoSize'),editTarget:document.getElementById('shareEditTarget'),routeSizeValue:document.getElementById('shareRouteSizeValue'),logoSizeValue:document.getElementById('shareLogoSizeValue'),photoSizeValue:document.getElementById('sharePhotoSizeValue'),positionX:document.getElementById('sharePositionX'),positionY:document.getElementById('sharePositionY'),positionXValue:document.getElementById('sharePositionXValue'),positionYValue:document.getElementById('sharePositionYValue'),resetLayout:document.getElementById('resetStoryLayoutBtn'),saveLayout:document.getElementById('saveStoryLayoutBtn'),
  metricSizes:{
    distance:document.getElementById('shareDistanceSize'),pace:document.getElementById('sharePaceSize'),time:document.getElementById('shareTimeSize'),caption:document.getElementById('shareCaptionSize')
  },
  metricSizeValues:{
    distance:document.getElementById('shareDistanceSizeValue'),pace:document.getElementById('sharePaceSizeValue'),time:document.getElementById('shareTimeSizeValue'),caption:document.getElementById('shareCaptionSizeValue')
  }
};
let shareRunRecord=null,sharePhotoImage=null,sharePhotoTransform={x:0,y:0,zoom:1},shareDrag=null,shareBounds={};
const defaultStoryLayout={logo:{x:.50,y:.085},route:{x:.20,y:.49},distance:{x:.075,y:.70,scale:.88},pace:{x:.075,y:.79,scale:.88},time:{x:.075,y:.88,scale:.88},caption:{x:.075,y:.945,scale:.88},footer:{x:.925,y:.985}};
function storyLayout(){const saved=state.settings.storyLayout||{};return Object.fromEntries(Object.entries(defaultStoryLayout).map(([k,v])=>[k,{...v,...(saved[k]||{})}]))}
function clamp01(n,min=.03,max=.97){return Math.max(min,Math.min(max,n))}
function pointInBounds(x,y,b){return b&&x>=b.x&&x<=b.x+b.w&&y>=b.y&&y<=b.y+b.h}
function sharePointerPoint(e){const r=shareEls.canvas.getBoundingClientRect();return{x:(e.clientX-r.left)*shareEls.canvas.width/r.width,y:(e.clientY-r.top)*shareEls.canvas.height/r.height}}
const ACTIVE_RUN_KEY='eldyn-active-run-v5',LEGACY_ACTIVE_RUN_KEY='eldyn-active-run-v4';
function saveActiveRun(reason='tick'){
  if(!runSession){localStorage.removeItem(ACTIVE_RUN_KEY);localStorage.removeItem(LEGACY_ACTIVE_RUN_KEY);return}
  const now=Date.now();runSession.lastPersistedAt=now;runSession.lastPersistReason=reason;
  const snap={...runSession,savedAt:now};
  localStorage.setItem(ACTIVE_RUN_KEY,JSON.stringify(snap));
}
function restoreActiveRun(){
  try{
    const raw=localStorage.getItem(ACTIVE_RUN_KEY)||localStorage.getItem(LEGACY_ACTIVE_RUN_KEY);
    const r=JSON.parse(raw||'null'),now=Date.now();
    if(!r||now-(r.savedAt||0)>12*3600e3){localStorage.removeItem(ACTIVE_RUN_KEY);localStorage.removeItem(LEGACY_ACTIVE_RUN_KEY);return}
    runSession={...r,speedSamples:Array.isArray(r.speedSamples)?r.speedSamples:[],splits:Array.isArray(r.splits)?r.splits:[],route:Array.isArray(r.route)?r.route:[]};
    if(r.status==='running'){
      const anchor=r.distancePoint||r.lastPoint||r.backgroundAnchor;
      if(anchor)runSession.backgroundAnchor={...anchor};
      runSession.backgroundedAt=Number(r.backgroundedAt)||Number(r.lastGpsAt)||Number(r.savedAt)||now;
      runSession.pendingResumeBridge=!!anchor;
      runSession.elapsedBefore=(r.elapsedBefore||0)+Math.max(0,now-(r.segmentStartedAt||r.savedAt||now));
      runSession.segmentStartedAt=now;
      runSession.movingMs=Number(r.movingMs)||0;
      runSession.movingSegmentAt=null;
      runSession.awaitingResumeFix=!!runSession.gpsEnabled;
      runSession.autoPaused=false;
      runSession.resumeCount=(Number(r.resumeCount)||0)+1;
      runSession.restoredAt=now;
    }
    if(runEls.gpsToggle)runEls.gpsToggle.checked=!!runSession.gpsEnabled;
    if(runEls.autoPause)runEls.autoPause.checked=runSession.autoPauseEnabled!==false;
    clearInterval(runTimer);runTimer=setInterval(()=>{renderRun();saveActiveRun('timer')},1000);
    renderRun();
    if(runSession.status==='running')setTimeout(()=>resumeRunTracking('restore'),80);
  }catch(err){console.warn('Active run restore failed',err);localStorage.removeItem(ACTIVE_RUN_KEY);localStorage.removeItem(LEGACY_ACTIVE_RUN_KEY)}
}
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
function formatDistance(distanceKm,{compact=false}={}){const km=Math.max(0,Number(distanceKm)||0);if(km<1){const metres=Math.round(km*1000);return compact?`${metres} m`:`${metres} m`}return `${km.toFixed(2)} km`}
function elapsedMs(){if(!runSession)return 0;return runSession.elapsedBefore+(runSession.status==='running'?Date.now()-runSession.segmentStartedAt:0)}
function movingMs(){if(!runSession)return 0;return (runSession.movingMs||0)+(runSession.status==='running'&&!runSession.autoPaused&&runSession.movingSegmentAt?Date.now()-runSession.movingSegmentAt:0)}
function formatClock(ms){const sec=Math.max(0,Math.floor(ms/1000)),h=Math.floor(sec/3600),m=Math.floor(sec%3600/60),s=sec%60;return [h,m,s].map(x=>String(x).padStart(2,'0')).join(':')}
function paceText(secPerKm){if(!Number.isFinite(secPerKm)||secPerKm<=0||secPerKm>3600)return `--'--"`;const m=Math.floor(secPerKm/60),s=Math.round(secPerKm%60);return `${m}'${String(s).padStart(2,'0')}"`}
function runningScore(run){if(!run||!run.distanceKm)return 0;const pace=run.avgPaceSecKm||3600,distance=Math.min(run.distanceKm,10),pacePoints=Math.max(0,Math.min(65,(900-pace)/7)),distancePoints=Math.min(25,distance*3),finishPoints=run.durationMs>0?10:0;return Math.round(Math.max(0,Math.min(100,pacePoints+distancePoints+finishPoints)))}
function renderLatestRunAnalysis(){const el=document.getElementById('latestRunAnalysis');if(!el)return;const runs=(state.runs||[]).slice().sort((a,b)=>new Date(b.endedAt)-new Date(a.endedAt));const r=runs[0];if(!r){el.innerHTML='<div class="empty-state"><span>🏃</span><p>Complete a run to see pace, speed and performance insights here.</p></div>';return}const previous=runs[1],bestSplit=(r.splits||[]).map(x=>+x.seconds).filter(Number.isFinite).sort((a,b)=>a-b)[0],bestPace=bestSplit||r.avgPaceSecKm,avgSpeed=Number.isFinite(r.avgPaceSecKm)&&r.avgPaceSecKm>0?3600/r.avgPaceSecKm:0,delta=previous&&Number.isFinite(previous.avgPaceSecKm)?Math.round(previous.avgPaceSecKm-r.avgPaceSecKm):null,trend=delta===null?'첫 기록이 저장되었습니다.':delta>0?`이전 기록보다 ${delta}초/km 빨라졌어요.`:delta<0?`이전 기록보다 ${Math.abs(delta)}초/km 느려졌어요.`:'이전 기록과 같은 평균 페이스예요.';el.innerHTML=`<div class="latest-run-head"><div><p class="eyebrow">${new Date(r.endedAt).toLocaleDateString()}</p><h3>${formatDistance(r.distanceKm)} run</h3></div><span class="run-score-pill">${runningScore(r)} SCORE</span></div><div class="run-analysis-grid"><div><span>AVERAGE PACE</span><strong>${paceText(r.avgPaceSecKm)}</strong><small>/km</small></div><div><span>BEST PACE</span><strong>${paceText(bestPace)}</strong><small>/km</small></div><div><span>AVERAGE SPEED</span><strong>${avgSpeed.toFixed(1)}</strong><small>km/h</small></div><div><span>CALORIES</span><strong>${r.calories||0}</strong><small>kcal</small></div></div><p class="run-trend">${trend}</p>`}
function runCalories(distanceKm){const weight=+state.settings.currentWeight||78;return Math.round(distanceKm*weight)}
function renderRun(){
  const r=runSession,d=r?r.distanceM/1000:0,ms=r?elapsedMs():0,avg=d>0?(ms/1000)/d:Infinity;updateRunDocumentTitle();
  runEls.time.textContent=formatClock(ms);runEls.distance.textContent=d<1?Math.round(d*1000):d.toFixed(2);const runDistanceUnit=document.getElementById('runDistanceUnit');if(runDistanceUnit)runDistanceUnit.textContent=d<1?'m':'km';runEls.averagePace.textContent=paceText(avg);
  runEls.movingTime.textContent=formatClock(r?movingMs():0);runEls.topSpeed.textContent=((r?.topSpeedMps||0)*3.6).toFixed(1);runEls.quality.textContent=r?.gpsEnabled?gpsQualityLabel(r?.accuracy):(state.settings.language==='ko'?'GPS 꺼짐':'GPS OFF');drawLiveRoute();
  runEls.currentPace.textContent=paceText(r?.currentPace||Infinity);runEls.calories.textContent=runCalories(d);
  runEls.accuracy.textContent=r?.gpsEnabled?(r?.accuracy?Math.round(r.accuracy):'--'):'OFF';
  runEls.gpsToggle.disabled=!!r;if(runEls.activityType){runEls.activityType.disabled=!!r;if(r)runEls.activityType.value=r.activityType||'run';}runEls.gpsToggle.checked=r?r.gpsEnabled:runEls.gpsToggle.checked;if(runEls.openMode)runEls.openMode.hidden=!r;renderRunMode();
  if(!r){
    runEls.title.textContent=(runEls.activityType?.value||'run')==='walk'?(state.settings.language==='ko'?'걷기 준비':'Ready to walk'):(state.settings.language==='ko'?'러닝 준비':'Ready to run');
    runEls.note.textContent=runEls.gpsToggle.checked?'GPS will map your route after you tap Start Run.':'Private timer mode. No location will be collected.';
    runEls.gps.textContent=runEls.gpsToggle.checked?'GPS waiting':(state.settings.language==='ko'?'GPS 꺼짐':'GPS off');runEls.gps.className='gps-badge';
    runEls.start.hidden=false;runEls.pause.hidden=true;runEls.finish.hidden=true
  } else if(r.status==='running'){
    runEls.title.textContent=r.autoPaused?(state.settings.language==='ko'?'자동 일시정지':'Auto paused'):(r.activityType==='walk'?(state.settings.language==='ko'?'걷기 진행 중':'Walk in progress'):(state.settings.language==='ko'?'러닝 진행 중':'Run in progress'));
    runEls.note.textContent=r.autoPaused?'Movement stopped. ELDYN will resume automatically.':(r.gpsEnabled?'Route tracking is active. Stay aware of your surroundings.':'Timer-only private run. You can enter distance when finishing.');
    runEls.gps.textContent=r.gpsEnabled?(r.hasFix?'GPS live':'Finding GPS…'):(state.settings.language==='ko'?'GPS 꺼짐':'GPS off');runEls.gps.className=r.gpsEnabled?'gps-badge live':'gps-badge';
    runEls.start.hidden=true;runEls.pause.hidden=false;runEls.pause.textContent=(state.settings.language==='ko'?'Ⅱ 일시정지':'Ⅱ Pause');runEls.finish.hidden=false
  } else {
    runEls.title.textContent=(state.settings.language==='ko'?'운동 일시정지':'Run paused');runEls.note.textContent=(state.settings.language==='ko'?'준비되면 다시 시작하세요.':'Resume when you are ready.');
    runEls.gps.textContent=r.gpsEnabled?(state.settings.language==='ko'?'GPS 일시정지':'GPS paused'):(state.settings.language==='ko'?'GPS 꺼짐':'GPS off');runEls.gps.className='gps-badge';
    runEls.start.hidden=true;runEls.pause.hidden=false;runEls.pause.textContent=(state.settings.language==='ko'?'▶ 다시 시작':'▶ Resume');runEls.finish.hidden=false
  }
  const splits=r?.splits||[];
  runEls.splits.innerHTML=splits.length?splits.map((x,i)=>`<div class="split-row"><span>KM ${i+1}</span><strong>${paceText(x.seconds)}</strong></div>`).join(''):'<div class="empty-state"><span>🏃</span><p>Your 1 km splits will appear here.</p></div>';
  const allHistory=(state.runs||[]).slice().sort((a,b)=>new Date(b.endedAt)-new Date(a.endedAt));
  if(runEls.latestStory){
    const latest=allHistory[0];
    runEls.latestStory.hidden=!latest;
    runEls.latestStory.textContent=(state.settings.language==='ko'?'📸 최근 러닝·걷기 인증샷 만들기':'📸 Create latest run/walk story');
    runEls.latestStory.onclick=latest?()=>openShareCard(latest.id):null;
  }
  const history=runHistoryExpanded?allHistory:allHistory.slice(0,2);
  if(runEls.history) runEls.history.innerHTML=history.length?history.map(x=>`<div class="run-history-card"><button class="run-history-main" data-open-run-detail="${x.id}"><div><h3>${x.activityType==='walk'?(state.settings.language==='ko'?'걷기':'Walk'):(state.settings.language==='ko'?'러닝':'Run')} · ${new Date(x.endedAt).toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'})}</h3><p>${formatClock(x.durationMs)} · ${paceText(x.avgPaceSecKm)}/km</p></div><strong class="history-distance">${formatDistance(x.distanceKm)}</strong></button><button class="mini-edit share-run-btn" data-run-id="${x.id}">${state.settings.language==='ko'?'인증샷 만들기':'Create story'}</button></div>`).join(''):'<div class="empty-state"><span>👟</span><p>No completed runs yet.</p></div>';
  if(runEls.historyToggle){
    runEls.historyToggle.hidden=allHistory.length<=2;
    runEls.historyToggle.textContent=runHistoryExpanded?((state.settings.language||'ko')==='ko'?'최근 2개만 보기':'Show recent 2'):((state.settings.language||'ko')==='ko'?'전체 기록 보기':'View all history');
  }
  runEls.history?.querySelectorAll('.share-run-btn').forEach(btn=>btn.addEventListener('click',()=>openShareCard(btn.dataset.runId)));
  runEls.history?.querySelectorAll('[data-open-run-detail]').forEach(btn=>btn.addEventListener('click',()=>{const id=btn.dataset.openRunDetail;const run=(state.runs||[]).find(r=>r.id===id);if(run)openShareCard(id)}));
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
function startGps(){if(!runSession?.gpsEnabled)return;if(!navigator.geolocation){return gpsError({message:'This browser does not support GPS.'})}stopGps();runWatchId=navigator.geolocation.watchPosition(onGps,gpsError,{enableHighAccuracy:true,maximumAge:0,timeout:15000})}
function stopGps(){if(runWatchId!==null)navigator.geolocation.clearWatch(runWatchId);runWatchId=null}
function prepareRunForBackground(reason='hidden'){
  if(!runSession||runSession.status!=='running')return;
  const now=Date.now();
  runSession.lastVisibleAt=now;runSession.interruptionReason=reason;
  if(runSession.gpsEnabled){
    if(!runSession.pendingResumeBridge){
      const anchor=runSession.distancePoint||runSession.lastPoint;
      if(anchor)runSession.backgroundAnchor={...anchor};
      runSession.backgroundedAt=now;
      runSession.pendingResumeBridge=!!anchor;
    }
    if(runSession.movingSegmentAt&&!runSession.autoPaused){
      runSession.movingMs=(runSession.movingMs||0)+Math.max(0,now-runSession.movingSegmentAt);
      runSession.movingSegmentAt=null;
    }
    runSession.awaitingResumeFix=true;
    // iOS may leave a stale watchPosition id after app switching. Always rebuild it
    // when ELDYN becomes active again.
    stopGps();
  }
  saveActiveRun(`background:${reason}`);
}
function resumeRunTracking(reason='visible'){
  if(!runSession||runSession.status!=='running')return;
  const now=Date.now();if(now-(runSession.lastResumeKickAt||0)<500)return;runSession.lastResumeKickAt=now;runSession.lastResumeReason=reason;runSession.lastResumedAt=now;
  if(runSession.gpsEnabled){
    const anchor=runSession.distancePoint||runSession.lastPoint||runSession.backgroundAnchor;
    const lastSignal=Number(runSession.lastGpsAt)||Number(anchor?.t)||Number(runSession.lastPersistedAt)||now;
    if(!runSession.pendingResumeBridge&&anchor&&now-lastSignal>5000){
      runSession.backgroundAnchor={...anchor};runSession.backgroundedAt=lastSignal;runSession.pendingResumeBridge=true;
      runSession.awaitingResumeFix=true;
    }
    startGps();
  }else if(!runSession.movingSegmentAt){runSession.movingSegmentAt=now}
  if(document.visibilityState==='visible')requestWakeLock();
  saveActiveRun(`resume:${reason}`);renderRun();renderRunMode();
}
function recoverBackgroundGap(p){
  if(!runSession?.pendingResumeBridge)return false;
  const anchor=runSession.backgroundAnchor;
  runSession.pendingResumeBridge=false;
  runSession.backgroundAnchor=null;
  const hiddenAt=Number(runSession.backgroundedAt)||p.t;
  runSession.backgroundedAt=null;
  if(!anchor||p.accuracy>50)return false;
  const gapSec=Math.max(.25,(p.t-(anchor.t||hiddenAt))/1000);
  const delta=haversine(anchor,p);
  const maxSpeed=runSession.activityType==='walk'?4.5:12;
  // We cannot collect continuous GPS while iOS suspends a PWA. On resume, recover the
  // missing section as a straight-line bridge only when the displacement is plausible.
  // Cap recovery to 30 minutes to avoid adding a stale jump after a long absence.
  if(gapSec<=1800&&delta>=1&&delta/gapSec<=maxSpeed){
    runSession.distanceM+=delta;
    runSession.backgroundRecoveredM=(runSession.backgroundRecoveredM||0)+delta;
    runSession.backgroundRecoveryCount=(runSession.backgroundRecoveryCount||0)+1;
    runSession.movingMs=(runSession.movingMs||0)+Math.max(0,p.t-hiddenAt);
    runSession.route.push({lat:p.lat,lon:p.lon,accuracy:p.accuracy,t:p.t,resumed:true});
    const completed=Math.floor(runSession.distanceM/1000);
    while(runSession.splits.length<completed){
      const totalSec=movingMs()/1000,previous=runSession.splits.reduce((n,x)=>n+x.seconds,0);
      runSession.splits.push({km:runSession.splits.length+1,seconds:Math.max(1,totalSec-previous)});
    }
  }
  runSession.lastPoint=p;runSession.distancePoint=p;runSession.lastGpsAt=p.t;runSession.speedSamples=[];runSession.currentPace=Infinity;
  runSession.awaitingResumeFix=false;if(!runSession.autoPaused)runSession.movingSegmentAt=Date.now();
  saveActiveRun('resume-fix');
  return true;
}
function onGps(pos){
  if(!runSession||runSession.status!=='running'||!runSession.gpsEnabled)return;
  const c=pos.coords,p={lat:c.latitude,lon:c.longitude,t:pos.timestamp||Date.now(),accuracy:Number(c.accuracy)||999};
  runSession.accuracy=p.accuracy;runSession.hasFix=true;runSession.lastGpsAt=p.t;
  if(runSession.awaitingResumeFix&&!runSession.pendingResumeBridge){runSession.awaitingResumeFix=false;if(!runSession.autoPaused&&!runSession.movingSegmentAt)runSession.movingSegmentAt=Date.now()}
  // Poor fixes create large jumps. Keep the UI status, but do not use them for distance.
  if(p.accuracy>50){renderRun();return}
  if(recoverBackgroundGap(p)){saveActiveRun();renderRun();return}

  const observedPrev=runSession.lastPoint;
  const distancePrev=runSession.distancePoint||observedPrev;
  if(observedPrev){
    const observedDelta=haversine(observedPrev,p),seconds=Math.max(.25,(p.t-observedPrev.t)/1000),instantSpeed=observedDelta/seconds;
    const realisticMax=runSession.activityType==='walk'?4.5:12;
    const speedSample=instantSpeed<=realisticMax?instantSpeed:0;
    runSession.speedSamples=(runSession.speedSamples||[]).concat(speedSample).slice(-7);
    const sorted=[...runSession.speedSamples].sort((x,y)=>x-y),smooth=sorted[Math.floor(sorted.length/2)]||0;

    if(runSession.autoPauseEnabled){
      const pauseThreshold=runSession.activityType==='walk'?.22:.45;
      if(smooth<pauseThreshold){
        runSession.stillSince=runSession.stillSince||Date.now();
        if(!runSession.autoPaused&&Date.now()-runSession.stillSince>7000){
          runSession.autoPaused=true;
          if(runSession.movingSegmentAt){runSession.movingMs+=Date.now()-runSession.movingSegmentAt;runSession.movingSegmentAt=null}
        }
      }else{
        runSession.stillSince=null;
        if(runSession.autoPaused){
          runSession.autoPaused=false;runSession.movingSegmentAt=Date.now();
          runSession.lastPoint=p;runSession.distancePoint=p;saveActiveRun();renderRun();return
        }
      }
    }

    if(distancePrev&&!runSession.autoPaused){
      const delta=haversine(distancePrev,p);
      const elapsed=Math.max(.25,(p.t-distancePrev.t)/1000);
      const segmentSpeed=delta/elapsed;
      // The previous implementation replaced the reference point on every GPS event.
      // Sub-1.5 m walking steps were therefore discarded forever. Keep a separate
      // accepted-distance point so small valid movements accumulate before inclusion.
      const baseMin=runSession.activityType==='walk'?.55:.9;
      const accuracyMin=Math.min(2.4,Math.max(0,p.accuracy*.06));
      const minMove=Math.max(baseMin,accuracyMin);
      const maxSegment=runSession.activityType==='walk'?45:80;
      const maxSpeed=runSession.activityType==='walk'?4.5:12;
      if(delta>=minMove&&delta<maxSegment&&segmentSpeed<=maxSpeed){
        runSession.distanceM+=delta;
        runSession.distancePoint=p;
        runSession.currentPace=smooth>.3?1000/smooth:Infinity;
        if(smooth>.3)runSession.topSpeedMps=Math.max(runSession.topSpeedMps||0,smooth);
        runSession.route.push({lat:p.lat,lon:p.lon,accuracy:p.accuracy,t:p.t});
        const completed=Math.floor(runSession.distanceM/1000);
        while(runSession.splits.length<completed){
          const totalSec=movingMs()/1000,previous=runSession.splits.reduce((n,x)=>n+x.seconds,0);
          runSession.splits.push({km:runSession.splits.length+1,seconds:Math.max(1,totalSec-previous)})
        }
      }
    }
  }else{
    runSession.route.push({lat:p.lat,lon:p.lon,accuracy:p.accuracy,t:p.t});
    runSession.distancePoint=p
  }
  runSession.lastPoint=p;saveActiveRun();renderRun()
}
function gpsError(err){runEls.gps.textContent=err?.code===1?'Location denied':'GPS unavailable';runEls.gps.className='gps-badge error';runEls.note.textContent=err?.code===1?'Allow location access or finish and restart with GPS switched off.':'Move outdoors, or restart with GPS switched off.'}
let lastGpsWatchdogRestart=0;
function ensureGpsFresh(){
  if(!runSession||runSession.status!=='running'||!runSession.gpsEnabled||document.visibilityState!=='visible')return;
  const now=Date.now(),last=Number(runSession.lastGpsAt)||0,age=last?now-last:now-(new Date(runSession.startedAt).getTime()||now);
  if(age<15000||now-lastGpsWatchdogRestart<12000)return;
  const anchor=runSession.distancePoint||runSession.lastPoint;
  if(anchor&&!runSession.pendingResumeBridge){
    runSession.backgroundAnchor={...anchor};runSession.backgroundedAt=last||Number(anchor.t)||now;runSession.pendingResumeBridge=true;runSession.awaitingResumeFix=true;
  }
  lastGpsWatchdogRestart=now;startGps();saveActiveRun('gps-watchdog');renderRun();
}
function beginRun(){
  const gpsEnabled=runEls.gpsToggle.checked;
  if(gpsEnabled&&!window.isSecureContext)return alert('GPS requires HTTPS. Open the Vercel URL, or switch GPS off.');
  runSession={sessionId:crypto.randomUUID(),status:'running',activityType:runEls.activityType?.value||'run',gpsEnabled,autoPauseEnabled:runEls.autoPause.checked,autoPaused:false,startedAt:new Date().toISOString(),segmentStartedAt:Date.now(),elapsedBefore:0,movingMs:0,movingSegmentAt:Date.now(),distanceM:0,lastPoint:null,distancePoint:null,currentPace:Infinity,topSpeedMps:0,accuracy:null,hasFix:false,lastGpsAt:null,resumeCount:0,backgroundRecoveredM:0,backgroundRecoveryCount:0,speedSamples:[],splits:[],route:[]};saveActiveRun('start');
  if(gpsEnabled)startGps();requestWakeLock();requestRunNoticePermission().then(ok=>{if(ok)showRunCompanionNotification(true)});runTimer=setInterval(()=>{renderRun();saveActiveRun()},1000);renderRun();setTimeout(()=>enterRunMode(),120)
}
function togglePause(){
  if(!runSession)return;
  if(runSession.status==='running'){runSession.elapsedBefore=elapsedMs();if(runSession.movingSegmentAt){runSession.movingMs=movingMs();runSession.movingSegmentAt=null}runSession.status='paused';runSession.autoPaused=false;runSession.lastPoint=null;runSession.distancePoint=null;stopGps();releaseWakeLock();clearRunCompanionNotification();saveActiveRun()}
  else{runSession.status='running';runSession.segmentStartedAt=Date.now();runSession.movingSegmentAt=Date.now();if(runSession.gpsEnabled)startGps();requestWakeLock();showRunCompanionNotification(true);saveActiveRun()}
  renderRun()
}
async function finishRun(){
  if(!runSession)return;
  const durationMs=elapsedMs(),movingDurationMs=movingMs();let distanceKm=runSession.distanceM/1000;
  if(durationMs<10000&&!confirm('This run is under 10 seconds. Finish without saving?'))return;
  if(!runSession.gpsEnabled){
    const manual=prompt('GPS was off. Enter your distance in kilometres (example: 3.5).','');
    if(manual===null)return;
    distanceKm=Math.max(0,Number(String(manual).replace(',','.'))||0);
  }
  stopGps();releaseWakeLock();clearRunCompanionNotification();clearInterval(runTimer);runTimer=null;exitRunMode();
  if(distanceKm>=.02){
    const session=runSession;
    const record={id:crypto.randomUUID(),activityType:session.activityType||'run',startedAt:session.startedAt,endedAt:new Date().toISOString(),durationMs,distanceKm,
      avgPaceSecKm:((movingDurationMs||durationMs)/1000)/distanceKm,calories:runCalories(distanceKm),splits:session.splits,
      movingDurationMs,topSpeedKmh:(session.topSpeedMps||0)*3.6,route:session.route||[],gpsEnabled:session.gpsEnabled,autoPauseEnabled:session.autoPauseEnabled};
    state.runs=state.runs||[];state.runs=mergeRuns(state.runs,[record]);
    const runDate=todayKey();const log=getLog(runDate);log.runs=mergeRuns(log.runs,[record]);
    const activityName=record.activityType==='walk'?'Walking':'Running';
    if(!log.exercises.some(x=>x.runRecordId===record.id))log.exercises.push({id:`gps-${record.id}`,runRecordId:record.id,name:activityName,sets:1,reps:Math.max(1,Math.round(record.durationMs/60000)),weight:0,target:'Cardio · Endurance',instructions:`${formatDistance(record.distanceKm)} · ${formatClock(record.durationMs)} · ${paceText(record.avgPaceSecKm)}/km`,youtube:'',search:'',done:true,gpsActivity:true});
    log.priorities.workout=true;log.updatedAt=new Date().toISOString();

    // Persist the completed record before resetting the live session. This prevents
    // the Run/Today UI from briefly rendering the cleared 0-state and removes the
    // 500ms cloud-sync race that previously delayed the dashboard refresh.
    saveState();
    clearTimeout(syncTimer);
    try{await saveDailyLogNow(runDate,{verify:false})}catch{}
    restoreRunsFromDailyLogs();
    const serialised=JSON.stringify(state);localStorage.setItem(STORAGE_KEY,serialised);localStorage.setItem(STORAGE_BACKUP_KEY,serialised);

    const savedId=record.id;
    runSession=null;saveActiveRun();
    renderRun();renderToday();renderProgress();renderCalendar();
    scheduleCloudSync();
    openShareCard(savedId)
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
  const c=shareEls.canvas,ctx=c.getContext('2d');if(c.width!==w)c.width=w;if(c.height!==h)c.height=h;const r=shareRunRecord,pad=w*.075,L=storyLayout();shareBounds={};
  const base=()=>{if(sharePhotoImage)coverImage(ctx,sharePhotoImage,w,h);else{const g=ctx.createLinearGradient(0,0,w,h);g.addColorStop(0,'#121a14');g.addColorStop(1,'#050706');ctx.fillStyle=g;ctx.fillRect(0,0,w,h)}};base();
  if(style==='map'){ctx.fillStyle='#071007';ctx.fillRect(0,0,w,h);await drawRouteMap(ctx,r.route,pad,h*.16,w-pad*2,h*.49,34)}
  else if(style==='split'){ctx.fillStyle='#071007';ctx.fillRect(w*.54,0,w*.46,h);await drawRouteMap(ctx,r.route,w*.56,h*.15,w*.39,h*.47,30);if(sharePhotoImage){ctx.save();ctx.beginPath();ctx.rect(0,0,w*.54,h);ctx.clip();coverImage(ctx,sharePhotoImage,w*.54,h);ctx.restore()}}
  if(token!==shareRenderToken)return;
  if(style!=='photo'){const shade=ctx.createLinearGradient(0,0,0,h);shade.addColorStop(0,'rgba(0,0,0,.18)');shade.addColorStop(.48,'rgba(0,0,0,.08)');shade.addColorStop(1,'rgba(0,0,0,.88)');ctx.fillStyle=shade;ctx.fillRect(0,0,w,h)}
  if(style==='photo'){const routeW=w*.32*routeScale,routeH=h*.18*routeScale,routeX=L.route.x*w-routeW/2,routeY=L.route.y*h-routeH/2;drawRouteOverlay(ctx,r.route,routeX,routeY,routeW,routeH,true);shareBounds.route={x:routeX,y:routeY,w:routeW,h:routeH}}
  const logoX=L.logo.x*w,logoY=L.logo.y*h;ctx.textAlign='center';ctx.fillStyle='#b9ff3f';ctx.font=`900 ${Math.round(w*.046*logoScale)}px system-ui`;ctx.fillText('ELDYN',logoX,logoY);ctx.font=`700 ${Math.round(w*.015*logoScale)}px system-ui`;ctx.fillStyle='rgba(255,255,255,.84)';ctx.fillText('MOVE FORWARD',logoX,logoY+w*.030*logoScale);shareBounds.logo={x:logoX-w*.13*logoScale,y:logoY-w*.05*logoScale,w:w*.26*logoScale,h:w*.09*logoScale};
  const activityLabel=r.activityType==='walk'?(state.settings.language==='ko'?'걷기':'WALK'):(state.settings.language==='ko'?'러닝':'RUN');
  ctx.textAlign='left';ctx.shadowColor='rgba(0,0,0,.42)';ctx.shadowBlur=4;
  const drawMetric=(key,label,value)=>{const pos=L[key],scale=(pos.scale||.88);const x=pos.x*w,y=pos.y*h;ctx.fillStyle='rgba(255,255,255,.78)';ctx.font=`700 ${Math.round(w*.019*scale)}px system-ui`;ctx.fillText(label,x,y);ctx.fillStyle='#fff';ctx.font=`900 ${Math.round(w*.054*scale)}px system-ui`;ctx.fillText(value,x,y+h*.041);shareBounds[key]={x:x-w*.02,y:y-w*.035*scale,w:w*.44,h:h*.078};};
  ctx.fillStyle='rgba(255,255,255,.86)';ctx.font=`800 ${Math.round(w*.020)}px system-ui`;ctx.fillText(activityLabel,L.distance.x*w,L.distance.y*h-w*.045);
  drawMetric('distance','DISTANCE',formatDistance(r.distanceKm));drawMetric('pace','PACE',`${paceText(r.avgPaceSecKm)}/km`);drawMetric('time','TIME',formatClock(r.durationMs));
  const caption=(shareEls.caption.value||'Today, I showed up. (ง •̀_•́)ง').trim(),captionX=L.caption.x*w,captionY=L.caption.y*h,captionScale=(L.caption.scale||.88);ctx.font=`550 ${Math.round(w*.028*captionScale)}px system-ui`;ctx.fillStyle='rgba(255,255,255,.96)';ctx.fillText(caption.slice(0,64),captionX,captionY);shareBounds.caption={x:captionX-w*.02,y:captionY-w*.04,w:w*.82,h:w*.06};
  ctx.font=`650 ${Math.round(w*.019*.88)}px system-ui`;ctx.fillStyle='rgba(255,255,255,.82)';ctx.fillText(`${new Date(r.endedAt).toLocaleDateString()}  ·  ${r.calories} KCAL`,pad,h-pad*.92);ctx.shadowBlur=0;ctx.textAlign='left';if(style!=='photo'){ctx.font=`500 ${Math.round(w*.016)}px system-ui`;ctx.fillStyle='rgba(255,255,255,.45)';ctx.fillText('Map © OpenStreetMap contributors',pad,h-pad*.48)}
}
function openShareCard(id){
  shareRunRecord=(state.runs||[]).find(r=>String(r.id)===String(id));
  if(!shareRunRecord){
    alert(state.settings.language==='ko'?'선택한 러닝 기록을 찾지 못했어요. 동기화 후 다시 시도해 주세요.':'The selected run could not be found. Sync and try again.');
    return;
  }
  if(!shareEls.dialog||!shareEls.canvas){
    alert(state.settings.language==='ko'?'러닝 인증샷 편집 화면을 불러오지 못했어요. 앱을 새로고침해 주세요.':'The run story editor is unavailable. Refresh the app.');
    return;
  }
  shareEls.caption.value=state.settings.language==='en'?'Today, I showed up. (ง •̀_•́)ง':'오늘도 해냈다. (ง •̀_•́)ง';
  sharePhotoImage=null;sharePhotoTransform={x:0,y:0,zoom:1};
  if(shareEls.photoSize)shareEls.photoSize.value='100';
  if(shareEls.photo)shareEls.photo.value='';
  syncStoryMetricSliders();updateStoryRangeLabels();syncStoryPositionControls();const closeBtn=document.getElementById('shareCloseBtn');if(closeBtn)closeBtn.textContent=state.settings.language==='en'?'Close':'닫기';renderShareCard();
  try{
    if(typeof shareEls.dialog.showModal==='function'){
      if(!shareEls.dialog.open)shareEls.dialog.showModal();
    }else{
      shareEls.dialog.setAttribute('open','');
      shareEls.dialog.style.display='block';
    }
  }catch(err){
    console.error('Run story dialog open failed',err);
    shareEls.dialog.setAttribute('open','');
    shareEls.dialog.style.display='block';
  }
  requestAnimationFrame(()=>{shareEls.dialog.scrollTop=0;renderShareCard()});
}
shareEls.photo?.addEventListener('change',()=>{const file=shareEls.photo.files?.[0];if(!file)return;const img=new Image();img.onload=()=>{sharePhotoImage=img;sharePhotoTransform={x:0,y:0,zoom:(+shareEls.photoSize?.value||100)/100};renderShareCard();URL.revokeObjectURL(img.src)};img.src=URL.createObjectURL(file)});
shareEls.ratio?.addEventListener('change',()=>renderShareCard());shareEls.style?.addEventListener('change',()=>renderShareCard());shareEls.caption?.addEventListener('input',()=>renderShareCard());
const storyMetricKeys=['distance','pace','time','caption'];
function syncStoryMetricSliders(){
  const L=storyLayout();
  storyMetricKeys.forEach(k=>{
    const input=shareEls.metricSizes?.[k],out=shareEls.metricSizeValues?.[k];
    if(!input)return;
    input.value=Math.round((L[k]?.scale||.88)*100);
    if(out)out.textContent=`${input.value}%`;
  });
}
function updateStoryRangeLabels(){
  storyMetricKeys.forEach(k=>{const input=shareEls.metricSizes?.[k],out=shareEls.metricSizeValues?.[k];if(input&&out)out.textContent=`${input.value}%`});
  if(shareEls.routeSizeValue)shareEls.routeSizeValue.textContent=`${shareEls.routeSize.value}%`;
  if(shareEls.logoSizeValue)shareEls.logoSizeValue.textContent=`${shareEls.logoSize.value}%`;
  if(shareEls.photoSizeValue)shareEls.photoSizeValue.textContent=`${shareEls.photoSize.value}%`;
}
storyMetricKeys.forEach(k=>{
  const input=shareEls.metricSizes?.[k];
  if(!input)return;
  const applyMetricSize=()=>{
    state.settings.storyLayout=state.settings.storyLayout||{};
    const current=storyLayout()[k];
    state.settings.storyLayout[k]={...current,scale:Math.max(.5,Math.min(1.8,(+input.value||88)/100))};
    setStoryMoveTarget(k);updateStoryRangeLabels();queueStoryRender();
  };
  input.addEventListener('input',applyMetricSize,{passive:true});
  input.addEventListener('change',()=>{applyMetricSize();saveState()});
});
[shareEls.routeSize,shareEls.logoSize].forEach(el=>el?.addEventListener('input',()=>{updateStoryRangeLabels();renderShareCard()}));
shareEls.photoSize?.addEventListener('input',()=>{sharePhotoTransform.zoom=(+shareEls.photoSize.value||100)/100;updateStoryRangeLabels();renderShareCard()});
updateStoryRangeLabels();shareEls.render?.addEventListener('click',()=>renderShareCard());
function expandedStoryBounds(b,key){
  if(!b)return null;
  const extraX=shareEls.canvas.width*(key==='caption'?.025:.035),extraY=shareEls.canvas.height*.018;
  return{x:b.x-extraX,y:b.y-extraY,w:b.w+extraX*2,h:b.h+extraY*2};
}
function storyHitAt(x,y){
  const order=['caption','time','pace','distance','logo','route'];
  return order.find(k=>pointInBounds(x,y,expandedStoryBounds(shareBounds[k],k)))||null;
}
const storyMovableKeys=['distance','pace','time','caption','route','logo'];
function syncStoryPositionControls(){
  const key=shareEls.editTarget?.value;
  const enabled=storyMovableKeys.includes(key);
  const pos=enabled?storyLayout()[key]:null;
  [shareEls.positionX,shareEls.positionY].forEach(el=>{if(el)el.disabled=!enabled});
  if(enabled&&pos){
    if(shareEls.positionX)shareEls.positionX.value=Math.round(clamp01(pos.x)*100);
    if(shareEls.positionY)shareEls.positionY.value=Math.round(clamp01(pos.y)*100);
    if(shareEls.positionXValue)shareEls.positionXValue.textContent=`${Math.round(clamp01(pos.x)*100)}%`;
    if(shareEls.positionYValue)shareEls.positionYValue.textContent=`${Math.round(clamp01(pos.y)*100)}%`;
  }else{
    if(shareEls.positionXValue)shareEls.positionXValue.textContent='--';
    if(shareEls.positionYValue)shareEls.positionYValue.textContent='--';
  }
}
function setStoryMoveTarget(key){
  if(shareEls.editTarget&&key)shareEls.editTarget.value=key;
  syncStoryPositionControls();
}
function applyStoryPositionFromControls(save=false){
  const key=shareEls.editTarget?.value;
  if(!storyMovableKeys.includes(key))return;
  state.settings.storyLayout=state.settings.storyLayout||{};
  const current=storyLayout()[key];
  state.settings.storyLayout[key]={...current,x:clamp01((+shareEls.positionX?.value||50)/100),y:clamp01((+shareEls.positionY?.value||50)/100)};
  syncStoryPositionControls();queueStoryRender();if(save)saveState();
}
shareEls.editTarget?.addEventListener('change',syncStoryPositionControls);
shareEls.positionX?.addEventListener('input',()=>applyStoryPositionFromControls(false),{passive:true});
shareEls.positionY?.addEventListener('input',()=>applyStoryPositionFromControls(false),{passive:true});
shareEls.positionX?.addEventListener('change',()=>applyStoryPositionFromControls(true));
shareEls.positionY?.addEventListener('change',()=>applyStoryPositionFromControls(true));
let storyRenderRaf=0;
function queueStoryRender(){
  if(storyRenderRaf)return;
  storyRenderRaf=requestAnimationFrame(()=>{storyRenderRaf=0;renderShareCard()});
}
function beginStoryPointerDrag(e){
  if(e.pointerType==='mouse'&&e.button!==0)return;
  const p=sharePointerPoint(e),target=shareEls.editTarget?.value||'auto';
  // Directly touching a visible item always wins over the dropdown selection.
  // This makes iPhone editing behave like the workout story editor: tap what you want to move.
  const hitKey=storyHitAt(p.x,p.y);
  let key=hitKey || ((target!=='auto'&&target!=='photo')?target:null);
  if(key&&shareBounds[key]){
    setStoryMoveTarget(key);
    shareDrag={type:'element',key,start:p,origin:{...storyLayout()[key]},pointerId:e.pointerId};
  }else if(sharePhotoImage&&(target==='photo'||target==='auto'||!key)){
    shareDrag={type:'photo',x:e.clientX,y:e.clientY,startX:sharePhotoTransform.x,startY:sharePhotoTransform.y,w:shareEls.canvas.getBoundingClientRect().width,h:shareEls.canvas.getBoundingClientRect().height,pointerId:e.pointerId};
  }else return;
  try{shareEls.canvas.setPointerCapture?.(e.pointerId)}catch{}
  shareEls.canvas.classList.add('dragging');e.preventDefault();e.stopPropagation();
}
function moveStoryPointerDrag(e){
  if(!shareDrag||(shareDrag.pointerId!=null&&e.pointerId!==shareDrag.pointerId))return;
  if(shareDrag.type==='photo'){
    const dx=(e.clientX-shareDrag.x)/Math.max(1,shareDrag.w),dy=(e.clientY-shareDrag.y)/Math.max(1,shareDrag.h);
    sharePhotoTransform.x=Math.max(-1,Math.min(1,shareDrag.startX+dx*2));sharePhotoTransform.y=Math.max(-1,Math.min(1,shareDrag.startY+dy*2));
  }else{
    const p=sharePointerPoint(e),dx=(p.x-shareDrag.start.x)/shareEls.canvas.width,dy=(p.y-shareDrag.start.y)/shareEls.canvas.height;
    let x=clamp01(shareDrag.origin.x+dx),y=clamp01(shareDrag.origin.y+dy);
    for(const g of [.075,.5,.925]){if(Math.abs(x-g)<.018)x=g;if(Math.abs(y-g)<.018)y=g}
    state.settings.storyLayout=state.settings.storyLayout||{};
    const current=storyLayout()[shareDrag.key];
    state.settings.storyLayout[shareDrag.key]={...current,x,y};syncStoryPositionControls();
  }
  queueStoryRender();e.preventDefault();e.stopPropagation();
}
function stopShareDrag(e){
  if(!shareDrag||(e?.pointerId!=null&&shareDrag.pointerId!=null&&e.pointerId!==shareDrag.pointerId))return;
  try{if(e?.pointerId!=null)shareEls.canvas.releasePointerCapture?.(e.pointerId)}catch{}
  shareDrag=null;shareEls.canvas.classList.remove('dragging');saveState();queueStoryRender();
}
shareEls.canvas?.addEventListener('pointerdown',beginStoryPointerDrag,{passive:false});
shareEls.canvas?.addEventListener('pointermove',moveStoryPointerDrag,{passive:false});
shareEls.canvas?.addEventListener('pointerup',stopShareDrag,{passive:false});
shareEls.canvas?.addEventListener('pointercancel',stopShareDrag,{passive:false});
// Fallback for iOS versions that occasionally lose canvas capture during a fast drag.
window.addEventListener('pointermove',moveStoryPointerDrag,{passive:false});
window.addEventListener('pointerup',stopShareDrag,{passive:false});
window.addEventListener('pointercancel',stopShareDrag,{passive:false});
shareEls.resetLayout?.addEventListener('click',()=>{state.settings.storyLayout=JSON.parse(JSON.stringify(defaultStoryLayout));sharePhotoTransform={x:0,y:0,zoom:(+shareEls.photoSize?.value||100)/100};syncStoryMetricSliders();syncStoryPositionControls();saveState();renderShareCard()});
shareEls.saveLayout?.addEventListener('click',()=>{saveState();alert(state.settings.language==='en'?'Layout saved.':'현재 배치를 저장했어요.')});
function canvasBlob(){return new Promise(resolve=>shareEls.canvas.toBlob(resolve,'image/png',.95))}
shareEls.download?.addEventListener('click',async()=>{const blob=await canvasBlob(),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`ELDYN-${shareRunRecord.distanceKm.toFixed(2)}KM.png`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)});
shareEls.nativeShare?.addEventListener('click',async()=>{const blob=await canvasBlob(),file=new File([blob],`ELDYN-${shareRunRecord.distanceKm.toFixed(2)}KM.png`,{type:'image/png'});if(navigator.canShare?.({files:[file]})){await navigator.share({title:'ELDYN Run',text:'ELDYN Run Certified',files:[file]})}else{alert('Direct sharing is not supported here. Use Save image, then share it from your gallery.')}});
runEls.start.onclick=beginRun;runEls.pause.onclick=togglePause;runEls.finish.onclick=finishRun;runEls.openMode?.addEventListener('click',enterRunMode);runEls.gpsToggle.addEventListener('change',renderRun);runEls.autoPause.addEventListener('change',renderRun);
runModeEls.pause?.addEventListener('click',()=>{togglePause();renderRunMode()});runModeEls.finish?.addEventListener('click',finishRun);runModeEls.exit?.addEventListener('click',exitRunMode);runModeEls.lock?.addEventListener('click',()=>setRunModeLocked(true));
runModeEls.unlock?.addEventListener('pointerdown',()=>{clearTimeout(runModeUnlockTimer);runModeUnlockTimer=setTimeout(()=>setRunModeLocked(false),2000)});['pointerup','pointercancel','pointerleave'].forEach(ev=>runModeEls.unlock?.addEventListener(ev,()=>clearTimeout(runModeUnlockTimer)));
document.addEventListener('visibilitychange',()=>{
  if(document.visibilityState==='visible'){
    if(runSession?.status==='running')resumeRunTracking('visibility');
    clearRunCompanionNotification();
  }else{
    releaseWakeLock();
    if(runSession?.status==='running'){prepareRunForBackground('visibility');showRunCompanionNotification(true)}
  }
  saveActiveRun('visibility');
});
window.addEventListener('pagehide',()=>{if(runSession?.status==='running')prepareRunForBackground('pagehide');saveActiveRun('pagehide');if(runSession?.status==='running')showRunCompanionNotification(true)});
window.addEventListener('pageshow',()=>{if(runSession?.status==='running')resumeRunTracking('pageshow')});
window.addEventListener('focus',()=>{if(runSession?.status==='running')resumeRunTracking('focus')});
document.addEventListener('freeze',()=>{if(runSession?.status==='running')prepareRunForBackground('freeze');saveActiveRun('freeze')});
document.addEventListener('resume',()=>{if(runSession?.status==='running')resumeRunTracking('resume')});
window.addEventListener('beforeunload',()=>saveActiveRun('beforeunload'));
setInterval(()=>{if(runSession){saveActiveRun('checkpoint');if(document.visibilityState==='hidden')showRunCompanionNotification()}},15000);
setInterval(ensureGpsFresh,5000);restoreActiveRun();

const workoutStory={
  dialog:document.getElementById('workoutStoryDialog'),canvas:document.getElementById('workoutStoryCanvas'),photo:document.getElementById('workoutStoryPhoto'),type:document.getElementById('workoutStoryType'),duration:document.getElementById('workoutStoryDuration'),caption:document.getElementById('workoutStoryCaption'),details:document.getElementById('workoutStoryDetails'),editTarget:document.getElementById('workoutStoryEditTarget'),width:document.getElementById('workoutStoryWidth'),photoSize:document.getElementById('workoutStoryPhotoSize'),detailMode:document.getElementById('workoutStoryDetailMode'),widthValue:document.getElementById('workoutStoryWidthValue'),photoSizeValue:document.getElementById('workoutStoryPhotoSizeValue'),reset:document.getElementById('resetWorkoutStoryLayoutBtn'),
  sizeInputs:{
    title:document.getElementById('workoutStoryTitleSize'),summary:document.getElementById('workoutStorySummarySize'),details:document.getElementById('workoutStoryDetailsSize'),caption:document.getElementById('workoutStoryCaptionSize'),watermark:document.getElementById('workoutStoryWatermarkSize')
  },
  sizeValues:{
    title:document.getElementById('workoutStoryTitleSizeValue'),summary:document.getElementById('workoutStorySummarySizeValue'),details:document.getElementById('workoutStoryDetailsSizeValue'),caption:document.getElementById('workoutStoryCaptionSizeValue'),watermark:document.getElementById('workoutStoryWatermarkSizeValue')
  }
};
const defaultWorkoutStoryLayout={title:{x:.065,y:.58},summary:{x:.065,y:.68},details:{x:.065,y:.77},caption:{x:.065,y:.94},watermark:{x:.065,y:.085}};
const defaultWorkoutStoryTextSizes={title:100,summary:100,details:100,caption:100,watermark:100};
let workoutStoryImage=null,workoutStoryPhotoTransform={x:0,y:0,zoom:1},workoutStoryDrag=null,workoutStoryBounds={};
function workoutStoryLayout(){state.settings.workoutStoryLayout=state.settings.workoutStoryLayout||JSON.parse(JSON.stringify(defaultWorkoutStoryLayout));return state.settings.workoutStoryLayout}
function workoutStoryTextSizes(){
  state.settings.workoutStoryTextSizes=state.settings.workoutStoryTextSizes||{...defaultWorkoutStoryTextSizes};
  for(const key of Object.keys(defaultWorkoutStoryTextSizes)){
    const n=+state.settings.workoutStoryTextSizes[key];
    state.settings.workoutStoryTextSizes[key]=Number.isFinite(n)?Math.max(55,Math.min(180,n)):defaultWorkoutStoryTextSizes[key];
  }
  return state.settings.workoutStoryTextSizes
}
function syncWorkoutStorySizeControls(){
  const sizes=workoutStoryTextSizes();
  for(const key of Object.keys(defaultWorkoutStoryTextSizes)){
    if(workoutStory.sizeInputs[key])workoutStory.sizeInputs[key].value=String(sizes[key]);
    if(workoutStory.sizeValues[key])workoutStory.sizeValues[key].textContent=`${sizes[key]}%`;
  }
}
function workoutStoryExercises(){const log=getLog(activeDate),all=(log.exercises||[]),done=all.filter(x=>x.done);return done.length?done:all}
function workoutStoryDetailText(){
  const exs=workoutStoryExercises(),mode=workoutStory.detailMode?.value||'top3',list=mode==='none'?[]:(mode==='all'?exs:exs.slice(0,3));
  if(!list.length)return'';
  const lines=list.map(x=>{const name=localizeWorkoutName(x.name),sets=Math.max(1,+x.sets||1),reps=+x.reps||0,weight=+x.weight||0;return`${name} ${sets}×${reps}${weight?` · ${weight}kg`:''}`});
  if(mode==='top3'&&exs.length>3)lines.push(state.settings.language==='en'?`+ ${exs.length-3} more`:`+ ${exs.length-3}개 더`);
  return lines.join('\n')
}
function syncWorkoutStoryDetails(force=false){if(force||!workoutStory.details.value.trim())workoutStory.details.value=workoutStoryDetailText()}
function coverWorkoutStoryImage(ctx,img,w,h){const z=Math.max(1,workoutStoryPhotoTransform.zoom||1),scale=Math.max(w/img.width,h/img.height)*z,sw=w/scale,sh=h/scale,maxX=Math.max(0,(img.width-sw)/2),maxY=Math.max(0,(img.height-sh)/2),sx=Math.max(0,Math.min(img.width-sw,(img.width-sw)/2-(workoutStoryPhotoTransform.x||0)*maxX)),sy=Math.max(0,Math.min(img.height-sh,(img.height-sh)/2-(workoutStoryPhotoTransform.y||0)*maxY));ctx.drawImage(img,sx,sy,sw,sh,0,0,w,h)}
function wrapWorkoutText(ctx,text,maxWidth){const lines=[];for(const raw of String(text||'').split(/\n/)){const words=raw.split(/\s+/);let line='';for(const word of words){const test=line?`${line} ${word}`:word;if(ctx.measureText(test).width>maxWidth&&line){lines.push(line);line=word}else line=test}if(line)lines.push(line)}return lines}
function drawWorkoutStory(){
  const c=workoutStory.canvas;if(!c)return;const ctx=c.getContext('2d'),w=c.width,h=c.height,L=workoutStoryLayout(),sizes=workoutStoryTextSizes(),boxW=w*((+workoutStory.width?.value||76)/100);workoutStoryBounds={};
  if(workoutStoryImage)coverWorkoutStoryImage(ctx,workoutStoryImage,w,h);else{ctx.fillStyle='#0a0d0b';ctx.fillRect(0,0,w,h)}
  const g=ctx.createLinearGradient(0,h*.35,0,h);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.78)');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);ctx.textBaseline='alphabetic';ctx.shadowColor='rgba(0,0,0,.5)';ctx.shadowBlur=5;
  const titleScale=sizes.title/100,title=localizeWorkoutName(workoutStory.type.value).toUpperCase(),tx=L.title.x*w,ty=L.title.y*h;ctx.fillStyle='#fff';ctx.font=`900 ${Math.round(88*titleScale)}px system-ui`;ctx.fillText(title,tx,ty,boxW);workoutStoryBounds.title={x:tx-20,y:ty-100*titleScale,w:Math.min(boxW,ctx.measureText(title).width+40),h:120*titleScale};
  const summaryScale=sizes.summary/100,exCount=workoutStoryExercises().length,summary=`${workoutStory.duration.value||45} MIN · ${exCount} ${state.settings.language==='en'?'EXERCISES':'종목'}`,sx=L.summary.x*w,sy=L.summary.y*h;ctx.fillStyle='#39ff14';ctx.font=`800 ${Math.round(42*summaryScale)}px system-ui`;ctx.fillText(summary,sx,sy,boxW);workoutStoryBounds.summary={x:sx-15,y:sy-52*summaryScale,w:Math.min(boxW,ctx.measureText(summary).width+30),h:68*summaryScale};
  const detailsScale=sizes.details/100,detail=(workoutStory.details.value||'').trim(),dx=L.details.x*w,dy=L.details.y*h;ctx.fillStyle='rgba(255,255,255,.96)';ctx.font=`650 ${Math.round(31*detailsScale)}px system-ui`;const detailLines=wrapWorkoutText(ctx,detail,boxW),lineH=42*detailsScale;detailLines.slice(0,8).forEach((line,i)=>ctx.fillText(line,dx,dy+i*lineH,boxW));workoutStoryBounds.details={x:dx-15,y:dy-40*detailsScale,w:boxW+30,h:Math.max(55,detailLines.length*lineH+20)};
  const captionScale=sizes.caption/100,cap=(workoutStory.caption.value||'오늘도 해냈다.').trim(),cx=L.caption.x*w,cy=L.caption.y*h;ctx.fillStyle='rgba(255,255,255,.9)';ctx.font=`500 ${Math.round(30*captionScale)}px system-ui`;const capLines=wrapWorkoutText(ctx,cap,boxW);capLines.slice(0,3).forEach((line,i)=>ctx.fillText(line,cx,cy+i*38*captionScale,boxW));workoutStoryBounds.caption={x:cx-15,y:cy-38*captionScale,w:boxW+30,h:Math.max(50,capLines.length*38*captionScale+15)};
  const watermarkScale=sizes.watermark/100,wx=L.watermark.x*w,wy=L.watermark.y*h;ctx.textAlign='left';ctx.fillStyle='#39ff14';ctx.font=`900 ${Math.round(34*watermarkScale)}px system-ui`;ctx.fillText('ELDYN',wx,wy);ctx.fillStyle='rgba(255,255,255,.82)';ctx.font=`700 ${Math.round(15*watermarkScale)}px system-ui`;ctx.fillText('MOVE FORWARD',wx,wy+24*watermarkScale);workoutStoryBounds.watermark={x:wx-10,y:wy-42*watermarkScale,w:220*watermarkScale,h:75*watermarkScale};ctx.shadowBlur=0
}
function workoutStoryPoint(e){const r=workoutStory.canvas.getBoundingClientRect();return{x:(e.clientX-r.left)*workoutStory.canvas.width/r.width,y:(e.clientY-r.top)*workoutStory.canvas.height/r.height}}
function openWorkoutStory(){const closeBtn=document.getElementById('workoutStoryCloseBtn');if(closeBtn)closeBtn.textContent=state.settings.language==='en'?'Close':'닫기';syncWorkoutStoryDetails(true);workoutStoryPhotoTransform={x:0,y:0,zoom:(+workoutStory.photoSize?.value||100)/100};syncWorkoutStorySizeControls();updateWorkoutStoryLabels();drawWorkoutStory();workoutStory.dialog.showModal()}
document.getElementById('createWorkoutStoryBtn')?.addEventListener('click',openWorkoutStory);
workoutStory.photo?.addEventListener('change',()=>{const f=workoutStory.photo.files?.[0];if(!f)return;const img=new Image();img.onload=()=>{workoutStoryImage=img;workoutStoryPhotoTransform={x:0,y:0,zoom:(+workoutStory.photoSize?.value||100)/100};drawWorkoutStory();URL.revokeObjectURL(img.src)};img.src=URL.createObjectURL(f)});
function updateWorkoutStoryLabels(){if(workoutStory.widthValue)workoutStory.widthValue.textContent=`${workoutStory.width.value}%`;if(workoutStory.photoSizeValue)workoutStory.photoSizeValue.textContent=`${workoutStory.photoSize.value}%`;const sizes=workoutStoryTextSizes();for(const key of Object.keys(defaultWorkoutStoryTextSizes)){if(workoutStory.sizeValues[key])workoutStory.sizeValues[key].textContent=`${sizes[key]}%`}}
[workoutStory.type,workoutStory.duration,workoutStory.caption,workoutStory.details].forEach(el=>el?.addEventListener('input',drawWorkoutStory));workoutStory.detailMode?.addEventListener('change',()=>{syncWorkoutStoryDetails(true);drawWorkoutStory()});
workoutStory.width?.addEventListener('input',()=>{updateWorkoutStoryLabels();drawWorkoutStory()});
for(const [key,input] of Object.entries(workoutStory.sizeInputs)){input?.addEventListener('input',()=>{const sizes=workoutStoryTextSizes();sizes[key]=Math.max(55,Math.min(180,+input.value||100));if(workoutStory.sizeValues[key])workoutStory.sizeValues[key].textContent=`${sizes[key]}%`;saveState();drawWorkoutStory()})}
workoutStory.photoSize?.addEventListener('input',()=>{workoutStoryPhotoTransform.zoom=(+workoutStory.photoSize.value||100)/100;updateWorkoutStoryLabels();drawWorkoutStory()});syncWorkoutStorySizeControls();updateWorkoutStoryLabels();
workoutStory.canvas?.addEventListener('pointerdown',e=>{const p=workoutStoryPoint(e),target=workoutStory.editTarget?.value||'auto',order=['title','summary','details','caption','watermark'];let key=null;if(target==='auto')key=order.find(k=>pointInBounds(p.x,p.y,workoutStoryBounds[k]));else if(target!=='photo')key=target;if(key&&workoutStoryBounds[key])workoutStoryDrag={type:'element',key,start:p,origin:{...workoutStoryLayout()[key]}};else if(workoutStoryImage&&(target==='photo'||target==='auto')){const r=workoutStory.canvas.getBoundingClientRect();workoutStoryDrag={type:'photo',x:e.clientX,y:e.clientY,startX:workoutStoryPhotoTransform.x,startY:workoutStoryPhotoTransform.y,w:r.width,h:r.height}}else return;workoutStory.canvas.setPointerCapture?.(e.pointerId);workoutStory.canvas.classList.add('dragging');e.preventDefault()});
workoutStory.canvas?.addEventListener('pointermove',e=>{if(!workoutStoryDrag)return;if(workoutStoryDrag.type==='photo'){const dx=(e.clientX-workoutStoryDrag.x)/Math.max(1,workoutStoryDrag.w),dy=(e.clientY-workoutStoryDrag.y)/Math.max(1,workoutStoryDrag.h);workoutStoryPhotoTransform.x=Math.max(-1,Math.min(1,workoutStoryDrag.startX+dx*2));workoutStoryPhotoTransform.y=Math.max(-1,Math.min(1,workoutStoryDrag.startY+dy*2))}else{const p=workoutStoryPoint(e),dx=(p.x-workoutStoryDrag.start.x)/workoutStory.canvas.width,dy=(p.y-workoutStoryDrag.start.y)/workoutStory.canvas.height;let x=clamp01(workoutStoryDrag.origin.x+dx),y=clamp01(workoutStoryDrag.origin.y+dy);for(const g of [.065,.5,.935]){if(Math.abs(x-g)<.018)x=g;if(Math.abs(y-g)<.018)y=g}state.settings.workoutStoryLayout=state.settings.workoutStoryLayout||{};state.settings.workoutStoryLayout[workoutStoryDrag.key]={x,y}}drawWorkoutStory();e.preventDefault()});
function stopWorkoutStoryDrag(){if(!workoutStoryDrag)return;workoutStoryDrag=null;workoutStory.canvas.classList.remove('dragging');saveState()}
workoutStory.canvas?.addEventListener('pointerup',stopWorkoutStoryDrag);workoutStory.canvas?.addEventListener('pointercancel',stopWorkoutStoryDrag);
workoutStory.reset?.addEventListener('click',()=>{state.settings.workoutStoryLayout=JSON.parse(JSON.stringify(defaultWorkoutStoryLayout));state.settings.workoutStoryTextSizes={...defaultWorkoutStoryTextSizes};workoutStoryPhotoTransform={x:0,y:0,zoom:(+workoutStory.photoSize?.value||100)/100};syncWorkoutStorySizeControls();saveState();drawWorkoutStory()});
document.getElementById('renderWorkoutStoryBtn')?.addEventListener('click',drawWorkoutStory);
async function saveWorkoutStoryImage(){
  drawWorkoutStory();const blob=await new Promise(resolve=>workoutStory.canvas.toBlob(resolve,'image/png',.96));if(!blob)return alert(state.settings.language==='ko'?'이미지 생성에 실패했어요.':'Could not create image.');
  const file=new File([blob],'ELDYN-WORKOUT-STORY.png',{type:'image/png'});
  try{if(navigator.canShare?.({files:[file]})){await navigator.share({title:'ELDYN Workout Story',files:[file]});return}}catch(e){if(e?.name==='AbortError')return}
  const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=file.name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),3000);
  alert(state.settings.language==='ko'?'이미지를 저장했어요. iPhone에서 다운로드가 보이지 않으면 공유 메뉴의 “이미지 저장”을 사용해 주세요.':'Image saved.');
}
document.getElementById('downloadWorkoutStoryBtn')?.addEventListener('click',saveWorkoutStoryImage);

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
  if(!nutritionLabelData)return;const idx=+nutritionLabelEls.meal.value,log=getLog(activeDate),meals=ensureMeals(log,activeDate),meal=meals[idx];if(!meal)return alert('저장할 식사를 선택해 주세요.');const y=nutritionLabelScaled();meal.foodItems=meal.foodItems||[];meal.foodItems.push({name:nutritionLabelData.productName||'영양정보표 제품',amount:y.amount,unit:y.unit,kcal:y.kcal,protein:y.protein,carbs:y.carbs,fat:y.fat,sugars:y.sugars,sodium:y.sodium,source:'nutrition-label',confidence:nutritionLabelData.confidence||0,scannedAt:new Date().toISOString()});meal.customText=meal.foodItems.map(z=>z.name).join(' · ');meal.done=true;syncFoodTotals(log,meals);log.priorities.nutrition=meals.every(mealHasNutritionLog);log.updatedAt=new Date().toISOString();saveState();saveDailyLogNow(activeDate);nutritionLabelEls.dialog.close();render();alert(`${meal.name} 식단에 영양정보를 저장했어요.`)
};

setTimeout(()=>{ensureLiveRunMap();liveRunMap?.invalidateSize()},250);document.querySelectorAll('[data-view="run"]').forEach(b=>b.addEventListener('click',()=>setTimeout(()=>{ensureLiveRunMap();liveRunMap?.invalidateSize();updateLiveRunMap()},120)));

runEls.historyToggle?.addEventListener('click',()=>{runHistoryExpanded=!runHistoryExpanded;renderRunUi();});

// v1.2.7 — reliable application bootstrap and Supabase login initialization.
let eldynBootstrapStarted=false;
async function waitForSupabaseLibrary(timeoutMs=8000){
  const started=Date.now();
  while(!window.supabase&&Date.now()-started<timeoutMs){
    await new Promise(resolve=>setTimeout(resolve,100));
  }
  return !!window.supabase;
}
async function bootstrapEldyn(){
  if(eldynBootstrapStarted)return;
  eldynBootstrapStarted=true;
  try{
    render();
    renderRun();
  }catch(error){
    console.error('ELDYN initial render failed:',error);
  }
  if('serviceWorker'in navigator){
    navigator.serviceWorker.register('./sw.js').catch(error=>console.warn('Service worker registration failed:',error));
  }
  const libraryReady=await waitForSupabaseLibrary();
  if(!libraryReady){
    if(typeof syncStatus!=='undefined'&&syncStatus)syncStatus.textContent='Cloud library could not be loaded. Check the internet connection and reload.';
    return;
  }
  await initSupabase();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bootstrapEldyn,{once:true});
else bootstrapEldyn();
