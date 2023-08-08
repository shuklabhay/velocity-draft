import dayjs from "dayjs";

function scheduleInputsOnCalender(
  userWritingSpeed,
  selectedColleges,
  startDate,
  checkingLength,
  revisionAmt
) {
  const dayConversion = 24 * 60 * 60 * 1000;
  const daysToFinishOne = userWritingSpeed + revisionAmt;
  var calenderOutput = [];
  dayjs().format();

  selectedColleges.forEach((element) => {
    let essayCount = element.essays;
    let listOfEssays = Array.from(
      { length: essayCount },
      (x, i) => `Write and Revise ${element.college} Essay #${i + 1}`
    );
    let timeToFinishAll = dayjs(
      element.deadline - checkingLength * dayConversion
    ).diff(dayjs(startDate), "days");
    let timeBetweenEssays = Math.trunc(timeToFinishAll / essayCount);

    if (timeBetweenEssays >= 1) {
      listOfEssays.map((essay, index) => {
        calenderOutput.push({
          title: essay,
          start: dayjs(
            dayjs(startDate).add(index * timeBetweenEssays, "day")
          ).toDate(),
          end: dayjs(
            dayjs(startDate).add(
              index * timeBetweenEssays + daysToFinishOne,
              "day"
            )
          ).toDate(),
        });
      });
    } else {
      // send popup saying you dont have enough time with the specifications you want, try lowering some stuff or like lock paramaters (SENDING POPUP IS EASIER LMAO)
    }
  });

  return calenderOutput;
}

export { scheduleInputsOnCalender };


// console.log(scheduleInputsOnCalender(1, [{ deadline: new Date("2023-11-01T23:59:00.000"), essays: 6, college: 'Princeton University EA' }], dayjs().date(30), 5, 5));