const date = new Date();

const renderCalender = () => {
  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();

  // 달력 상단에 년도와 달 표기
  document.querySelector('.calendar-view').textContent = `${viewYear}.${viewMonth + 1}`;

  // 지난달 마지막 날짜, 이번달 마지막 날짜 가져오기
  const prevLast = new Date(viewYear, viewMonth, 0);
  const thisLast = new Date(viewYear, viewMonth + 1, 0);

  const PLDate = prevLast.getDate();
  const PLDay = prevLast.getDay();

  const TLDate = thisLast.getDate();
  const TLDay = thisLast.getDay();

  const prevDates = [];
  const thisDates = [...Array(TLDate + 1).keys()].slice(1);
  const nextDates = [];

  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i);
    }
  }

  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i);
  }

  const dates = prevDates.concat(thisDates, nextDates);
  const calendarDates = document.querySelectorAll('.calendar-date');

  dates.forEach((dataValue, i) => {
    const td = calendarDates[i];

    if (td) {
      td.textContent = dataValue ? dataValue : '';

      if (prevDates.includes(dataValue)) {
        td.classList.add('prev'); // 지난달 날짜
      } else if (nextDates.includes(dataValue)) {
        td.classList.add('next'); // 다음달 날짜
      } else {
        td.classList.remove('prev', 'next'); // 현재달 날짜는 기본 스타일
      }
    }
  });
};

// 이전 달로 이동
const prevMonth = () => {
  date.setMonth(date.getMonth() - 1);
  renderCalender();
};

// 다음 달로 이동
const nextMonth = () => {
  date.setMonth(date.getMonth() + 1);
  renderCalender();
};

renderCalender();
