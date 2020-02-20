var ctx = document.getElementById('myChart');

var labels = [];
var data = [];

axios.get('/weather', {
    params: {
      user: 'application'
    }
  })
  .then(function (response) {
    console.log(response)
    response.data.temperature.forEach(element => {
        labels.push(element.Date);
        data.push(element.Temp);
    });
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'teplota °C',
            data: data,
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
})

});