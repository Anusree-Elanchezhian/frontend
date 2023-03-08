import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'
import { BsFillPlusCircleFill } from "react-icons/bs";

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then( res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        });
    }
    viewEmployee(id){
        this.props.history.push(`/view/${id}`);
    }
    editEmployee(id){
        this.props.history.push(`/edit/${id}`);
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data});
        });
    }

    addEmployee(){
        this.props.history.push('/add/_add');
    }

    render() {
        return (
            <div className='listbody'>
                <div className="h1">
                <h1>ABSENTEE DETAIL</h1>
                </div>
                 <br></br>
                 <div className = "card p-5 row cardshadow3">
                        <table className = "table table-bordered">

                            <thead>
                                <tr>
                                    <th className='text-center'> Name</th>
                                    <th className='text-center'> Department</th>
                                    <th className='text-center'> Year</th>
                                    <th className='text-center'> Phone no</th>
                                    <th className='text-center'> Methods</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.employees.map(
                                        employee => 
                                        <tr key = {employee.id}>
                                             <td> {employee.name} </td>   
                                             <td> {employee.gender}</td>
                                             <td> {employee.age}</td>
                                             <td> {employee.emailId}</td>
                                             <td className='text-center'>
                                                 <button onClick={ () => this.viewEmployee(employee.id)} className="btn-hover color-1">View</button>
                                                 <button onClick={ () => this.editEmployee(employee.id)} className="ml-2 btn-hover color-7">Edit</button>
                                                 <button onClick={ () => this.deleteEmployee(employee.id)} className="ml-2 btn-hover  color-11">Delete </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                 </div>
                 <br></br>
                 <div className = "row">
                    <button className=" btn btn-secondary offset-md-5 pt-3 pb-3 " onClick={this.addEmployee}> Add Absentees <BsFillPlusCircleFill/> </button>
                 </div>

            </div>
        )
    }
}

export default ListEmployeeComponent