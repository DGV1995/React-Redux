import React from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList';

class CoursesPage extends React.Component {
    componentDidMount() {
        const { courses, authors, actions } = this.props;
        if (courses.length === 0) {
            actions.loadCourses().catch(error => {
                alert('Loading courses failed!' + error);
            });
        }
        if (authors.length === 0) {
            actions.loadAuthors().catch(error => {
                alert('Loading authors failed!' + error);
            });
        }
    }
    render() {
        return(
            <>
                <h2>Courses</h2>
                <CourseList courses={this.props.courses}/>
            </>
        );
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
    // createCourse: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    //debugger;
    return {
        courses: state.authors.length === 0 ? [] : state.courses.map(course => {
            return {
                ...course,
                authorName: state.authors.find(a => a.id === course.authorId).name // Extra property
            }
        }),
        authors: state.authors
    };
}

// When declared as an object, each property is automatically bound to dispatch
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
        }
    };
};

// Connect returns a function. That function then calls our component
// Connect automatically passes dispatch in if we omit mapDispatchToProps here
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);