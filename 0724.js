let memo = [];

let alllist = document.querySelector('.alllist');
let btn = document.querySelector('button');
let line = document.querySelector('line');
let circle = document.querySelector('circle');

btn.addEventListener('click', addfun);

function addfun(){
    let memotext = document.querySelector('textarea').value;
   
    if(memotext.length>0){
        let memoobj = { text: memotext,
                        todo: false};
        memo.push(memoobj);
        document.querySelector('textarea').value = '';

        if(line.classList.contains('line')){
            line.classList.remove('line');
            circle.classList.remove('circle');
        }

    };

    
    showarr();

}

function showarr(){
    alllist.textContent = '';
    for(let i=0;i<memo.length;i++){
        
        let list = document.createElement('div');
        list.className = 'list';
        list.id = i;
        let listP = document.createElement('p');
        let donebtn = document.createElement('div');
        let removebtn = document.createElement('div');
        donebtn.className = 'done';
        donebtn.textContent = 'Done';
        removebtn.className = 'remove';
        removebtn.textContent = 'Remove';
        // listP.textContent = memo[i];

        if(memo[i].text.includes('\n')){
            memo[i].text = memo[i].text.replaceAll('\n','<br>');
            listP.innerHTML = memo[i].text;
        }else if(memo[i].text.includes('<br>')){
            listP.innerHTML = memo[i].text;
        }else{
            listP.textContent = memo[i].text;
        }
        

        list.appendChild(listP);
        list.appendChild(donebtn);
        list.appendChild(removebtn);
        alllist.appendChild(list);
        
        // removememo();
        // 加在這會重複刪除後面


        if(memo[i].todo === true){
            let donebtn = document.querySelectorAll('.done');
            let rebtn = document.querySelectorAll('.remove');
            rebtn[i].style.display = 'none';
            donebtn[i].className = 'done end';
        }
    }



    removememo();
    memodone();
};


function removememo(){
    let rebtn = document.querySelectorAll('.remove');
    for(let i=0;i<rebtn.length;i++){
        rebtn[i].addEventListener('click',function(){
            memo.splice(this.parentNode.id,1);
            showarr();
            // show放在迴圈外會出錯 (?)
        })
    }
}


function memodone(){
    let donebtn = document.querySelectorAll('.done');
    let rebtn = document.querySelectorAll('.remove');
    for(let i=0;i<donebtn.length;i++){
        donebtn[i].addEventListener('click',function(){
            memo[i].todo = true;
            rebtn[i].style.display = 'none';
            donebtn[i].style.animation = 'done 1s linear';
            donebtn[i].className = 'done end';
            memocheck();
        })
    }
}


function memocheck(){

    let goodjob = memo.every(
        e => {
            if(e.todo === false){
                return false
            }
            return true
        }
    )

    if(goodjob){
        line.classList.add('line');
        circle.classList.add('circle');
    }
}