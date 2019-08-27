import React from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import PropTypes from 'prop-types';
//import { bindActionCreators } from 'redux';

class CoursesPage extends React.Component {
    state = {
        course: {
            title: ''
        }
    };

    // Change the current state everytime the title is changed
    handleChange = event => {
        const course = {...this.state.course, title: event.target.value};
        //this.setState({course: course});
        this.setState({course});
    };

    handleSubmit = event => {
        event.preventDefault();
        //debugger;
        this.props.actions.createCourse(this.state.course); // actions is defined in mapDispatchToProps
        //this.props.createCourse(this.state.course);
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <h2>Courses</h2>
                <h3>Add Course</h3>
                <input type='text' onChange={this.handleChange} value={this.state.course.title}/>
                <input type='submit' value='Save' className='btn btn-primary btn-xs'/>
                {this.props.courses.map(course => (
                    <div key={course.title}>{course.title}</div>
                ))}
            </form>
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
const mapDispatchToProps = {
    createCourse: courseActions.createCourse
};

// Connect returns a function. That function then calls our component
// Connect automatically passes dispatch in if we omit mapDispatchToProps here
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);