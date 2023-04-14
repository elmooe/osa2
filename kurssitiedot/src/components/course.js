const Course = ({ courses }) => {
    return (
      <div>
        {courses.map(course =>
          <div key={course.id}>
            <h3>{course.name}</h3>
            <ul>
              {course.parts.map(part =>
                <Part key={part.id} part={part} />
              )}
            </ul>
            <Total courses={course} />
          </div>
        )}
      </div>
    )
  }

  const Part = ({ part }) => {
    return (
      <ul key={part.id}>
        {part.name} {part.exercises}
      </ul>
    )
  }

  const Total = ({ courses }) => {
    var totalAmount = courses.parts.reduce((sum, part) =>
      sum + part.exercises, 0)
    return <h4>Total of {totalAmount} exercises</h4>
  }

  export default Course