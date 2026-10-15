const Engine={
 categories:[...new Set(Q.map(q=>q.category))],
 shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a},
 rank(a){return a.slice().sort((a,b)=>FREQUENCY.topics[b.topic].count-FREQUENCY.topics[a.topic].count||a.number-b.number)},
 select(mode,stats,category){let a=Q.slice();if(mode==='category')a=a.filter(q=>q.category===category);if(mode==='wrong')a=a.filter(q=>stats[q.id]?.wrong);if(mode==='weak')a=a.filter(q=>stats[q.id]?.a>0&&stats[q.id].c/stats[q.id].a<.7);if(mode==='mock'){const counts=[10,10,7,7,10];return this.categories.flatMap((c,i)=>this.shuffle(Q.filter(q=>q.category===c)).slice(0,counts[i]))}return mode==='random'?this.shuffle(a):this.rank(a)},
 record(stats,q,answer){const s=stats[q.id]||{a:0,c:0,wrong:false};s.a++;if(answer===q.answer)s.c++;s.wrong=answer!==q.answer;stats[q.id]=s},
 grade(questions,answers){let ranges=Object.fromEntries(this.categories.map(c=>[c,{got:0,max:0,count:0,correct:0}]));let correct=0,total=0,max=0;for(const q of questions){const w=q.category.includes('有害')?8:10;let r=ranges[q.category];r.max+=w;r.count++;max+=w;if(answers[q.id]===q.answer){correct++;total+=w;r.got+=w;r.correct++}}return{correct,total,max,ranges,pass:total>=max*.6&&Object.values(ranges).filter(r=>r.max).every(r=>r.got>=r.max*.4)}},
 remaining(started,now){return Math.max(0,Math.ceil((started+10800000-now)/1000))}
};
