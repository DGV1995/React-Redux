import React from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from '../../../../../../Users/diego.garcia-viana/AppData/Local/Microsoft/TypeScript/3.5/node_modules/redux';

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
        this.props.actions.createCourse(this.state.course);
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
};

function mapStateToProps(state) {
    return {
        courses: state.courses
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

// Connect returns a function. That function then calls our component
// Connect automatically passes dispatch in if we omit mapDispatchToProps here
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);