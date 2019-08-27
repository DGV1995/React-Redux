import React from 'react';
import { connect } from 'react-redux';
//import * as courseActions from '../../redux/actions/courseActions';
//import * as authorActions from '../../redux/actions/authorActions';
import { loadCourses } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList';
import { Redirect } from 'react-router-dom';

class CoursesPage extends React.Component {
    state = {
        redirectToAddCoursePage: false
    };

    /*
        If you need to interact with the navigator, made your work in componentDidMount() or in the other lifecycle methods.
        Keeping render() pure makes the components easier to consider
    */
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
        // If the left side of the statement is true, the right one will be executed
        return(
            <>  
                {this.state.redirectToAddCoursePage && <Redirect to='/course/'/>}
                <h2>Courses</h2>
                <button 
                    style={{marginBottom: 20}} 
                    className='btn btn-primary add-course' 
                    onClick={() => this.setState({redirectToAddCoursePage: true})}
                >
                    Add Course
                </button>
                <CourseList courses={this.props.courses}/>
            </>
        );
    }
}

// PropTypes is used to verify the properties types of a component
CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
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
const mapDispatchToProps = {
    actions: {
        loadCourses,
        loadAuthors
    }
    /*
    return {
        /*actions: {
            loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
        }
    };*/
};

// Connect returns a function. That function then calls our component
// Connect automatically passes dispatch in if we omit mapDispatchToProps here
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);