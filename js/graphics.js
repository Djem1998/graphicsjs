window.onload = function () {

    let dataPoints = [];

    let options = {
        animationEnabled: true,
        theme: "light1",
        zoomEnabled: true,
        height: 490,
        zoomType: "xy",
        title: {
            text: "Risklio Stock Price",
        },
        axisX: {
            title: "Date",
            titleFontSize: 20,
            includeZero: true,
            valueFormatString: "DD MMM YYYY",
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
            toolTipContent: "<span style='text-align: center'>{title}</span><br><span>{date}: {x}</span><br><span>{price}: {y}</span><br><span>{title_name} </span>{link}",
            dataPoints: dataPoints,
        }]
    };

    function addData(data) {
        for (let i = 0; i < data.length; i++) {
            let oldDate = data[i].Date.split('/');
            let newDate = oldDate[2] + '/' + oldDate[1] + '/' + oldDate[0];
            for (let j = 0; j < annotation.responseJSON.length; j++) {
                if (annotation.responseJSON[j].Date === data[i].Date) {
                    dataPoints.push({
                        x: new Date(Date.parse(newDate)),
                        y: data[i].Stock_price,
                        date: 'Date',
                        price: 'Stock price',
                        markerColor: annotation.responseJSON[j].Annotation_color,
                        markerType: "circle",
                        markerSize: 20,
                        title: annotation.responseJSON[j].Annotation_title,
                        link: annotation.responseJSON[j].Annotation_link,
                        title_name: 'Annotation title: ',
                    });
                } else {
                    dataPoints.push({
                        x: new Date(Date.parse(newDate)),
                        y: data[i].Stock_price,
                        date: 'Date',
                        price: 'Stock price',
                        markerColor: '#bc0f18',
                        markerType: "circle",
                        markerSize: 0,
                    });
                }
            }
        }
        $("#chartContainer").CanvasJSChart(options);
    }

    let annotation = $.getJSON("./json/risklio_example_annotations.json");

    $.getJSON("./json/risklio_example_stockprice.json", addData);
};