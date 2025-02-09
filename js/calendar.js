// 現在の表示中の年と月を管理する変数
let currentYear, currentMonth;

/**
 * 日付キーを作成するヘルパー関数
 * 例: 2025年2月9日 → "2025-02-09"
 */
function getDateKey(year, month, day) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

/**
 * 指定した年・月のカレンダーを生成する関数
 * @param {number} year - 対象の年
 * @param {number} month - 対象の月（0～11。0が1月、11が12月）
 */
function generateCalendar(year, month) {
    // 年・月の表示更新
    const yearElement = document.querySelector('.year');
    const monthElement = document.querySelector('.month');
    yearElement.textContent = year;
    monthElement.textContent = (month + 1) + '月';

    // 曜日ヘッダーの生成（<thead class="week">）
    const weekElement = document.querySelector('.week');
    weekElement.innerHTML = '';
    const weekRow = document.createElement('tr');
    const weekDays = ["日", "月", "火", "水", "木", "金", "土"];
    weekDays.forEach((day, index) => {
        const th = document.createElement('th');
        th.textContent = day;
        // ヘッダーも色分け（0:日→ドット色同様に、6:土→ドット色同様）
        if (index === 0) {
            th.style.color = '#ff838b';
        } else if (index === 6) {
            th.style.color = '#70b6ff';
        }
        weekRow.appendChild(th);
    });
    weekElement.appendChild(weekRow);

    // 日付部分の生成（<tbody class="days">）
    const daysElement = document.querySelector('.days');
    daysElement.innerHTML = '';

    // 対象月の初日の曜日と月の日数を取得
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let date = 1;
    // 日付を週単位に (<tr>) 生成
    while (date <= daysInMonth) {
        const tr = document.createElement('tr');
        for (let i = 0; i < 7; i++) {
            const td = document.createElement('td');
            // 初回行で、1日より前のセルは空白
            if (date === 1 && i < firstDay) {
                td.textContent = '';
            } else if (date > daysInMonth) {
                td.textContent = '';
            } else {
                // 表示する日付
                const currentDay = date;
                td.textContent = currentDay;
                // ドットを追加する処理
                // まず localStorage から finish 記録オブジェクトを取得
                const finishRecords = JSON.parse(localStorage.getItem("finishRecords") || "{}");
                const dateKey = getDateKey(year, month, currentDay);
                if (finishRecords[dateKey]) {
                    // 同一日の各ページごとの記録件数
                    const count = Object.keys(finishRecords[dateKey]).length;
                    let dotColor = "";
                    if (count === 1) {
                        dotColor = "#82E985";
                    } else if (count === 2) {
                        dotColor = "#30A133";
                    } else if (count >= 3) {
                        dotColor = "#084C0A";
                    }
                    // ドット要素を作成（例：小さな円形の span）
                    const dot = document.createElement("span");
                    dot.style.position = "absolute";
                    dot.style.top = "50%";
                    dot.style.left = "50%";
                    dot.style.transform = "translate(-50%, -20%)";
                    dot.style.display = "block";
                    dot.style.width = "18px";
                    dot.style.height = "18px";
                    dot.style.backgroundColor = dotColor;
                    dot.style.borderRadius = "50%";
                    td.appendChild(dot);
                }
                date++;
            }
            // 日（列0）は赤、土（列6）は青にする（数字自体の色設定）
            if (i === 0) {
                td.style.color = '#ff838b';
            } else if (i === 6) {
                td.style.color = '#70b6ff';
            }
            tr.appendChild(td);
        }
        daysElement.appendChild(tr);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // 初期表示は現在の年月を使用
    const now = new Date();
    currentYear = now.getFullYear();
    currentMonth = now.getMonth(); // 0～11
    generateCalendar(currentYear, currentMonth);

    // 前月・次月ボタンのイベント設定
    document.getElementById('prev-month').addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendar(currentYear, currentMonth);
    });
    document.getElementById('next-month').addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentYear, currentMonth);
    });
});
