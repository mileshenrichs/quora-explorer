let prevScrollHeight = document.body.scrollHeight;
let lastScrollCallTimestamp;

setInterval(checkScrollHeight, 20);

function checkScrollHeight() {
  if(document.body.scrollHeight !== prevScrollHeight) {
    console.log('Scroll height changed from ' + prevScrollHeight + ' to ' + 
                  document.body.scrollHeight + ' in ' + calcTimeDiff(lastScrollCallTimestamp, Date.now()));
    prevScrollHeight = document.body.scrollHeight;
  }
}

function calcTimeDiff(prev, current) {
  return ((current - prev) / 1000) + 's';
}

function doScroll() {
  lastScrollCallTimestamp = Date.now();
  window.scrollTo(0, document.body.scrollHeight);
}