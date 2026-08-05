const CACHE='eldyn-v1.2.9.4-workout-cardio-runwalk';
const RUN_NOTICE_TAG='eldyn-active-run';
const ASSETS=['./','./index.html','./styles.css','./app.js','./config.js','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(Promise.all([
  caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))),
  self.clients.claim()
])));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))))});
self.addEventListener('message',e=>{
  const d=e.data||{};
  if(d.type!=='ELDYN_RUN_STATUS')return;
  e.waitUntil(self.registration.showNotification(d.title||'ELDYN · Run in progress',{
    body:d.body||'Running session active',tag:RUN_NOTICE_TAG,icon:'./icons/icon-192.png',badge:'./icons/icon-192.png',
    silent:true,renotify:false,requireInteraction:true,data:{url:d.url||'./'}
  }));
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  const target=e.notification.data?.url||'./';
  e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{
    for(const c of list){if('focus'in c){c.navigate(target);return c.focus()}}
    return clients.openWindow?clients.openWindow(target):undefined;
  }));
});
