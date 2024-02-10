import React from 'react';

const Axes = React.forwardRef((props, ref) => {
  return (
    <div className="chartAxes" ref={ref} />
  );
});

export default Axes;
