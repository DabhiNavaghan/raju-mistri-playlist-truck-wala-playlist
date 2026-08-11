"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const BUMPER_LINES = [
  "बुरी नज़र वाले तेरा मुँह काला",
  "देखो मगर प्यार से",
  "ओके टाटा, फिर मिलेंगे",
  "मेरा भारत महान",
  "जय माता दी",
  "रब राखा",
  "साइड प्लीज़",
  "हॉर्न दो, राह लो",
  "चलती का नाम गाड़ी",
  "जो डर गया, समझो मर गया",
  "दिल्ली अभी दूर है",
  "सफ़र सुहाना हो",
  "यारों का यार",
  "आगे बढ़ो, पीछे मत देखो",
  "धीरे चल प्यारे, जीवन अनमोल है।",
  "कोई जलो मत भाई से, समझ गए ना अब किसी से नहीं जलना।",
  "मालिक की गाड़ी, ड्राइवर का पसीना, चलती है रोड पर बन कर हसीना।",
  "हस मत पगली वरना प्यार हो जाएगा तो प्यार हुआ क्या?",
];

function shuffle(arr: number[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function TruckBumper() {
  const [text, setText] = useState("");
  const [swapping, setSwapping] = useState(false);
  const orderRef = useRef<number[]>([]);
  const posRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextLine = useCallback(() => {
    const order = orderRef.current;
    const newPos = (posRef.current + 1) % order.length;
    if (newPos === 0) {
      shuffle(order);
    }
    posRef.current = newPos;
    setSwapping(true);
    setTimeout(() => {
      setText(BUMPER_LINES[orderRef.current[newPos]]);
      setSwapping(false);
    }, 240);
  }, []);

  useEffect(() => {
    orderRef.current = shuffle(BUMPER_LINES.map((_, i) => i));
    setText(BUMPER_LINES[orderRef.current[0]]);
    timerRef.current = setInterval(nextLine, 12000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [nextLine]);

  return (
    <p className="bumper">
      <span className={`bumper__text${swapping ? " is-swapping" : ""}`} lang="hi">
        {text}
      </span>
      <button className="bumper__next" type="button" onClick={nextLine} aria-label="Another line">
        <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </p>
  );
}
