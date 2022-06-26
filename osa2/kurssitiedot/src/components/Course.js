const Course = ({ courses }) => {
    return (
        <div>
            <h1>Web development curriculum</h1>
            {/* mapataan propsina saatu courses taulukko */}
            {courses.map(course =>
                <div key={course.id}>
                    <Header name={course.name} />    {/* välitetään kurssin nimi propsina */}
                    <Content parts={course.parts} /> {/* välitetään taulukko parts propsina */}
                    <Total parts={course.parts} />   {/* välitetään taulukko parts propsina */}
                </div> 
            )}
        </div>
    )
}

const Header = ({name}) => {
    return (
        <>
            <h2>{name}</h2>
        </>
    );
};

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(course =>
                <Part key={course.id} content={course.name} exercise={course.exercises} />
            )}
        </>
    );
};

const Part = (props) => {
    return (
        <p>{props.content} {props.exercise}</p>
    );
}

const Total = ({ parts }) => {
    let total = parts.reduce((sum, exercises) => sum + exercises.exercises, 0) /* lasketaan summa reducella */
    return (
        <>
            <p><b>Total of exercises {total} </b></p>
        </>
    );
};

export default Course