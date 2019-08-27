import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadCourses, saveCourse } from '../../redux/actions/courseActions';
import{ loadAuthors } from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';
import { newCourse } from '../../tools/mockData';

const ManageCoursePage = ({ courses, authors, loadAuthors, loadCourses, saveCourse, history, ...props }) => { // Assign any props I haven't destructured on the left to a variable called props
    const [course, setCourse] = useState({...props.course});
    const [errors, setErrors] = useState({});

    useEffect( () => {
        if (courses.length === 0) {
            loadCourses().catch(error => { 
                alert('Loading courses failed!' + error);
            });
        } else {
            setCourse({...props.course});
        }
        if (authors.length === 0) {
            loadAuthors().catch(error => {
                alert('Loading authors failed!' + error);
            });
        }
    }, [props.course]); 

    function handleChange(event) {
        const {name, value} = event.target;
        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: name === 'authorId' ? parseInt(value, 10) : value
        }));
    }

    function handleSave(event) {
        event.preventDefault();
        saveCourse(course).then(() => {
            history.push('/courses');
        });
    }

    return(
        <CourseForm 
            course={course} 
            authors={authors} 
            errors={errors} 
            onChange={handleChange} 
            onSave={handleSave}
        />
    );
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    saveCourse: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

function getCourseBySlug(courses, slug) {
    return courses.find(course => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) { // ownProps lets us access the component's props. We ca use this to read the URL data injected on props by React Router
    const slug = ownProps.match.params.slug; // this param in in App.js --> <Route/>
    const course = slug && state.courses.length > 0 ? getCourseBySlug(state.courses, slug) : newCourse;
    return {
        course,
        courses: state.courses,
        authors: state.authors
    };
}

// When declared as an object, each property is automatically bound to dispatch
const mapDispatchToProps = {
    loadCourses, // Defined in the imports (at the top)
    saveCourse,
    loadAuthors
};

// Connect returns a function. That function then calls our component
// Connect automatically passes dispatch in if we omit mapDispatchToProps here
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);