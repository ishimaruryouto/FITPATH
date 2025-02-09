// 現在の表示中の年と月を管理する変数
let currentYear, currentMonth;
/**
 * 指定した年・月のカレンダーを生成する関数
 * @param {number} year - 対象の年
 * @param {number} month - 対象の月（0～11。0が1月、11が12月）
 */
function generateCalendar(year, month) {
    const yearElement = document.querySelector('.year');
    const monthElement = document.querySelector('.month');
    yearElement.textContent = year;
    monthElement.textContent = month + 1 + '月';
    const weekElement = document.querySelector('.week');
    weekElement.innerHTML = '';
    const weekRow = document.createElement('tr');
    const weekDays = ["日", "月", "火", "水", "木", "金", "土"];
    weekDays.forEach((day, index) => {
        const th = document.createElement('th');
        th.textContent = day;
        if (index === 0) {
            th.style.color = '#ff838b';
        } else if (index === 6) {
            th.style.color = '#70b6ff';
        }
        weekRow.appendChild(th);
    });
    weekElement.appendChild(weekRow);
    const daysElement = document.querySelector('.days');
    daysElement.innerHTML = '';
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let date = 1;
    while (date <= daysInMonth) {
        const tr = document.createElement('tr');
        for (let i = 0; i < 7; i++) {
            const td = document.createElement('td');
            if (date === 1 && i < firstDay) {
                td.textContent = '';
            } else if (date > daysInMonth) {
                td.textContent = '';
            } else {
                td.textContent = date;
                date++;
            }
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
    const now = new Date();
    currentYear = now.getFullYear();
    currentMonth = now.getMonth(); // 0～11
    generateCalendar(currentYear, currentMonth);
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