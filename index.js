// Your code here
function createEmployeeRecord(array) {
  let employeeObject = {
    firstName: `${array[0]}`,
    familyName: `${array[1]}`,
    title: `${array[2]}`,
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  };
  return employeeObject;
}

function createEmployeeRecords(arrays) {
  let employeeRecords =  [];
  arrays.forEach(array => employeeRecords.push(createEmployeeRecord(array)));
  return employeeRecords
}

function createTimeInEvent(employeeRecord, dateStamp){
  const event = dateStamp.split(' ');
  
  let employeeTime = {
    type: "TimeIn",
    hour: parseInt(event[1]),
    date:  `${event[0]}`,
  };

  employeeRecord.timeInEvents.push(employeeTime);
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp){
  const event = dateStamp.split(' ');
  
  let employeeTime = {
    type: "TimeOut",
    hour: parseInt(event[1]),
    date:  `${event[0]}`,
  };

  employeeRecord.timeOutEvents.push(employeeTime);
  return employeeRecord;
}

function hoursWorkedOnDate(record, date2){
  let timeInArray = record.timeInEvents;
  let timeOutArray = record.timeOutEvents;

  let timeInDate = timeInArray.find(({date}) => date === `${date2}`);
  let timeIn = timeInDate.hour;
  
  let timeOutDate = timeOutArray.find(({date}) => date === `${date2}`);
  let timeOut = timeOutDate.hour;

  let totalHours = (timeOut - timeIn)/100;

  return totalHours;

}

function wagesEarnedOnDate(record, date2){
  let hours = (hoursWorkedOnDate(record, date2));
  let pay = record.payPerHour;
  
  return hours * pay;
}

function allWagesFor(record){
  let payPerDay = [];
  record.timeInEvents.forEach(punch => {
    payPerDay.push(wagesEarnedOnDate(record, punch.date));
  });
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  return payPerDay.reduce(reducer);
}

function calculatePayroll(record){
  let total = 0
  record.forEach(employee => {
    (total += allWagesFor(employee))
  });
  return total;
};
