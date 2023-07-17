// script.jsファイルの内容
const holidays = {
  '01-01': '元日',
  '01-15': '成人の日',
  '02-11': '建国記念日',
  '03-21': '春分の日',
  '04-29': '昭和の日',
  '05-03': '憲法記念日',
  '05-04': 'みどりの日',
  '05-05': 'こどもの日',
  '07-17': '海の日',
  '08-11': '山の日',
  '09-18': '敬老の日',
  '09-23': '秋分の日',
  '10-09': '体育の日',
  '11-03': '文化の日',
  '11-23': '勤労感謝の日',
  '12-23': '天皇誕生日',
};

function createCalendar(year, month) {
  const calendarBody = document.getElementById('calendar-body');
  calendarBody.innerHTML = ''; // カレンダーボディをクリア

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const firstDay = new Date(year, month, 1); // 月の最初の日の情報を取得
  const lastDay = new Date(year, month + 1, 0); // 月の最後の日の情報を取得

  const prevMonthLastDay = new Date(year, month, 0); // 前月の最後の日の情報を取得

  const startingDay = firstDay.getDay(); // 月の最初の日の曜日を取得
  const endingDay = lastDay.getDay(); // 月の最後の日の曜日を取得

  const totalDays = lastDay.getDate(); // 月の日数を取得

  const calendarRows = Math.ceil((totalDays + startingDay) / 7); // カレンダーの行数を計算

  let date = 1;
  for (let i = 0; i < calendarRows; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < startingDay) {
        // 先月の日付を表示
        const cell = createCalendarCell(
          prevMonthLastDay.getDate() - startingDay + j + 1,
          'prev-month'
        );
        row.appendChild(cell);
      } else if (date > totalDays) {
        // 来月の日付を表示
        const cell = createCalendarCell(date - totalDays, 'next-month');
        row.appendChild(cell);
        date++;
      } else {
        // 当月の日付を表示
        const cell = createCalendarCell(
          date,
          year === currentYear &&
            month === currentMonth &&
            date === currentDate.getDate()
            ? 'current-date'
            : 'current-month'
        );

        const holidayKey =
          ('0' + (month + 1)).slice(-2) + '-' + ('0' + date).slice(-2);
        if (holidays[holidayKey]) {
          const holidayText = document.createElement('div');
          holidayText.className = 'holiday-text';
          holidayText.textContent = holidays[holidayKey];
          cell.appendChild(holidayText);
        }

        row.appendChild(cell);
        date++;
      }
    }
    calendarBody.appendChild(row);
  }
}

function createCalendarCell(date, className) {
  const cell = document.createElement('td');
  cell.textContent = date;
  cell.className = className;
  return cell;
}

function initializeCalendar() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const yearSpan = document.getElementById('year');
  const monthSpan = document.getElementById('month');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  yearSpan.textContent = currentYear;
  monthSpan.textContent = currentMonth + 1;

  createCalendar(currentYear, currentMonth);

  prevBtn.addEventListener('click', function () {
    const year = parseInt(yearSpan.textContent);
    const month = parseInt(monthSpan.textContent) - 1;
    if (month === 0) {
      yearSpan.textContent = year - 1;
      monthSpan.textContent = 12;
    } else {
      monthSpan.textContent = month;
    }
    createCalendar(parseInt(yearSpan.textContent), parseInt(monthSpan.textContent) - 1);
  });

  nextBtn.addEventListener('click', function () {
    const year = parseInt(yearSpan.textContent);
    const month = parseInt(monthSpan.textContent) - 1;
    if (month === 11) {
      yearSpan.textContent = year + 1;
      monthSpan.textContent = 1;
    } else {
      monthSpan.textContent = month + 2;
    }
    createCalendar(parseInt(yearSpan.textContent), parseInt(monthSpan.textContent) - 1);
  });
}

initializeCalendar();
