var ctx = document.getElementById('myChart');

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['2020-02-20 8:00:00', '2020-02-20 9:00:00', '2020-02-20 10:00:00', '2020-02-20 11:00:00', '2020-02-20 12:00:00', '2020-02-20 13:00:00'],
        datasets: [{
            label: 'teplota °C',
            data: [6.9, 6.9, 7.3, 8.5, 9, 11.2],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});