document.addEventListener('DOMContentLoaded', () => {
    let myChart;

    const btnPie = document.getElementById('btnPie');
    const btnBar = document.getElementById('btnBar');
    const legendContainer = document.getElementById('legend');
    const iconContainer = document.getElementById('icon-container');

    const chartConfig = {
        type: 'pie',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: []
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    };

    const fetchBenefitsData = async () => {
        try {
            const response = await fetch('data.json');
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo JSON.');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al cargar los datos:', error);
            return [];
        }
    };

    const updateChart = (data, chartType) => {
        const labels = data.map(item => item.beneficio);
        const amounts = data.map(item => item.cantidad);
        const colors = data.map(item => item.color);

        chartConfig.type = chartType;
        chartConfig.data.labels = labels;
        chartConfig.data.datasets[0].data = amounts;
        chartConfig.data.datasets[0].backgroundColor = colors;

        const ctx = document.getElementById('benefitsChart').getContext('2d');
        if (myChart) {
            myChart.destroy();
        }
        myChart = new Chart(ctx, chartConfig);
    };

    const renderLegend = (data) => {
        legendContainer.innerHTML = '';
        data.forEach(item => {
            const legendItem = document.createElement('div');
            legendItem.className = 'legend-item';
            legendItem.innerHTML = `
                <div class="legend-color" style="background-color: ${item.color};"></div>
                <span>${item.beneficio}</span>
            `;
            legendContainer.appendChild(legendItem);
        });
    };

    const renderIcons = (data) => {
        iconContainer.innerHTML = '';
        data.forEach(item => {
            const iconItem = document.createElement('div');
            iconItem.className = 'icon-item';
            iconItem.innerHTML = `<i class="${item.icon}" style="color: ${item.color};"></i>`;
            iconContainer.appendChild(iconItem);
        });
    };

    const handleButtonClick = async (chartType, button) => {
        const data = await fetchBenefitsData();
        if (data.length > 0) {
            updateChart(data, chartType);
            renderLegend(data);
            renderIcons(data);

            btnPie.classList.remove('active');
            btnBar.classList.remove('active');
            button.classList.add('active');
        }
    };

    btnPie.addEventListener('click', () => handleButtonClick('pie', btnPie));
    btnBar.addEventListener('click', () => handleButtonClick('bar', btnBar));

    // Carga inicial
    handleButtonClick('pie', btnPie);
});