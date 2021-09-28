const Total = ({ parts }) => {
  const exercisesSum = parts.reduce((prev, cur) => prev + cur.exercises, 0);
  return (
    <p>
      <b>total of {exercisesSum} exercises</b>
    </p>
  );
};

export default Total;
