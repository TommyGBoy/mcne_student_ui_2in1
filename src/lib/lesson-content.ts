export const PDF_PAGES = [
  {
    title: "葉綠素在做什麼",
    body: "葉綠素是存在於葉綠體中的綠色色素。它的主要作用是吸收光能，把光能轉成化學能，啟動光合作用。沒有這一步，後面的糖類合成就不會開始。",
  },
  {
    title: "它吸收哪種光",
    body: "葉綠素主要吸收紅光與藍光，並把綠光反射出去，所以葉片看起來是綠色的。光合作用可簡寫成：二氧化碳加水，在光能作用下產生葡萄糖與氧氣。",
  },
  {
    title: "兩件它不做的事",
    body: "促進水分蒸散的是氣孔與蒸散作用，不是葉綠素。多餘的糖分會被運走或暫存在其他組織，也不是葉綠素的工作。記住：葉綠素負責吸收光能。",
  },
  {
    title: "葉片怎麼接住光",
    body: "光線先經過表皮，再進到葉肉。柵狀組織的細胞排得較密，葉綠體多，是接光的主力。海綿組織空隙較多，方便氣體進出。",
  },
  {
    title: "葉綠體在哪裡",
    body: "葉肉細胞裡有許多葉綠體。每個葉綠體有雙層膜，裡面的類囊體堆成基粒，葉綠素就嵌在類囊體膜上，方便接住進來的光。",
  },
  {
    title: "類囊體上的色素",
    body: "除了葉綠素 a、葉綠素 b，類囊體上還有類胡蘿蔔素。它們把吸收到的能量傳給反應中心。葉子偏黃時，常常是這些色素比較顯眼。",
  },
  {
    title: "光反應先發生",
    body: "光反應在類囊體進行：色素吸收光能，把水拆開，放出氧氣，同時做出後續反應需要的能量載體。沒有光，這一段就停下來。",
  },
  {
    title: "水被拆開之後",
    body: "水分子被拆開，電子進入光反應鏈，氧氣成為副產物排到細胞外。所以課堂上說「植物放出氧氣」，源頭是水，不是二氧化碳。",
  },
  {
    title: "碳反應接著合成糖",
    body: "碳反應在葉綠體基質進行，把二氧化碳固定成糖。它用的是光反應送來的能量，所以白天累積的光能，會在這裡變成植株能用的養分。",
  },
  {
    title: "什麼會改變速率",
    body: "光的強弱、二氧化碳濃度、還有溫度，都會影響光合作用有多快。光太弱時，葉綠素接不到足夠能量，整條路徑就慢下來。",
  },
  {
    title: "一天裡的節奏",
    body: "清晨光變強，氣孔漸開，光反應跟上。正午若水分不足，氣孔可能關閉，二氧化碳進不來，糖的合成就變慢。傍晚光減弱，光反應先停。",
  },
  {
    title: "本課只記一件事",
    body: "看到葉片是綠色，是因為綠光被反射。測驗若問葉綠素的主要作用，答案是吸收光能、進行光合作用，不是蒸散，也不是儲存糖分。",
  },
] as const;

export function formatDuration(totalSeconds: number) {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function formatClock(totalSeconds: number) {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
