import React, { useState } from "react";

const Part = (props) => {
  const { name, exercises } = props;
  return (
    <div>
      {name} {exercises}{" "}
    </div>
  );
};

const Content = (props) => {
  console.log("props part", props.part);
  const partsList = props.part.parts.map((item) => {
    return <Part key={item.id} name={item.name} exercises={item.exercises} />;
  });

  const noParts = !Array.isArray(partsList) || !partsList.length;

  return (
    <div>
      {noParts && <p>This course doesn't have any parts yet.</p>}
      {!noParts && partsList}
    </div>
  );
};

const Total = (props) => {
  const total = props.part.parts.reduce((t1, t2) => t1 + t2.exercises, 0);

  return (
    <div>
      <strong>Total of {total} exercises</strong>
    </div>
  );
};

const Header = (props) => {
  return (
    <div>
      <h3>{props.courses.name}</h3>
    </div>
  );
};

const Course = ({ course }) => {
  console.log("course children", course);
  return (
    <div>
      <Header courses={course} />
      <Content part={course} />
      <Total part={course} />
    </div>
  );
};
export default Course;
