import React from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

class CoursesPage extends React.Component {
    render() {
        return(
            <>
                <h2>Courses</h2>
                {this.props.courses.map(course => (
                    <div key={course.title}>{course.title}</div>
                ))}
            </>
        );
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
    // createCourse: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    //debugger;
    return {
        courses: state.courses
    };
}

// When declared as an object, each property is automatically bound to dispatch
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
};

// Connect returns a function. That function then calls our component
// Connect automatically passes dispatch in if we omit mapDispatchToProps here
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);