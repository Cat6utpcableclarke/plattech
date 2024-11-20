/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.emplopyeeseries.version1;

/**
 *
 * @author User
 */
public class HourlyEmployee {
    
    
    private float totalHoursWorked;
    private double ratePerHour;
    private String empName;
    private int empID;


    public HourlyEmployee() {
    }
    
     public HourlyEmployee(float totalHoursWorked, double ratePerHour, String empName, int empID) {
        this.totalHoursWorked = totalHoursWorked;
        this.ratePerHour = ratePerHour;
        this.empName = empName;
        this.empID = empID;
    }
     
     
    public float getTotalHoursWorked() {
        return totalHoursWorked;
    }

    public void setTotalHoursWorked(float totalHoursWorked) {
        this.totalHoursWorked = totalHoursWorked;
    }

    public double getRatePerHour() {
        return ratePerHour;
    }

    public void setRatePerHour(double ratePerHour) {
        this.ratePerHour = ratePerHour;
    }

    public String getEmpName() {
        return empName;
    }

    public void setEmpName(String empName) {
        this.empName = empName;
    }

    public int getEmpID() {
        return empID;
    }

    public void setEmpID(int empID) {
        this.empID = empID;
    }

   
    
    public double computeSalary(){
    
       double salary = (totalHoursWorked >40)?(totalHoursWorked * ratePerHour) +((totalHoursWorked * ratePerHour)/2) :totalHoursWorked * ratePerHour;
       

        return salary;
    };
    
    public void displayHourlyEmployee(){
    
        System.out.printf("Employee ID : %d\n",empID);
        System.out.printf("Employee Name : %s\n",empName);
        System.out.printf("Employee rate : %f\n",ratePerHour);
        System.out.printf("Employee hours : %f\n",totalHoursWorked);
        System.out.printf("Employee salary : %f\n",this.computeSalary());
    };
    
    
    
    @Override
    public String toString() {
        return "CommisionEmployee{" + "totalHoursWorked=" + totalHoursWorked + ", ratePerHour=" + ratePerHour + ", empName=" + empName + ", empID=" + empID + '}';
    }
}



//HourlyEmployee
//-totalHoursWorked:float
//-ratePerHour:double
//-empName:String
//-empID:int
//+computeSalary():double
// -> total hours worked * rate per hour
// -> overtime will be paid 150%
// -> when it is over 40 hours
//+displayHourlyEmployee():void
// -> Employee ID: xxx
//    Employee Name: xxx
//+toString():String
// -> similar with display
