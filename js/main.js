const frame = document.querySelector("section");
const list = frame.querySelectorAll("article");
const len = list.length; // 8
const deg = 360 / len; // 45

const names = [
  "wave",
  "tree",
  "love",
  "Skyblue",
  "Cloud",
  "Attention",
  "sunshine",
  "spring",
];

for (let i = 0; i < len; i++) {
  list[i].style.transform = `rotate(${deg * i}deg) translateY(-100vh)`;

  // 사진 부분 일괄 적용
  const pic = list[i].querySelector(".pic");
  pic.style.backgroundImage = `url(../music/img/${names[i]}.jpg)`;

  // 음악 제목 일괄 적용
  const title = list[i].querySelector(".text>h2");
  title.innerHTML = `${names[i]}`;

  // 음악 태그 & 파일 일괄 적용
  const audio = document.createElement("audio");
  audio.setAttribute("src", `../music/music/${names[i]}.mp3`);
  audio.setAttribute("loop", "loop");
  list[i].append(audio);
}

// prev, next 버튼 액션 처리
const prev = document.querySelector(".btnPrev");
const next = document.querySelector(".btnNext");

let num = 0; // 회전 각도 조절용
let active = 0; // 활성화 패널 위치 기억용

prev.addEventListener("click", function () {
  frame.style.transform = `rotate(${deg * ++num}deg)`;

  if (active === 0) {
    active = len - 1;
  } else {
    active--;
  }
  for (let el of list) {
    el.classList.remove("on");
  }

  list[active].classList.add("on");
});

next.addEventListener("click", function () {
  frame.style.transform = `rotate(${deg * --num}deg)`;

  if (active === len - 1) {
    active = 0;
  } else {
    active++;
  }
  for (let el of list) {
    el.classList.remove("on");
  }
  list[active].classList.add("on");
});

// 가운데에 있는 애만 on 클래스 주기

// cd 모양 사진 회전 & 음악 파일 컨트롤
let before = 0; // 이전 패널 위치 기억 변수
for (let el of list) {
  const play = el.querySelector(".play");
  const pause = el.querySelector(".pause");
  const reload = el.querySelector(".reload");

  play.addEventListener("click", function (e) {
    //페이지가 처음 로딩되었을때
    if (before === 0) {
      before = e.target;
    }
    // 내가 선택한게 이전이랑 다르면
    else if (before !== e.target) {
      before.closest("article").querySelector("audio").pause();
      before.closest("article").querySelector(".pic").classList.remove("on");
      before = e.target;
    }
    //e.target.closest("article").querySelector(".pic").classList.add("on");
    // 플레이 버튼을 클릭했을때 가장 가까운 article에서 pic을 선택 ?
    // e.target 으로 써도 되는데 아래처럼 써도 됨
    el.querySelector(".pic").classList.add("on");
    el.querySelector("audio").play();
  });

  pause.addEventListener("click", function (e) {
    //e.target.closest("article").querySelector(".pic").classList.remove("on");
    el.querySelector(".pic").classList.remove("on");
    el.querySelector("audio").pause();
  });

  reload.addEventListener("click", function (e) {
    //페이지가 처음 로딩되었을때
    if (before === 0) {
      before = e.target;
    }
    // 내가 선택한게 이전이랑 다르면
    else if (before !== e.target) {
      before.closest("article").querySelector("audio").pause();
      before.closest("article").querySelector(".pic").classList.remove("on");
      before = e.target;
    }

    //e.target.closest("article").querySelector(".pic").classList.add("on");
    el.querySelector(".pic").classList.add("on");
    el.querySelector("audio").load();
    el.querySelector("audio").play();
  });
}
