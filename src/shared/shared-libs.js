import 'bootstrap/dist/css/bootstrap.css';
import './css/styles.scss';

Array.zip = function(left, right, combinerFunction) {
  let counter;
  const results = [];

  for (counter = 0; counter < Math.min(left.length, right.length); counter++) {
    results.push(combinerFunction(left[counter], right[counter]));
  }

  return results;
};
