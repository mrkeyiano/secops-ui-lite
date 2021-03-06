'use strict';

{
    document.addEventListener("DOMContentLoaded", function () {
        var container = d3.select('.line-plus-bar-chart__container');

        if (container[0][0]) {
            (function () {
                var data = [{
                    "key": "Quantity",
                    "bar": true,
                    "color": "#00bcd4",
                    "values": [[1136005200000, 1271.0], [1138683600000, 1271.0], [1141102800000, 1271.0], [1143781200000, 1271.0], [1146369600000, 1371.0], [1149048000000, 1471.0], [1151640000000, 1341], [1154318400000, 1350], [1156996800000, 1361], [1159588800000, 3899.0], [1162270800000, 3886.0], [1164862800000, 3836.0], [1167541200000, 3560.0], [1170219600000, 3567.0], [1172638800000, 3560.0], [1175313600000, 2643.0], [1177905600000, 2643.0], [1180584000000, 2643.0], [1183176000000, 2522.0], [1185854400000, 2523.0], [1188532800000, 2522.0], [1191124800000, 2901.0], [1193803200000, 2901.0], [1196398800000, 2901.0], [1199077200000, 2761.0], [1201755600000, 2201.0], [1204261200000, 2201.0], [1206936000000, 2226.0], [1209528000000, 2326.0], [1212206400000, 2286.0], [1214798400000, 2736.0], [1217476800000, 2646.0], [1220155200000, 2736.0], [1222747200000, 2596.0], [1225425600000, 2596.0], [1228021200000, 2596.0], [1230699600000, 1387.0], [1233378000000, 1987.0], [1235797200000, 1987.0], [1238472000000, 1711.0], [1241064000000, 1751.0], [1243742400000, 1756.0], [1246334400000, 1743.0], [1249012800000, 1740.0], [1251691200000, 1740.0], [1254283200000, 1510.0], [1256961600000, 1510.0], [1259557200000, 1510.0], [1262235600000, 1594.0], [1264914000000, 1544.0], [1267333200000, 1594.0], [1270008000000, 1544.0], [1272600000000, 1543.0], [1275278400000, 1584.0], [1277870400000, 1315.0], [1280548800000, 1305.0], [1283227200000, 1315.0], [1285819200000, 1375.0], [1288497600000, 1375.0], [1291093200000, 1331.0], [1293771600000, 1375.0], [1296450000000, 1195.0], [1298869200000, 1154.0], [1301544000000, 1194.0], [1304136000000, 1194.0], [1306814400000, 1195.0], [1309406400000, 1125.0], [1312084800000, 1125.0], [1314763200000, 1245.0], [1317355200000, 475.0], [1320033600000, 470.0], [1322629200000, 470.0], [1325307600000, 690.0], [1327986000000, 690.0], [1330491600000, 690.0], [1333166400000, 514.0], [1335758400000, 514.0]]
                }, {
                    "key": "Price",
                    "color": "#ffc107",
                    "values": [[1136005200000, 71.89], [1138683600000, 75.51], [1141102800000, 68.49], [1143781200000, 62.72], [1146369600000, 70.39], [1149048000000, 59.77], [1151640000000, 57.27], [1154318400000, 67.96], [1156996800000, 67.85], [1159588800000, 76.98], [1162270800000, 81.08], [1164862800000, 91.66], [1167541200000, 84.84], [1170219600000, 85.73], [1172638800000, 84.61], [1175313600000, 92.91], [1177905600000, 99.8], [1180584000000, 121.191], [1183176000000, 122.04], [1185854400000, 131.76], [1188532800000, 138.48], [1191124800000, 153.47], [1193803200000, 189.95], [1196398800000, 182.22], [1199077200000, 198.08], [1201755600000, 135.36], [1204261200000, 125.02], [1206936000000, 143.5], [1209528000000, 173.95], [1212206400000, 188.75], [1214798400000, 167.44], [1217476800000, 158.95], [1220155200000, 169.53], [1222747200000, 113.66], [1225425600000, 107.59], [1228021200000, 92.67], [1230699600000, 85.35], [1233378000000, 90.13], [1235797200000, 89.31], [1238472000000, 105.12], [1241064000000, 125.83], [1243742400000, 135.81], [1246334400000, 142.43], [1249012800000, 163.39], [1251691200000, 168.21], [1254283200000, 185.35], [1256961600000, 188.5], [1259557200000, 199.91], [1262235600000, 210.732], [1264914000000, 192.063], [1267333200000, 204.62], [1270008000000, 235.0], [1272600000000, 261.09], [1275278400000, 256.88], [1277870400000, 251.53], [1280548800000, 257.25], [1283227200000, 243.1], [1285819200000, 283.75], [1288497600000, 300.98], [1291093200000, 311.15], [1293771600000, 322.56], [1296450000000, 339.32], [1298869200000, 353.21], [1301544000000, 348.5075], [1304136000000, 350.13], [1306814400000, 347.83], [1309406400000, 335.67], [1312084800000, 390.48], [1314763200000, 384.83], [1317355200000, 381.32], [1320033600000, 404.78], [1322629200000, 382.2], [1325307600000, 405.0], [1327986000000, 456.48], [1330491600000, 542.44], [1333166400000, 599.55], [1335758400000, 583.98]]
                }];

                nv.addGraph(function () {
                    var chart = nv.models.linePlusBarChart().focusEnable(false).margin({ top: 20, right: 50, bottom: 20, left: 50 }).clipRadius(10)
                    //We can set x data accessor to use index. Reason? So the bars all appear evenly spaced.
                    .x(function (d, i) {
                        return d[0];
                    }).y(function (d, i) {
                        return d[1];
                    });

                    chart.legend.margin({ top: 2, bottom: 10 });

                    chart.xAxis.showMaxMin(false).ticks(4).tickFormat(function (d) {
                        return d3.time.format('%x')(new Date(d));
                    });

                    chart.y1Axis.showMaxMin(false).tickFormat(d3.format('f'));

                    chart.y2Axis.showMaxMin(false).tickFormat(function (d) {
                        return '$' + d3.format(',f')(d);
                    });

                    chart.tooltip.contentGenerator(function (d) {
                        if (d === null) {
                            return '';
                        }
                        d3.selectAll('.nvtooltip').classed('mdl-tooltip', true);
                        if (d.hasOwnProperty('point')) {
                            return d3.time.format('%x')(new Date(d.value)) + '<br>Price: $' + d.series[0].value;
                        } else {
                            return d3.time.format('%x')(new Date(d.value)) + '<br>Quantity: ' + d.series[0].value;
                        }
                    });

                    container.append('svg').datum(data).transition().duration(0).call(chart);

                    nv.utils.windowResize(chart.update);

                    chart.update();

                    return chart;
                });
            })();
        }
    });
}