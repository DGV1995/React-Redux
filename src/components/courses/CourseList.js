import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CourseList = ({courses}) => ( // courses = props (inline definition)
    <table className='table table-bordered table-striped'>
        <thead className='thead-inverse'>
            <tr>
                <th>Title</th>
                <th>Slug</th>
                <th>Author</th>
                <th>Category</th>
            </tr>
        </thead>
        <tbody>
            {courses.map(course => (
                <tr key={course.id}>
                    <td><a className='btn btn-primary btn-xs' href={'http://pluralsight.com/courses/' + course.slug}>Watch</a></td>
                    <Link to={'/course/' + course.slug}>{course.title}</Link>
                    <td>{course.authorName}</td>
                    <td>{course.category}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

CourseList.propTypes = {
    courses: PropTypes.array.isRequired
};

export default CourseList;