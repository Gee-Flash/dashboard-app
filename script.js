document.addEventListener('DOMContentLoaded', function() {
  var ctx = document.getElementById('revenueChart').getContext('2d');
  var revenueChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
              label: 'Applications',
              data: [12000, 19000, 3000, 5000, 2000, 30000, 45000],
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
});

function toggleDropdown(event) {
  event.preventDefault(); // Prevent the default anchor behavior
  const parent = event.target.closest('.dropdown');
  const dropdownMenu = parent.querySelector('.dropdown-menu');

  if (dropdownMenu.style.display === "block") {
      dropdownMenu.style.display = "none";
      parent.classList.remove("active");
  } else {
      dropdownMenu.style.display = "block";
      parent.classList.add("active");
  }
}

function toggleMenu() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('collapsed');
}

function toggleDropdown(event) {
  const dropdownMenu = event.currentTarget.nextElementSibling;
  dropdownMenu.classList.toggle('show');
}

// Ensure the dropdown menus are properly styled when shown
document.querySelectorAll('.dropdown-menu').forEach(menu => {
  menu.style.display = 'none';
});

document.querySelectorAll('.dropdown').forEach(item => {
  item.addEventListener('click', function() {
      const dropdownMenu = this.querySelector('.dropdown-menu');
      dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
  });
});

function toggleMenu() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('collapsed');

  // Close all dropdowns if sidebar is collapsed
  if (sidebar.classList.contains('collapsed')) {
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
          menu.style.display = 'none';
      });
  }
}

const ctx = document.getElementById('revenueChart').getContext('2d');
        const revenueChart = new Chart(ctx, {
            type: 'bar', // You can use 'line', 'pie', or other types
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // X-axis labels
                datasets: [{
                    label: 'Admissions',
                    data: [120, 150, 180, 100, 200, 170], // Data points
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)', // Colors for each bar
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(231, 74, 59, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(231, 74, 59, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Monthly Admission Overview'
                    }
                }
            }
        });
 
            // countdown 1
        document.addEventListener('DOMContentLoaded', function() {
            updateCountdown(); // Start the countdown immediately
           
            // Update the target date in the countdown function
            function updateCountdown() {
                // Set your target date here
                const targetDate = new Date('2024-12-31 00:00:00').getTime();
               
                function update() {
                    const currentDate = new Date().getTime();
                    const difference = targetDate - currentDate;
        
                    // Calculate time unit. days, hours, minute and seconds
                    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
                    // Update the display
                    document.getElementById('days').textContent = days.toString().padStart(2, '0');
                    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
                    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
                    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
                    // Check if countdown is finished
                    if (difference <= 0) {
                        clearInterval(timer);
                        document.getElementById('days').textContent = '00';
                        document.getElementById('hours').textContent = '00';
                        document.getElementById('minutes').textContent = '00';
                        document.getElementById('seconds').textContent = '00';
                    }
                }
        
                // Update immediately and then every second
                update();
                const timer = setInterval(update, 1000);
                }
                });