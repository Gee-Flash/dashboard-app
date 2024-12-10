import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController
);

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBook, faUsers, faAngleRight, faHouse } from "@fortawesome/free-solid-svg-icons";
import "react-calendar/dist/Calendar.css";
import Image from "next/image";
import dynamic from 'next/dynamic';
import Link from "next/link";
import { Bar } from 'react-chartjs-2';

const Calendar = dynamic(() => import('react-calendar'), {
  ssr: false
});

const Dashboard = () => {
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isLoaded, setIsLoaded] = useState(false);
  const [traineeCount, setTraineeCount] = useState(0);
  const [skillsCount, setSkillsCount] = useState(0);
  const [batchesCount, setBatchesCount] = useState(0);

  // Chart Data
  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [{
      label: "Admissions",
      data: [10, 20, 15, 25, 30, 35],
      backgroundColor: [
        "rgba(75, 192, 192, 0.2)",
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(75, 192, 192, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Monthly Admissions Overview" },
    },
    scales: {
      y: { beginAtZero: true, max: 50, ticks: { stepSize: 10 } }
    }
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const animateCounter = (setFunc, targetValue) => {
    let current = 0;
    const step = Math.ceil(targetValue / 50);
    const interval = setInterval(() => {
      current += step;
      if (current >= targetValue) {
        setFunc(targetValue);
        clearInterval(interval);
      } else {
        setFunc(current);
      }
    }, 20);
  };

  useEffect(() => {
    animateCounter(setTraineeCount, 250);
    animateCounter(setSkillsCount, 4);
    animateCounter(setBatchesCount, 3);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const menuItems = [
    { text: "Dashboard", icon: "fas fa-tachometer-alt", link: "#dashboard" },
    {
      text: "Skills & Courses",
      icon: "fas fa-briefcase",
      hasDropdown: true,
      dropdownItems: [
        { text: "Add New", link: "#add-new" },
        { text: "View All", link: "#view-all" },
      ],
    },
    {
      text: "Batches",
      icon: "fas fa-users",
      hasDropdown: true,
      dropdownItems: [
        { text: "Batch A", link: "#batch-a" },
        { text: "Batch B", link: "#batch-b" },
        { text: "Batch C", link: "#batch-c" },
      ],
    },
    { text: "Trainee's Profile", icon: "fas fa-user", link: "#trainee-profile" },
  ];

  const handleDropdownToggle = (item) => {
    setDropdownOpen(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  return (
    <>
      <div className={`sidebar ${isSidebarOpen ? "" : "closed"}`}>
        <div className="logo">HTA</div>

        <ul className="menu">
          {menuItems.map((item, index) => (
            <li key={index} className={`menu-item ${isSidebarOpen ? "" : "collapsed"}`}>
              {isSidebarOpen ? (
                // Expanded sidebar
                <>
                  <Link
                    href={item.link || "#"}
                    onClick={(e) => {
                      if (item.hasDropdown) {
                        e.preventDefault();
                        handleDropdownToggle(item.text.toLowerCase());
                      }
                    }}
                  >
                    <i className={item.icon}></i>
                    <span className="menu-text">{item.text}</span>
                    {item.hasDropdown && (
                      <i className={`fas fa-chevron-down dropdown-icon ${dropdownOpen[item.text.toLowerCase()] ? 'open' : ''
                        }`}></i>
                    )}
                  </Link>
                  {item.hasDropdown && (
                    <ul className={`dropdown-menu ${dropdownOpen[item.text.toLowerCase()] ? 'open' : ''}`}>
                      {item.dropdownItems.map((dropdownItem, i) => (
                        <li key={i}>
                          <Link href={dropdownItem.link || "#"}>{dropdownItem.text}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                // Collapsed sidebar
                <>
                  <Link href={item.link || "#"}>
                    <i className={item.icon}></i>
                  </Link>
                  {!item.hasDropdown ? (
                    <div className="collapsed-tooltip">
                      <span className="menu-text">{item.text}</span>
                    </div>
                  ) : (
                    <div className="collapsed-dropdown">
                      <span className="menu-text">{item.text}</span>
                      <ul className="dropdown-menu">
                        {item.dropdownItems.map((dropdownItem, i) => (
                          <li key={i}>
                            <Link href={dropdownItem.link || "#"}>{dropdownItem.text}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>

        <div className="invite-section">
          <Image src="/female.png" alt="Invite Friend" width={200} height={200} style={{ width: "200%", borderRadius: "8px" }} />
          <div className="invite-text">
            <h4>Invite Friend</h4>
            <button className="invite-button">Get the link</button>
          </div>
        </div>
      </div>

      <div className={`main-content ${isSidebarOpen ? "with-sidebar" : "with-sidebar collapsed"}`}>
        <div className="header">
          <div className="header-left">
            <button className="menu-toggle" onClick={toggleSidebar}>☰</button>
            <h1 className="title">Dashboard</h1>
          </div>
          <nav className="breadcrumb">
            <ul>
              <li>
                <FontAwesomeIcon icon={faHouse} className="breadcrumb-icon" />
                <Link href="/" className="breadcrumb-link">Home</Link>
              </li>
              <li>
                <FontAwesomeIcon icon={faAngleRight} className="breadcrumb-separator" />
              </li>
              <li className="active">Dashboard</li>
            </ul>
          </nav>
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>☰</button>
        </div>

        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <div className="logo">HTA</div>
            <ul className="menu">
              {menuItems.map((item, index) => (
                <li key={index} className="menu-item">
                  <Link
                    href={item.link || "#"}
                    onClick={(e) => {
                      if (item.hasDropdown) {
                        e.preventDefault();
                        handleDropdownToggle(item.text.toLowerCase());
                      }
                    }}
                  >
                    <i className={item.icon}></i>
                    <span className="menu-text">{item.text}</span>
                    {item.hasDropdown && (
                      <i className={`fas fa-chevron-down dropdown-icon`}></i>
                    )}
                  </Link>
                  {item.hasDropdown && dropdownOpen[item.text.toLowerCase()] && (
                    <ul className="dropdown-menu open">
                      {item.dropdownItems.map((dropdownItem, i) => (
                        <li key={i}>
                          <Link href={dropdownItem.link || "#"}>{dropdownItem.text}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <button className="close-menu" onClick={toggleMobileMenu}>Close</button>
          </div>
        )}

        <div className="dashboard">
          <div className="finance-summary">
            <div className="summary-item">
              <Link href="#">
                <h4>
                  <FontAwesomeIcon icon={faUser} className="fas" />
                  TRAINEES
                </h4>
              </Link>
              <div className="loader">{traineeCount}+</div>
            </div>

            <div className="summary-item">
              <Link href="#">
                <h4>
                  <FontAwesomeIcon icon={faBook} className="fas" />
                  SKILLS/COURSES
                </h4>
              </Link>
              <div className="loader">{skillsCount}</div>
            </div>

            <div className="summary-item">
              <Link href="#">
                <h4>
                  <FontAwesomeIcon icon={faUsers} className="fas" />
                  BATCHES
                </h4>
              </Link>
              <div className="loader">{batchesCount}</div>
            </div>
          </div>

          <div className="chart-calendar-container">
            <div className="revenue-chart">
              <h4>ADMISSION OVERVIEW</h4>
              <div style={{ position: "relative", height: "300px" }}>
                <Bar data={chartData} options={chartOptions} />
              </div>
            </div>
            <div className="calendar">
              <h4>Calendar</h4>
              <Calendar
                onChange={handleDateChange}
                value={date}
              />
            </div>
          </div>

          <div className="courses-section">
            <h2 className="courses-title">All Courses</h2>
            <div className="courses-container">
              <div className="course-card">
                <Image src="/Software.jpg" alt="Course 1" width={200} height={200} />
                <h4>Software Engineering Course</h4>
                <p className="date">September 24</p>
                <p className="duration">Duration: 6 Months</p>
                <p className="professor">Instructor: Abimbola Johnson</p>
                <p className="students">🎓 Students: 200+</p>
                <button className="read-more">READ MORE</button>
              </div>
              <div className="course-card">
                <Image src="/data.jpg" alt="Course 2" width={200} height={200} />
                <h4>Data Analytics Course</h4>
                <p className="date">September 24</p>
                <p className="duration">Duration: 6 Months</p>
                <p className="professor">Instructor: Moses</p>
                <p className="students">🎓 Students: 200+</p>
                <button className="read-more">READ MORE</button>
              </div>
              <div className="course-card">
                <Image src="/Digital.jpg" alt="Course 3" width={200} height={200} />
                <h4>Digital Marketing Course</h4>
                <p className="date">September 24</p>
                <p className="duration">Duration: 6 Months</p>
                <p className="professor">Instructor: Samson Adeboga</p>
                <p className="students">🎓 Students: 200+</p>
                <button className="read-more">READ MORE</button>
              </div>
              <div className="course-card">
                <Image src="/photo.jpg" alt="Course 4" width={200} height={200} />
                <h4>Photography Course</h4>
                <p className="date">September 24</p>
                <p className="duration">Duration: 6 Months</p>
                <p className="professor">Instructor: Jane Doe</p>
                <p className="students">🎓 Students: 200+</p>
                <button className="read-more">READ MORE</button>
              </div>
            </div>
          </div>

          <div className="container">
            <h3>New Trainee List</h3>
            {isLoaded ? (
              <table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Assigned Instructor</th>
                    <th>Date Of Admit</th>
                    <th>Course</th>
                    <th>Batch</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Jimoh Waris</td>
                    <td>Abimbola Johnson</td>
                    <td>01/09/2024</td>
                    <td>Software Engineering</td>
                    <td>Batch A</td>
                    <td>
                      <button className="btn1">Edit</button>
                      <button className="btn2">Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jimoh Waris</td>
                    <td>Abimbola Johnson</td>
                    <td>01/09/2024</td>
                    <td>Software Engineering</td>
                    <td>Batch A</td>
                    <td>
                      <button className="btn1">Edit</button>
                      <button className="btn2">Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Jimoh Waris</td>
                    <td>Abimbola Johnson</td>
                    <td>01/09/2024</td>
                    <td>Software Engineering</td>
                    <td>Batch A</td>
                    <td>
                      <button className="btn1">Edit</button>
                      <button className="btn2">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
