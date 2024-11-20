/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.mycompany.emplopyeeseries;
import com.mycompany.emplopyeeseries.version1.HourlyEmployee;
/**
 *
 * @author User
 */
public class EmplopyeeSeries {
    public static void main(String[] args) {
        HourlyEmployee h1 = new HourlyEmployee(30 , 120,"Clarke", 2310);
        
        h1.computeSalary();
        h1.displayHourlyEmployee();
}
}
