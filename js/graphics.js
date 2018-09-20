window.onload = function () {

    let dataPoints = [];

    let options = {
        animationEnabled: true,
        theme: "light",
        title: {
            text: "risklio example stockprice",
        },
        axisX: {
            title: "Date",
            titleFontSize: 20,
            includeZero: true,
            valueFormatString: "DD MMM YYYY"
        },
        axisY: {
            title: "Stock price",
            titleFontSize: 20,
            ValueFormatString: "##.##",
            includeZero: true,
        },
        toolTip: {
            shared: false,
        },
        data: [{
            type: "line",
            color: "#bc0f18",
            markerType: "circle",
            toolTipContent: "<span>{date}: {x}</span><br><span>{price}: {y}</span>",
            dataPoints: dataPoints,
        }]
    };

    function addData(data) {
        for (let i = 0; i < data.length; i++) {
            let oldDate = data[i].Date.split('/');
            let newDate = oldDate[2] + '/' + oldDate[1] + '/' + oldDate[0];
            dataPoints.push({
                x: new Date(Date.parse(newDate)),
                y: data[i].Stock_price,
                date: 'Date',
                price: 'Stock price'
            });
        }
        $("#chartContainer").CanvasJSChart(options);
    }

    $.getJSON("./json/risklio_example_stockprice.json", addData);

};