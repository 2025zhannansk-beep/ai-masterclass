'use strict';
const menu = document.querySelector('#menu');
const menuButton = document.querySelector('.menu-button');
function closeMenu(){menu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}
menuButton.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open')){closeMenu();menuButton.focus();}});
document.addEventListener('click',e=>{if(!e.target.closest('header'))closeMenu();});
const fields=[...document.querySelectorAll('[data-save]')];
const storageKey='ai-studio-masterclass-participant-v1';
const saveStatus=document.querySelector('#save-status');
let saved={};
try{saved=JSON.parse(localStorage.getItem(storageKey)||'{}');if(!saved||typeof saved!=='object'||Array.isArray(saved))saved={};}catch{saved={};saveStatus.textContent='Локальное сохранение недоступно. Скачайте материалы, чтобы не потерять ответы.';}
fields.forEach(field=>{const value=saved[field.dataset.save];if(field.type==='checkbox')field.checked=value===true;else if(typeof value==='string')field.value=value;field.addEventListener('input',()=>{saved[field.dataset.save]=field.type==='checkbox'?field.checked:field.value;try{localStorage.setItem(storageKey,JSON.stringify(saved));saveStatus.textContent='Ответы сохранены в этом браузере. Для копии на диске скачайте материалы.';}catch{saveStatus.textContent='Не удалось сохранить в браузере. Скачайте материалы до закрытия страницы.';}});});
document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{const text=document.getElementById(button.dataset.copy).textContent;try{await navigator.clipboard.writeText(text);document.querySelector('#copy-status').textContent='Промпт скопирован. Вставьте его в выбранную нейросеть и добавьте свои данные.';button.textContent='Скопировано ✓';}catch{document.querySelector('#copy-status').textContent='Автокопирование недоступно. Выделите текст промпта и скопируйте вручную.';}}));
function download(){const lines=['Бизнес под контролем — мои материалы мастер-класса','Жанна Булгакова · AI-студия',''];fields.forEach(field=>{const label=field.closest('label');const heading=label?label.textContent.trim():field.dataset.save;lines.push(heading,field.type==='checkbox'?(field.checked?'[✓] Отмечено':'[ ] Не отмечено'):field.value||'Не заполнено','');});document.querySelectorAll('.prompt').forEach(prompt=>lines.push(prompt.querySelector('h3').textContent,prompt.querySelector('pre').textContent,''));lines.push('После встречи',document.querySelector('.homework').innerText,'','Тренинги: https://2025zhannansk-beep.github.io/ai-trainings/','Телеграм: https://t.me/Zhanna_Bulgakova_AI');const blob=new Blob([lines.join('\n')],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='Мой AI-помощник — материалы.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
document.querySelector('#download').addEventListener('click',download);document.querySelector('#download-bottom').addEventListener('click',download);document.querySelector('#print').addEventListener('click',()=>window.print());

