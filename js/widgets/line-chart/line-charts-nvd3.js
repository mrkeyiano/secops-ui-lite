'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

{
    (function () {
        var COLORS = {
            red: '#f44336',
            lightBlue: '#03a9f4',
            orange: '#ffc107',
            amber: '#ff9800',
            teal: '#00bcd4',
            purple: '#7726d3',
            green: '#00d45a',
            rowBgColor: '#4a4a4a'
        };

        document.addEventListener("DOMContentLoaded", function () {
            var LineChart = (function () {
                function LineChart(options) {
                    _classCallCheck(this, LineChart);

                    this.options = options;
                    this.container = options.container;
                    this.maxX = options.maxX;
                    this.xStep = options.xStep;
                    this.columns = this.options.maxX / 2;
                    this.color = options.rowBgColor;
                    this.margin = options.margin;
                    this.data = options.data;
                    this.nv = options.nv;
                    this.drawStep = this.xStep * options.xDrawStep; // It shows how many points will be drawn in one step
                    this.durationResizeAnimation = 500;
                }

                // line chart on index page

                _createClass(LineChart, [{
                    key: '_addSvgContainer',
                    value: function _addSvgContainer() {
                        this.svg = this.container.append('div').append('svg');
                    }
                }, {
                    key: '_getSvgSizes',
                    value: function _getSvgSizes() {
                        var svgWidth = getComputedStyle(this.svg[0][0]).width,
                            svgHeight = getComputedStyle(this.svg[0][0]).height;
                        this.svgWidth = svgWidth.slice(0, svgWidth.length - 2);
                        this.svgHeight = svgHeight.slice(0, svgHeight.length - 2) - this.margin;
                    }
                }, {
                    key: '_addAxisLabels',
                    value: function _addAxisLabels() {
                        this.container.selectAll('svg .y-axis-label').remove();
                        this.container.select('svg').append('text').attr('class', 'y-axis-label').attr('x', -(23 + this.options.yAxis.length * 7)).attr('y', '12').attr('transform', 'rotate(-90)').text(this.options.yAxis || '');

                        this.container.select('svg').append('text').attr('class', 'x-axis-label').text(this.options.xAxis || '');
                    }
                }, {
                    key: '_buildBackground',
                    value: function _buildBackground() {
                        this._addSvgContainer();
                        this._getSvgSizes();

                        var bars = [];
                        for (var i = 0; i < this.columns; i++) {
                            bars.push(this.svgHeight);
                        }

                        this.barsLayout = this.svg.append('g').attr('class', 'bars').attr('transform', 'translate(' + this.margin + ', 0)').selectAll('rect').data(bars).enter().append('rect');

                        this._addAxisLabels();

                        this._setBackgroundSizes();
                    }
                }, {
                    key: '_setBackgroundSizes',
                    value: function _setBackgroundSizes() {
                        var availableBarWidth = (this.svgWidth - 2 * this.margin) / this.columns,
                            barWidth = availableBarWidth / 2;
                        this.barsLayout.attr('fill', this.color).attr('y', this.margin).attr('height', function (d, i) {
                            return d;
                        }).transition().duration(this.durationResizeAnimation).attr('width', barWidth).attr('x', function (d, i) {
                            return i * availableBarWidth;
                        });
                        this.container.select('svg .x-axis-label').transition().duration(this.durationResizeAnimation).attr('x', this.svgWidth - this.margin - 7 - this.options.xAxis.length * 7).attr('y', this.svgHeight - this.svgHeight / 4 + this.margin + 14);
                    }
                }, {
                    key: 'drawChart',
                    value: function drawChart() {
                        this._buildBackground();
                        this._buildLegend();
                        this._buildNvGraph();
                        this._animateGraphs();
                    }
                }, {
                    key: '_buildNvGraph',
                    value: function _buildNvGraph() {
                        var _this = this;

                        this._tuneNvGraph();

                        nv.addGraph(function () {
                            _this.svg.datum(_this.data).transition().duration(0).call(_this.lineChart);
                            nv.utils.windowResize(_this.resizeBackground.bind(_this));
                            nv.utils.windowResize(_this.lineChart.update);
                            return _this.lineChart;
                        });
                    }
                }, {
                    key: '_tuneNvGraph',
                    value: function _tuneNvGraph() {
                        this.lineChart = nv.models.lineChart().margin({ top: this.margin, right: this.margin, bottom: 0, left: this.margin }).useInteractiveGuideline(true).xDomain([0, this.options.maxX]).yDomain([-1.01, 3]).showLegend(false).showYAxis(true).showXAxis(true).pointSize(5);

                        this.lineChart.tooltip.enabled(false);
                        this.lineChart.interactiveLayer.tooltip.enabled(false);

                        this.lineChart.xAxis.showMaxMin(false).tickValues([0]);

                        this.lineChart.yAxis.showMaxMin(false).ticks(10);
                    }
                }, {
                    key: '_buildLegend',
                    value: function _buildLegend() {
                        var legend = this.container.append('div').attr('class', 'legend').selectAll('.legend__item').data(this.data).enter().append('div').attr('class', 'legend__item');

                        legend.append('div').attr('class', 'legend__mark pull-left').style('background-color', function (d) {
                            return d.color;
                        });

                        legend.append('div').attr('class', 'legend__text').text(function (d) {
                            return d.key;
                        });
                    }
                }, {
                    key: 'resizeBackground',
                    value: function resizeBackground() {
                        this._getSvgSizes();
                        this._setBackgroundSizes();
                    }
                }, {
                    key: '_animateGraphs',
                    value: function _animateGraphs() {
                        var _this2 = this;

                        var i = 0;
                        this.timer = setInterval(function () {
                            _this2._calcAllGraphs(i);
                            _this2._drawNextStep(i);
                            i += _this2.xStep;
                            _this2._checkEndOfAnimation(i);
                        }, Math.round(this.options.animationTime / (this.maxX / this.xStep / this.options.xDrawStep)));
                    }
                }, {
                    key: '_drawNextStep',
                    value: function _drawNextStep(i) {
                        if (i != 0 && i % this.drawStep == 0 || i == this.options.maxX) {
                            this.lineChart.update();
                        }
                    }
                }, {
                    key: '_checkEndOfAnimation',
                    value: function _checkEndOfAnimation(i) {
                        if (i >= this.options.maxX + 1) {
                            this.lineChart.duration(this.durationResizeAnimation);
                            this.data.forEach(function (item) {
                                item.fillOpacity = 0.11;
                            });

                            clearInterval(this.timer);
                            this.lineChart.update();
                        }
                    }
                }, {
                    key: '_calcAllGraphs',
                    value: function _calcAllGraphs(i) {
                        this.data.forEach(function (item) {
                            item.graphFunction(i);
                        });
                    }
                }]);

                return LineChart;
            })();

            var lineChartData = [{
                values: [],
                key: 'Awesome',
                color: COLORS.teal,

                graphFunction: function graphFunction(i) {
                    var INTERVAL_1 = 2.8,
                        INTERVAL_2 = 7.1,
                        INTERVAL_3 = 11.0;

                    if (i < INTERVAL_1) {
                        this.values.push({ x: i, y: (3.43 * i * i - 6.7 * i) / 14 });
                    } else {
                        if (i < INTERVAL_2) {
                            this.values.push({ x: i, y: -(i - 7.1) * (i - 7.1) / 10.26 + 2.378 });
                        } else {
                            if (i < INTERVAL_3) {
                                this.values.push({ x: i, y: -0.4 / (i - 4.3) + 2.53 });
                            } else {
                                this.values.push({ x: i, y: (i - 11.4) * (i - 11.4) * (i - 11.4) / 13 + 2.476 });
                            }
                        }
                    }
                }
            }, {
                values: [],
                key: 'Good',
                color: COLORS.orange,
                fillOpacity: 0.00001,
                area: true,

                graphFunction: function graphFunction(i) {
                    var INTERVAL_1 = 3.0,
                        INTERVAL_2 = 8.2;

                    if (i < INTERVAL_1) {
                        this.values.push({ x: i, y: (3.255 * i * i - 9.6 * i) / 16 });
                    } else {
                        if (i < INTERVAL_2) {
                            this.values.push({ x: i, y: (-1.055 * (i - 8.03) * (i - 8.03) + 27) / 15 });
                        } else {
                            this.values.push({ x: i, y: (i - 9) * (i - 9) * (i - 9) / 120 + 1.805 });
                        }
                    }
                }
            }, {
                values: [],
                key: 'Fail',
                color: COLORS.red,

                graphFunction: function graphFunction(i) {
                    var INTERVAL_1 = 3.1,
                        INTERVAL_2 = 10.3;

                    if (i < INTERVAL_1) {
                        this.values.push({ x: i, y: (2.255 * i * i - 9.1 * i) / 13 });
                    } else {
                        if (i < INTERVAL_2) {
                            this.values.push({ x: i, y: .82 * Math.sin((i - 4.5) / 2.1) });
                        } else {
                            this.values.push({ x: i, y: -(i - 13) * (i - 13) * (i - 13) / 64 });
                        }
                    }
                }
            }];
            var lineChartOptions = {
                container: d3.select('.line-chart__container'),
                maxX: 13,
                xStep: 0.125,
                xDrawStep: 4,
                rowBgColor: COLORS.rowBgColor,
                margin: 20,
                xAxis: 'TIME',
                yAxis: 'REVENUE',
                animationTime: 400,
                data: lineChartData,
                nv: nv
            };
            if (lineChartOptions.container[0][0]) {
                var lineChart = new LineChart(lineChartOptions);
                lineChart.drawChart();
            }

            //first line chart on charts page
            var lineChart1Data = [{
                values: [],
                key: 'Sin(x)',
                color: COLORS.lightBlue,
                fillOpacity: 0.00001,
                area: true,

                graphFunction: function graphFunction(i) {
                    this.values.push({ x: i, y: Math.sin(i) });
                }
            }, {
                values: [],
                key: 'Cos(x+10)+1/2',
                color: COLORS.red,
                fillOpacity: 0.00001,
                area: true,

                graphFunction: function graphFunction(i) {
                    this.values.push({ x: i, y: Math.cos(i + 10) + 0.5 });
                }
            }, {
                values: [],
                key: 'Cos(x)+1',
                color: COLORS.purple,
                fillOpacity: 0.00001,
                area: true,

                graphFunction: function graphFunction(i) {
                    this.values.push({ x: i, y: Math.cos(i) + 1 });
                }
            }];
            var lineChart1Options = {
                container: d3.select('.line-chart-1__container'),
                maxX: 10,
                xStep: 0.125,
                xDrawStep: 4,
                rowBgColor: COLORS.rowBgColor,
                margin: 20,
                xAxis: 'X',
                yAxis: 'Y',
                animationTime: 400,
                data: lineChart1Data,
                nv: nv
            };
            if (lineChart1Options.container[0][0]) {
                var lineChart1 = new LineChart(lineChart1Options);
                lineChart1.drawChart();
            }

            //second line chart on charts page
            var lineChart2Data = [{
                values: [],
                key: 'Teal graph',
                color: COLORS.teal,
                fillOpacity: 0.00001,
                area: true,

                graphFunction: function graphFunction(i) {
                    if (i < 7) {
                        this.values.push({ x: i, y: Math.random() * 0.2 * i });
                    } else {
                        this.values.push({ x: i, y: (Math.random() * 0.1 + 0.2) * i - 1 });
                    }
                }
            }, {
                values: [],
                key: 'Orange graph',
                color: COLORS.orange,
                fillOpacity: 0.00001,
                area: true,

                graphFunction: function graphFunction(i) {
                    if (i < 10) {
                        this.values.push({ x: i, y: -Math.random() * 1.5 + 2.5 });
                    } else {
                        this.values.push({ x: i, y: 1.5 });
                    }
                }
            }, {
                values: [],
                key: 'Green graph',
                color: COLORS.green,
                fillOpacity: 0.00001,
                //area: true,

                graphFunction: function graphFunction(i) {
                    if ((i + 1) % 4 == 0) {
                        this.values.push({ x: i, y: Math.random() * 1.5 + 0.6 });
                        // if (Math.round(5*i)%2 == 0) {
                        //     this.values.push({x: i, y: (0.2*(i) - 0.6)});
                        // } else {
                        //     this.values.push({x: i, y: (0.1*(i) - 1)});
                        // }
                    } else {
                            // if (Math.round(5*i)%2 == 0) {
                            //     this.values.push({x: i, y: -(0.1*(i) - 1)});
                            // } else {
                            //     this.values.push({x: i, y: -(0.2*(i) - 0.6)});
                            // }
                        }
                    if ((i + 1) % 2 > 0) {
                        this.values.push({ x: i, y: -Math.random() * 0.1 - 0.6 });
                    }
                }
            }];
            var lineChart2Options = {
                container: d3.select('.line-chart-2__container'),
                maxX: 14,
                xStep: 0.125,
                xDrawStep: 4,
                rowBgColor: COLORS.rowBgColor,
                margin: 20,
                animationTime: 400,
                xAxis: 'X',
                yAxis: 'Y',
                data: lineChart2Data,
                nv: nv
            };
            if (lineChart1Options.container[0][0]) {
                var lineChart2 = new LineChart(lineChart2Options);
                lineChart2.drawChart();
            }
        });
    })();
}