import { createInterface } from 'readline';
import { data } from './data/data'

// Create readline interface
const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

//! ---------- FUNCTIONS DEFINITION ----------
function checkDaysLeftInYear(): void {
  // Get today's date
  const today: Date = new Date();
  
  // Get the current year
  const currentYear: number = today.getFullYear();

  // Check if it's a leap year (366 days) or a common year (365 days)
  const isLeapYear: boolean = (currentYear % 4 === 0 && currentYear % 100 !== 0) || (currentYear % 400 === 0);
  const totalDays: number = isLeapYear ? 366 : 365;

  // Calculate the number of days that have passed
  const startOfYear: Date = new Date(currentYear, 0, 1); // January 1st of this year
  const daysPassed: number = Math.floor((today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  // Calculate the number of days left
  const daysLeft: number = totalDays - daysPassed;

  // Get the current date and time
  const currentDate: string = today.toLocaleDateString();
  const currentTime: string = today.toLocaleTimeString();

  // Output the results
  console.log(`Today is: ${currentDate} ${currentTime}`);
  console.log(`Total days in this year: ${totalDays}`);
  console.log(`Days passed: ${daysPassed}`);
  console.log(`Days left in this year: ${daysLeft}`);
}

// Function to check if a year is a leap year
function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Function to prompt for input and check leap year
function prompt(): void {
  rl.question('Enter a year to check if it is a leap year: ', (answer) => {
    const year: number = parseInt(answer);
    
    // Check if the input is a valid number
    if (isNaN(year)) {
      console.log('Please enter a valid year.');
    } else {
      // Output whether the year is a leap year
      if (isLeapYear(year)) {
        console.log(`${year} is a leap year.`);
      } else {
        console.log(`${year} is not a leap year.`);
      }
    }
    
    // Repeat the prompt
    prompt();
  });
}

//! ---------- FUNCTION EXECUTION ----------
// Display external file data
console.log(data);

// Execute once
checkDaysLeftInYear()

// Start the input loop (Recursive)
prompt();