const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  { logo: "A", url: "https://www.acfun.cn" },
  { logo: "B", url: "https://bilibili.com" },
];
const removeX = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
};
const hashx = () => {
  $siteList.find("li:not(.last").remove();
  hashMap.forEach((node, index) => {
    const $li = $(
      `<li>
          
            <div class="site">

                <div class="logo">
                  ${removeX(node.url)[0].toUpperCase()}
                </div>
                <div class="link">${removeX(node.url)}</div>
                <div class = "close">
                <svg class="icon" >
                        <use xlink:href="#icon-baseline-close-px"></use>
                    </svg>
                </div>
            </div>
        </li>`
    ).insertBefore($lastLi);

    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      console.log("click x ok");
      e.stopPropagation(); //阻止冒泡
      hashMap.splice(index, 1);
      hashx();
    });
  });
};

hashx();

$(".addButton").on("click", () => {
  let url = window.prompt("请输入需要添加的网址");
  if (url.indexOf("https") !== 0) {
    url = "https://" + url;
  }
  hashMap.push({
    logo: url[0],
    logoType: "text",
    url: url,
  });

  hashx();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};

$(document).on("keypress", (e) => {
  const { key } = e;
  for (let i = 0; i < hashMap.length; i++) {
    console.log(removeX(hashMap[i].url)[0]);
    if (removeX(hashMap[i].url)[0].toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
