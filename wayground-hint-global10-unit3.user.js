// ==UserScript==
// @name         Wayground Hint - Global 10 Unit 3 (72 answers)
// @namespace    local.wayground.hint.global10unit3
// @version      1.1
// @description  Compact mobile answer pill for the Global 10 Unit 3 assignment on Wayground. Does not color the answer input. No auto-fill, no auto-submit.
// @match        https://wayground.com/*
// @match        https://*.wayground.com/*
// @match        https://quizizz.com/*
// @match        https://*.quizizz.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  // qid suffix -> answer. The input's data-testid is
  // fib-text-input-<last 12 chars of the question id>.
  const ANSWER_BY_QID = {
  "0fbbdcfed168": "famous",
  "0fbbdcfed169": "traditional music",
  "0fbbdcfed16a": "talented",
  "0fbbdcfed16b": "pop singer",
  "0fbbdcfed16c": "fan",
  "0fbbdcfed16d": "award",
  "0fbbdcfed16e": "trumpet",
  "0fbbdcfed16f": "teenager",
  "0fbbdcfed170": "upload",
  "0fbbdcfed171": "reach",
  "0fbbdcfed172": "be good at something",
  "0fbbdcfed173": "musical instrument",
  "0fbbdcfed174": "perform",
  "0fbbdcfed175": "relax",
  "0fbbdcfed176": "attract",
  "0fbbdcfed177": "ordinary",
  "0fbbdcfed178": "judge",
  "0fbbdcfed179": "audience",
  "0fbbdcfed17a": "music recording",
  "0fbbdcfed17b": "musician",
  "0fbbdcfed17c": "charity concert",
  "0fbbdcfed17d": "book",
  "0fbbdcfed17e": "stadium ticket office",
  "0fbbdcfed17f": "stay at home",
  "0fbbdcfed180": "hesitate",
  "0fbbdcfed181": "surprise",
  "0fbbdcfed182": "make someone fall asleep",
  "0fbbdcfed183": "decide",
  "0fbbdcfed184": "let someone do something",
  "0fbbdcfed185": "competition",
  "0fbbdcfed186": "identify",
  "0fbbdcfed187": "stage",
  "0fbbdcfed188": "semi-final",
  "0fbbdcfed189": "eliminate",
  "0fbbdcfed18a": "play an important role",
  "0fbbdcfed18b": "argument",
  "0fbbdcfed18c": "vote",
  "0fbbdcfed18d": "be not in favour of",
  "0fbbdcfed18e": "develop",
  "0fbbdcfed18f": "dress up",
  "0fbbdcfed190": "remain",
  "0fbbdcfed191": "runners-up",
  "0fbbdcfed192": "cash prize",
  "0fbbdcfed193": "take place",
  "0fbbdcfed194": "preparation",
  "0fbbdcfed195": "sell",
  "0fbbdcfed196": "organiser",
  "0fbbdcfed197": "share",
  "0fbbdcfed198": "performance",
  "0fbbdcfed199": "hits",
  "0fbbdcfed19a": "taste",
  "0fbbdcfed19b": "party atmosphere",
  "0fbbdcfed19c": "art exhibitions",
  "0fbbdcfed19d": "watch fireworks",
  "0fbbdcfed19e": "take photos",
  "0fbbdcfed19f": "artists",
  "0fbbdcfed1a0": "ancient",
  "0fbbdcfed1a1": "spread",
  "0fbbdcfed1a2": "praise",
  "0fbbdcfed1a3": "worship singing",
  "0fbbdcfed1a4": "psychic",
  "0fbbdcfed1a5": "moon-shaped lute",
  "0fbbdcfed1a6": "bamboo clapper",
  "0fbbdcfed1a7": "costumes",
  "0fbbdcfed1a8": "depend on",
  "0fbbdcfed1a9": "be recognised as",
  "0fbbdcfed1aa": "reveal",
  "0fbbdcfed1ab": "practise",
  "0fbbdcfed1ac": "participate in",
  "0fbbdcfed1ad": "family gatherings",
  "0fbbdcfed1ae": "do research",
  "0fbbdcfed1af": "present"
};

  // Normalized question text -> answer. Fallback if a question id changes.
  const ANSWER_BY_PROMPT = {
  "nổi tiếng (adj)": "famous",
  "âm nhạc truyền thống (n.phr)": "traditional music",
  "tài năng (adj)": "talented",
  "ca sĩ nhạc pop (n.phr)": "pop singer",
  "fan hâm mộ (n)": "fan",
  "giải thưởng (n)": "award",
  "kèn (n)": "trumpet",
  "thiếu niên (n)": "teenager",
  "đăng tải (v)": "upload",
  "đạt mốc (v)": "reach",
  "giỏi về việc gì đó (v.phr)": "be good at something",
  "nhạc cụ (n.phr)": "musical instrument",
  "biểu diễn (v)": "perform",
  "thư giãn (v)": "relax",
  "thu hút (v)": "attract",
  "bình thường (adj)": "ordinary",
  "giám khảo (n)": "judge",
  "khán giả (n)": "audience",
  "bản thu âm (n.phr)": "music recording",
  "nhạc sĩ (n)": "musician",
  "buổi biểu diễn từ thiện (n.phr)": "charity concert",
  "đặt, sách (v,n)": "book",
  "phòng vé sân vận động (n.phr)": "stadium ticket office",
  "ở nhà (v.phr)": "stay at home",
  "ngần ngại (v)": "hesitate",
  "sự bất ngờ (v, n)": "surprise",
  "khiến ai đó mất ngủ (v.phr)": "make someone fall asleep",
  "quyết định (v)": "decide",
  "cho phép ai đó làm gì (v.phr)": "let someone do something",
  "cuộc thi (n)": "competition",
  "nhận ra (v)": "identify",
  "giai đoạn (n)": "stage",
  "bán kết (n.phr)": "semi-final",
  "loại = remove (v)": "eliminate",
  "đóng vai trò quan trọng (v.phr)": "play an important role",
  "tranh luận (n)": "argument",
  "bình chọn (v)": "vote",
  "không ủng hộ (v.phr)": "be not in favour of",
  "phát triển (v)": "develop",
  "hóa trang (phr.v)": "dress up",
  "giữ lại (v)": "remain",
  "á quân (n)": "runners-up",
  "giải thưởng tiền mặt (n.phr)": "cash prize",
  "diễn ra = be held (v.phr)": "take place",
  "việc chuẩn bị (n)": "preparation",
  "bán (v)": "sell",
  "ban tổ chức (n)": "organiser",
  "chia sẻ (v)": "share",
  "màn biểu diễn (n)": "performance",
  "ca khúc hay nhất (n)": "hits",
  "nếm thử (v)": "taste",
  "không khí tiệc tùng (n.phr)": "party atmosphere",
  "triển lãm nghệ thuật (n.phr)": "art exhibitions",
  "xem pháo hoa (v.phr)": "watch fireworks",
  "chụp ảnh (v.phr)": "take photos",
  "nghệ sĩ (n)": "artists",
  "cổ đại (adj)": "ancient",
  "lan truyền (v,n)": "spread",
  "tuyên dương (v)": "praise",
  "hát thờ (n.phr)": "worship singing",
  "nhà ngoại cảm (n)": "psychic",
  "đàn nguyệt (n)": "moon-shaped lute",
  "đàn tính (n)": "bamboo clapper",
  "trang phục (n)": "costumes",
  "phụ thuộc vào (phr.v)": "depend on",
  "được công nhận (v.phr)": "be recognised as",
  "tiết lộ (v)": "reveal",
  "luyện tập (v)": "practise",
  "tham gia (phr.v)": "participate in",
  "họp mặt gia đình (n.phr)": "family gatherings",
  "thực hiện nghiên cứu (v.phr)": "do research",
  "trình bày (v)": "present"
};

  const normalize = (s) => (s == null ? '' : String(s))
    .replace(/\u00a0/g, ' ')
    .replace(/[\u00ad\u200b\u200c\u200d\ufeff]/g, '')
    .replace(/[\u2018\u2019\u201b\u2032]/g, "'")
    .replace(/[\u201c\u201d\u2033]/g, '"')
    .replace(/\u2026/g, '...')
    .replace(/[\u2010-\u2015\u2212]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

  const style = document.createElement('style');
  style.textContent = `
    #wg-hint-panel {
      position: fixed;
      z-index: 2147483647;
      left: 50%;
      bottom: calc(84px + env(safe-area-inset-bottom, 0px));
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 7px;
      max-width: min(calc(100vw - 18px), 380px);
      box-sizing: border-box;
      padding: 7px 10px;
      border: 1px solid #16a34a;
      border-radius: 12px;
      background: #f0fdf4;
      color: #14532d;
      box-shadow: 0 4px 18px rgba(0, 0, 0, .16);
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
      font-size: 14px;
      line-height: 1.2;
      pointer-events: auto;
    }
    #wg-hint-panel .wg-label {
      flex: 0 0 auto;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: .03em;
      text-transform: uppercase;
      color: #15803d;
      white-space: nowrap;
    }
    #wg-hint-panel .wg-answer {
      font-weight: 700;
      overflow-wrap: anywhere;
      user-select: text;
    }
    #wg-hint-panel .wg-close {
      flex: 0 0 auto;
      width: 24px;
      height: 24px;
      padding: 0;
      border: 0;
      border-radius: 999px;
      background: rgba(22, 163, 74, .12);
      color: #14532d;
      font-size: 16px;
      line-height: 24px;
      cursor: pointer;
    }
    html.dark #wg-hint-panel, body.dark #wg-hint-panel {
      background: #052e16;
      color: #dcfce7;
      border-color: #22c55e;
    }
    html.dark #wg-hint-panel .wg-label, body.dark #wg-hint-panel .wg-label {
      color: #86efac;
    }
    html.dark #wg-hint-panel .wg-close, body.dark #wg-hint-panel .wg-close {
      background: rgba(34, 197, 94, .18);
      color: #dcfce7;
    }
    html.wg-hint-hidden #wg-hint-panel { display: none !important; }
    @media (max-width: 480px) {
      #wg-hint-panel {
        left: 50%;
        right: auto;
        bottom: calc(78px + env(safe-area-inset-bottom, 0px));
        transform: translateX(-50%);
        max-width: calc(100vw - 18px);
        padding: 6px 9px;
        gap: 6px;
        font-size: 13px;
        border-radius: 10px;
      }
      #wg-hint-panel .wg-label { font-size: 9px; }
      #wg-hint-panel .wg-close {
        width: 22px;
        height: 22px;
        font-size: 14px;
        line-height: 22px;
      }
    }
    @media (max-width: 360px) {
      #wg-hint-panel {
        font-size: 12px;
        padding: 5px 8px;
        gap: 5px;
      }
      #wg-hint-panel .wg-label { display: none; }
      #wg-hint-panel .wg-close {
        width: 20px;
        height: 20px;
        font-size: 13px;
        line-height: 20px;
      }
    }
  `;
  document.head.appendChild(style);

  let panel = null;
  let panelAnswer = null;
  let hiddenByToggle = false;

  function ensurePanel() {
    if (panel) return panel;
    panel = document.createElement('div');
    panel.id = 'wg-hint-panel';
    panel.setAttribute('role', 'status');
    panel.setAttribute('aria-live', 'polite');

    const label = document.createElement('span');
    label.className = 'wg-label';
    label.textContent = 'Đáp án';

    panelAnswer = document.createElement('span');
    panelAnswer.className = 'wg-answer';
    panelAnswer.textContent = '';

    const close = document.createElement('button');
    close.className = 'wg-close';
    close.type = 'button';
    close.title = 'Ẩn gợi ý (nhấn đúp để hiện lại)';
    close.setAttribute('aria-label', 'Ẩn gợi ý');
    close.textContent = '×';
    close.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      setHidden(true);
    });

    panel.appendChild(label);
    panel.appendChild(panelAnswer);
    panel.appendChild(close);
    document.body.appendChild(panel);
    return panel;
  }

  function setHidden(value) {
    hiddenByToggle = !!value;
    document.documentElement.classList.toggle('wg-hint-hidden', hiddenByToggle);
    if (!hiddenByToggle) schedule();
  }

  function toggleHints() {
    setHidden(!hiddenByToggle);
  }

  function getQid(input) {
    const testid = input.getAttribute('data-testid') || '';
    const m = testid.match(/^fib-text-input-(.+)$/);
    return m ? m[1] : '';
  }

  function getPrompt(input) {
    const segments = input.closest('[data-testid="fib-segments"]');
    if (!segments) return '';
    const parts = [];
    segments.querySelectorAll('.text-renderer').forEach((el) => {
      if (el.closest('[data-testid^="fib-text-blank-"]')) return;
      const text = el.textContent || '';
      if (text.trim()) parts.push(text);
    });
    if (parts.length) return normalize(parts.join(' '));
    return normalize(segments.textContent || '');
  }

  function isVisible(el) {
    if (!el || !el.getClientRects().length) return false;
    const style = window.getComputedStyle(el);
    return style.visibility !== 'hidden' && style.display !== 'none';
  }

  function refresh() {
    if (!document.body) return;
    const inputs = Array.from(document.querySelectorAll('input[data-testid^="fib-text-input-"]'));
    const visible = inputs.filter(isVisible);
    if (!visible.length) {
      const p = ensurePanel();
      p.style.display = 'none';
      return;
    }

    let chosen = null;
    const answers = [];
    visible.forEach((input) => {
      const qid = getQid(input);
      const prompt = getPrompt(input);
      const answer = ANSWER_BY_QID[qid] || ANSWER_BY_PROMPT[prompt] || '';
      if (!answer) return;
      answers.push(answer);
      if (!chosen) chosen = { qid, prompt, answer };
    });

    if (!chosen) {
      const p = ensurePanel();
      p.style.display = 'none';
      return;
    }

    const p = ensurePanel();
    p.style.display = hiddenByToggle ? 'none' : '';
    panelAnswer.textContent = answers.join(' · ');
    p.title = chosen.prompt || '';
  }

  let scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    setTimeout(() => {
      scheduled = false;
      refresh();
    }, 120);
  }

  const isRelevant = (m) => {
    const target = m.target && m.target.nodeType === 1 ? m.target : m.target && m.target.parentElement;
    if (target && target.closest && target.closest('[data-testid="read-aloud-container"], [data-testid="fib-segments"], [data-testid^="fib-text-blank-"], main')) return true;
    if (m.type === 'childList') {
      for (const node of m.addedNodes) {
        if (node.nodeType !== 1) continue;
        if (node.matches && node.matches('input[data-testid^="fib-text-input-"], [data-testid="fib-segments"], [data-testid="read-aloud-container"]')) return true;
        if (node.querySelector && node.querySelector('input[data-testid^="fib-text-input-"], [data-testid="fib-segments"], [data-testid="read-aloud-container"]')) return true;
      }
    }
    return false;
  };

  const obs = new MutationObserver((mutations) => {
    if (mutations.some(isRelevant)) schedule();
  });

  function start() {
    if (!document.body) {
      setTimeout(start, 200);
      return;
    }
    obs.observe(document.body, { childList: true, subtree: true, characterData: true });
    refresh();
    setInterval(refresh, 1500);
    window.addEventListener('popstate', schedule);
    window.addEventListener('hashchange', schedule);
    console.log('[wayground-hint global10unit3] loaded: ' + Object.keys(ANSWER_BY_QID).length + ' answers');
  }

  let lastTouchAt = 0;
  let lastTouchToggleAt = 0;

  function isEditableTarget(target) {
    return !!(target && target.closest && target.closest('input, textarea, select, [contenteditable="true"]'));
  }

  document.addEventListener('dblclick', (e) => {
    if (Date.now() - lastTouchToggleAt < 600) return;
    if (isEditableTarget(e.target)) return;
    toggleHints();
  }, true);

  document.addEventListener('touchend', (e) => {
    if (isEditableTarget(e.target)) return;
    const now = Date.now();
    if (now - lastTouchAt < 350) {
      lastTouchAt = 0;
      lastTouchToggleAt = Date.now();
      toggleHints();
    } else {
      lastTouchAt = now;
    }
  }, { capture: true, passive: true });

  document.addEventListener('keydown', (e) => {
    if (e.altKey && (e.key === 'h' || e.key === 'H')) toggleHints();
  });

  start();
})();
