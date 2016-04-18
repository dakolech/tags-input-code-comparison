import './shared-libs';

Array.prototype.renderFlat = function() {
  return this.reduce((prev, curr) => prev + curr, '');
};

import './css/main.scss';

import './get-code/index.ts';
