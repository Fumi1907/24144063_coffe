// セブンカフェUI ステップ式画面制御
const steps = [
  {
    message: 'コーヒー／カフェラテ\n選択してください',
    options: [
      { label: 'コーヒー', value: 'coffee', style: 'main' },
      { label: 'カフェラテ', value: 'latte', style: 'main' }
    ]
  },
  {
    message: 'あたたかい／つめたい\n選択してください',
    options: [
      { label: 'あたたかい', value: 'hot', style: 'hot' },
      { label: 'つめたい', value: 'ice', style: 'ice' }
    ]
  },
  {
    message: '大きい／普通\n選択してください',
    options: [
      { label: '大きい', value: 'large', style: 'main' },
      { label: '普通', value: 'normal', style: 'main' }
    ]
  },
  // 濃さ選択はコーヒーのみ
  {
    message: '濃い、普通、薄い\n選択してください',
    options: [
      { label: '濃い', value: 'strong', style: 'main' },
      { label: '普通', value: 'normal', style: 'main' },
      { label: '薄い', value: 'light', style: 'main' }
    ]
  },
  {
    message: 'コーヒーを抽出しています\n少々お待ちください',
    options: []
  },
  {
    message: '美味しいコーヒーができました\nありがとうございました',
    options: []
  }
];

let currentStep = 0;
let selected = {};

function renderStep() {
  const area = document.getElementById('step-area');
  area.innerHTML = '';
  let stepIndex = currentStep;
  // カフェラテ選択時は濃さ選択をスキップ
  if (stepIndex === 3 && selected.type === 'latte') {
    stepIndex = 4;
    currentStep = 4;
  }
  const step = steps[stepIndex];
  // メッセージ
  let message = step.message;
  // カフェラテ選択時はメッセージの「コーヒー」を「カフェラテ」に置換
  if (selected.type === 'latte') {
    message = message.replace(/コーヒー/g, 'カフェラテ');
  }
  const msg = document.createElement('div');
  msg.className = 'seven-step-message';
  msg.innerText = message;
  area.appendChild(msg);
  // 選択肢
  if (step.options.length > 0) {
    const btns = document.createElement('div');
    btns.className = 'seven-step-buttons';
    step.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'seven-btn step-btn ' + (opt.style || 'main');
      btn.innerText = opt.label;
      btn.onclick = () => {
        btn.classList.add('animate');
        setTimeout(() => {
          btn.classList.remove('animate');
          // 選択内容を記録
          if(currentStep === 0) selected.type = opt.value;
          if(currentStep === 1) selected.temp = opt.value;
          if(currentStep === 2) selected.size = opt.value;
          if(currentStep === 3 && selected.type === 'coffee') selected.strength = opt.value;
          currentStep++;
          renderStep();
        }, 180);
      };
      btns.appendChild(btn);
    });
    area.appendChild(btns);
    // 戻るボタン（最初以外のステップで表示）
    if (currentStep > 0) {
      const backBtn = document.createElement('button');
      backBtn.className = 'seven-btn step-btn back-btn';
      backBtn.innerText = '戻る';
      backBtn.onclick = () => {
        currentStep--;
        renderStep();
      };
      area.appendChild(backBtn);
    }
  } else {
    // 抽出中や完了メッセージ
    if (currentStep === steps.length - 2) {
      setTimeout(() => {
        currentStep++;
        renderStep();
      }, 2000);
    } else if (currentStep === steps.length - 1) {
      // 最後の画面は3秒後に最初に戻る
      setTimeout(() => {
        currentStep = 0;
        renderStep();
      }, 3000);
    }
  }
}

document.addEventListener('DOMContentLoaded', renderStep);
